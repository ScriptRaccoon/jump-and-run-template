import { Player } from "./Player.js";
import { timer } from "./Timer.js";
import { clearCanvas } from "./canvas.js";
import { Rectangle, rectangleList } from "./Rectangle.js";
import { Box } from "./Box.js";

new Player({ pos: [100, 0], size: [40, 40] });
new Rectangle({ pos: [500, 100], size: [200, 10], color: "blue" });
new Rectangle({ pos: [700, 300], size: [100, 10], color: "blue" });
new Rectangle({ pos: [200, 450], size: [10, 150], color: "blue" });
new Box({ pos: [500, 0], size: [50, 50], color: "teal", vel: [-0.1, 0] });
new Box({ pos: [310, 550], size: [50, 50], color: "purple" });

timer.update = (deltaTime) => {
    clearCanvas();
    rectangleList.forEach((rect) => rect.update(deltaTime));
    rectangleList.forEach((rect) => rect.draw());
};

window.addEventListener("load", () => timer.start());
