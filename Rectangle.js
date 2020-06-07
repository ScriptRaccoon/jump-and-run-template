import { ctx } from "./canvas.js";
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

    get bottom() {
        return this.pos[1] + this.size[1];
    }

    get top() {
        return this.pos[1];
    }

    get left() {
        return this.pos[0];
    }

    get right() {
        return this.pos[0] + this.size[0];
    }
}
