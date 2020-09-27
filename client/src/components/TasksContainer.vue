<template>
    <div class="container">
        <TasksSummary :tasksCollection="tasksCollection" />
        <div class="tasks-list">
            <Task v-for="(task, i) in tasks" :task="task" :key="i" class="task" />
        </div>
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

    @Component({
        components: {
            TasksSummary,
            Task
        }
    })
    export default class TasksContainer extends Vue {
        @Prop({ type: Object as PropType<TasksCollection> }) tasksCollection!;

        get tasks(): TaskModel[] {
            return this.tasksCollection?.getAll();
        }
    }
</script>

<style scoped lang="scss">
    .container {
        border-radius: 2rem;
        background-color: $white;
        width: 60%;
        height: 500px;
        padding: 2rem 3rem;
        box-shadow: 0 0 30px transparentize($darkprimary, .4);
    }
    .tasks-list {
        max-height: 450px;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>
