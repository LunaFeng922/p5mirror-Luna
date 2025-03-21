//Finding references in the NOC example code by Prof. Moon.
let canvas;
let bgColor;

let joints = [];
let branches = [];
let openflowers = [];
let closeflowers = [];
let knots = [];

let sjoints = [];
let sbranches = [];

let lls = [];

let dragonflys = [];

function setup() {
  canvas = createCanvas(1280, 720);

  noCursor();

  let start1 = createVector(width / 5, random((height * 5) / 6, height) - 20);

  let start2 = createVector(width / 3, random((height * 5) / 6, height) - 20);
  let start3 = createVector(width / 1.8, random((height * 5) / 6, height) - 20);
  let start4 = createVector(width / 1.5, random((height * 5) / 6, height) - 20);
  let start5 = createVector(
    (width * 4) / 5,
    random((height * 5) / 6, height) - 20
  );
  let start6 = createVector(
    (width * 7) / 8,
    random((height * 5) / 6, height) - 20
  );
  joints.push(start1);
  branch(start1, 0, 115);

  joints.push(start2);
  branch(start2, 0, 130);

  joints.push(start3);
  branch(start3, 0, 115);

  joints.push(start4);
  branch(start4, 0, 130);

  joints.push(start5);
  branch(start5, 0, 115);

  joints.push(start6);
  branch(start6, 0, 130);

  sjoints.push(start1);
  sjoints.push(start2);
  sjoints.push(start3);
  sjoints.push(start4);
  sjoints.push(start5);
  sjoints.push(start6);
  sbranch(start1, 0, 115);
  sbranch(start2, 0, 130);
  sbranch(start3, 0, 115);
  sbranch(start4, 0, 130);
  sbranch(start5, 0, 115);
  sbranch(start6, 0, 130);

  for (let i = 0; i < 30; i++) {
    lls.push(
      new LL(random(width), random((height * 2) / 3, height), random(80, 100))
    );
  }

  for (let i = 0; i < 7; i++) {
    let x = random(width / 2);
    let y = random(height / 2);
    dragonflys.push(new Dragonfly(x, y));
  }
}

