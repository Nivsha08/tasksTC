<template>
    <div class="summary-wrapper">
        <span>{{ total }} tasks to complete</span>
        <div>
            <div class="pending">
                {{ pending }} pending <FontAwesomeIcon icon="clock" />
            </div>
            <div class="completed">
                {{ completed }} completed <FontAwesomeIcon icon="check-circle" />
            </div>
            <transition name="slide-fade">
                <ClearCompleted v-if="completed > 0" @clearCompleted="clearCompleted" />
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import TasksCollection from "../../../server/src/models/TasksCollection";
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    import ClearCompleted from "@/components/ClearCompleted.vue";
    import {AppEvents} from "@/constants";

    @Component({
        components: {
            ClearCompleted,
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

        clearCompleted(): void {
            this.$emit(AppEvents.CLEAR_COMPLETED);
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
        align-items: flex-start;
        text-align: end;
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
