import { Rectangle } from "./Rectangle.js";

export class Goal extends Rectangle {
    constructor(options, type) {
        super(options, type || "Goal");
    }
}
