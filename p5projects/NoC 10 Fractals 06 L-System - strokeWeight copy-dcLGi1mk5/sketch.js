function setup() {
  createCanvas(600, 500);
  background(100);
  noFill();
  stroke(255);
  drawBranch(300, 250, 270, 100);
}

function draw() {
  //
}

function drawBranch(x, y, deg, len) {
  let angle = radians(deg);
  let targetX = x + cos(angle) * len;
  let targetY = y + sin(angle) * len;

  let sw = map(len, 150, 1, 8, 0);
  strokeWeight(sw);
  line(x, y, targetX, targetY);
  if (len > 5) {
    drawBranch(targetX, targetY, deg - 30, len * 0.75);
    drawBranch(targetX, targetY, deg + 30, len * 0.75);
  }
}
