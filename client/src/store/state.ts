import TasksCollection from "../../../server/src/models/TasksCollection";

export type State = {
    tasks: TasksCollection | null
};

export const state: State = {
    tasks: null
};

