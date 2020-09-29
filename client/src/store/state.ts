import Task from "../../../server/src/models/Task";

export type State = {
    tasks: Task[]
};

export const state: State = {
    tasks: []
};

