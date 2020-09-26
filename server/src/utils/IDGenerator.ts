import { v4 } from "uuid";

export default class IDGenerator {

    static generate(): string {
        return v4();
    }

}
