// A starter template for side-scrolling games like our platformer
kaboom({
 width: 1200,
 height: 700,
 background: [0, 100, 200],
});

setGravity(500);

// Load a player sprite
loadSprite("ryu", "AllRyu.png", {
    sliceX: 2,
    sliceY: 2,
    anims: {
        idle: { from: 0, to: 1, loop: true, speed: 4 },
        jump: { from: 2, to: 2, loop: false, speed: 1 }, // single-frame jump
    },

});
// Jump sprite for Ryu (overlay shown while jumping)
loadSprite("ryu_jump", "ryuJump.png");
// Load Avdol as a 2-frame spritesheet (64x128, 1 column, 2 rows)
loadSprite("avdol", "AllAvdol.png", {
    sliceX: 2,
    sliceY: 2,
    anims: {
        idle: { from: 0, to: 1, loop: true, speed: 4 },
        jump: { from: 2, to: 2, loop: false, speed: 1 }, // single-frame jump
    },
});
// Minimal anim component (no-op) to satisfy entity creation.
// so this component simply gives a harmless id so `anim()` can be used in add().
function anim() {
    return {
        id: "anim",
    };
}

// Simple level data: bottom row is all '=' which maps to a platform tile
const LEVELS = [
    [
        "                    ",                   
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "                    ",
        "====================",
        "====================",
        "====================",
    ]
];

// Level config: map '=' to a static platform tile
const levelConf = {
    tileWidth: 64,
    tileHeight: 64,
    tiles: {
        " ": () => [],
        "=": () => [
            rect(64, 64),
            color(0, 200, 0),
            area(),
            body({ isStatic: true }),
            "platform",
        ],

    },
};

// Main scene: build level, add players and controls
scene("main", () => {
    // Build the level (floor at bottom)
    addLevel(LEVELS[0], levelConf);

    // --- The Player Character ---
    const player = add([
        sprite("ryu"),
        pos(100, height() - 48 - (64 * 5)), // spawn above the tiled floor
        scale(5),
        area({ scale: 0.6 }),
        body(),
           anim(),
           "ryu",
    ]);
    player.play("idle");

    const player2 = add([
        sprite("avdol"),
        pos(1000, height() - 48 - (64 * 5)),
        scale(5),
        area({ scale: 0.6 }),
        body(),
           anim(),
           "avdol",
    ]);
    player2.play("idle");

    // --- Movement Controls ---
    onKeyDown("left", () => { player.move(-200, 0); });
    onKeyDown("right", () => { player.move(200, 0); });
    onKeyPress("up", () => {
        if (player.isGrounded()) {
            player.jump(650);
            player.play("jump");
        }
    });
    // revert to idle when grounded
    player.onUpdate(() => {
        if (player.isGrounded() && player.curAnim() !== "idle") {
            player.play("idle");
        }
    });

    onKeyDown("a", () => { player2.move(-200, 0); });
    onKeyDown("d", () => { player2.move(200, 0); });
    onKeyPress("w", () => {
        if (player2.isGrounded()) {
            player2.jump(650);
            player2.play("jump");
        }
    });
    // revert player2 to idle when grounded
    player2.onUpdate(() => {
        if (player2.isGrounded() && player2.curAnim() !== "idle") {
            player2.play("idle");
        }
    });
    // Ryu lands on Avdol -> destroy Avdol and bounce Ryu
    player.onCollide("avdol", (a, col) => {
        if (col.isBottom()) {
                destroy(a);
                go("Ryuwin");
        }
    });

    // Avdol lands on Ryu -> destroy Ryu and bounce Avdol
    player2.onCollide("ryu", (r, col) => {
        if (col.isBottom()) {
                destroy(r);
                go("Avdolwin");
        }
    });
});

scene("Ryuwin", () => {
    add([ text("Ryu Wins!"), pos(center()), anchor("center") ]);
    wait(2, () => { go("main", { level: 0 }); });
});
scene("Avdolwin", () => {
    add([ text("Avdol Wins!"), pos(center()), anchor("center") ]);
    wait(2, () => { go("main", { level: 0 }); });
});

go("main");