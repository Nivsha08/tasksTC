import {State} from "@/store/state";
import TasksCollection from "../../../server/src/models/TasksCollection";

export enum GetterTypes {
    GET_TASKS = "GET_TASKS"
}

type Getter = (state: State) => any;
type Getters = { [name: string]: Getter; };

export const getters: Getters = {
    [GetterTypes.GET_TASKS](state: State): TasksCollection | null {
        return state.tasks;
    }
};
