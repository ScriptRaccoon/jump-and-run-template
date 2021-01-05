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
        this.objectsOfType = { Rectangle: [], Player: [], Box: [], Goal: [] };
        this.addObjects(options.objects || []);
        this.player = null;
        this.timer = new Timer();
        this.timer.update = (deltaTime) => this.update(deltaTime);
        this.status = STATUS.READY;
        this.won = false;
        levelList.push(this);
        this.keyFuncRef = (e) => this.keyFunction(e);
    }

    addControls() {
        window.addEventListener("keydown", this.keyFuncRef);
    }

    removeControls() {
        window.removeEventListener("keydown", this.keyFuncRef);
    }

    keyFunction(e) {
        if (e.key === " ") {
            if (this.status == STATUS.READY) {
                this.start();
            } else if (this.status === STATUS.PAUSED && !this.won) {
                this.resume();
            } else if (this.status === STATUS.STARTED) {
                this.pause();
            }
        }
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
        this.checkWin();
    }

    checkWin() {
        if (this.won) {
            this.status = STATUS.PAUSED;
            this.timer.pause();
            this.removeControls();
            if (this.index + 1 >= levelList.length) {
                writeInfo("You won the game!");
                return;
            }
            writeInfo("You won!");
            this.switchToNextLevel();
        }
    }

    switchToNextLevel() {
        const nextLevel = levelList[this.index + 1];
        nextLevel.addControls();
    }

    start() {
        if (this.objectsOfType.Player.length != 1) {
            console.error("Number of players is incorrect");
            return;
        }
        this.player = this.objectsOfType.Player[0];
        writeInfo(`Level ${this.index}`);
        this.status = STATUS.STARTED;
        this.timer.paused = false;
        this.timer.start();
        setTimeout(hideInfo, 2000);
    }

    pause() {
        this.status = STATUS.PAUSED;
        this.timer.pause();
        writeInfo("Paused");
    }

    resume() {
        this.status = STATUS.STARTED;
        this.timer.paused = false;
        this.timer.start();
        hideInfo();
    }
}
