<template>
    <div class="badge">{{ text }}</div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";

    @Component
    export default class Badge extends Vue {
        @Prop(String) text!;
    }
</script>

<style scoped lang="scss">
    .badge {
        $badgeColor: darken($foreground, 20%);
        padding: .3rem .6rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .7rem;
        text-transform: capitalize;
        background-color: transparentize($badgeColor, .4);
        color: darken($badgeColor, 20%);
    }
</style>
