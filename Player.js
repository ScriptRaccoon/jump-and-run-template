import { Rectangle, rectangleList } from "./Rectangle.js";
import { collide } from "./collision.js";
import { applyPhysics } from "./physics.js";

import { canvDim } from "./canvas.js";

export class Player extends Rectangle {
    constructor() {
        super([100, 100], [60, 60], "red");
        this.vel = [0, 0];
        this.grav = 0.006;
        this.walkSpeed = 0.012;
        this.jumpSpeed = 1.8;
        this.acceleration = 0;
        this.onGround = false;
        this.ppos;
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
        this.boundToCanvas();
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
                    this.acceleration = this.walkSpeed;
                    break;
                case "ArrowLeft":
                    this.acceleration = -this.walkSpeed;
                    break;
                case "ArrowUp":
                    if (this.onGround) {
                        this.onGround = false;
                        this.vel[1] = -this.jumpSpeed;
                    }
                    break;
            }
        });

        document.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "ArrowRight":
                    this.acceleration = 0;
                    break;
                case "ArrowLeft":
                    this.acceleration = 0;
                    break;
            }
        });
    }
}
