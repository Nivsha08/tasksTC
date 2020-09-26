import Axios from "axios";
import Task from "../../../server/src/models/Task";

const SERVER_URL: string = "http://localhost:3000";

export const fetch = async (id?: string): Promise<Task | Task[]> => {
    let response;
    if (id) {
        response = await Axios.get(`${SERVER_URL}/tasks/${id}`);
        return [response.data];
    }
    else {
        response = await Axios.get(`${SERVER_URL}/tasks`);
        return response.data;
    }
};
