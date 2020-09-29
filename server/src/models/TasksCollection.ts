import Task, {ITask} from "./Task";

export default class TasksCollection {

    private readonly items: ITask[];

    constructor(tasks?: ITask[]) {
        this.items = tasks ? tasks : [];
    }

    addAll(tasks: ITask[]): void {
        tasks.forEach(this.add);
    }

    add(task: ITask): void {
        this.items.push(task);
    }

    getAll(): ITask[] {
        return this.items.map((t: ITask) => new Task(t));
    }

    getCompleted(): ITask[] {
        return this.items.filter(task => task.completed);
    }

    getPending(): ITask[] {
        return this.items.filter(task => !task.completed);
    }

}
