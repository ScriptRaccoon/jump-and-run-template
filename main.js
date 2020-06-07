import { Player } from "./Player.js";
import { timer } from "./Timer.js";
import { clearCanvas } from "./canvas.js";
import { Rectangle, rectangleList } from "./Rectangle.js";
import { Box, boxList } from "./Box.js";

new Rectangle([700, 300], [100, 10], "blue");
new Rectangle([200, 500], [10, 100], "blue");
const b = new Box([300, 0], [50, 50], "orange", 0.01, 0);
new Player();

timer.update = (deltaTime) => {
    clearCanvas();
    boxList.forEach((box) => box.update(deltaTime));
    rectangleList.forEach((rect) => rect.draw());
    boxList.forEach((box) => box.draw());
};

timer.start();
