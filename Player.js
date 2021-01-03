import { Box } from "./Box.js";
import { canvas, camera, gameWidth, gameHeight } from "./canvas.js";
import { minmax } from "./utils.js";

export class Player extends Box {
    constructor(options, type) {
        super(
            {
                pos: options.pos,
                size: options.size,
                color: "red",
                grav: 0.004,
                friction: 0.2,
            },
            type || "Player"
        );
        this.walkSpeed = 0.012;
        this.jumpSpeed = 1.45;
        this.addControls();
    }

    addControls() {
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowRight":
                    this.acc = this.walkSpeed;
                    break;
                case "ArrowLeft":
                    this.acc = -this.walkSpeed;
                    break;
                case "ArrowUp":
                    if (this.onGround) {
                        this.onGround = false;
                        this.vel[1] = -this.jumpSpeed;
                    }
                    break;
            }
        });

        document.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "ArrowRight":
                    this.acc = 0;
                    break;
                case "ArrowLeft":
                    this.acc = 0;
                    break;
            }
        });
    }

    specificUpdate() {
        camera.pos[0] = minmax(
            this.right - canvas.width / 2,
            0,
            gameWidth - canvas.width
        );

        camera.pos[1] = minmax(
            this.top - canvas.height / 2,
            0,
            gameHeight - canvas.height
        );
    }
}
