import { Player } from "./Player.js";
import { timer } from "./Timer.js";
import { Rectangle } from "./Rectangle.js";
import { Box } from "./Box.js";
import { drawObjects } from "./objects.js";

new Player({ pos: [30, 800], size: [40, 40] });

new Rectangle({ pos: [500, 500], size: [200, 10], color: "blue" });
new Rectangle({ pos: [800, 700], size: [50, 10], color: "blue" });
new Rectangle({ pos: [120, 850], size: [10, 150], color: "blue" });
new Rectangle({ pos: [700, 900], size: [300, 10], color: "blue" });
new Rectangle({ pos: [100, 300], size: [400, 10], color: "blue" });
new Rectangle({ pos: [700, 300], size: [200, 10], color: "blue" });

new Box({ pos: [250, 520], size: [50, 80], color: "orange" });
new Box({ pos: [250, 230], size: [50, 70], color: "teal" });
new Box({ pos: [720, 700], size: [100, 100], color: "darkgreen" });
new Box({ pos: [400, 570], size: [50, 30], color: "purple" });
new Box({ pos: [550, 400], size: [50, 50], color: "darkblue" });

drawObjects();

window.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        timer.start();
        document.getElementById("info").style.display = "none";
    }
});
