import Axios, {AxiosResponse} from "axios";
import {MutationTypes} from "@/store/mutations";
import {ActionContext} from "vuex";
import {State} from "@/store/state";
import TasksCollection from "../../../server/src/models/TasksCollection";
import {ITask} from "../../../server/src/models/Task";

const serverConfig = require( "@/../serverconfig.json");

export enum ActionTypes {
    FETCH_TASKS = "FETCH_TASKS",
    UPDATE_TASK = "UPDATE_TASK"
}

type Context = ActionContext<State, State>;
type Action = (context: Context, payload?: any) => Promise<void>;
type Actions = { [name: string]: Action }

export const actions: Actions = {
    async [ActionTypes.FETCH_TASKS](context: Context): Promise<void> {
        const response: AxiosResponse = await Axios.get(`${serverConfig.url}/tasks`);
        const collection: TasksCollection = new TasksCollection(<ITask[]>response.data);
        context.commit(MutationTypes.SET_TASKS, collection);
    },
    async [ActionTypes.UPDATE_TASK](context: Context, updatedTask: ITask): Promise<void> {
        const response: AxiosResponse =
            await Axios.put(`${serverConfig.url}/tasks/${updatedTask.id}`, updatedTask);
    }
};
