import Task from "./Task";

export default class TasksCollection {

    private readonly items: Task[];

    constructor(tasks?: Task[]) {
        this.items = tasks ? tasks : [];
    }

    addAll(tasks: Task[]): void {
        tasks.forEach(this.add);
    }

    add(task: Task): void {
        this.items.push(task);
    }

    getAll(): Task[] {
        return this.items;
    }

    getCompleted(): Task[] {
        return this.items.filter(task => task.completed);
    }

    getPending(): Task[] {
        return this.items.filter(task => !task.completed);
    }

}
