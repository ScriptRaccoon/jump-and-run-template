export function applyPhysics(player, deltaTime) {
    player.vel[0] += player.acceleration * deltaTime;
    player.vel[0] *= 1 - player.friction;
    player.vel[1] += player.grav * deltaTime;
    player.pos[1] += player.vel[1] * deltaTime;
    player.pos[0] += player.vel[0] * deltaTime;
    player.onGround = false;
}
