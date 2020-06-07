export const push = {
    left: function (player, box) {
        if (player === box) return;
        if (
            player.ppos[0] + player.size[0] <= box.ppos[0] &&
            player.pos[0] + player.size[0] >= box.pos[0] &&
            player.pos[1] + player.size[1] > box.pos[1] &&
            player.pos[1] < box.pos[1] + box.size[1]
        ) {
            box.pos[0] = player.pos[0] + player.size[0];
        }
    },
    right: function (player, box) {
        if (player === box) return;
        if (
            player.ppos[0] >= box.ppos[0] + box.size[0] &&
            player.pos[0] <= box.pos[0] + box.size[0] &&
            player.pos[1] + player.size[1] > box.pos[1] &&
            player.pos[1] < box.pos[1] + box.size[1]
        ) {
            box.pos[0] = player.pos[0] - box.size[0];
        }
    },
};
