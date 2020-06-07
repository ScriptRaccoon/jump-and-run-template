import { Player } from "./Player.js";
import { timer } from "./Timer.js";
import { clearCanvas } from "./canvas.js";
import { Rectangle, rectangleList } from "./Rectangle.js";
import { Box } from "./Box.js";

new Player();
new Rectangle([700, 300], [100, 10], "blue");
new Rectangle([200, 500], [10, 100], "blue");
new Rectangle([400, 100], [200, 10], "blue");
new Box([300, 0], [50, 50], "orange", 0.01, 0);
new Box([500, 0], [50, 50], "orange", 0.01, 0);

timer.update = (deltaTime) => {
    clearCanvas();
    rectangleList.forEach((rect) => rect.update(deltaTime));
    rectangleList.forEach((rect) => rect.draw());
};

timer.start();

console.table(rectangleList);
