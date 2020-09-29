import {Db, MongoClient} from "mongodb";
import {DBConfig} from "./dbconfig";
import {Mongoose} from "mongoose";
import {Task} from "./models";

const mongoose = require("mongoose");

export default class DBClient {

    private readonly clientOptions = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };
    private client: Mongoose | null;
    private db: Db | null;

    constructor() {
        this.client = null;
        this.db = null;
    }

    async initConnection(dbConfig: DBConfig): Promise<Mongoose> {
        return await mongoose.connect(dbConfig.url, this.clientOptions);
    }

}
