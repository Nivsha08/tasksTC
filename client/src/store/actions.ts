import {MutationTypes} from "@/store/mutations";
import {ActionContext} from "vuex";
import {State} from "@/store/state";

export enum ActionTypes {
    FETCH_TASKS = "FETCH_TASKS"
}

type Context = ActionContext<State, State>;
type Action = (context: Context, payload?: any) => Promise<void>;
type Actions = { [name: string]: Action }

export const actions: Actions = {
    async [ActionTypes.FETCH_TASKS](context: Context): Promise<void> {
        const tasks = await [];
        context.commit(MutationTypes.SET_TASKS, tasks);
    }
};
