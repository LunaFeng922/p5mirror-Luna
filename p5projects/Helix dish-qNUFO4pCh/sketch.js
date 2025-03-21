let ui = {
  x: 20,
  len: 20,
  minLen: 16,
};

let gui;
let dandelions = []; // 保存蒲公英的数组

function setup() {
  createCanvas(600, 600);
  frameRate(30);
  gui = new dat.GUI();
  gui.add(ui, "x", 20, 250).onChange(updateUi);
  gui.add(ui, "len", 20, 40).onChange(updateUi);
  gui.add(ui, "minLen", 16, 32).onChange(updateUi);
}

function updateUi() {
  ui.minLen = map(ui.len, 20, 40, 16, 32);
  gui.updateDisplay();
  redraw();
}

function draw() {
  background(0, 50);
  translate(width / 2, height / 2);
  noFill();

  // 遍历蒲公英数组并绘制
  for (let d of dandelions) {
    fur(d.x, d.y, d.len, d.deg);
  }
}

function fur(x, y, len, deg) {
  let angle = radians(deg);
  let targetX = x + cos(angle) * len * random(0.5, 1);
  let targetY = y + sin(angle) * len * random(0.5, 1);
  let thickness = map(len, 40, 15, 1, 0.5);
  stroke(255, thickness * 100);
  strokeWeight(thickness);
  beginShape();
  rotate(10);
  curveVertex(x, y);
  curveVertex(x, y);
  curveVertex((targetX + x) / 2 + 3 * sin(mouseX), (targetY + y) / 2);
  curveVertex(targetX, targetY);
  curveVertex(targetX, targetY);
  endShape();

  // EXIT CONDITION
  if (len > ui.minLen) {
    len *= 0.95;
    fur(targetX, targetY, len, deg + mouseX + random(-5, 5));
    fur(-targetX, -targetY, len, deg + mouseX + random(-5, 5));
    fur(targetX, targetY, len, -deg - mouseX + random(-5, 5));
    fur(targetX, targetY, len, -deg + mouseX + random(-5, 5));
  }
}

function mousePressed() {
  // 在鼠标点击位置创建新的蒲公英并添加到数组
  dandelions.push({
    x: mouseX - width / 2,
    y: mouseY - height / 2,
    len: ui.len,
    deg: 0,
  });
}

