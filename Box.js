import { Rectangle } from "./Rectangle.js";
import { canvDim } from "./canvas.js";
import { objects, objectsOfType } from "./objects.js";

export class Box extends Rectangle {
    constructor(options, type) {
        const { pos, size, color, grav, friction, vel } = options;
        super({ pos, size, color }, type || "Box");
        this.grav = grav || 0.005;
        this.friction = friction || 0;
        this.vel = vel ? vel : [0, 0];
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

        objects.forEach((obj) => {
            this.collideWith(obj).fromAbove();
            this.collideWith(obj).fromBelow();
            this.collideWith(obj).fromLeft();
            this.collideWith(obj).fromRight();
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

    collideWith(obj) {
        return {
            fromLeft: () => {
                if (this === obj) return;
                if (
                    this.ppos[0] + this.size[0] <= obj.pos[0] &&
                    this.pos[0] + this.size[0] >= obj.pos[0] &&
                    this.pos[1] + this.size[1] > obj.pos[1] &&
                    this.pos[1] < obj.pos[1] + obj.size[1]
                ) {
                    this.pos[0] = obj.pos[0] - this.size[0];
                }
            },
            fromRight: () => {
                // WORK IN PROGRESS
                if (this === obj) return;
                if (
                    this.ppos[0] >= obj.pos[0] + obj.size[0] &&
                    this.pos[0] <= obj.pos[0] + obj.size[0] &&
                    this.pos[1] + this.size[1] > obj.pos[1] &&
                    this.pos[1] < obj.pos[1] + obj.size[1]
                ) {
                    console.log("collision from right from", this.color, "on", obj.color);
                    if (obj.type === "Rectangle") {
                        this.pos[0] = obj.pos[0] + obj.size[0];
                        this.vel[0] = 0;
                        return;
                    }

                    console.log("try to push", obj.type, obj.color);

                    const distance = obj.pos[0] + obj.size[0] - this.pos[0];

                    const canPush = this.canBePushedToLeft(distance);

                    console.log(canPush);

                    if (canPush) {
                        obj.pos[0] = this.pos[0] - obj.size[0];
                        obj.vel[0] = this.vel[0];
                    } else {
                        this.pos[0] = obj.pos[0] + obj.size[0];
                        this.vel[0] = 0;
                    }
                }
            },
            fromAbove: () => {
                if (this === obj) return;
                if (
                    this.ppos[1] + this.size[1] <= obj.pos[1] &&
                    this.pos[1] + this.size[1] >= obj.pos[1] &&
                    this.pos[0] + this.size[0] > obj.pos[0] &&
                    this.pos[0] < obj.pos[0] + obj.size[0]
                ) {
                    this.pos[1] = obj.pos[1] - this.size[1];
                    this.vel[1] = 0;
                    this.onGround = true;
                }
            },
            fromBelow: () => {
                if (this === obj) return;
                if (
                    this.ppos[1] >= obj.pos[1] + obj.size[1] &&
                    this.pos[1] <= obj.pos[1] + obj.size[1] &&
                    this.pos[0] + this.size[0] > obj.pos[0] &&
                    this.pos[0] < obj.pos[0] + obj.size[0]
                ) {
                    this.pos[1] = obj.pos[1] + obj.size[1];
                    this.vel[1] = 0;
                }
            },
        };
    }

    // WORK IN PROGRESS (DOES NOT WORK YET)
    canBePushedToLeft(distance, excludeList = []) {
        console.log("test if push is possible");
        if (this.pos[0] - distance <= 0) return false;
        const directObstacles = objectsOfType.Rectangle.some((rect) =>
            this.overlapsWith(rect, -distance)
        );
        const indirectObstacles = objectsOfType.Box.some(
            (box) =>
                box != this &&
                !excludeList.includes(box) &&
                this.overlapsWith(box, distance) &&
                box.canBePushedToLeft(distance, [box, ...excludeList])
        );
        console.log("direct obstacles", directObstacles);
        console.log("indirect obstacles", indirectObstacles);
        return !directObstacles && !indirectObstacles;
    }

    // canBePushedToRight(distance) {
    //     if (this.pos[0] + this.size[0] >= canvDim[0]) return false;
    //     return !objectsOfType.Rectangle.some((rect) =>
    //         this.overlapsWith(rect, +distance)
    //     );
    // }

    // push(box) {
    //     return {
    //         toLeft: () => {
    //             if (this === box || this.vel[0] >= 0) return;
    //             if (
    //                 this.ppos[0] >= box.ppos[0] + box.size[0] &&
    //                 this.pos[0] <= box.pos[0] + box.size[0] &&
    //                 this.pos[1] + this.size[1] > box.pos[1] &&
    //                 this.pos[1] < box.pos[1] + box.size[1]
    //             ) {
    //                 const distance = box.pos[0] + box.size[0] - this.pos[0];

    //                 for (const rect of objectsOfType.Rectangle) {
    //                     const collides = box.overlapsWith(rect, -distance);
    //                     if (collides) {
    //                         this.pos[0] = box.pos[0] + box.size[0];
    //                         this.vel[0] = 0;
    //                         return;
    //                     }
    //                 }

    //                 console.log("can push?");

    //                 this.leftBox = box;

    //                 for (const otherBox of objectsOfType.Box) {
    //                     if (otherBox !== this && otherBox !== box) {
    //                         const collides = box.overlapsWith(otherBox, -distance);
    //                         if (collides) console.log("collision!");
    //                     }
    //                 }

    //                 box.pos[0] = this.pos[0] - box.size[0];
    //                 box.vel[0] = this.vel[0];
    //             }
    //         },
    //         toRight: () => {
    //             if (this === box || this.vel[0] <= 0) return;
    //             if (
    //                 this.ppos[0] + this.size[0] <= box.ppos[0] &&
    //                 this.pos[0] + this.size[0] >= box.pos[0] &&
    //                 this.pos[1] + this.size[1] > box.pos[1] &&
    //                 this.pos[1] < box.pos[1] + box.size[1]
    //             ) {
    //                 const distance = this.pos[0] + this.size[0] - box.pos[0];

    //                 if (box.canBePushedToRight(distance)) {
    //                     box.pos[0] = this.pos[0] + this.size[0];
    //                 } else {
    //                     this.pos[0] = box.pos[0] - this.size[0];
    //                     this.vel[0] = 0;
    //                 }
    //             }
    //         },
    //     };
    // }
}
