import { ctx } from "./canvas.js";
import { objects, objectsOfType } from "./objects.js";

export class Rectangle {
    constructor(options, type) {
        this.pos = options.pos;
        this.size = options.size;
        this.color = options.color;
        this.type = type || "Rectangle";
        objects.push(this);
        objectsOfType[this.type].push(this);
    }

    get left() {
        return this.pos[0];
    }

    get right() {
        return this.pos[0] + this.size[0];
    }

    get top() {
        return this.pos[1];
    }

    get bottom() {
        return this.pos[1] + this.size[1];
    }

    setLeft(val) {
        this.pos[0] = val;
    }

    setRight(val) {
        this.pos[0] = val - this.size[0];
    }

    setTop(val) {
        this.pos[1] = val;
    }

    setBottom(val) {
        this.pos[1] = val - this.size[1];
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(...this.pos, ...this.size);
    }

    update() {}

    overlapsWith(rect, distance = 0) {
        return (
            this.left + distance <= rect.right &&
            this.right + distance >= rect.left &&
            this.bottom > rect.top &&
            this.top < rect.bottom
        );
    }
}
