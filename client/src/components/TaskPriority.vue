<template>
    <Badge :text="priority" :class="{ [priority]: true }" class="badge" />
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Badge from "@/components/Badge.vue";
    import {Prop} from "vue-property-decorator";
    import {TaskPriority} from "../../../models/Task";

    @Component({
        components: {
            Badge
        }
    })
    export default class TaskPriorityBadge extends Vue {
        @Prop({
            type: String,
            default: TaskPriority.LOW,
            validator: (value: string): boolean =>
                (Object.values(TaskPriority).indexOf(value) > 0)
        }) priority!;
    }
</script>

<style scoped lang="scss">
    .badge {
        min-width: 35px;
    }
    @mixin priorityColor($baseColor) {
        $color: darken($baseColor, 20%);
        background-color: transparentize($color, .4);
        color: darken($color, 20%);
    }
    .low { @include priorityColor($primary); }
    .mid { @include priorityColor(lighten($warning, 20%)); }
    .high { @include priorityColor(darken($danger, 10%)); }
    .urgent { @include priorityColor(lighten($danger, 20%)); }
</style>
