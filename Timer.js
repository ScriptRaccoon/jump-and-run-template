import { drawObjects, updateObjects } from "./objects.js";
import { clearCanvas } from "./canvas.js";

class Timer {
    constructor(deltaTime = 1000 / 60) {
        let accumulatedTime = 0;
        let lastTime = null;
        this.loop = (currentTime) => {
            if (lastTime) {
                accumulatedTime += currentTime - lastTime;
                if (accumulatedTime > 1000) {
                    accumulatedTime = 1000;
                }
                while (accumulatedTime > deltaTime) {
                    this.update(deltaTime);
                    accumulatedTime -= deltaTime;
                }
            }
            lastTime = currentTime;
            this.start();
        };
    }
    start() {
        requestAnimationFrame(this.loop);
    }

    update(deltaTime) {
        clearCanvas();
        updateObjects(deltaTime);
        drawObjects();
    }

    debug() {
        this.update(1000 / 60);
        window.addEventListener("keydown", (e) => {
            if (e.key === "d") {
                this.update(1000 / 60);
            }
        });
    }
}

export const timer = new Timer();
