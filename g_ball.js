// ==========
// BALL STUFF
// ==========

var g_canvas = document.getElementById("myCanvas");

// BALL STUFF
var g_ball = {
    cx: g_canvas.width/2,
    cy: 200,
    radius: 10,

    xVel: 10,
    yVel: 8
};

g_ball.update = function (du) {
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;

    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.xVel * du;
    var nextY = prevY + this.yVel * du;

    // Bounce off the paddles
    if (g_paddle.collidesWith(prevX, prevY, nextX, nextY, this.radius)){
        this.yVel *= -1;
    }

    for (var i = 0; i<g_bricks.length; i++){
        if (g_bricks[i].collidesWith(prevX, prevY, nextX, nextY, this.radius)){
          this.yVel *= -1;
          g_bricks.splice(i, 1);
        }
    }

    // Bounce off right and left side
    if (nextX < 0 ||                            // Left wall
        nextX > g_canvas.width) {               // Right wall
        this.xVel *= -1;
    }

    // Bounce off top
    if (nextY < 0 ){
        this.yVel *= -1;
    }

    // Reset if ball hits the bottom
    var margin = this.radius;
    if (nextY > g_canvas.height){
        this.reset();
        layBricks();
    }

    // *Actually* update my position
    // ...using whatever velocity I've ended up with
    //
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;
};

g_ball.reset = function () {
    this.cx = g_canvas.width/2;
    this.cy = 200;
    this.xVel = 10;
    this.yVel = 8;
};

g_ball.render = function (ctx) {
    fillCircle(ctx, this.cx, this.cy, this.radius);
};

function fillCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.filleStyle = "green";
    ctx.fill();
}
