import {State} from "@/store/state";
import Task from "../../../server/src/models/Task";

export enum GetterTypes {
    GET_TASKS = "GET_TASKS"
}

type Getter = (state: State) => any;
type Getters = { [name: string]: Getter; };

export const getters: Getters = {
    [GetterTypes.GET_TASKS](state: State): Task[] {
        return state.tasks;
    }
};
