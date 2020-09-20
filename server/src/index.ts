import Server from "./models/Server";

const server: Server = new Server();

server.get("/", (req: any, res: any) => {
    res.send("hello world!!???!");
});
