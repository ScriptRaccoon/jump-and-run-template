import { objects } from "./objects.js";
import { clearCanvas } from "./canvas.js";

class Timer {
    constructor(deltaTime) {
        let accumulatedTime = 0;
        let lastTime = 0;
        this.loop = (currentTime) => {
            accumulatedTime += currentTime - lastTime;
            if (accumulatedTime > 1000) {
                accumulatedTime = 1000;
            }
            while (accumulatedTime > deltaTime) {
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
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
        objects.forEach((obj) => obj.update(deltaTime));
        objects.forEach((obj) => obj.draw());
    }

    debug() {
        window.addEventListener("keydown", (e) => {
            if (e.key === " ") {
                this.update(1000 / 60);
            }
        });
    }
}

export const timer = new Timer(1000 / 60);
