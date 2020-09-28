export type DBConfig = {
	"url": string;
	"name": string;
	"username": string;
	"password": string;
	"collectionName": string;
};

export const config: DBConfig = {
	url: "mongodb+srv://tasks-admin:7PdXoWJiEfiKkpv9@taskstc-db.othh8.mongodb.net",
	name: "tasksTC-DB",
	username: "tasks-admin",
	password: "7PdXoWJiEfiKkpv9",
	collectionName: "tasks"
};


