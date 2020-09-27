<template>
    <div class="task-wrapper">
        <span>{{ task.title }}</span>
        <span>{{ task.isDone }}</span>
    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";

    @Component
    export default class Task extends Vue {
        @Prop({ type: Object as PropType<Task> }) task!;
    }
</script>

<style scoped lang="scss">
    .task-wrapper {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        transition: all .2s 0s ease-out;
        &:hover {
            cursor: pointer;
            background-color: lighten($primary, 30%);
            border-color: $primary;
        }
    }
</style>
