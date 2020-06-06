export function applyPhysics(player, deltaTime) {
    player.ppos = [...player.pos];
    player.vel[0] += player.acceleration * deltaTime;
    player.vel[0] *= 0.8; // friction
    player.pos[0] += player.vel[0] * deltaTime;
    player.vel[1] += player.grav * deltaTime;
    player.pos[1] += player.vel[1] * deltaTime;
    ignoreSmallVelocities(player);
    player.onGround = false;
}

function ignoreSmallVelocities(player) {
    for (const i of [0, 1]) {
        if (Math.abs(player.vel[i]) < 0.01) player.vel[i] = 0;
    }
}
