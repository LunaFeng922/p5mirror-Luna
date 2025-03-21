function setup() {
  createCanvas(600, 500);
  background(220);
  noFill();

}

function draw() {
drawCircle(width / 2,random(0,height), 400);
}

function drawCircle(x, y, rad) {
  circle(x, y, rad);

  // EXIT CONDITION
  rad = rad * 0.75;
  if (rad > 10) {
    // recursive function
    drawCircle(x, y - 20, rad);
  }
}
