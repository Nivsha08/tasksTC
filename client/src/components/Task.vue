<template>
    <div class="task-wrapper" :class="{ disabled, editing: editInProgress }">
        <EditTaskTitle v-if="editInProgress" :task="task" @done="onEditDone" @cancel="onEditCancel" />
        <TaskTitle v-else :task="task" />
        <div class="buttons">
            <BFormCheckbox v-model="task.completed" @change="toggleTaskStatus"
                           :disabled="disabled" switch size="md" class="item" />
            <ClickableIcon @click="onEditStart" icon="pencil-alt"
                           class="item edit-task-button" :class="{ editing: editInProgress }" />
            <ClickableIcon @click="removeTask" icon="trash" class="item delete-task-button" />
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
    import {ITask} from "../../../models/Task";
    import ClickableIcon from "@/components/ClickableIcon.vue";

    @Component({
        components: {
            TaskTitle,
            EditTaskTitle,
            BFormCheckbox,
            ClickableIcon,
            FontAwesomeIcon
        }
    })
    export default class Task extends Vue {
        @Prop({ type: Object as PropType<Task> }) task!;
        editInProgress: boolean = false;
        disabled: boolean = false;

        removeTask(): void {
            this.disabled = true;
            this.$emit(AppEvents.REMOVE_TASK);
        }

        onEditStart(): void {
            this.editInProgress = true;
        }

        onEditCancel(): void {
            this.editInProgress = false;
        }

        async onEditDone(newTitle: string): void {
            if (newTitle.length > 0) {
                this.task.title = newTitle;
                await this.updateTask(this.task);
            }
            this.editInProgress = false;
        }

        async toggleTaskStatus(): void {
            this.task.completed = !this.task.completed;
            await this.updateTask(this.task);
        }

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
    }
</script>

<style scoped lang="scss">
    .task-wrapper {
        @extend .transitionable;
        padding: .4rem 1rem;
        font-size: .9rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid darken($foreground, 5%);
        &.disabled {
            opacity: .3;
            &:hover {
                cursor: not-allowed;
                background-color: initial;
                border-color: darken($foreground, 5%);
            }
        }
        &.editing {
            background-color: transparentize($info, .9);
            border-color: transparentize($info, .3);
        }
        &:hover:not(.editing) {
            background-color: transparentize($primary, .9);
            border-color: transparentize($primary, .3);
        }
    }
    .buttons {
        display: flex;
        align-items: center;
    }
    .icon-button {
        @extend .transitionable;
        color: transparentize($black, .75);
        margin: 0 .5rem;
    }
    .edit-task-button {
        @extend .icon-button;
        &:hover, &.editing { color: $info; }
    }
    .delete-task-button {
        @extend .icon-button;
        &:hover { color: $danger; }
    }
</style>
