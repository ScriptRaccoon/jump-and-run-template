import { Rectangle, rectangleList } from "./Rectangle.js";
import { collide } from "./collision.js";

import { canvDim } from "./draw.js";

export class Player extends Rectangle {
    constructor() {
        super([100, 100], [60, 60], "red");
        this.vel = [0, 0];
        this.grav = 0.006;
        this.walkSpeed = 0.012;
        this.jumpSpeed = 1.8;
        this.acc = 0;
        this.onGround = false;
        this.ppos;
    }

    update(deltaTime) {
        this.ppos = [...this.pos];
        this.vel[0] += this.acc * deltaTime;
        this.vel[0] *= 0.8;
        this.pos[0] += this.vel[0] * deltaTime;
        this.vel[1] += this.grav * deltaTime;
        this.pos[1] += this.vel[1] * deltaTime;
        this.ignoreSmallVelocities();
        this.onGround = false;
        rectangleList.forEach((rect) => {
            collide.left(this, rect);
            collide.right(this, rect);
            collide.above(this, rect);
            collide.below(this, rect);
        });
        this.boundToCanvas();
    }

    ignoreSmallVelocities() {
        for (const i of [0, 1]) {
            if (Math.abs(this.vel[i]) < 0.01) this.vel[i] = 0;
        }
    }

    boundToCanvas() {
        if (this.pos[1] + this.size[1] >= canvDim[1]) {
            this.vel[1] = 0;
            this.pos[1] = canvDim[1] - this.size[1];
            this.onGround = true;
        }
        if (this.pos[0] <= 0) {
            this.pos[0] = 0;
            this.vel[0] = 0;
        } else if (this.pos[0] + this.size[0] >= canvDim[0]) {
            this.pos[0] = canvDim[0] - this.size[0];
            this.vel[0] = 0;
        }
    }

    addControl() {
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowRight":
                    this.acc = this.walkSpeed;
                    break;
                case "ArrowLeft":
                    this.acc = -this.walkSpeed;
                    break;
                case "ArrowUp":
                    if (this.onGround) {
                        this.vel[1] = -this.jumpSpeed;
                        this.onGround = false;
                        break;
                    }
            }
        });

        document.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "ArrowRight":
                case "ArrowLeft":
                    this.acc = 0;
                    break;
            }
        });
    }
}
