<template>
    <div class="summary-wrapper">
        <span>{{ total }} tasks</span>
        <div>
            <span class="completed">
                <FontAwesomeIcon icon="check-circle" />
                {{ completed }} completed
             </span>
            <span class="pending">
                <FontAwesomeIcon icon="clock" />
                {{ pending }} pending
            </span>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import TasksCollection from "../../../server/src/models/TasksCollection";
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

    @Component({
        components: {
            FontAwesomeIcon
        }
    })
    export default class TasksSummary extends Vue {
        @Prop({ type: Object as PropType<TasksCollection> }) tasksCollection!;

        get total(): number {
            return this.tasksCollection?.getAll().length;
        }

        get completed(): number {
            return this.tasksCollection?.getCompleted().length;
        }

        get pending(): number {
            return this.tasksCollection?.getPending().length;
        }
    }
</script>

<style scoped lang="scss">
    .summary-wrapper {
        padding: 1rem 1rem 3rem 1rem;
        color: $black;
        font-size: 1.1rem;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .completed {
        padding: 0 .3rem;
        color: $success;
    }
    .pending {
        padding: 0 .3rem;
        color: $warning;
    }
</style>
