import { canvas, clearCanvas } from "./canvas.js";
import { hideInfo, writeInfo } from "./info.js";
import { Timer } from "./Timer.js";
import { minmax } from "./utils.js";

export const levelList = [];

const STATUS = {
    READY: 0,
    STARTED: 1,
    PAUSED: 2,
};

export class Level {
    constructor(options) {
        this.size = options.size || [canvas.width, canvas.height];
        this.cameraPos = options.cameraPos || [0, this.size[1] - canvas.height];
        this.index = levelList.length;
        this.objects = [];
        this.objectsOfType = { Rectangle: [], Player: [], Box: [] };
        if (options.objects) {
            this.addObjects(options.objects);
        }
        this.player = null;
        this.timer = new Timer();
        this.timer.update = (deltaTime) => this.update(deltaTime);
        this.status = STATUS.READY;
        this.addControls();
        levelList.push(this);
    }

    addControls() {
        writeInfo("Press 'Space' to start or pause the game");
        window.addEventListener("keydown", (e) => {
            if (e.key === " ") {
                if (this.status == STATUS.READY) {
                    this.start();
                } else if (this.status === STATUS.PAUSED) {
                    this.resume();
                } else if (this.status === STATUS.STARTED) {
                    this.pause();
                }
            }
        });
    }

    addObject(obj) {
        const type = obj.constructor.name;
        this.objects.push(obj);
        this.objectsOfType[type].push(obj);
        obj.level = this;
    }

    addObjects(objects) {
        objects.forEach((obj) => this.addObject(obj));
    }

    drawObjects() {
        this.objects.forEach((obj) => obj.draw());
    }

    updateObjects(deltaTime) {
        this.objects.forEach((obj) => obj.update(deltaTime));
    }

    updateCamera() {
        this.cameraPos[0] = minmax(
            this.player.right - canvas.width / 2,
            0,
            this.size[0] - canvas.width
        );

        this.cameraPos[1] = minmax(
            this.player.top - canvas.height / 2,
            0,
            this.size[1] - canvas.height
        );
    }

    update(deltaTime) {
        clearCanvas();
        this.updateObjects(deltaTime);
        this.updateCamera();
        this.drawObjects();
    }

    start() {
        if (this.objectsOfType.Player.length != 1) {
            console.error("Number of players is incorrect");
            return;
        }
        this.player = this.objectsOfType.Player[0];
        this.resume();
    }

    pause() {
        this.status = STATUS.PAUSED;
        this.timer.pause();
        writeInfo("Paused");
    }

    resume() {
        this.status = STATUS.STARTED;
        hideInfo();
        this.timer.paused = false;
        this.timer.start();
    }
}
