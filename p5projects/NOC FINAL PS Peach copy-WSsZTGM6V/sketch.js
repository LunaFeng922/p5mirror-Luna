let canvas;
let PEA_BRANCH_ANGLE;
let joints = [];
let branches = [];
let peaches = [];
let peachesleaves = [];
let mjoints = [];
let mbranches = [];
let waterfalls = [];

function setup() {
  canvas = createCanvas(1280, 720);
  noCursor();

  PEA_BRANCH_ANGLE = -PI / 20;
  let start4 = createVector((width * 5) / 6, -150);
  let start3 = createVector((width * 2) / 3, -160);
  let start2 = createVector(width / 2.5, -150);
  let start1 = createVector(width / 4.5, -100);
  joints.push(start1);

  branch(start4, 0, 150);

  joints.push(start4);

  branch(start3, 0, 180);

  joints.push(start3);

  branch(start2, 0, 140);

  joints.push(start1);

  branch(start1, 0, 120);

  let start5 = createVector(width / 1.2, height + 100);
  let start6 = createVector(width / 1.5, height + 200);
  mjoints.push(start5);
  mjoints.push(start6);
  mbranch(start5, 0, 120);
  mbranch(start6, 0, 50);
}

function draw() {
    let xOffset = sin(frameCount * 0.01) * 20;
  translate(xOffset, 0); 
  
  background(
    180 + 20 * sin(frameCount * 0.0001),
    220 + 20 * sin(frameCount * 0.0001),
    200 + 14 * sin(frameCount * 0.0001),
    70
  );

  let windForce = map(sin(frameCount * 0.05), -1, 1, -0.1, 0.1);

  let wind = createVector(windForce, 0);

  for (let i = 0; i < mbranches.length; i++) {
    mbranches[i].display();
  }

  if (waterfalls.length >= 1349) {
    waterfalls.shift();
  }

  waterfalls.push(new Waterfall(random(width), 1));

  for (let i = 0; i < waterfalls.length; i++) {
    let w = waterfalls[i];

    let gravity = createVector(0, 1 * w.mass);

    w.applyForce(gravity);

    let resistance = w.vel.copy();
    resistance.mult(-1);
    let speedr = w.vel.mag();

    let dragForce = speedr * speedr * 0.03;
    resistance.mult(dragForce);

    w.applyForce(resistance);

    w.update();

    w.display();
  }

  for (let i = 0; i < branches.length; i++) {
    branches[i].update(wind);
    branches[i].display();
  }
  for (let i = 0; i < joints.length; i++) {
    noStroke();
    noFill();
    fill(20, 0, 8);
    circle(joints[i].x + 3, joints[i].y, 6);
  }

  for (let i = 0; i < peachesleaves.length; i++) {
    peachesleaves[i].display();
  }

  for (let i = 0; i < peaches.length; i++) {
    peaches[i].display();
  }
}

function mbranch(from, angle, len, gen = 0) {
  let vector = p5.Vector.fromAngle(angle).setMag(len);
  let to = p5.Vector.add(from, vector);

  mjoints.push(to);

  let thickness = map(len, 110, 120, 10, 30);
  let stiffness = 0;

  // construct objects
  mbranches.push(new MBranch(from, to, thickness, 150, stiffness, gen));

  // alteration
  len = random(115, 120);
  gen++;

  // recursion
  if (gen >= 0 && gen < 3) {
    let angle1 = angle - PI / 3 + random(-0.1, 0.1);
    mbranch(to, angle1, len, gen);
  } else if (gen >= 3 && gen < 8) {
    let angle1 = angle + PEA_BRANCH_ANGLE * 0.7 - 0.4;
    mbranch(to, angle1, len, gen);
  } else if (gen >= 8 && gen < 10) {
    let angle1 = angle - PI / 3 + random(-0.1, 0.1);
    mbranch(to, angle1, len, gen);
  } else if (gen >= 10 && gen < 15) {
    let angle1 = angle - PEA_BRANCH_ANGLE * 0.7 - 0.4;
    mbranch(to, angle1, len, gen);
  } else if (gen >= 15 && gen < 17) {
    let angle1 = angle - PI / 3 + random(-0.1, 0.1);
    mbranch(to, angle1, len, gen);
  } else if (gen >= 17 && gen < 20) {
    let angle1 = angle + PEA_BRANCH_ANGLE * 0.7 - 0.4;
    mbranch(to, angle1, len, gen);
    if (random() < 0.2) {
      let angle2 = angle + 0.5 * PEA_BRANCH_ANGLE + random(-0.5, 0.5);
      mbranch(to, angle2, len, gen);
    }
    if (random() < 0.1) {
      let angle3 = angle - PEA_BRANCH_ANGLE * 0.8 + random(-0.5, 0.5);
      mbranch(to, angle3, len, gen);
    }
  } else if (gen >= 17 && gen < 22) {
    let angle1 = angle - PI / 30;
    mbranch(to, angle1, len, gen);
  }
}

