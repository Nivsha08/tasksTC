import Axios, {AxiosResponse} from "axios";
import {MutationTypes} from "@/store/mutations";
import {ActionContext} from "vuex";
import {State} from "@/store/state";
import TasksCollection from "../../../models/TasksCollection";
import Task, {ITask} from "../../../models/Task";

const serverConfig = require( "@/../serverconfig.json");

export enum ActionTypes {
    FETCH_TASKS = "FETCH_TASKS",
    ADD_TASK = "ADD_TASK",
    UPDATE_TASK = "UPDATE_TASK",
    DELETE_TASK = "DELETE_TASK",
    DELETE_COMPLETED_TASKS = "DELETE_COMPLETED_TASKS"
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
    async [ActionTypes.ADD_TASK](context: Context, task: Task): Promise<void> {
        await Axios.post(`${serverConfig.url}/tasks`, task);
    },
    async [ActionTypes.UPDATE_TASK](context: Context, updatedTask: ITask): Promise<void> {
        await Axios.put(`${serverConfig.url}/tasks/${updatedTask.id}`, updatedTask);
    },
    async [ActionTypes.DELETE_TASK](context: Context, taskID: string): Promise<void> {
        await Axios.delete(`${serverConfig.url}/tasks/${taskID}`);
    },
    async [ActionTypes.DELETE_COMPLETED_TASKS](context: Context): Promise<void> {
        await Axios.delete(`${serverConfig.url}/tasks`);
    }
};
