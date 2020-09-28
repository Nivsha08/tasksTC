import DBClient from "../database/DBClient";

const express = require("express");
const cors = require("cors");
import {Application} from "express-serve-static-core";
import {config as dbConfig, DBConfig} from "../database/dbconfig";

type Callback = (res: any, req: any) => any;

export default class Server {

    private readonly PORT = 3000;
    private readonly server: Application;
    private dbClient: DBClient | null;

    constructor() {
        this.dbClient = null;
        this.server = this.initServer();
        this.server.use(cors());
        this.listen(this.PORT);
        // this.dbClient.insertOne(dbConfig.collectionName, {
        //     "hello": "world!"
        // });
        // setTimeout(() => {
        //     console.log("db client", this.dbClient);
        // }, 5000);
    };

    private initServer(): Application {
        return express();
    };

    async connectToDatabase(dbConfig: DBConfig): Promise<void> {
        this.dbClient = new DBClient();
        try {
            await this.dbClient.initConnection(dbConfig);
            console.log("Database Connection created successfully.");
        }
        catch (error) {
            console.log("Database connection failed.");
        }
        await this.dbClient.insertOne();
    }

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
