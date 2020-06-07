import { Box } from "./Box.js";
import { collide, boundToCanvas } from "./collision.js";
import { applyPhysics } from "./physics.js";
import { addControl } from "./control.js";
import { rectangleList } from "./Rectangle.js";
import { push } from "./push.js";

export class Player extends Box {
    constructor() {
        super([100, 100], [40, 40], "red", 0.006, 0.2);
        this.type = "Player";
        this.walkSpeed = 0.015;
        this.jumpSpeed = 1.8;
        addControl(this);
    }

    update(deltaTime) {
        this.ppos = [...this.pos];
        applyPhysics(this, deltaTime);
        rectangleList.forEach((rect) => {
            collide.above(this, rect);
            collide.below(this, rect);
            if (rect.type === "Rectangle") {
                collide.left(this, rect);
                collide.right(this, rect);
            } else if (rect.type === "Box") {
                push.left(this, rect);
                push.right(this, rect);
            }
        });
        boundToCanvas(this);
    }
}
