<template>
    <div class="clear-completed" @click="clearCompleted">
        <span class="text">Clear completed?</span>
        <FontAwesomeIcon icon="thumbs-up" />
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    import {AppEvents} from "@/constants";

    @Component({
        components: {
            FontAwesomeIcon
        }
    })
    export default class ClearCompleted extends Vue {
        clearCompleted(): void {
            this.$emit(AppEvents.CLEAR_COMPLETED);
        }
    }
</script>

<style scoped lang="scss">
    .clear-completed {
        display: flex;
        align-items: center;
        padding: .5rem;
        font-size: .8rem;
        color: transparentize($black, .7);
        &:hover {
            cursor: pointer;
        }
        .text {
            text-decoration: underline;
            text-decoration-style: dotted;
            padding: 0 .4rem;
        }
    }
</style>