function draw() {
  let xOffset = sin(frameCount * 0.01) * 20;
  translate(xOffset, 0);

  bgColor = color(
    map(sin(frameCount * 0.01), -1, 1, 250, 200),
    map(sin(frameCount * 0.01), -1, 1, 220, 250),
    map(sin(frameCount * 0.01), -1, 1, 180, 240),
    70
  );
  background(bgColor);

//   for (let x = 0; x < width / 1.8; x++) {
//     let freq = x * 0.03 + frameCount * 0.02;
//     let amp = 20;
//     let sinValue = sin(freq) * amp;
//     let noiseValue = noise(x * 0.02, frameCount * 0.05) * 20;
//     push();
//     noStroke();
//     fill(255, 80);
//     circle(
//       x - 20,
//       250 - sinValue + random(-5, 5) - 20 + noiseValue,
//       random(0.5, 2)
//     );
//     scale(1.2, 1);
//     circle(
//       x - 20,
//       200 - sinValue + random(-5, 5) - 20 + noiseValue,
//       random(0.5, 2)
//     );
//     pop();
//   }

//   for (let x = 350; x < width; x++) {
//     let freq = -x * 0.03 + frameCount * 0.02;
//     let amp = 20;
//     let sinValue = sin(freq) * amp;
//     let noiseValue = noise(x * 0.02, frameCount * 0.05) * 20;
//     push();
//     noStroke();
//     fill(255, 80);
//     circle(
//       x - 20,
//       300 - sinValue + random(-5, 5) + 20 + noiseValue,
//       random(0.5, 2)
//     );
//     scale(1.2, 1);
//     circle(
//       x - 20,
//       300 - sinValue + random(-5, 5) + 20 + noiseValue,
//       random(0.5, 2)
//     );
//     pop();
//   }

  let windForce = map(sin(frameCount * 0.05), -1, 1, -0.05, 0.05);

  let wind = createVector(windForce, 0);

  for (let i = 0; i < sbranches.length; i++) {
    sbranches[i].display();
  }

  for (let i = 0; i < lls.length; i++) {
    let ll = lls[i];
    ll.applyGravitationalAttraction(lls);
    ll.update();
    ll.limitVelocity(5);
    ll.bounce();
    ll.display();
  }

  push();
  noStroke();
  fill(225 * 0.8, 255 * 0.8, 240 * 0.8, 40);
  beginShape();
  curveVertex(20 * sin(frameCount * 0.01), height);
  curveVertex(20 * sin(frameCount * 0.01), height);
  curveVertex(20 * sin(frameCount * 0.01), height - 50);
  curveVertex(
    sjoints[1].x + 20 * sin(frameCount * 0.01),
    sjoints[1].y - 20 - 20 * abs(sin(frameCount * 0.01))
  );
  curveVertex(
    sjoints[3].x + 20 * sin(frameCount * 0.01),
    sjoints[3].y - 20 - 20 * abs(sin(frameCount * 0.01))
  );
  curveVertex(
    sjoints[4].x + 20 * sin(frameCount * 0.01),
    sjoints[4].y - 20 - 20 * abs(sin(frameCount * 0.01))
  );

  curveVertex(
    sjoints[5].x + 20 * sin(frameCount * 0.01),
    sjoints[5].y - 20 - 20 * abs(sin(frameCount * 0.01))
  );
  curveVertex(width + 20 * sin(frameCount * 0.01), height - 50);
  curveVertex(width + 20 * sin(frameCount * 0.01), height);
  curveVertex(width + 20 * sin(frameCount * 0.01), height);
  endShape();
  pop();

  push();
  translate(-20, -180);
  noStroke();
  fill(255 * 0.8, 240 * 0.8, 220 * 0.8, 20);
  beginShape();
  curveVertex(20 * sin(frameCount * 0.01), height + 180);
  curveVertex(20 * sin(frameCount * 0.01), height + 180);
  curveVertex(20 * sin(frameCount * 0.01), height);
  curveVertex(
    sjoints[2].x + 20 * sin(frameCount * 0.01),
    sjoints[2].y - 20 - 20 * abs(sin(frameCount * 0.01))
  );

  curveVertex(
    sjoints[4].x + 20 * sin(frameCount * 0.01),
    sjoints[4].y - 20 - 20 * abs(sin(frameCount * 0.01))
  );
  curveVertex(width + 20, height - 50);
  curveVertex(width + 20, height + 180);
  curveVertex(width + 20, height + 180);
  endShape();
  pop();

  for (let i = 0; i < branches.length; i++) {
    branches[i].update(wind);
    branches[i].display();
  }

  for (let i = 0; i < knots.length; i++) {
    knots[i].display();
  }

  for (let i = 0; i < openflowers.length; i++) {
    openflowers[i].display();
  }
  for (let i = 0; i < closeflowers.length; i++) {
    closeflowers[i].display();
  }

  for (let i = 0; i < dragonflys.length; i++) {
    let target = createVector(mouseX, mouseY);
    dragonflys[i].seek(target);
    dragonflys[i].avoidbut(dragonflys);
    dragonflys[i].avoidbran(branches);
    dragonflys[i].update();
    dragonflys[i].reappear();
    dragonflys[i].display();
    dragonflys[i].waving = 5 * sin(frameCount * 0.05 + i * 0.5);
  }
}

