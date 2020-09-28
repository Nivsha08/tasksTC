import DBClient from "../database/DBClient";

const express = require("express");
const cors = require("cors");
import {Application} from "express-serve-static-core";
import {config as dbConfig} from "../database/dbconfig";

type Callback = (res: any, req: any) => any;

export default class Server {

    private readonly PORT = 3000;
    private readonly server: Application;
    private readonly dbClient: DBClient;

    constructor() {
        this.server = this.initServer();
        this.server.use(cors());
        this.listen(this.PORT);
        this.dbClient = new DBClient(dbConfig);
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

    get(path: string, callback: Callback): any {
        this.server.get(path, callback);
    }

}
