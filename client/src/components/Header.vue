<template>
    <div class="header-wrapper">
        <span class="title">{{ title }}</span>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component({
        props: {
            title: { type: String, required: true }
        }
    })
    export default class Header extends Vue {}
</script>

<style scoped lang="scss">
    .header-wrapper {
        .title {
            color: $white;
            font-weight: 800;
            font-size: 3.5rem;
        }
        padding: 4rem 0;
    }
</style>
