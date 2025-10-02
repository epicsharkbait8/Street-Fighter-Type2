kaboom({
 width: 1200,
 height: 600,
 background: [0, 100, 200],
});

setGravity(800);

// Load a player sprite
loadSprite("apple", "https://kaboomjs.com/sprites/apple.png");

// --- The Player Character ---
const player = add([
 sprite("apple"),
 pos(100, 100),
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
onKeyPress("space", () => {
 if (player.isGrounded()) {
 player.jump(650);
 }
});