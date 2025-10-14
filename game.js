// A starter template for side-scrolling games like our platformer
kaboom({
 width: 1200,
 height: 600,
 background: [0, 100, 200],
});

setGravity(800);

// Load a player sprite
loadSprite("ryu", "New Piskel.gif");
loadSprite("avdol", "New Piskel (1).gif");
//hopefully the world


// --- The Player Character ---
const player = add([
 sprite("ryu"),
 pos(100, 100),
 area({ scale: .9 }),
 scale(5),
 body(),
]);

const player2 = add([
 sprite("avdol"),
 pos(1000, 100),
 area({ scale: 0.9 }),
 scale(5),
 body(),
]);

// --- The World ---
add([
 rect(width(), 48),
 pos(0, height() - 48),
 area(),
 body({ isStatic: true }),
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