function keyPressed() {
  if (key == "f") {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function sbranch(from, angle, len, gen = 0) {
  let vector = p5.Vector.fromAngle(angle + PI / 6).setMag(len);
  let to = p5.Vector.add(from, vector);

  sjoints.push(to);

  let thickness = map(len, 110, 120, 20, 30);
  let stiffness = 0.5;

  // construct objects
  sbranches.push(new SBranches(from, to, thickness, len, stiffness, gen));

  // alteration
  len = (len * 7) / 8;
  gen++;

  // recursion
  if (gen >= 0 && gen < 3) {
    let angle1 = angle + PI / 20 + random(-0.4, 0.3);
    sbranch(to, angle1, len, gen);
  }
}

function branch(from, angle, len, gen = 0) {
  let vector = p5.Vector.fromAngle(angle - PI / 2).setMag(len);
  let to = p5.Vector.add(from, vector);

  joints.push(to);

  let thickness = map(len, 30, 50, 0.5, 3);
  let stiffness = 0.3;

  // construct objects
  branches.push(new Branch(from, to, thickness, 100, stiffness, gen));

  if (gen >= 0 && gen <= 3) {
    if (random() < 0.8) {
      knots.push(new Knots(from, to, 1, 20));
    }
  }

  if (gen == 2) {
    if (random() < 0.3) {
      openflowers.push(new OpenFlowers(from, to, 50));
    }
  }

  if (gen == 2) {
    closeflowers.push(new CloseFlowers(from, to, 50));
  }

  len = (len * 7) / 8;
  gen++;

  if (gen >= 0 && gen < 3) {
    let angle1 = angle + PI / 20 + random(-0.4, 0.3);
    branch(to, angle1, len, gen);
  }
}

class SBranches {
  constructor(from, to, thickness, len, stiffness, gen) {
    this.from = from;
    this.to = to;
    this.thickness = thickness;
    this.len = len;
    this.k = stiffness;
    this.bend = (random(-10, 10) * thickness) / 30;
    this.gen = gen;
  }

  display() {
    let midX1 = lerp(this.from.x, this.to.x, 1 / 6);
    let midY1 = lerp(this.from.y, this.to.y, 1 / 6);

    let midX2 = lerp(this.from.x, this.to.x, 1 / 3);
    let midY2 = lerp(this.from.y, this.to.y, 1 / 3);

    let midX3 = lerp(this.from.x, this.to.x, 1 / 2);
    let midY3 = lerp(this.from.y, this.to.y, 1 / 2);

    let midX4 = lerp(this.from.x, this.to.x, 2 / 3);
    let midY4 = lerp(this.from.y, this.to.y, 2 / 3);

    let midX5 = lerp(this.from.x, this.to.x, 5 / 6);
    let midY5 = lerp(this.from.y, this.to.y, 5 / 6);
    push();
    stroke(140);
    noFill();

    beginShape();
    strokeWeight(this.thickness);

    curveVertex(this.from.x, this.from.y);
    curveVertex(this.from.x, this.from.y);
    curveVertex(midX1 + this.bend, midY1);
    curveVertex(midX2 + this.bend * 0.4, midY2);
    curveVertex(midX2 + this.bend * 0.4, midY2);
    endShape();

    beginShape();
    strokeWeight(this.thickness * 0.95);
    curveVertex(midX2 + this.bend * 0.4, midY2);
    curveVertex(midX2 + this.bend * 0.4, midY2);
    curveVertex(midX3, midY3);
    curveVertex(midX4 - this.bend * 0.4, midY4);
    curveVertex(midX4 - this.bend * 0.4, midY4);
    endShape();

    beginShape();
    strokeWeight(this.thickness * 0.9);
    curveVertex(midX4 - this.bend * 0.4, midY4);
    curveVertex(midX4 - this.bend * 0.4, midY4);
    curveVertex(midX5 - this.bend, midY5);
    curveVertex(this.to.x, this.to.y);
    curveVertex(this.to.x, this.to.y);
    endShape();
    pop();
  }
}

class Branch {
  constructor(from, to, thickness, len, stiffness, gen) {
    this.from = from;
    this.to = to;
    this.thickness = thickness;
    this.len = len;
    this.k = stiffness;
    this.bend = (random(-10, 10) * thickness) / 30;
    this.gen = gen;
    let inc = 5;
    this.col = color(
      10 + random(-20, 20) + gen * inc,
      25 + random(-10, 10) + gen * inc,
      8 + random(-20, 20) + gen * inc,
      80
    );
  }

  update(wind) {
    let vector = p5.Vector.sub(this.to, this.from);
    let distance = vector.mag();
    let stretch = distance - this.len;
    let force = vector
      .copy()
      .normalize()
      .mult(stretch * this.k);

    force.add(wind);
    this.from.add(force);
    this.to.sub(force);
  }

  display() {
    let midX1 = lerp(this.from.x, this.to.x, 1 / 6);
    let midY1 = lerp(this.from.y, this.to.y, 1 / 6);

    let midX2 = lerp(this.from.x, this.to.x, 1 / 3);
    let midY2 = lerp(this.from.y, this.to.y, 1 / 3);

    let midX3 = lerp(this.from.x, this.to.x, 1 / 2);
    let midY3 = lerp(this.from.y, this.to.y, 1 / 2);

    let midX4 = lerp(this.from.x, this.to.x, 2 / 3);
    let midY4 = lerp(this.from.y, this.to.y, 2 / 3);

    let midX5 = lerp(this.from.x, this.to.x, 5 / 6);
    let midY5 = lerp(this.from.y, this.to.y, 5 / 6);
    push();
    stroke(this.col);
    noFill();

    beginShape();
    strokeWeight(this.thickness);

    curveVertex(this.from.x, this.from.y);
    curveVertex(this.from.x, this.from.y);
    curveVertex(midX1 + this.bend, midY1);
    curveVertex(midX2 + this.bend * 0.4, midY2);
    curveVertex(midX2 + this.bend * 0.4, midY2);
    endShape();

    beginShape();
    strokeWeight(this.thickness * 0.95);
    curveVertex(midX2 + this.bend * 0.4, midY2);
    curveVertex(midX2 + this.bend * 0.4, midY2);
    curveVertex(midX3, midY3);
    curveVertex(midX4 - this.bend * 0.4, midY4);
    curveVertex(midX4 - this.bend * 0.4, midY4);
    endShape();

    beginShape();
    strokeWeight(this.thickness * 0.9);
    curveVertex(midX4 - this.bend * 0.4, midY4);
    curveVertex(midX4 - this.bend * 0.4, midY4);
    curveVertex(midX5 - this.bend, midY5);
    curveVertex(this.to.x, this.to.y);
    curveVertex(this.to.x, this.to.y);
    endShape();
    pop();
  }
}

class Knots {
  constructor(from, to, pct, size) {
    this.from = from;
    this.to = to;
    this.pct1 = pct * random(0.2, 0.5);
    this.pct2 = pct * random(0.5, 1);
    this.size = size * random(0.5, 0.8);
    this.angle = random(PI * 2);
  }
  display() {
    let Px1 = lerp(this.from.x, this.to.x, this.pct1);
    let Py1 = lerp(this.from.y, this.to.y, this.pct1);

    push();
    translate(Px1, Py1); // anchor of the transformation
    rotate(this.angle); //
    noStroke();
    fill(0);
    circle(-5, 0, this.size);
    pop();

    let Px2 = lerp(this.from.x, this.to.x, this.pct2);
    let Py2 = lerp(this.from.y, this.to.y, this.pct2);

    push();
    translate(Px2, Py2); // anchor of the transformation
    rotate(this.angle); //
    noStroke();
    fill(0);
    circle(0, 5, this.size);
    pop();
  }
}

class OpenFlowers {
  constructor(from, to, size) {
    this.from = from;
    this.to = to;
    this.size = size * random(0.8, 1);
    this.angle = random(-PI / 9, PI / 9);

    this.col1 = color(
      250 + random(-30, 30),
      150 + random(-10, 10),
      140 + random(-10, 10),
      20
    );

    this.col2 = color(
      250 + random(-30, 30),
      150 + random(-10, 10),
      140 + random(-10, 10),
      40
    );
  }
  display() {
    push();
    translate(this.to.x, this.to.y);
    strokeWeight(random(0.5, 1.5));
    stroke(255, 80);
    fill(this.col1);
    scale(1.5);
    rotate(PI / 15);
    beginShape();
    curveVertex(sin(frameCount * 0.05), -this.size * 1.8);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.8);
    curveVertex(-this.size / 3, (-this.size * 1.8) / 2);
    curveVertex(0, 0);
    curveVertex(this.size / 3, (-this.size * 1.8) / 2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.8);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.8);
    endShape();
    rotate(PI / 15);
    beginShape();
    curveVertex(sin(frameCount * 0.05), -this.size * 1.8);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.8);
    curveVertex(-this.size / 3, (-this.size * 1.8) / 2);
    curveVertex(0, 0);
    curveVertex(this.size / 3, (-this.size * 1.8) / 2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.8);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.8);
    endShape();
    rotate((-3 * PI) / 15);
    beginShape();
    curveVertex(sin(frameCount * 0.05), -this.size * 1.8);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.8);
    curveVertex(-this.size / 3, (-this.size * 1.8) / 2);
    curveVertex(0, 0);
    curveVertex(this.size / 3, (-this.size * 1.8) / 2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.8);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.8);
    endShape();
    rotate(PI / 15 - PI / 10);
    fill(this.col2);
    beginShape();
    curveVertex(sin(frameCount * 0.05), -this.size * 1.5);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.5);
    curveVertex(-this.size / 3, (-this.size * 1.5) / 2);
    curveVertex(0, 0);
    curveVertex(this.size / 3, (-this.size * 1.5) / 2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.5);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.5);
    endShape();
    rotate(PI / 3);
    fill(this.col1);
    beginShape();
    curveVertex(sin(frameCount * 0.05), -this.size * 1.3);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.3);
    curveVertex(-this.size / 3, (-this.size * 1.3) / 2);
    curveVertex(0, 0);
    curveVertex(this.size / 3, (-this.size * 1.3) / 2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.3);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.3);
    endShape();
    rotate(-PI / 2);
    fill(this.col2);
    beginShape();
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    curveVertex(-this.size / 3, (-this.size * 1.2) / 2);
    curveVertex(0, 0);
    curveVertex(this.size / 3, (-this.size * 1.2) / 2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    endShape();
    rotate(PI / 1.5);
    fill(this.col1);
    beginShape();
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    curveVertex(-this.size / 3, (-this.size * 1.2) / 2);
    curveVertex(0, 0);
    curveVertex(this.size / 3, (-this.size * 1.2) / 2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    endShape();

    pop();
  }
}

