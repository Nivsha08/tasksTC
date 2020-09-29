import IDGenerator from "../utils/IDGenerator";

export interface ITask {
    id: string;
    title: string;
    completed: boolean;
}

export default class Task implements ITask {

    id: string;
    title: string;
    completed: boolean;

    constructor(task: ITask) {
        this.id = IDGenerator.generate();
        this.title = task.title;
        this.completed = task.completed;
    }

}
