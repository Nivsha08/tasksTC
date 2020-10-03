<template>
    <div class="wrapper">
        <div v-if="tasksCollection" class="tasks-wrapper">
            <TasksSummary :tasksCollection="tasksCollection" @clearCompleted="clearCompleted" />
            <AddNewTask @taskAdded="refreshTasks" />
            <div class="tasks-list">
                <Draggable v-model="tasks" v-bind="dragOptions" handle=".drag-handle"
                           @start="dragging = true" @end="dragging = false">
                    <transition-group type="transition" :name="!dragging ? 'flip-list' : null">
                        <div v-for="task in tasks" :key="task.id" class="task-item">
                            <ClickableIcon icon="grip-horizontal" class="drag-handle" />
                            <Task :task="task" class="task"
                                  @taskUpdated="refreshTasks"
                                  @removeTask="removeTask(task.id)" />
                        </div>
                    </transition-group>
                </Draggable>
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
    import Draggable from "vuedraggable";
    import ClickableIcon from "@/components/ClickableIcon.vue";

    @Component({
        components: {
            Draggable,
            ClickableIcon,
            FontAwesomeIcon,
            TasksSummary,
            Task,
            AddNewTask
        }
    })
    export default class TasksContainer extends Vue {
        @Prop({ type: Object as PropType<TasksCollection> }) tasksCollection!;
        readonly dragOptions = {
            animation: 200,
            disabled: false,
            group: "description",
            ghostClass: "ghost"
        };
        dragging: boolean = false;

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
        @extend .transitionable;
        border-radius: 2rem;
        background-color: $white;
        width: 60%;
        min-height: 250px;
        height: 450px;
        padding: 2rem 3rem;
        box-shadow: 0 0 30px transparentize($darkprimary, .4);
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
        .task-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            .drag-handle {
                text-align: center;
                flex-basis: 3%;
                color: transparentize($black, .95);
            }
            .task { flex-basis: 93%; }
        }
    }
    .loading-spinner {
        margin: 2rem 0;
        font-size: 2rem;
        animation: spin 1.2s 0s infinite ease-in-out;
        color: $darkprimary;
        opacity: .3;
    }
    .flip-list-move {
        transition: transform 0.5s;
    }
    .ghost {
        opacity: .2;
        background: #c8ebfb;
    }
</style>
