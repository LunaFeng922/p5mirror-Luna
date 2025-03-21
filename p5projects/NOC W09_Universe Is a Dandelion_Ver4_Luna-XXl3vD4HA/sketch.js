//Credit: finding references in NOC W09 Example codes by Prof.Moon.

let ui = {
  x: 20,
  len: 20,
  minLen: 16,
  tx: 300,
  ty: 300,
  r1: 255,
  g1: 255,
  b1: 255,
  r2: 255,
  g2: 255,
  b2: 255,
  r3: 255,
  g3: 255,
  b3: 255,
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
  gui.add(ui, "r1", 0, 255).onChange(updateUi);
  gui.add(ui, "g1", 0, 255).onChange(updateUi);
  gui.add(ui, "b1", 0, 255).onChange(updateUi);
  gui.add(ui, "r2", 0, 255).onChange(updateUi);
  gui.add(ui, "g2", 0, 255).onChange(updateUi);
  gui.add(ui, "b2", 0, 255).onChange(updateUi);
  gui.add(ui, "r3", 0, 255).onChange(updateUi);
  gui.add(ui, "g3", 0, 255).onChange(updateUi);
  gui.add(ui, "b3", 0, 255).onChange(updateUi);
}

function updateUi() {
  ui.minLen = map(ui.len, 20, 40, 16, 32);
  gui.updateDisplay();
  redraw();
}

function draw() {
  background(255, 50);
  translate(ui.tx, ui.ty);
  noFill();
  fur(ui.x, 0, ui.len, 0);
}

function fur(x, y, len, deg) {
  let angle = radians(deg);
  let targetX = x + cos(angle) * len * random(0.5, 1);
  let targetY = y + sin(angle) * len * random(0.5, 1);
  let thickness = map(len, 40, 15, 1, 0.5);
  strokeWeight(thickness);
  beginShape();
  stroke(ui.r1, ui.g1, ui.b1, thickness * 100);
  rotate(15);
  curveVertex(x, y);
  curveVertex(x, y);
  curveVertex((targetX + x) / 2 + 3 * sin(mouseX), (targetY + y) / 2);
  curveVertex(targetX, targetY);
  curveVertex(targetX, targetY);
  endShape();

  beginShape();
  scale(0.8);
  stroke(ui.r2, ui.g2, ui.b2, thickness * 100);
  rotate(15);
  curveVertex(x, y);
  curveVertex(x, y);
  curveVertex((targetX + x) / 2 + 3 * sin(mouseX), (targetY + y) / 2);
  curveVertex(targetX, targetY);
  curveVertex(targetX, targetY);
  endShape();
  scale(1.25);

  beginShape();
  scale(1.2);
  stroke(ui.r3, ui.g3, ui.b3, thickness * 100);
  rotate(15);
  curveVertex(x, y);
  curveVertex(x, y);
  curveVertex((targetX + x) / 2 + 3 * sin(mouseX), (targetY + y) / 2);
  curveVertex(targetX, targetY);
  curveVertex(targetX, targetY);
  endShape();
  scale(1/1.2);

  // EXIT CONDITION
  if (len > ui.minLen) {
    len *= 0.95;
    fur(targetX, targetY, len, deg + abs(width / 2 - mouseX) + random(-5, 5));
    fur(-targetX, -targetY, len, deg + abs(width / 2 - mouseX) + random(-5, 5));
    fur(targetX, targetY, len, -deg - abs(width / 2 - mouseX) + random(-5, 5));
    fur(targetX, targetY, len, -deg + abs(width / 2 - mouseX) + random(-5, 5));
    // scale(0.5);
    // fur(targetX, targetY, len, -deg - abs(width / 2 - mouseX) + random(-5, 5));
    // fur(targetX, targetY, len, -deg + abs(width / 2 - mouseX) + random(-5, 5));
    // scale(2);
  }
}
