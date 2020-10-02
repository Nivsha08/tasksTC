import {DBConfig} from "../database/dbconfig";
import Task, {ITask} from "../models/Task";
import {Task as TaskModel} from "../database/models";

const mongoose = require("mongoose");

export default class TasksService {

    private readonly clientOptions = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };

    async initDBConnection(dbConfig: DBConfig): Promise<void> {
        try {
            await mongoose.connect(dbConfig.url, this.clientOptions);
            console.log("Database Connection created successfully.");
        }
        catch (error) {
            console.log("Database connection failed.");
            console.warn(error);
        }
    }

    async fetchTasks(queryOptions?: object): Promise<Task[]> {
        const tasks = await TaskModel.find(queryOptions);
        return tasks.map((t: ITask) => Task.parse(t));
    }

    async addTask(task: ITask): Promise<void> {
        const model = new TaskModel(task);
        await model.save();
    }

    async updateTask(taskID: string, updatedTask: Task): Promise<void> {
        await TaskModel.updateOne({ id: taskID }, updatedTask);
    }

    async deleteTask(taskID: string): Promise<void> {
        await TaskModel.deleteOne({ id: taskID });
    }

    async deleteCompletedTasks(): Promise<void> {
        await TaskModel.deleteMany({ completed: true });
    }

}
