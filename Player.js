import { Box } from "./Box.js";
import { addControl } from "./control.js";

export class Player extends Box {
    constructor(options) {
        super({
            pos: options.pos,
            size: options.size,
            color: "red",
            grav: 0.004,
            friction: 0.2,
        });
        this.type = "Player";
        this.walkSpeed = 0.012;
        this.jumpSpeed = 1.45;
        addControl(this);
    }
}
