import Server from "./models/Server";
import TasksCollection from "./models/TasksCollection";

const mockTasks = require("./mockTasks.json");
const server: Server = new Server();

server.get("/health", (req: any, res: any) => {
    res.send("This is madness");
});

server.get("/tasks", (req: any, res: any) => {
    // todo: fetch tasks from DB and parse them into a TasksCollection
    const collection: TasksCollection = new TasksCollection(mockTasks);
    res.send(collection.getAll());
});
