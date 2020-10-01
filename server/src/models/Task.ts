import IDGenerator from "../utils/IDGenerator";
const _ = require("lodash");

export interface ITask {
    id: string;
    title: string;
    completed: boolean;
}

export default class Task implements ITask {

    readonly id: string;
    title: string;
    completed: boolean;

    constructor(title: string) {
        this.id = IDGenerator.generate();
        this.title = title;
        this.completed = false;
    }

    static parse(task: ITask) {
        return {
            id: task.id,
            title: task.title,
            completed: task.completed
        }
    }

    clone(): Task {
        return _.cloneDeep(this);
    }

}
