<template>
    <div class="wrapper">
        <div v-if="tasksCollection">
            <TasksSummary :tasksCollection="tasksCollection" />
            <div class="tasks-list">
                <Task v-for="(task, i) in tasks" :task="task" :key="i" />
            </div>
        </div>
        <FontAwesomeIcon v-else icon="spinner" class="loading-spinner" />
    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import TasksCollection from "../../../server/src/models/TasksCollection";
    import Task from "@/components/Task";
    import TaskModel from "../../../server/src/models/Task";
    import TasksSummary from "@/components/TasksSummary.vue";
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

    @Component({
        components: {
            FontAwesomeIcon,
            TasksSummary,
            Task
        }
    })
    export default class TasksContainer extends Vue {
        @Prop({ type: Object as PropType<TasksCollection> }) tasksCollection!;

        get tasks(): TaskModel[] {
            return this.tasksCollection?.getAll();
        }
    }
</script>

<style scoped lang="scss">
    .wrapper {
        border-radius: 2rem;
        background-color: $white;
        width: 60%;
        min-height: 250px;
        max-height: 500px;
        padding: 2rem 3rem;
        box-shadow: 0 0 30px transparentize($darkprimary, .4);
        transition: all .5s 0s ease-out;
    }
    .tasks-list {
        max-height: 400px;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    .loading-spinner {
        margin: 2rem 0;
        font-size: 2rem;
        animation: spin 1.2s 0s infinite ease-in-out;
        color: $darkprimary;
        opacity: .3;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        80% { transform: rotate(360deg); }
        100% { transform: rotate(360deg); }
    }
</style>
