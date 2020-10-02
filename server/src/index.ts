import Server, {HttpMethods} from "./models/Server";
import TasksCollection from "./models/TasksCollection";
import {config as dbConfig} from "./database/dbconfig";
import Task from "./models/Task";
import TasksService from "./services/TasksService";

const server: Server = new Server();
const tasksService: TasksService = new TasksService();

tasksService.initDBConnection(dbConfig);

server.route(HttpMethods.GET, "/health", async (req: any, res: any): Promise<void> => {
    res.send("This is madness");
});

server.route(HttpMethods.GET, "/tasks", async (req: any, res: any): Promise<void> => {
    const tasks: Task[] = await tasksService.fetchTasks();
    const collection: TasksCollection = new TasksCollection(tasks);
    res.send(collection.getAll());
});

server.route(HttpMethods.POST, "/tasks", async (req: any, res: any): Promise<void> => {
    try {
        await tasksService.addTask(req.body);
        res.send({ success: true });
    }
    catch (error) {
        res.send({ success: false, error });
    }
});

server.route(HttpMethods.DELETE, "/tasks", async (req: any, res: any): Promise<void> => {
    try {
        await tasksService.deleteCompletedTasks();
        res.send({ success: true });
    }
    catch (error) {
        res.send({ success: false, error });
    }
});

server.route(HttpMethods.DELETE, "/tasks/:id", async (req: any, res: any): Promise<void> => {
    try {
        await tasksService.deleteTask(req.params.id);
        res.send({ success: true });
    }
    catch (error) {
        res.send({ success: false, error });
    }
});

server.route(HttpMethods.PUT, "/tasks/:id", async (req: any, res: any): Promise<void> => {
    try {
        const updatedTask = req.body;
        await tasksService.updateTask(req.params.id, updatedTask);
        res.send({ success: true });
    }
    catch (error) {
        res.send({ success: false, error });
    }
});
