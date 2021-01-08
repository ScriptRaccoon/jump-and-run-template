import { Level } from "../Level.js";
import { Player } from "../objects/Player.js";
import { Rectangle } from "../objects/Rectangle.js";
import { Box } from "../objects/Box.js";
import { Goal } from "../objects/Goal.js";

export const level3 = new Level({
    size: [800, 600],
    objects: [
        new Goal({ pos: [730, 20], size: [50, 50], color: "black" }),
        new Player({ pos: [20, 530], size: [40, 40] }),
        new Rectangle({ pos: [0, 590], size: [2000, 10], color: "blue" }),
        new Rectangle({ pos: [400, 180], size: [10, 410], color: "blue" }),
        new Rectangle({ pos: [520, 0], size: [10, 480], color: "blue" }),
        new Rectangle({ pos: [350, 240], size: [10, 180], color: "blue" }),
        new Rectangle({ pos: [0, 320], size: [350, 10], color: "blue" }),
        new Rectangle({ pos: [0, 500], size: [360, 10], color: "blue" }),
        new Rectangle({ pos: [300, 170], size: [110, 10], color: "blue" }),
        new Rectangle({ pos: [100, 410], size: [250, 10], color: "blue" }),
        new Rectangle({ pos: [300, 170], size: [10, 80], color: "blue" }),
        new Rectangle({ pos: [100, 60], size: [310, 10], color: "blue" }),
        new Rectangle({ pos: [630, 300], size: [135, 10], color: "blue" }),
        new Rectangle({ pos: [580, 160], size: [220, 10], color: "blue" }),
        new Rectangle({ pos: [0, -10], size: [800, 10], color: "blue" }),
        new Box({ pos: [200, 450], size: [40, 40], color: "teal" }),
        new Box({ pos: [60, 450], size: [40, 40], color: "teal" }),
        new Box({ pos: [200, 360], size: [40, 40], color: "teal" }),
        new Box({ pos: [330, 130], size: [30, 30], color: "orange" }),
        new Box({ pos: [310, 90], size: [30, 30], color: "orange" }),
        new Box({ pos: [650, 190], size: [40, 90], color: "gray" }),
        new Box({ pos: [200, 0], size: [60, 60], color: "purple" }),
    ],
});
