<template>
    <div id="app">
        <Header title="Tasks" />
        <TasksContainer />
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Header from "@/components/Header.vue";
    import TasksContainer from "@/components/TasksContainer.vue";
    import Task from "../../../server/src/models/Task";

    @Component({
        components: {
            Header,
            TasksContainer
        }
    })
    export default class App extends Vue {

        async fetchTasks(): Promise<Task[]> {
            
        }

        async beforeMount(): Promise<void> {

        }
    }
</script>

<style scoped lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: linear-gradient(200deg, $primary 0%, $darkprimary 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        color: #2c3e50;
        padding: 0;
        margin: 0;
        height: 100%;
    }
</style>
