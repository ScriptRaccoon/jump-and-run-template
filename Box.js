import { ctx } from "./canvas.js";
import { collide, boundToCanvas } from "./collision.js";
import { applyPhysics } from "./physics.js";
import { rectangleList } from "./Rectangle.js";

export const boxList = [];

export class Box {
    constructor(pos, size, color, grav, friction) {
        this.pos = pos;
        this.size = size;
        this.color = color;
        this.grav = grav;
        this.friction = friction;
        this.vel = [0, 0];
        this.acceleration = 0;
        this.onGround = false;
        this.ppos;
        boxList.push(this);
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(...this.pos, ...this.size);
    }

    update(deltaTime) {
        this.ppos = [...this.pos];
        applyPhysics(this, deltaTime);
        rectangleList.forEach((rect) => {
            collide.left(this, rect);
            collide.right(this, rect);
            collide.above(this, rect);
            collide.below(this, rect);
        });
        boundToCanvas(this);
    }
}
