<template>
    <input type="text" :value="task.title">
</template>

<script lang="ts">
    import Vue, {PropType} from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import Task from "../../../server/src/models/Task";

    @Component
    export default class EditTaskTitle extends Vue {
        @Prop({ type: Object as PropType<Task> }) task!;
    }
</script>

<style scoped lang="scss">

</style>
