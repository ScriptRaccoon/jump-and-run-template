import { Player } from "./Player.js";
import { timer } from "./Timer.js";
import { Rectangle } from "./Rectangle.js";
import { Box } from "./Box.js";

// new Player({ pos: [300, 200], size: [40, 40] });
// new Rectangle({ pos: [500, 100], size: [200, 10], color: "blue" });
// new Rectangle({ pos: [700, 300], size: [100, 10], color: "blue" });
// new Rectangle({ pos: [200, 450], size: [10, 150], color: "blue" });

new Box({ pos: [300, 550], size: [50, 50], color: "teal" });
new Box({ pos: [400, 550], size: [50, 50], color: "purple" });
new Box({ pos: [600, 550], size: [50, 50], color: "darkblue", vel: [-0.1, 0] });

window.addEventListener("load", () => {
    timer.start();
});
