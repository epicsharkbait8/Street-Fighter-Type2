// A starter template for side-scrolling games like our platformer
kaboom({
 width: 1200,
 height: 600,
 background: [0, 100, 200],
});

setGravity(800);

// Load a player sprite
loadSprite("ryu", "ryu.png", {
    sliceX: 1,
    sliceY: 2,
    anims: {
        idle: { from: 0, to: 1, loop: true, speed: 4 },
    },
});
// Load Avdol as a 2-frame spritesheet (64x128, 1 column, 2 rows)
loadSprite("avdol", "avdol.png", {
    sliceX: 1,
    sliceY: 2,
    anims: {
        idle: { from: 0, to: 1, loop: true, speed: 4 },
    },
});
//hopefully the world
    const LEVEL = [
        [
            "                    ",
            "                    ",
            "                    ",
            "                    ",
            "                    ",
            "                    ",
            "====================",
        ]
    ];

    // Configure what each symbol in the level layout means.
    const levelConf = {
        tileWidth: 47,
        tileHeight: 47,
        tiles: {
            " ": () => [],
            "=": () => [
                rect(47, 47),
                color(0, 200, 0),
                area(),
                body({ isStatic: true }),
                "platform",
            ],
        }
    };

// --- The Player Character ---
const player = add([
 sprite("ryu"),
 pos(100, 100),
 area({ scale: .5 }),
 scale(5),
 body(),
]);
player.play("idle");

const player2 = add([
 sprite("avdol"),
 pos(1000, 100),
 area({ scale: 0.5 }),
 scale(5),
 body(),
]);
player2.play("idle");

// --- The World ---
add([
    rect(width(), 48),
    pos(0, height() - 48),
    color(80, 40, 20), // solid brown floor
    area(),
    body({ isStatic: true }),
    "floor", // tag for collision if needed
]);

// --- Movement Controls ---
onKeyDown("left", () => {
 player.move(-200, 0);
});
onKeyDown("right", () => {
 player.move(200, 0);
});
onKeyPress("up", () => {
 if (player.isGrounded()) {
 player.jump(650);
 }
});

onKeyDown("a", () => {
 player2.move(-200, 0);
});
onKeyDown("d", () => {
 player2.move(200, 0);
});
onKeyPress("w", () => {
 if (player.isGrounded()) {
 player2.jump(650);
 }
});

    player.onCollide("foo2", (foo2, col) => {
        if (col.isBottom()) {
            destroy(foo2);
            player.jump(300);
        } else {
            destroy(player);
            go("lose");
        }
    });

    scene("lose", () => {
    add([ text("Game Over"), pos(center()), anchor("center") ]);
    wait(2, () => { go("main", { level: 0 }); });
});
go("main")