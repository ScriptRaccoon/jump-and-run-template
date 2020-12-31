import { Player } from "./Player.js";
import { timer } from "./Timer.js";
import { clearCanvas } from "./canvas.js";
import { Rectangle, rectangleList } from "./Rectangle.js";
import { Box } from "./Box.js";

new Player({ pos: [100, 0], size: [40, 40] });
new Rectangle({ pos: [400, 100], size: [200, 10], color: "blue" });
new Rectangle({ pos: [700, 300], size: [100, 10], color: "blue" });
new Rectangle({ pos: [200, 500], size: [10, 100], color: "blue" });
new Box({ pos: [300, 0], size: [50, 50], color: "orange" });
new Box({ pos: [500, 0], size: [50, 50], color: "teal" });

timer.update = (deltaTime) => {
    clearCanvas();
    rectangleList.forEach((rect) => rect.update(deltaTime));
    rectangleList.forEach((rect) => rect.draw());
};

window.addEventListener("load", () => timer.start());
