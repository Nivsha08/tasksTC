<template>
    <div class="task-wrapper" :class="{ disabled }">
        <span class="title" :class="{done: task.completed}">{{ task.title }}</span>
        <BFormCheckbox v-model="task.completed" @change="toggleTaskStatus"
                       :disabled="disabled"  switch size="md" />
    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {BFormCheckbox} from "bootstrap-vue";
    import {ActionTypes} from "@/store/actions";

    @Component({
        components: {
            BFormCheckbox
        }
    })
    export default class Task extends Vue {
        @Prop({ type: Object as PropType<Task> }) task!;
        disabled: boolean = false;

        async toggleTaskStatus(): void {
            try {
                this.disabled = true;
                this.task.completed = !this.task.completed;
                await this.$store.dispatch(ActionTypes.UPDATE_TASK, this.task);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                this.disabled = false;
            }
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
