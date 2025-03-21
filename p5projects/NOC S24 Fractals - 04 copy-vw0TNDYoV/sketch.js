function setup() {
  createCanvas(600, 500);
  background(220);
  noFill();
}

function draw() {
  background(220);
  noFill();
  branch(300, 250, 120, 270);
}

function branch(x, y, len, deg) {
  let angle = radians(deg);
  let targetX = x + cos(angle) * len;
  let targetY = y + sin(angle) * len;

  let thickness = map(len, 100, 10, 5, 1);
  strokeWeight(thickness);
  ellipse(x, y, x-targetX, y-targetY);

  // EXIT CONDITION
  len *= 0.4;
  if (len > 1) {
    branch(targetX, targetY, len, deg + mouseX);
  }
}
