import { Player } from "./Player.js";
import { timer } from "./Timer.js";
import { clearCanvas } from "./canvas.js";
import { Rectangle, rectangleList } from "./Rectangle.js";
import { Box } from "./Box.js";

new Player([100, 0], [40, 40]);
new Rectangle([400, 100], [200, 10], "blue");
new Rectangle([700, 300], [100, 10], "blue");
new Rectangle([200, 500], [10, 100], "blue");
new Box([300, 0], [50, 50], "orange");
new Box([500, 0], [50, 50], "orange");

timer.update = (deltaTime) => {
    clearCanvas();
    rectangleList.forEach((rect) => rect.update(deltaTime));
    rectangleList.forEach((rect) => rect.draw());
};

window.addEventListener("load", () => timer.start());
