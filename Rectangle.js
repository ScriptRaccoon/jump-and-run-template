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

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(...this.pos, ...this.size);
    }

    update() {}

    overlapsWith(rect, distance = 0) {
        return (
            this.pos[0] + distance <= rect.pos[0] + rect.size[0] &&
            this.pos[0] + distance + this.size[0] >= rect.pos[0] &&
            this.pos[1] + this.size[1] > rect.pos[1] &&
            this.pos[1] < rect.pos[1] + rect.size[1]
        );
    }
}
