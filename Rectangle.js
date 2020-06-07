import { ctx } from "./canvas.js";
export const rectangleList = [];

export class Rectangle {
    constructor(pos, size, color) {
        this.pos = pos;
        this.size = size;
        this.color = color;
        this.type = "Rectangle";
        rectangleList.push(this);
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(...this.pos, ...this.size);
    }

    update() {}
}
