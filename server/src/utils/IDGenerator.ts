import { uuid } from "uuidv4";

export default class IDGenerator {

    static generate(): string {
        return uuid();
    }

}
