import { Player } from "./Player.js";
import { timer } from "./Timer.js";
import { Rectangle } from "./Rectangle.js";
import { Box } from "./Box.js";

new Player({ pos: [500, 100], size: [40, 40] });
new Rectangle({ pos: [500, 100], size: [200, 10], color: "blue" });
new Rectangle({ pos: [700, 350], size: [100, 10], color: "blue" });
new Rectangle({ pos: [120, 450], size: [10, 150], color: "blue" });

new Box({ pos: [150, 520], size: [50, 80], color: "orange" });
new Box({ pos: [250, 530], size: [50, 70], color: "teal" });
new Box({ pos: [400, 570], size: [50, 30], color: "purple" });
new Box({ pos: [650, 550], size: [50, 50], color: "darkblue" });

// timer.debug();
timer.start();
