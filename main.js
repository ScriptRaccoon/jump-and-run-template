import { Player } from "./Player.js";
import { timer } from "./Timer.js";
import { Rectangle } from "./Rectangle.js";
import { Box } from "./Box.js";

new Player({ pos: [100, 0], size: [40, 40] });
new Rectangle({ pos: [500, 100], size: [200, 10], color: "blue" });
new Rectangle({ pos: [700, 300], size: [100, 10], color: "blue" });
new Rectangle({ pos: [200, 450], size: [10, 150], color: "blue" });
// new Box({ pos: [500, 0], size: [50, 50], color: "teal", vel: [-0.1, 0] });
new Box({ pos: [310, 550], size: [50, 50], color: "purple" });

window.addEventListener("load", () => {
    timer.start();
});
