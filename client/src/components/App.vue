<template>
    <div id="app">
        <Header title="Tasks"/>
        <TasksContainer :tasksCollection="tasksCollection" @refresh="refreshTasks" />
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Header from "@/components/Header.vue";
    import TasksContainer from "@/components/TasksContainer.vue";
    import TasksCollection from "../../../models/TasksCollection";
    import {ActionTypes} from "@/store/actions";
    import {GetterTypes} from "@/store/getters";

    @Component({
        components: {
            Header,
            TasksContainer
        }
    })
    export default class App extends Vue {

        get tasksCollection(): TasksCollection {
            return this.$store.getters[GetterTypes.GET_TASKS];
        }

        async refreshTasks(): Promise<void> {
            await this.$store.dispatch(ActionTypes.FETCH_TASKS);
        }

        async beforeMount(): Promise<void> {
            await this.refreshTasks();
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
