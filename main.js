import { Player } from "./Player.js";
import { timer } from "./Timer.js";
import { Rectangle } from "./Rectangle.js";
import { Box } from "./Box.js";

new Player({ pos: [200, 100], size: [40, 40] });
new Rectangle({ pos: [500, 100], size: [200, 10], color: "blue" });
new Rectangle({ pos: [700, 350], size: [100, 10], color: "blue" });
// new Rectangle({ pos: [300, 450], size: [10, 150], color: "blue" });

new Box({ pos: [340, 530], size: [50, 70], color: "teal" });
// new Box({ pos: [400, 570], size: [50, 30], color: "purple" });
// new Box({ pos: [460, 550], size: [50, 50], color: "darkblue", vel: [-0.1, 0] });

window.addEventListener("load", () => {
    // timer.debug();
    timer.start();
});
