import {connect, Db, MongoClient} from "mongodb";
import {DBConfig} from "./dbconfig";

export default class DBClient {

    private readonly clientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
    private client: MongoClient | null;
    private db: Db | null;

    constructor(dbConfig: DBConfig) {
        this.client = null;
        this.db = null;
        this.initConnection(dbConfig);
    }

    private initConnection(dbConfig: DBConfig): void {
        connect(dbConfig.url, this.clientOptions, (error, client) => {
            if (error) {
                console.log("Database connection error:", error);
            }
            else if (client) {
                console.log("Database Connection created successfully.");
                this.client = client;
                this.initDatabaseConnection(this.client, dbConfig);
            }
        });
    }

    private initDatabaseConnection(client: MongoClient, dbConfig: DBConfig): void {
        this.db = client.db(dbConfig.name);
        this.db.collection(dbConfig.collectionName);
    }
}
