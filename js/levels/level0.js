import { Player } from "../Player.js";
import { Rectangle } from "../Rectangle.js";
import { Box } from "../Box.js";
import { Level } from "../Level.js";

export const level0 = new Level({
    size: [800, 600],
    objects: [
        new Player({ pos: [50, 500], size: [40, 40] }),
        new Rectangle({ pos: [650, 250], size: [100, 10], color: "blue" }),
        new Rectangle({ pos: [50, 100], size: [200, 10], color: "blue" }),
        new Box({ pos: [100, 500], size: [60, 100], color: "orange" }),
    ],
});
