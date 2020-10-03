<template>
    <FontAwesomeIcon :icon="icon" @click="$emit('click')" class="icon" />
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    import {Prop} from "vue-property-decorator";

    @Component({
        components: {
            FontAwesomeIcon
        }
    })
    export default class ClickableIcon extends Vue {
        @Prop(String) icon!;
    }
</script>

<style scoped lang="scss">
    .icon {
        cursor: pointer;
    }
</style>
