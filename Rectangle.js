import { ctx } from "./draw.js";
export const rectangleList = [];

export class Rectangle {
    constructor(pos, size, color) {
        this.pos = pos;
        this.size = size;
        this.color = color;
        rectangleList.push(this);
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(...this.pos, ...this.size);
    }
}
