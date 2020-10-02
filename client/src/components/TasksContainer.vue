<template>
    <div class="wrapper">
        <div v-if="tasksCollection" class="tasks-wrapper">
            <TasksSummary :tasksCollection="tasksCollection" @clearCompleted="clearCompleted" />
            <AddNewTask @taskAdded="refreshTasks" />
            <div class="tasks-list">
                <Task v-for="task in tasks" :task="task" :key="task.id"
                      @taskUpdated="refreshTasks"
                      @removeTask="removeTask(task.id)" />
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
    import AddNewTask from "@/components/AddNewTask.vue";
    import {AppEvents} from "@/constants";
    import {ActionTypes} from "@/store/actions";

    @Component({
        components: {
            FontAwesomeIcon,
            TasksSummary,
            Task,
            AddNewTask
        }
    })
    export default class TasksContainer extends Vue {
        @Prop({ type: Object as PropType<TasksCollection> }) tasksCollection!;

        get tasks(): TaskModel[] {
            return this.tasksCollection?.getAll();
        }

        refreshTasks(): void {
            this.$emit(AppEvents.REFRESH_TASKS);
        }

        async removeTask(taskID: string): Promise<void> {
            try {
                await this.$store.dispatch(ActionTypes.DELETE_TASK, taskID);
                this.$emit(AppEvents.REFRESH_TASKS);
            }
            catch (error) {
                console.warn(error);
            }
        }

        async clearCompleted(): Promise<void> {
            try {
                await this.$store.dispatch(ActionTypes.DELETE_COMPLETED_TASKS);
                this.$emit(AppEvents.REFRESH_TASKS);
            }
            catch (error) {
                console.warn(error);
            }
        }


    }
</script>

<style scoped lang="scss">
    .wrapper {
        border-radius: 2rem;
        background-color: $white;
        width: 60%;
        min-height: 250px;
        height: 450px;
        padding: 2rem 3rem;
        box-shadow: 0 0 30px transparentize($darkprimary, .4);
        transition: all .5s 0s ease-out;
    }
    .tasks-wrapper {
        height: 100%;
    }
    .tasks-list {
        max-height: 55%;
        overflow-y: scroll;
        padding-top: .3rem;
        box-shadow: inset 0 7px 9px -7px transparentize($black, .8);
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
</style>
