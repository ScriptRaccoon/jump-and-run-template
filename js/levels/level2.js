import { Level } from "../Level.js";
import { Player } from "../objects/Player.js";
import { Rectangle } from "../objects/Rectangle.js";
import { Box } from "../objects/Box.js";
import { Goal } from "../objects/Goal.js";

export const level2 = new Level({
    size: [800, 1200],
    objects: [
        new Goal({ pos: [10, 30], size: [50, 50], color: "black" }),
        new Player({ pos: [30, 1160], size: [40, 40] }),
        new Rectangle({ pos: [600, 1000], size: [100, 10], color: "blue" }),
        new Rectangle({ pos: [400, 800], size: [100, 10], color: "blue" }),
        new Rectangle({ pos: [200, 600], size: [100, 10], color: "blue" }),
        new Rectangle({ pos: [400, 400], size: [100, 10], color: "blue" }),
        new Box({ pos: [450, 350], size: [50, 50], color: "purple" }),
    ],
});