function branch(from, angle, len, gen = 0) {
  let vector = p5.Vector.fromAngle(angle + PI / 2).setMag(len);
  let to = p5.Vector.add(from, vector);

  joints.push(to);

  let thickness = map(len, 35, 150, 0.5, 25);
  let stiffness = 0;

  // construct objects
  branches.push(new Branch(from, to, thickness, 150, stiffness, gen));

  if (gen >= 2 && gen <= 7) {
    if (random() < 0.8) {
      peachesleaves.push(new PeachesLeave(from, to, 1, 50));
    }
  }

  if (gen >= 3) {
    if (random() < 0.2) {
      peaches.push(new Peaches(from, to, 1, 50));
    }
  }

  // alteration
  len = (len * 5) / 6;
  gen++;

  // recursion
  if (gen >= 0 && gen < 3) {
    let angle1 = angle + PEA_BRANCH_ANGLE * 0.5 + random(-0.1, 0.1);
    branch(to, angle1, len, gen);

    let angle2 = angle - PEA_BRANCH_ANGLE * 0.5 + random(-0.1, 0.1);
    branch(to, angle2, len, gen);
  } else if (gen >= 3 && gen < 8) {
    if (random() < 0.5) {
      let angle1 = angle + PEA_BRANCH_ANGLE * 0.8 + random(-0.5, 0.5);
      branch(to, angle1, len, gen);
    }

    if (random() < 0.4) {
      let angle1 = angle + 0.5 * PEA_BRANCH_ANGLE + random(-0.5, 0.5);
      branch(to, angle1, len, gen);
    }

    if (random() < 0.3) {
      let angle3 = angle - 0.5 * PEA_BRANCH_ANGLE + random(-0.5, 0.5);
      branch(to, angle3, len, gen);
    }

    if (random() < 0.2) {
      let angle4 = angle - PEA_BRANCH_ANGLE * 0.8 + random(-0.5, 0.5);
      branch(to, angle4, len, gen);
    }
  }
}

