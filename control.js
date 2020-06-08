export function addControl(player) {
    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowRight":
                player.acc = player.walkSpeed;
                break;
            case "ArrowLeft":
                player.acc = -player.walkSpeed;
                break;
            case "ArrowUp":
                if (player.onGround) {
                    player.onGround = false;
                    player.vel[1] = -player.jumpSpeed;
                }
                break;
        }
    });

    document.addEventListener("keyup", (e) => {
        switch (e.key) {
            case "ArrowRight":
                player.acc = 0;
                break;
            case "ArrowLeft":
                player.acc = 0;
                break;
        }
    });
}
