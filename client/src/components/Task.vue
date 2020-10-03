<template>
    <div class="task-wrapper" :class="{ disabled }">
        <EditTaskTitle v-if="editInProgress" :task="task" />
        <TaskTitle v-else :task="task" />
        <div class="buttons">
            <BFormCheckbox v-model="task.completed" @change="toggleTaskStatus"
                           :disabled="disabled" switch size="md" class="item" />
            <FontAwesomeIcon @click="editTask" :icon="editInProgress ? 'check' : 'pencil-alt'"
                             class="item edit-task-button" />
            <FontAwesomeIcon @click="removeTask" icon="trash" class="item delete-task-button" />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {BFormCheckbox} from "bootstrap-vue";
    import {ActionTypes} from "@/store/actions";
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    import {AppEvents} from "@/constants";
    import EditTaskTitle from "@/components/EditTaskTitle.vue";
    import TaskTitle from "@/components/TaskTitle.vue";
    import {ITask} from "../../../server/src/models/Task";

    @Component({
        components: {
            TaskTitle,
            EditTaskTitle,
            BFormCheckbox,
            FontAwesomeIcon
        }
    })
    export default class Task extends Vue {
        @Prop({ type: Object as PropType<Task> }) task!;
        editInProgress: boolean = false;
        disabled: boolean = false;

        async updateTask(updatedTask: ITask): Promise<void> {
            try {
                this.disabled = true;
                await this.$store.dispatch(ActionTypes.UPDATE_TASK, updatedTask);
                this.$emit(AppEvents.TASK_UPDATED);
            } catch (error) {
                console.warn(error);
            } finally {
                this.disabled = false;
            }
        }

        async toggleTaskStatus(): void {
            this.task.completed = !this.task.completed;
            await this.updateTask(this.task);
        }

        editTask(): void {
            if (!this.editInProgress) {
                this.editInProgress = true;
            }
            else {
                this.editInProgress = false;
            }
        }

        removeTask(): void {
            this.disabled = true;
            this.$emit(AppEvents.REMOVE_TASK);
        }
    }
</script>

<style scoped lang="scss">
    .task-wrapper {
        padding: .4rem 1rem;
        font-size: .9rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        transition: all .2s 0s ease-out;
        border-bottom: 1px solid darken($foreground, 5%);
        &.disabled {
            opacity: .3;
            &:hover {
                cursor: not-allowed;
                background-color: initial;
                border-color: darken($foreground, 5%);
            }
        }
        &:hover {
            background-color: transparentize($primary, .9);
            border-color: transparentize($primary, .3);
        }
    }
    .buttons {
        display: flex;
        align-items: center;
    }
    .icon-button {
        color: transparentize($black, .75);
        transition: all .3s 0s ease-out;
        margin: 0 .5rem;
        &:hover { cursor: pointer; }
    }
    .edit-task-button {
        @extend .icon-button;
        &:hover { color: $info; }
    }
    .delete-task-button {
        @extend .icon-button;
        &:hover { color: $danger; }
    }
</style>
