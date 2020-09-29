<template>
    <div class="task-wrapper" :class="{ disabled }">
        <span class="title" :class="{done: task.completed}">{{ task.title }}</span>
        <BFormCheckbox v-model="task.completed" @change="toggleTaskStatus"
                       :disabled="disabled"  switch size="lg" />
    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {BFormCheckbox} from "bootstrap-vue";
    import {ActionTypes} from "@/store/actions";
    import {ITask} from "../../../server/src/models/Task";

    @Component({
        components: {
            BFormCheckbox
        }
    })
    export default class Task extends Vue {
        @Prop({ type: Object as PropType<Task> }) task!;
        disabled: boolean = false;

        async toggleTaskStatus(): void {
            this.disabled = true;
            const updatedTask = this.task.clone();
            updatedTask.completed = !this.task.completed;
            await this.$store.dispatch(ActionTypes.UPDATE_TASK, updatedTask);
            this.disabled = false;
        }
    }
</script>

<style scoped lang="scss">
    .task-wrapper {
        padding: .8rem 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        transition: all .2s 0s ease-out;
        &.disabled {
            opacity: .3;
            &:hover {
                cursor: not-allowed;
                background-color: initial;
                border-color: darken($foreground, 5%);
            }
        }
        &:not(:last-of-type) {
            border-bottom: 1px solid darken($foreground, 5%);
        }
        &:hover {
            cursor: pointer;
            background-color: lighten($primary, 30%);
            border-color: $primary;
        }
    }
    .title {
        font-size: 1rem;
        transition: all .2s 0s ease-out;
        &.done {
            opacity: .3;
            text-decoration: line-through;
        }
    }
</style>
