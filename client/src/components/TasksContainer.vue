<template>
    <div class="container">

    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component
    export default class TasksContainer extends Vue {

    }
</script>

<style scoped lang="scss">
    .container {
        border-radius: 2rem;
        background-color: $white;
        width: 60%;
        padding: 2rem 3rem;
        box-shadow: 0 0 30px transparentize($darkprimary, .4);
    }
</style>
