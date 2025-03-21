let ui = {
  x: 20,
  len: 20,
  minLen: 16,
  tx: 300,
  ty: 300,
};

let gui;

function setup() {
  createCanvas(600, 600);
  frameRate(30);
  gui = new dat.GUI();
  gui.add(ui, "x", 20, 250).onChange(updateUi);
  gui.add(ui, "len", 20, 40).onChange(updateUi);
  gui.add(ui, "minLen", 16, 32).onChange(updateUi);
  gui.add(ui, "tx", 150, 450).onChange(updateUi);
  gui.add(ui, "ty", 150, 450).onChange(updateUi);
}

function updateUi() {
  ui.minLen = map(ui.len, 20, 40, 16, 32);
  gui.updateDisplay();
  redraw();
}

function draw() {
  background(0, 50);
  translate(ui.tx, ui.ty);
  noFill();
  fur(ui.x, 0, ui.len, 0);
}

function fur(x, y, len, deg) {
  let angle = radians(deg);
  let targetX = x + sin(angle) * len * random(0.5, 1);
  let targetY = y + sin(angle) * len * random(0.5, 1);
  let thickness = map(len, 40, 15, 1, 0.5);
  strokeWeight(thickness);
  beginShape();
  stroke(random(0,255),random(0,255),random(0,255), thickness * 100);
  rotate(random(-10,30));
  curveVertex(x, y);
  curveVertex(x, y);
  curveVertex((targetX + x) / 2 + 3 * sin(mouseX), (targetY + y) / 2);
  curveVertex(targetX, targetY);
  curveVertex(targetX, targetY);
  endShape();

  // EXIT CONDITION
  if (len > ui.minLen) {
    len *= 0.95;
    fur(targetX, targetY, len, deg + abs(width / 2 - mouseX) + random(-5, 5));
    fur(-targetX, -targetY, len, deg + abs(width / 2 - mouseX) + random(-5, 5));
    fur(targetX, targetY, len, -deg - abs(width / 2 - mouseX) + random(-5, 5));
    fur(targetX, targetY, len, -deg + abs(width / 2 - mouseX) + random(-5, 5));
    scale(1.2);
    fur(targetX, targetY, len, -deg - abs(width / 2 - mouseX) + random(-5, 5));
    fur(targetX, targetY, len, -deg + abs(width / 2 - mouseX) + random(-5, 5));
    scale(1/1.2);
  }
}
