export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export const gameWidth = 1000;
export const gameHeight = 1000;

export const camera = {
    pos: [0, gameHeight - canvas.height],
};
