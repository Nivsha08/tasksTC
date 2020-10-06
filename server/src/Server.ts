const express = require("express");
const cors = require("cors");
import {Application} from "express-serve-static-core";

export enum HttpMethods {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete"
}
type Callback = (res: any, req: any) => any;

export default class Server {

    private readonly PORT = 3000;
    private readonly server: Application;

    constructor() {
        this.server = this.initServer();
        this.server.use(cors());
        this.server.use(express.json());
        this.listen(this.PORT);
    };

    private initServer(): Application {
        return express();
    };

    private listen(port: number): void {
        if (this.server) {
            this.server.listen(port, () => {
                console.log(`Server started at http://localhost:${port}`);
            });
        }
    }

    route(method: HttpMethods, path: string, callback: Callback): any {
        this.server[method](path, callback);
    }

}
