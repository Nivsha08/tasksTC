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

    constructor(task: ITask) {
        this.id = IDGenerator.generate();
        this.title = task.title;
        this.completed = task.completed;
    }

    clone(): Task {
        return _.cloneDeep(this);
    }

}
