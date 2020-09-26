<template>
    <div id="app">

    </div>
</template>

<script>
    import Vue from "vue";
    import Component from "vue-class-component";
    import HelloWorld from "./HelloWorld";

    @Component({
        components: {
            HelloWorld
        }
    })
    export default class App extends Vue {

        message = "this is a message from a class component!";

    }
</script>

<style scoped lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: linear-gradient(200deg, $primary 0%, $darkprimary 100%);
        text-align: center;
        color: #2c3e50;
        padding: 0;
        margin: 0;
        height: 100%;
    }
</style>
