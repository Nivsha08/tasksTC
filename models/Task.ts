import IDGenerator from "../server/src/utils/IDGenerator";
const _ = require("lodash");

export interface ITask {
    id: string;
    title: string;
    completed: boolean;
    priority: TaskPriority;
}

export enum TaskPriority {
    LOW = "low",
    REGULAR = "regular",
    HIGH = "high",
    URGENT = "urgent"
}

export default class Task implements ITask {

    readonly id: string;
    title: string;
    completed: boolean;
    priority: TaskPriority;

    constructor(title: string) {
        this.id = IDGenerator.generate();
        this.title = title;
        this.completed = false;
        this.priority = TaskPriority.REGULAR;
    }

    static parse(task: ITask) {
        return {
            id: task.id,
            title: task.title,
            completed: task.completed,
            priority: task.priority
        }
    }

    clone(): Task {
        return _.cloneDeep(this);
    }

}
