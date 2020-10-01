import Server from "./models/Server";
import TasksCollection from "./models/TasksCollection";
import {config as dbConfig} from "./database/dbconfig";
import Task from "./models/Task";
import TasksService from "./services/TasksService";

const server: Server = new Server();
const tasksService: TasksService = new TasksService();

tasksService.initDBConnection(dbConfig);

server.get("/health", async (req: any, res: any): Promise<void> => {
    res.send("This is madness");
});

server.get("/tasks", async (req: any, res: any): Promise<void> => {
    const tasks: Task[] = await tasksService.fetchTasks();
    const collection: TasksCollection = new TasksCollection(tasks);
    res.send(collection.getAll());
});

server.put("/tasks/:id", async (req: any, res: any): Promise<void> => {
    try {
        const updatedTask = req.body;
        await tasksService.updateTask(updatedTask);
        res.send({ success: true });
    }
    catch (error) {
        res.send({ success: false, error });
    }
});
