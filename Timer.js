class Timer {
    constructor(deltaTime) {
        this.deltaTime = deltaTime;
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
        return deltaTime;
    }
}

export const timer = new Timer(1000 / 60);
