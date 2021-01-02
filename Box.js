import { Rectangle, rectangleList } from "./Rectangle.js";
import { canvDim } from "./canvas.js";

export class Box extends Rectangle {
    constructor(options) {
        const { pos, size, color, grav, friction } = options;
        super({ pos, size, color });
        this.type = "Box";
        this.grav = grav || 0.005;
        this.friction = friction || 0;
        this.vel = [0, 0];
        this.acc = 0;
        this.onGround = false;
        this.ppos = [...pos];
    }

    applyPhysics(deltaTime) {
        this.vel[0] += this.acc * deltaTime;
        this.vel[0] *= 1 - this.friction;
        this.vel[1] += this.grav * deltaTime;
        this.pos[1] += this.vel[1] * deltaTime;
        this.pos[0] += this.vel[0] * deltaTime;
        this.onGround = false;
    }

    update(deltaTime) {
        this.ppos = [...this.pos];
        this.applyPhysics(deltaTime);

        rectangleList.forEach((rect) => {
            this.collideWith(rect).fromAbove();
            this.collideWith(rect).fromBelow();
        });

        rectangleList
            .filter((rect) => rect.type === "Rectangle")
            .forEach((rect) => {
                this.collideWith(rect).fromLeft();
                this.collideWith(rect).fromRight();
            });

        rectangleList
            .filter((rect) => rect.type === "Box")
            .forEach((box) => {
                this.push(box).toLeft();
                this.push(box).toRight();
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

    collideWith(rect) {
        return {
            fromLeft: () => {
                if (this === rect) return false;
                if (
                    this.ppos[0] + this.size[0] <= rect.pos[0] &&
                    this.pos[0] + this.size[0] >= rect.pos[0] &&
                    this.pos[1] + this.size[1] > rect.pos[1] &&
                    this.pos[1] < rect.pos[1] + rect.size[1]
                ) {
                    this.pos[0] = rect.pos[0] - this.size[0];
                    return true;
                }
                return false;
            },
            fromRight: () => {
                if (this === rect) return false;

                if (
                    this.ppos[0] >= rect.pos[0] + rect.size[0] &&
                    this.pos[0] <= rect.pos[0] + rect.size[0] &&
                    this.pos[1] + this.size[1] > rect.pos[1] &&
                    this.pos[1] < rect.pos[1] + rect.size[1]
                ) {
                    this.pos[0] = rect.pos[0] + rect.size[0];
                    return true;
                }
                return false;
            },
            fromAbove: () => {
                if (this === rect) return false;
                if (
                    this.ppos[1] + this.size[1] <= rect.pos[1] &&
                    this.pos[1] + this.size[1] >= rect.pos[1] &&
                    this.pos[0] + this.size[0] > rect.pos[0] &&
                    this.pos[0] < rect.pos[0] + rect.size[0]
                ) {
                    this.pos[1] = rect.pos[1] - this.size[1];
                    this.vel[1] = 0;
                    this.onGround = true;
                    return true;
                }
                return false;
            },
            fromBelow: () => {
                if (this === rect) return false;
                if (
                    this.ppos[1] >= rect.pos[1] + rect.size[1] &&
                    this.pos[1] <= rect.pos[1] + rect.size[1] &&
                    this.pos[0] + this.size[0] > rect.pos[0] &&
                    this.pos[0] < rect.pos[0] + rect.size[0]
                ) {
                    this.pos[1] = rect.pos[1] + rect.size[1];
                    this.vel[1] = 0;
                    return true;
                }
                return false;
            },
        };
    }

    doesCollideWith(rect) {
        return {
            fromLeft: (distance) => {
                return (
                    this.pos[0] + this.size[0] + distance >= rect.pos[0] &&
                    this.pos[1] + this.size[1] > rect.pos[1] &&
                    this.pos[1] < rect.pos[1] + rect.size[1]
                );
            },
            fromRight: (distance) => {
                return (
                    this.pos[0] - distance <= rect.pos[0] + rect.size[0] &&
                    this.pos[1] + this.size[1] > rect.pos[1] &&
                    this.pos[1] < rect.pos[1] + rect.size[1]
                );
            },
        };
    }

    canBePushedToLeft(distance) {
        return !rectangleList.some(
            (rect) =>
                rect.type == "Rectangle" && this.doesCollideWith(rect).fromRight(distance)
        );
    }

    canBePushedToRight(distance) {
        return true; // only works like that currently (?)
        return !rectangleList.some(
            (rect) =>
                rect.type == "Rectangle" && this.doesCollideWith(rect).fromLeft(distance)
        );
    }

    push(box) {
        return {
            toLeft: () => {
                if (this === box) return;
                if (
                    this.ppos[0] >= box.ppos[0] + box.size[0] &&
                    this.pos[0] <= box.pos[0] + box.size[0] &&
                    this.pos[1] + this.size[1] > box.pos[1] &&
                    this.pos[1] < box.pos[1] + box.size[1]
                ) {
                    const distance = box.pos[0] + box.size[0] - this.pos[0];
                    if (box.canBePushedToLeft(distance)) {
                        console.log("push to left!");
                        box.pos[0] = this.pos[0] - box.size[0];
                    }
                }
            },
            toRight: () => {
                if (this === box) return;
                if (
                    this.ppos[0] + this.size[0] <= box.ppos[0] &&
                    this.pos[0] + this.size[0] >= box.pos[0] &&
                    this.pos[1] + this.size[1] > box.pos[1] &&
                    this.pos[1] < box.pos[1] + box.size[1]
                ) {
                    const distance = this.pos[0] + this.size[0] - box.pos[0];
                    if (this.canBePushedToRight(distance)) {
                        console.log("push right!");
                        box.pos[0] = this.pos[0] + this.size[0];
                    }
                }
            },
        };
    }
}