class MBranch {
  constructor(from, to, thickness, len, stiffness, gen) {
    this.from = from;
    this.to = to;
    this.thickness = thickness;
    this.len = (len * thickness) / 40;
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
    this.len = (len * thickness) / 30;
    this.k = stiffness;
    this.bend = (random(-10, 10) * thickness) / 30;
    this.gen = gen;
    let inc = 5;
    this.col = color(
      25 + random(-20, 20) + gen * inc,
      17 + random(-10, 10) + gen * inc,
      8 + random(-20, 20) + gen * inc,
      200
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

class PeachesLeave {
  constructor(from, to, pct, size) {
    this.from = from;
    this.to = to;
    this.pct1 = pct * random(0.2, 0.5);
    this.pct2 = pct * random(0.5, 1);
    this.size = size * random(0.25, 0.5);
    this.col = color(
      20 + random(-5, 5),
      50 + random(-20, 20),
      16 + random(-5, 5),
      130
    );

    this.angle = random(PI * 2);
  }
  display() {
    let Px1 = lerp(this.from.x, this.to.x, this.pct1);
    let Py1 = lerp(this.from.y, this.to.y, this.pct1);

    push();
    translate(Px1, Py1); // anchor of the transformation
    rotate(this.angle); //
    noStroke();
    fill(this.col);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(3, 20);
    curveVertex(sin(frameCount * 0.05) * 2, 40);
    curveVertex(12, 20);
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape();
    rotate(PI / 10 + this.angle);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(3, -20);
    curveVertex(sin(frameCount * 0.05) * 2, -40);
    curveVertex(12, -20);
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape();
    pop();

    let Px2 = lerp(this.from.x, this.to.x, this.pct2);
    let Py2 = lerp(this.from.y, this.to.y, this.pct2);

    push();
    translate(Px2, Py2); // anchor of the transformation
    rotate(this.angle); //
    scale(0.9);
    noStroke();
    fill(this.col);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(3, -20);
    curveVertex(sin(frameCount * 0.05) * 2, -40);
    curveVertex(10, -20);
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape();
    rotate(PI / 10 + this.angle);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(3, -20);
    curveVertex(sin(frameCount * 0.05) * 2, -40);
    curveVertex(10, -20);
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape();
    pop();
  }
}

class Peaches {
  constructor(from, to, pct, size) {
    this.from = from;
    this.to = to;
    this.pct = pct * random(0.2, 0.8);
    this.size = size * random(0.8, 1);
    this.angle = random(PI * 2);

    this.col1 = color(
      250 + random(-30, 30),
      150 + random(-10, 10),
      140 + random(-10, 10),
      170
    );

    this.col2 = color(
      255 + random(-30, 30),
      280 + random(-10, 10),
      200 + random(-10, 10),
      70
    );
  }
  display() {
    let Px = lerp(this.from.x, this.to.x, this.pct);
    let Py = lerp(this.from.y, this.to.y, this.pct);

    push();
    translate(Px, Py + this.size);
    rotate(PI);
    noStroke();
    fill(this.col1);
    beginShape();
    curveVertex(sin(frameCount * 0.05) * 2, 0);
    curveVertex(sin(frameCount * 0.05) * 2, 0);
    curveVertex(-this.size / 3, this.size / 2);
    curveVertex(0, this.size * 0.8);
    curveVertex(this.size / 3, this.size / 2);
    curveVertex(sin(frameCount * 0.05) * 2, 0);
    curveVertex(sin(frameCount * 0.05) * 2, 0);
    endShape();
    rotate(PI / 10);
    beginShape();
    curveVertex(sin(frameCount * 0.05) * 2, 0);
    curveVertex(sin(frameCount * 0.05) * 2, 0);
    curveVertex(-this.size / 3, this.size / 2);
    curveVertex(0, this.size * 0.8);
    curveVertex(this.size / 3, this.size / 2);
    curveVertex(sin(frameCount * 0.05) * 2, 0);
    curveVertex(sin(frameCount * 0.05) * 2, 0);
    endShape();
    pop();

    push();
    translate(Px, Py + this.size);
    rotate(PI);
    noStroke();
    fill(this.col2);
    beginShape();
    curveVertex(sin(frameCount * 0.05) * 2, 0);
    curveVertex(sin(frameCount * 0.05) * 2, 0);
    curveVertex(-this.size / 3, this.size / 2);
    curveVertex(0, this.size * 0.8);
    curveVertex(this.size / 3, this.size / 2);
    curveVertex(sin(frameCount * 0.05) * 2, 0);
    curveVertex(sin(frameCount * 0.05) * 2, 0);
    endShape();
    pop();
  }
}

class Waterfall {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.rad = random(1, 20);
    this.mass = this.rad;
  }

  applyForce(f) {
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255);
    ellipse(0, 0, this.rad * 0.1, this.rad * 30);
    pop();
  }
}

function keyPressed() {
  if (key == "f") {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
