<template>
    <div class="new-task-wrapper">
        <transition name="fade" mode="out-in" class="transition-group">
            <div key="1" class="add-new-task" v-if="!taskAddedIndication">
                <div class="prepend-icons">
                    <FontAwesomeIcon icon="chevron-right" class="icon chevron" />
                </div>
                <input v-model="title" type="text" class="input" :placeholder="placeholder"
                       :maxlength="titleMaxLength" @keypress.enter="done" @keydown.esc="cancel">
                <div class="length-limit">{{ lengthLimitIndication }}</div>
                <div class="append-icons">
                    <ClickableIcon @click="cancel" icon="times" class="icon cancel-button" />
                    <ClickableIcon @click="done" icon="check" class="icon done-button" />
                </div>
            </div>
            <div key="2" class="task-added" v-else>
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
    import {AppEvents, TASK_TITLE_MAX_LENGTH} from "@/constants";
    import ClickableIcon from "@/components/ClickableIcon.vue";

    @Component({
        components: {
            ClickableIcon,
            FontAwesomeIcon
        }
    })
    export default class AddNewTask extends Vue {

        readonly placeholder: string = "Add a new task";
        readonly taskAddedMessage: string = "done";
        readonly indicationDurationMs: number = 2500;
        readonly titleMaxLength = TASK_TITLE_MAX_LENGTH;
        title: string = "";
        taskAddedIndication: boolean = false;
        inProgress: boolean = false;

        get lengthLimitIndication(): string {
            return `${this.title.length} / ${this.titleMaxLength}`;
        }

        cancel(): void {
            this.title = "";
        }

        async done(): void {
            if (this.inProgress || this.title.length === 0) return;
            this.inProgress = true;
            const task = new Task(this.title);
            this.title = "";
            try {
                await this.$store.dispatch(ActionTypes.ADD_TASK, task);
                this.$emit(AppEvents.TASK_ADDED);
                this.showSuccessIndication();
            }
            catch (error) {
                console.warn(error);
            }
            finally {
                this.inProgress = false;
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
        @extend .transitionable;
        flex-basis: 100%;
        padding: .8rem 1.5rem;
        font-size: .9rem;
        border: none;
        border-bottom: 1px solid $primary;
        &::placeholder {
            @extend .transitionable;
        }
        &:focus {
            &::placeholder {
                color: initial;
            }
            outline: none;
            color: initial;
        }
    }
    .length-limit {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        width: 70px;
        font-size: .7rem;
        color: transparentize($darkprimary, .5);
    }
    .icons-wrapper {
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
            @extend .transitionable;
            cursor: pointer;
            opacity: .8;
            font-size: 1.2rem;
            margin: 0 1rem;
            color: transparentize($black, .7);
            &.done-button { color: $success; }
            &.cancel-button:hover { color: $danger; }
        }
    }
</style>
