<template>
    <div class="title" :class="{done: task.completed}">
        {{ task.title }}
    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from "vue";
    import Component from "vue-class-component";
    import Task from "../../../models/Task";
    import {Prop} from "vue-property-decorator";

    @Component
    export default class TaskTitle extends Vue {
        @Prop({ type: Object as PropType<Task> }) task!;
    }
</script>

<style scoped lang="scss">
    .title {
        @extend .transitionable;
        font-size: 1rem;
        &.done {
            opacity: .3;
            text-decoration: line-through;
        }
    }
</style>
