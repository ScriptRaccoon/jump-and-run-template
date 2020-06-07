import { collide, boundToCanvas } from "./collision.js";
import { applyPhysics } from "./physics.js";
import { Rectangle, rectangleList } from "./Rectangle.js";

export class Box extends Rectangle {
    constructor(pos, size, color, grav, friction) {
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
            if (rect.type === "Rectangle" || rect.type === "Box") {
                collide.left(this, rect);
                collide.right(this, rect);
                collide.above(this, rect);
                collide.below(this, rect);
            }
        });
        boundToCanvas(this);
    }
}
