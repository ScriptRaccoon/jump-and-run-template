export class Timer {
    constructor(deltaTime) {
        this.accumulatedTime = 0;
        this.lastTime = null;
        this.paused = false;
        this.deltaTime = deltaTime || 1000 / 60;
    }

    start() {
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(currentTime) {
        if (this.paused) return;
        if (this.lastTime) {
            this.accumulatedTime += currentTime - this.lastTime;
            if (this.accumulatedTime > 1000) {
                this.accumulatedTime = 1000;
            }
            while (this.accumulatedTime > this.deltaTime) {
                this.update(this.deltaTime);
                this.accumulatedTime -= this.deltaTime;
            }
        }
        this.lastTime = currentTime;
        this.start();
    }

    pause() {
        this.lastTime = null;
        this.paused = true;
    }

    update() {
        return;
    }

    debug() {
        window.addEventListener("keydown", (e) => {
            if (e.key === "d") {
                this.update(1000 / 60);
            }
        });
    }
}
