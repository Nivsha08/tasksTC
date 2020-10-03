<template>
    <div class="wrapper">
        <input type="text" class="input" ref="editInput" v-model="title" :maxlength="titleMaxLength"
            @keypress.enter="done" @keydown.esc="cancel">
        <span class="length-limit">{{ lengthLimitIndication }}</span>
        <div class="edit-buttons-wrapper">
            <ClickableIcon @click="cancel" icon="times" class="edit-button cancel" />
            <ClickableIcon @click="done" icon="check" class="edit-button done" />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue, {PropType} from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import Task from "../../../server/src/models/Task";
    import ClickableIcon from "@/components/ClickableIcon.vue";
    import {TASK_TITLE_MAX_LENGTH} from "@/constants";

    @Component({
        components: {
            ClickableIcon
        }
    })
    export default class EditTaskTitle extends Vue {
        @Prop({ type: Object as PropType<Task> }) task!;
        titleMaxLength = TASK_TITLE_MAX_LENGTH;
        title = this.task.title;

        get lengthLimitIndication(): string {
            return `${this.title.length} / ${this.titleMaxLength}`;
        }

        cancel(): void {
            this.$emit("cancel");
        }

        done(): void {
            this.$emit("done", this.title);
        }

        mounted(): void {
            (<HTMLInputElement>this.$refs["editInput"]).focus();
        }
    }
</script>

<style scoped lang="scss">
    .wrapper {
        display: flex;
        align-items: center;
        width: 100%;
    }
    .input {
        font-size: 1rem;
        flex-basis: 73%;
        border: none;
        height: 100%;
        background-color: transparent;
        &:focus {
            outline: none;
        }
    }
    .length-limit {
        flex-basis: 10%;
        font-size: .7rem;
        color: transparentize($info, .3);
    }
    .edit-buttons-wrapper {
        flex-basis: 7%;
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;
        .edit-button {
            @extend .transitionable;
            font-size: 1rem;
            color: transparentize($info, .7);
            &:hover { color: $info; }
        }
    }
</style>
