<template>
    <div class="task-wrapper">
        <span class="title" :class="{done: task.completed}">{{ task.title }}</span>
        <BFormCheckbox v-model="task.completed" switch size="lg" />
    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import {BFormCheckbox} from "bootstrap-vue";

    @Component({
        components: {
            BFormCheckbox
        }
    })
    export default class Task extends Vue {
        @Prop({ type: Object as PropType<Task> }) task!;
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
