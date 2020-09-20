import Server from "./models/Server";
import TasksCollection from "./models/TasksCollection";
import Task from "./models/Task";

const server: Server = new Server();

server.get("/health", (req: any, res: any) => {
    res.send("This is madness");
});

server.get("/tasks", (req: any, res: any) => {
    // todo: fetch tasks from DB and parse them into a TasksCollection
    const collection: TasksCollection = new TasksCollection();
    collection.add(new Task("id1", "task title!", false));
    res.send(JSON.stringify(collection.getAll()));
});
