// A starter template for side-scrolling games like our platformer
kaboom({
 width: 1200,
 height: 600,
 background: [0, 100, 200],
});

setGravity(800);

// Load a player sprite
loadSprite("foo", "New Piskel-1.png.png");
loadSprite("foo2", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQccF1S-NPYFMJ1Hey62chXLeoGyl13zJYqiQ&s");
//hopefully the world


// --- The Player Character ---
const player = add([
 sprite("foo"),
 pos(100, 100),
 area({ scale: 5 }),
 body(),
]);

const player2 = add([
 sprite("foo2"),
 pos(1000, 100),
 area({ scale: 0.7 }),
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

go("main")