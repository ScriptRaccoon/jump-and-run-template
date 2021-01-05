import { level0 } from "./levels/level0.js";
import { writeInfo } from "./info.js";
import { level1 } from "./levels/level1.js";
writeInfo("Press 'Space' to start or pause the game");
level0.drawObjects();
level0.addControls();
