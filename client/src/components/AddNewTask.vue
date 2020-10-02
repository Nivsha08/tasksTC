<template>
    <div class="new-task-wrapper">
        <input v-model="title" type="text" class="input" :placeholder="placeholder"
               @keypress.enter="done" @keypress.esc="cancel">
        <div class="prepend-icons">
            <FontAwesomeIcon icon="chevron-right" class="icon chevron" />
        </div>
        <div class="append-icons">
            <FontAwesomeIcon @click="cancel" icon="times" class="icon cancel-button" />
            <FontAwesomeIcon @click="done" icon="check" class="icon done-button" />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
    import Task from "../../../server/src/models/Task";
    import {ActionTypes} from "@/store/actions";
    import {AppEvents} from "@/constants";

    @Component({
        components: {
            FontAwesomeIcon
        }
    })
    export default class AddNewTask extends Vue {

        readonly placeholder: string = "Add a new task";
        title: string = "";

        cancel(): void {
            this.title = "";
        }

        async done(): void {
            try {
                if (this.title.length  > 0) {
                    const task = new Task(this.title);
                    await this.$store.dispatch(ActionTypes.ADD_TASK, task);
                    this.$emit(AppEvents.TASK_ADDED);
                    this.title = "";
                }
            }
            catch (error) {
                console.warn(error);
            }
        }

    }
</script>

<style scoped lang="scss">
    .new-task-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        position: relative;
        margin-bottom: 1rem;
    }
    .input {
        flex-basis: 100%;
        padding: .8rem 3rem;
        font-size: .9rem;
        border: none;
        border-bottom: 1px solid $primary;
        transition: all .3s 0s ease-out;
        &::placeholder {
            transition: all .3s 0s ease-out;
        }
        &:focus {
            &::placeholder {
                color: initial;
            }
            outline: none;
            color: initial;
            border-color: $primary;
            background-color: lighten($foreground, 3%);
        }
    }
    .icons-wrapper {
        position: absolute;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .prepend-icons {
        @extend .icons-wrapper;
        .chevron {
            margin: 0 1rem;
        }
    }
    .append-icons {
        @extend .icons-wrapper;
        top: 0;
        right: 0;
        .icon {
            cursor: pointer;
            opacity: .8;
            font-size: 1.2rem;
            margin: 0 1rem;
            color: transparentize($black, .7);
            transition: all .3s 0s ease-out;
            &.done-button { color: $success; }
            &.cancel-button:hover { color: $danger; }
        }
    }
</style>
