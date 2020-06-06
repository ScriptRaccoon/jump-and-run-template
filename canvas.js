export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export const canvDim = [canvas.clientWidth, canvas.clientHeight];

export function clearCanvas() {
    ctx.clearRect(0, 0, ...canvDim);
}