class CloseFlowers {
  constructor(from, to, size) {
    this.from = from;
    this.to = to;
    this.size = size * random(0.8, 1);
    this.angle = random(-PI / 9, PI / 9);

    this.col1 = color(
      250 + random(-30, 30),
      100 + random(-10, 10),
      90 + random(-10, 10),
      20
    );

    this.col2 = color(
      250 + random(-30, 30),
      100 + random(-10, 10),
      90 + random(-10, 10),
      20
    );

    this.col3 = color(3, 50 + random(-10, 10), 6, 50);
  }
  display() {
    push();
    translate(this.to.x, this.to.y);
    strokeWeight(random(0.5, 1.5));
    stroke(255, 80);
    fill(this.col1);
    rotate(this.angle);
    rotate(PI / 15);
    beginShape();
    curveVertex(sin(frameCount * 0.05), -this.size * 1.8);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.8);
    curveVertex(-this.size / 3, (-this.size * 1.8) / 2);
    curveVertex(0, 0);
    curveVertex(this.size / 3, (-this.size * 1.8) / 2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.8);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.8);
    endShape();
    rotate(-PI / 15);
    fill(this.col2);
    beginShape();
    curveVertex(sin(frameCount * 0.05), -this.size * 1.5);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.5);
    curveVertex(-this.size / 3, (-this.size * 1.5) / 2);
    curveVertex(0, 0);
    curveVertex(this.size / 3, (-this.size * 1.5) / 2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.5);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.5);
    endShape();
    rotate(PI / 7);
    fill(this.col1);
    beginShape();
    curveVertex(sin(frameCount * 0.05), -this.size * 1.3);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.3);
    curveVertex(-this.size / 3, (-this.size * 1.3) / 2);
    curveVertex(0, 0);
    curveVertex(this.size / 3, (-this.size * 1.3) / 2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.3);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.3);
    endShape();
    rotate(-PI / 5);
    fill(this.col2);
    beginShape();
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    curveVertex(-this.size / 3, (-this.size * 1.2) / 2);
    curveVertex(0, 0);
    curveVertex(this.size / 3, (-this.size * 1.2) / 2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    endShape();
    pop();

    push();
    translate(this.to.x, this.to.y);
    rotate(PI / 7);
    scale(0.5);
    noStroke();
    fill(this.col3);
    beginShape();
    curveVertex(sin(frameCount * 0.05), -this.size * 1.3);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.3);
    curveVertex(-this.size / 3, (-this.size * 1.3) / 2);
    curveVertex(0, 0);
    curveVertex(this.size / 3, (-this.size * 1.3) / 2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.3);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.3);
    endShape();
    rotate(-PI / 5);
    scale(0.8);
    beginShape();
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    curveVertex(-this.size / 3, (-this.size * 1.2) / 2);
    curveVertex(0, 0);
    curveVertex(this.size / 3, (-this.size * 1.2) / 2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    endShape();
    rotate(-PI / 5);
    scale(0.8);
    beginShape();
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    curveVertex(-this.size / 3, (-this.size * 1.2) / 2);
    curveVertex(0, 0);
    curveVertex(this.size / 3, (-this.size * 1.2) / 2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    curveVertex(sin(frameCount * 0.05), -this.size * 1.2);
    endShape();
    pop();
  }
}

