// =================
// KEYBOARD HANDLING
// =================
var g_canvas = document.getElementById("myCanvas");
var g_keys = [];
var g_mouseX = g_canvas.width/2;

function handleKeydown(evt) {
    g_keys[evt.keyCode] = true;
}

function handleKeyup(evt) {
    g_keys[evt.keyCode] = false;
}

function handleMouseMove(evt) {
    g_mouseX = evt.clientX - g_canvas.offsetLeft;
}

// Inspects, and then clears, a key's state
//
// This allows a keypress to be "one-shot" e.g. for toggles
// ..until the auto-repeat kicks in, that is.
//
function eatKey(keyCode) {
    var isDown = g_keys[keyCode];
    g_keys[keyCode] = false;
    return isDown;
}

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);
window.addEventListener("mousemove", handleMouseMove);
