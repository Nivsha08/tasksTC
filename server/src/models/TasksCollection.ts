import Task from "./Task";

export default class TasksCollection {

    private items: Task[] = [];

    add(task: Task): void {
        this.items.push(task);
    }

    getAll(): Task[] {
        return this.items;
    }

}
