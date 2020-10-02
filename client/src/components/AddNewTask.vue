<template>
    <div class="new-task-wrapper">
        <transition name="fade" mode="out-in" class="transition-group">
            <div key="1" class="add-new-task" v-if="!taskAddedIndication">
                <input v-model="title" type="text" class="input" :placeholder="placeholder"
                       @keypress.enter="done" @keydown.esc="cancel">
                <div class="prepend-icons">
                    <FontAwesomeIcon icon="chevron-right" class="icon chevron" />
                </div>
                <div class="append-icons">
                    <FontAwesomeIcon @click="cancel" icon="times" class="icon cancel-button" />
                    <FontAwesomeIcon @click="done" icon="check" class="icon done-button" />
                </div>
            </div>
            <div key="2" class="task-added" v-if="taskAddedIndication">
                {{ taskAddedMessage }}
            </div>
        </transition>
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
        readonly taskAddedMessage: string = "done";
        readonly indicationDurationMs: number = 2500;
        title: string = "";
        taskAddedIndication: boolean = false;

        cancel(): void {
            this.title = "";
        }

        async done(): void {
            try {
                if (this.title.length  > 0) {
                    const task = new Task(this.title);
                    await this.$store.dispatch(ActionTypes.ADD_TASK, task);
                    this.$emit(AppEvents.TASK_ADDED);
                    this.showSuccessIndication();
                    this.title = "";
                }
            }
            catch (error) {
                console.warn(error);
            }
        }

        showSuccessIndication(): void {
            this.taskAddedIndication = true;
            setTimeout(() => {
                this.taskAddedIndication = false;
            }, this.indicationDurationMs);
        }

    }
</script>

<style scoped lang="scss">
    .new-task-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        position: relative;
        margin-bottom: 1.5rem;
    }
    .transition-group {
        all: inherit;
        margin: 0;
    }
    .add-new-task {
        all: inherit;
        margin: 0;
    }
    .task-added {
        all: inherit;
        margin: 0;
        display: flex;
        justify-content: center;
        color: $success;
        background-color: transparentize($success, .9);
        padding: .8rem 1rem;
        font-weight: bold;
        font-size: 1.3rem;
        text-transform: uppercase;
        letter-spacing: .2rem;
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
            color: $primary;
            animation: blink 1.5s .5s ease-out infinite;
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