class LL {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = this.rad * 0.5;
    this.col = color(
      20 + random(-10, 10),
      50 + random(-10, 10),
      45 + random(-10, 10),
      80
    );
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(f) {
    if (this.mass > 0) {
      let force = p5.Vector.div(f, this.mass);
      this.acc.add(force);
    }
  }

  applyGravitationalAttraction(other) {
    for (let i = 0; i < lls.length; i++) {
      let other = lls[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);
        let magnitude = (this.mass * other.mass) / (distance * distance);
        let force = p5.Vector.sub(other.pos, this.pos);
        force.normalize();
        force.mult(magnitude * 0.1);
        if (distance < this.rad) {
          force.mult(-1);
          force.mult(3);
        }
        this.applyForce(force);
        this.acc.limit(10);
      }
    }
  }

  limitVelocity(mag) {
    this.vel.limit(mag);
  }
  bounce() {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -0.9 * this.vel.x;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -0.9 * this.vel.x;
    }
    if (this.pos.y < height / 1.8) {
      this.pos.y = height / 1.8;
      this.vel.y = -0.9 * this.vel.y;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -0.9 * this.vel.y;
    }
  }

  display() {
    let farnear = map(dist(0, this.pos.y, 0, height), 0, height, 1, 2);
    push();
    translate(this.pos.x, this.pos.y);
    scale(1 / farnear);
    strokeWeight(random(0.5, 2));
    stroke(255, 80);
    fill(this.col);
    ellipse(0, 0, this.rad * 2, this.rad);
    noFill();
    ellipse(
      3 * sin(frameCount * 0.001),
      3 * cos(frameCount * 0.001),
      this.rad * 2,
      this.rad
    );
    pop();
  }
}

