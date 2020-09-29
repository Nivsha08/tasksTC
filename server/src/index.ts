import Server from "./models/Server";
import TasksCollection from "./models/TasksCollection";
import {config as dbConfig} from "./database/dbconfig";
import Task, {ITask} from "./models/Task";

const server: Server = new Server();
server.connectToDatabase(dbConfig);

server.get("/health", async (req: any, res: any): Promise<void> => {
    res.send("This is madness");
});

server.get("/tasks", async (req: any, res: any): Promise<void> => {
    const tasks: Task[] = await server.fetchTasks();
    const collection: TasksCollection = new TasksCollection(tasks);
    res.send(collection.getAll());
});
