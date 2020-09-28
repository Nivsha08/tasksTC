import {Db, MongoClient} from "mongodb";
import {DBConfig} from "./dbconfig";
import {Mongoose} from "mongoose";

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

    private initDatabaseConnection(client: MongoClient, dbConfig: DBConfig): void {
        this.db = client.db(dbConfig.name);
    }

    async insertOne(object?: any): Promise<void> {
        const Task = mongoose.model("Task", {
            title: { type: String },
            isDone: { type: Boolean }
        });
        const newTask = new Task({ title: "hello world!", isDone: false });
        await newTask.save();
    }
}
