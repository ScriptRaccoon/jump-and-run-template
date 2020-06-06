import { Player } from "./Player.js";
import { timer } from "./Timer.js";
import { clearCanvas } from "./canvas.js";
import { Rectangle, rectangleList } from "./Rectangle.js";

new Rectangle([500, 200], [100, 340], "blue");
new Rectangle([300, 400], [100, 100], "magenta");
new Rectangle([200, 100], [200, 10], "olive");
new Rectangle([720, 400], [50, 10], "green");
new Rectangle([750, 200], [50, 10], "yellow");

const p = new Player();
p.addControl();

timer.update = (deltaTime) => {
    clearCanvas();
    p.update(deltaTime);
    rectangleList.forEach((rect) => rect.draw());
};

timer.start();
