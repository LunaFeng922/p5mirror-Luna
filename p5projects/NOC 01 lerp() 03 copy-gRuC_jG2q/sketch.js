let x = 0;
let y = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  x = lerp(x, mouseX, 0.10); // 10%
  y = lerp(y, mouseY, 0.10); // 10%
  circle(x, y, 30);
}





