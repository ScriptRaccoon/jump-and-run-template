export function applyPhysics(box, deltaTime) {
    box.vel[0] += box.acc * deltaTime;
    box.vel[0] *= 1 - box.friction;
    box.vel[1] += box.grav * deltaTime;
    box.pos[1] += box.vel[1] * deltaTime;
    box.pos[0] += box.vel[0] * deltaTime;
    box.onGround = false;
}
