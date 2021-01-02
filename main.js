import { Player } from "./Player.js";
import { timer } from "./Timer.js";
import { clearCanvas } from "./canvas.js";
import { Rectangle, rectangleList } from "./Rectangle.js";
import { Box } from "./Box.js";

// new Player({ pos: [100, 0], size: [40, 40] });
// new Rectangle({ pos: [400, 100], size: [200, 10], color: "blue" });
// new Rectangle({ pos: [700, 300], size: [100, 10], color: "blue" });
// new Box({ pos: [400, 0], size: [50, 50], color: "teal" });

// reducing to minimal example showing that pushing ignores collision:
const A1 = new Rectangle({ pos: [200, 450], size: [10, 150], color: "blue" });
const A2 = new Rectangle({ pos: [400, 450], size: [10, 150], color: "blue" });
const B = new Box({ pos: [240, 550], size: [50, 50], color: "orange", name: "B" });
const C = new Box({ pos: [310, 550], size: [50, 50], color: "purple", name: "C" });
C.vel = [-0.02, 0];

timer.update = (deltaTime) => {
    clearCanvas();
    rectangleList.forEach((rect) => rect.update(deltaTime));
    rectangleList.forEach((rect) => rect.draw());
};

window.addEventListener("load", () => timer.start());
