import IDGenerator from "../utils/IDGenerator";

export default class Task {

    private _id: string;
    private _title: string;
    private _isDone: boolean;

    constructor(id: string, title: string, isDone: boolean) {
        this._id = IDGenerator.generate();
        this._title = title;
        this._isDone = isDone;
    }

    get id(): string { return this._id; }
    get title(): string { return this._title; }
    get isDone(): boolean { return this._isDone; }
}
