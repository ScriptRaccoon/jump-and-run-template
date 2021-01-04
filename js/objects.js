export const objects = [];

export const objectsOfType = {
    Rectangle: [],
    Box: [],
    Player: [],
};

export function drawObjects() {
    objects.forEach((obj) => obj.draw());
}

export function updateObjects(deltaTime) {
    objects.forEach((obj) => obj.update(deltaTime));
}
