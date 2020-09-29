import {State} from "@/store/state";
import Task from "../../../server/src/models/Task";

export enum MutationTypes {
    SET_TASKS = "SET_TASKS"
}

type Mutation = (state: State, payload: any) => void;
type Mutations = { [name: string]: Mutation; }

export const mutations: Mutations = {
    [MutationTypes.SET_TASKS](state: State, payload: Task[]) {
        state.tasks = payload;
    }
};
