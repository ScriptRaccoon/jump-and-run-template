import { Box } from "./Box.js";

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

    push(obj) {
        return {
            toRight: () => {
                if (obj.type !== "Box") return false;
                const distance = this.right - obj.left;
                if (obj.canBeMovedBy([distance, 0])) {
                    obj.setLeft(obj.left + distance);
                    return true;
                }
                const smallDistance = obj.getDistanceToRightObject();
                if (obj.canBeMovedBy([smallDistance, 0])) {
                    obj.setLeft(obj.left + smallDistance);
                    this.setRight(obj.left);
                    return true;
                }
                return false;
            },
            toLeft: () => {
                if (obj.type !== "Box") return false;
                const distance = obj.right - this.left;
                if (obj.canBeMovedBy([-distance, 0])) {
                    obj.setRight(this.left);
                    return true;
                }
                const smallDistance = obj.getDistanceToLeftObject();
                if (obj.canBeMovedBy([-smallDistance, 0])) {
                    obj.setLeft(obj.left - smallDistance);
                    this.setLeft(obj.right);
                    return true;
                }
                return false;
            },
        };
    }

    checkGoal() {
        const hasReachedGoal = this.level.objectsOfType.Goal.some((goal) =>
            this.overlapsWith(goal)
        );
        if (hasReachedGoal) this.level.won = true;
    }
}
