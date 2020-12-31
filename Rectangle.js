import { ctx } from "./canvas.js";
export const rectangleList = [];

export class Rectangle {
    constructor(options) {
        this.pos = options.pos;
        this.size = options.size;
        this.color = options.color;
        this.type = "Rectangle";
        rectangleList.push(this);
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(...this.pos, ...this.size);
    }

    update() {}
}