class Dragonfly {
  constructor(x, y, color) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    //
    this.size = random(15, 18);
    this.mass = 1.5;
    //
    this.maxSpeed = 2;
    this.maxSteerForce = 0.1;
    //
    this.brakeRad = 10;
    this.senseRad = 10;
    this.col = color;
    //
    this.waving = 5 * sin(frameCount * 0.05);

    this.angle = 0;
  }
  attracted(target) {
    let vector = p5.Vector.sub(target, this.pos);
    vector.mult(1);
    this.applyForce(vector);
    //
    this.vel.mult(0.9);
  }
  seek(target) {
    let desiredVel = p5.Vector.sub(target, this.pos);
    let distance = desiredVel.mag();

    desiredVel.normalize(); // direction

    // arriving
    if (distance < this.brakeRad) {
      let speed = map(distance, 0, this.brakeRad, 0, this.maxSpeed);
      desiredVel.mult(speed * 0.5);
    } else {
      desiredVel.mult(this.maxSpeed * 0.5); // desire
    }

    let steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxSteerForce);

    this.applyForce(steerForce);
  }
  avoidbut(dragonflys) {
    for (let dragonfly of dragonflys) {
      if (this === dragonfly) continue;
      let desiredVel = p5.Vector.sub(dragonfly.pos, this.pos);
      let distance = desiredVel.mag();
      desiredVel.normalize(); // direction
      if (distance > this.senseRad + 50) continue;
      desiredVel.mult(-this.maxSpeed);

      let steerForce = p5.Vector.sub(desiredVel, this.vel);
      steerForce.limit(this.maxSteerForce * 0.5); //***

      this.applyForce(steerForce);
    }
  }
  avoidbran(branches) {
    for (let i = 0; i < branches.length; i++) {
      let branch = branches[i];

      let desiredVecFrom = p5.Vector.sub(branch.from, this.pos);
      let desiredVecTo = p5.Vector.sub(branch.to, this.pos);

      let distanceFrom = desiredVecFrom.mag();
      let distanceTo = desiredVecTo.mag();

      if (distanceFrom < this.senseRad + 50) {
        desiredVecFrom.normalize();
        desiredVecFrom.mult(this.maxSpeed);
        desiredVecFrom.mult(-1);

        let steerForceFrom = p5.Vector.sub(desiredVecFrom, this.vel);
        steerForceFrom.limit(this.maxSteerForce);

        this.applyForce(steerForceFrom);
      }

      if (distanceTo < this.senseRad + 50) {
        desiredVecTo.normalize();
        desiredVecTo.mult(this.maxSpeed);
        desiredVecTo.mult(-1); // *** flip this to avoid!

        let steerForceTo = p5.Vector.sub(desiredVecTo, this.vel);
        steerForceTo.limit(this.maxSteerForce);

        this.applyForce(steerForceTo);
      }
    }
  }
  reappear() {
    if (this.pos.x < 0) {
      this.pos.x = 0;
    } else if (this.pos.x > width) {
      this.pos.x = width;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
    } else if (this.pos.y > height) {
      this.pos.y = height;
    }
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }
  applyForce(f) {
    if (this.mass <= 0) {
      console.log("Wrong mass");
      return;
    }
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }
  display() {
    push();
    noStroke();
    //stroke(20, 50, 30, 60);
    //strokeWeight(2);
    translate(this.pos.x, this.pos.y);
    if (mouseX >= this.pos.x) {
      rotate(this.angle);
      line(0, 0, -this.size * 2, 0);
      rotate(PI / 6);
      line(0, 0, -this.size, 0);
      rotate(PI / 6);
      line(0, 0, -this.size, 0);
    } else {
      rotate(-this.angle);
      line(0, 0, -this.size * 2, 0);
      rotate(-PI / 6);
      line(0, 0, -this.size, 0);
      rotate(-PI / 6);
      line(0, 0, -this.size, 0);
    }
    pop();
  }
}
