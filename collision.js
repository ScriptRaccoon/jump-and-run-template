export const collide = {
    left: function (player, rect) {
        if (player === rect) return;
        if (
            player.ppos[0] + player.size[0] <= rect.pos[0] &&
            player.pos[0] + player.size[0] >= rect.pos[0] &&
            player.pos[1] + player.size[1] > rect.pos[1] &&
            player.pos[1] < rect.pos[1] + rect.size[1]
        ) {
            player.pos[0] = rect.pos[0] - player.size[0];
        }
    },
    right: function (player, rect) {
        if (player === rect) return;
        if (
            player.ppos[0] >= rect.pos[0] + rect.size[0] &&
            player.pos[0] <= rect.pos[0] + rect.size[0] &&
            player.pos[1] + player.size[1] > rect.pos[1] &&
            player.pos[1] < rect.pos[1] + rect.size[1]
        ) {
            player.pos[0] = rect.pos[0] + rect.size[0];
        }
    },
    above: function (player, rect) {
        if (player === rect) return;
        if (
            player.ppos[1] + player.size[1] <= rect.pos[1] &&
            player.pos[1] + player.size[1] >= rect.pos[1] &&
            player.pos[0] + player.size[0] > rect.pos[0] &&
            player.pos[0] < rect.pos[0] + rect.size[0]
        ) {
            player.pos[1] = rect.pos[1] - player.size[1];
            player.vel[1] = 0;
            player.onGround = true;
        }
    },
    below: function (player, rect) {
        if (player === rect) return;
        if (
            player.ppos[1] >= rect.pos[1] + rect.size[1] &&
            player.pos[1] <= rect.pos[1] + rect.size[1] &&
            player.pos[0] + player.size[0] > rect.pos[0] &&
            player.pos[0] < rect.pos[0] + rect.size[0]
        ) {
            player.pos[1] = rect.pos[1] + rect.size[1];
            player.vel[1] = 0;
        }
    },
};
