import { collide, boundToCanvas } from "./collision.js";
import { applyPhysics } from "./physics.js";
import { Rectangle, rectangleList } from "./Rectangle.js";
import { push } from "./push.js";

export class Box extends Rectangle {
    constructor(pos, size, color, grav = 0.005, friction = 0) {
        super(pos, size, color);
        this.type = "Box";
        this.grav = grav;
        this.friction = friction;
        this.vel = [0, 0];
        this.acceleration = 0;
        this.onGround = false;
        this.ppos = [...pos];
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
