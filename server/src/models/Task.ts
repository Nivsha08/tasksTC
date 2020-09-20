import IDGenerator from "../utils/IDGenerator";

export default class Task {

    private id: string;
    private title: string;
    private isDone: boolean;

    constructor(id: string, title: string, isDone: boolean) {
        this.id = IDGenerator.generate();
        this.title = title;
        this.isDone = isDone;
    }
}
