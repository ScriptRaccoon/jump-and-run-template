import { Box } from "./Box.js";
import { addControl } from "./control.js";

export class Player extends Box {
    constructor(pos, size) {
        super(pos, size, "red", 0.004, 0.2);
        this.type = "Player";
        this.walkSpeed = 0.012;
        this.jumpSpeed = 1.45;
        addControl(this);
    }
}
