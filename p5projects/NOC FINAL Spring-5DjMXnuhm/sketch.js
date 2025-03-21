//Finding references in the NOC example code by Prof. Moon.
let canvas;
let joints = [];
let branches = [];
let malus = [];
let malusleaves = [];
let butterflys = [];
let rains = [];

function setup() {
  canvas = createCanvas(1280, 720);

  noCursor();

  let start1 = createVector((width * 2) / 3, height + 110);
  joints.push(start1);

  let start2 = createVector(width / 3, height + 120);
  joints.push(start2);

  branch(start1, PI / 15, 130);
  branch(start2, -PI / 20, 120);

  for (let i = 0; i < 1; i++) {
    let x = random(width / 2);
    let y = random(height / 2);
    butterflys.push(new Butterfly(x, y));
  }
}

function draw() {
  let xOffset = sin(frameCount * 0.01) * 20;
  translate(xOffset, 0);

  background(
    100 + 100 * sin(frameCount * 0.0001),
    120 + 120 * sin(frameCount * 0.0001),
    130 + 130 * sin(frameCount * 0.0001),
    70
  );

  let windForce = map(sin(frameCount * 0.05), -1, 1, -0.1, 0.1);

  let wind = createVector(windForce, 0);

  for (let i = 0; i < branches.length; i++) {
    branches[i].update(wind);
    branches[i].display();
  }

  for (let i = 0; i < malusleaves.length; i++) {
    malusleaves[i].display();
  }

  for (let i = 0; i < malus.length; i++) {
    malus[i].display();
  }

  for (let i = 0; i < butterflys.length; i++) {
    let target = createVector(mouseX, mouseY);
    butterflys[i].seek(target);
    butterflys[i].avoidbut(butterflys);
    butterflys[i].avoidbran(branches);
    butterflys[i].update();
    butterflys[i].reappear();
    butterflys[i].display();
    butterflys[i].waving = 5 * sin(frameCount * 0.05 + i * 0.5);
  }

  if (rains.length >= 439) {
    rains.shift();
  }

  rains.push(new Rain(random(width), 1));

  for (let i = 0; i < rains.length; i++) {
    let r = rains[i];

    let gravity = createVector(0, 1 * r.mass);

    let wind = createVector(sin(frameCount * 0.005), 0);

    r.applyForce(gravity);
    r.applyForce(wind);

    let resistance = r.vel.copy();
    resistance.mult(-1);
    let speedr = r.vel.mag();

    let dragForce = speedr * speedr * 0.03;
    resistance.mult(dragForce);

    r.applyForce(resistance);

    r.update();

    r.display();
  }
}

function keyPressed() {
  if (key == "f") {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function branch(from, angle, len, gen = 0) {
  let vector = p5.Vector.fromAngle(angle - PI / 2).setMag(len);
  let to = p5.Vector.add(from, vector);

  joints.push(to);

  let thickness = map(len, 35, 150, 0.5, 30);
  let stiffness = 0;

  branches.push(new Branch(from, to, thickness, 150, stiffness, gen));

  if (gen >= 1 && gen <= 7) {
    if (random() < 0.8) {
      malusleaves.push(new MalusLeave(from, to, 1, 50));
    }
  }

  if (gen >= 3) {
    if (random() < 0.3) {
      malus.push(new Malus(from, to, 1));
    }
  }

  // alteration
  len = (len * 5) / 6;
  gen++;

  // recursion
  if (gen >= 0 && gen < 3) {
    let angle1 = angle - (PI / 9) * 0.5 + random(-0.1, 0.1);
    branch(to, angle1, len, gen);

    let angle2 = angle + (PI / 9) * 0.5 + random(-0.1, 0.1);
    branch(to, angle2, len, gen);
  } else if (gen >= 3 && gen < 8) {
    if (random() < 0.5) {
      let angle1 = angle - (PI / 9) * 0.8 + random(-0.5, 0.5);
      branch(to, angle1, len, gen);
    }

    if (random() < 0.4) {
      let angle2 = angle - (0.5 * PI) / 9 + random(-0.5, 0.5);
      branch(to, angle2, len, gen);
    }

    if (random() < 0.4) {
      let angle3 = angle + (0.5 * PI) / 9 + random(-0.5, 0.5);
      branch(to, angle3, len, gen);
    }

    if (random() < 0.5) {
      let angle4 = angle + (PI / 9) * 0.8 + random(-0.5, 0.5);
      branch(to, angle4, len, gen);
    }
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

class MalusLeave {
  constructor(from, to, pct, size) {
    this.from = from;
    this.to = to;
    this.pct1 = pct * random(0.2, 0.5);
    this.pct2 = pct * random(0.5, 1);
    this.size = size * random(0.25, 0.4);
    this.col = color(
      10 + random(-5, 5),
      25 + random(-20, 20),
      8 + random(-5, 5),
      130
    );

    this.angle = random(PI * 2);
  }
  display() {
    let Px1 = lerp(this.from.x, this.to.x, this.pct1);
    let Py1 = lerp(this.from.y, this.to.y, this.pct1);

    push();
    translate(Px1, Py1); // anchor of the transformation
    rotate(this.angle);
    scale(0.9);
    noStroke();
    fill(this.col);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(-6, 20);
    curveVertex(sin(frameCount * 0.05) * 4, 50);
    curveVertex(6, 20);
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape();
    rotate(PI / 10 + this.angle);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(-6, -20);
    curveVertex(sin(frameCount * 0.05) * 4, -50);
    curveVertex(6, -20);
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape();
    pop();

    let Px2 = lerp(this.from.x, this.to.x, this.pct2);
    let Py2 = lerp(this.from.y, this.to.y, this.pct2);

    push();
    translate(Px2, Py2); // anchor of the transformation
    rotate(this.angle);
    scale(0.9);
    noStroke();
    fill(this.col);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(-8, -20);
    curveVertex(sin(frameCount * 0.05) * 4, -50);
    curveVertex(8, -20);
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape();
    rotate(PI / 10 + this.angle);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(-8, -20);
    curveVertex(sin(frameCount * 0.05) * 4, -50);
    curveVertex(8, -20);
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape();
    pop();
  }
}

class Malus {
  constructor(from, to, pct) {
    this.from = from;
    this.to = to;
    this.pct = pct * random(0.2, 0.8);
    this.angle = random(PI * 2);

    this.col = color(
      280 + random(-30, 30),
      200 + random(-10, 10),
      200 + random(-10, 10),
      180
    );
  }
  display() {
    let drawShape = () => {
      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      curveVertex(-7, -18);
      curveVertex(sin(frameCount * 0.05) * 4, -27);
      curveVertex(7, -18);
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();
    };

    let drawShapes = () => {
      for (let i = 0; i < 5; i++) {
        rotate(PI / 2.5);
        drawShape();
      }
      rotate(PI / 6);
      drawShape();
    };

    let Px = lerp(this.from.x, this.to.x, this.pct);
    let Py = lerp(this.from.y, this.to.y, this.pct);

    push();
    translate(Px, Py);
    rotate(this.angle);
    scale(0.6);
    noStroke();
    fill(this.col);
    drawShapes();
    pop();

    push();
    translate(Px, Py);
    noStroke();
    fill(255);
    circle(0, 0, 5);
    pop();

    push();
    translate(Px, Py);
    rotate(this.angle);
    noStroke();
    fill(255, 255, 200);
    circle(sin(frameCount * 0.05) * 4, 40, 5);
    pop();

    push();
    translate(Px, Py);
    rotate(this.angle);
    scale(0.5);
    stroke(255);
    noFill();
    beginShape();
    curveVertex(sin(frameCount * 0.05) * 4, 20);
    curveVertex(sin(frameCount * 0.05) * 4, 20);
    curveVertex(8, 10);
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape();
    beginShape();
    curveVertex(-sin(frameCount * 0.05) * 4, 20);
    curveVertex(-sin(frameCount * 0.05) * 4, 20);
    curveVertex(-8, 10);
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape();
    pop();
  }
}

class Butterfly {
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
  avoidbut(butterflys) {
    for (let butterfly of butterflys) {
      if (this === butterfly) continue;
      let desiredVel = p5.Vector.sub(butterfly.pos, this.pos);
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
        desiredVecFrom.mult(-1); // *** flip this to avoid!

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
    translate(this.pos.x, this.pos.y);
    if (mouseX >= this.pos.x) {
      rotate(this.angle);
      rotate(-PI / 1.6);
      noStroke();
      fill(0, 0, 20);
      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      curveVertex(-8, -20);
      curveVertex(sin(frameCount * 0.05) * 4, -30);
      curveVertex(8, -20);
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();
      rotate(PI / 1.6);
      rotate(-PI / 6);
      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      curveVertex(-8, -20);
      curveVertex(sin(frameCount * 0.05) * 4, -30);
      curveVertex(8, -20);
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();
      rotate(-PI / 3);
      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      curveVertex(-8, -20);
      curveVertex(sin(frameCount * 0.05) * 4, -30);
      curveVertex(8, -20);
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();
      rotate(PI / 6);
      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      curveVertex(-8, -20);
      curveVertex(sin(frameCount * 0.05) * 4, -40);
      curveVertex(8, -20);
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();
    } else {
      rotate(-this.angle);
      rotate(PI / 1.6);
      noStroke();
      fill(0, 0, 20);
      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      curveVertex(-8, 20);
      curveVertex(sin(frameCount * 0.05) * 4, 30);
      curveVertex(8, 20);
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();
      rotate(-PI / 1.6);
      rotate(PI / 6);
      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      curveVertex(-8, 20);
      curveVertex(sin(frameCount * 0.05) * 4, 30);
      curveVertex(8, 20);
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();
      rotate(PI / 3);
      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      curveVertex(-8, 20);
      curveVertex(sin(frameCount * 0.05) * 4, 30);
      curveVertex(8, 20);
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();
      rotate(-PI / 6);
      beginShape();
      curveVertex(0, 0);
      curveVertex(0, 0);
      curveVertex(-8, 20);
      curveVertex(sin(frameCount * 0.05) * 4, 40);
      curveVertex(8, 20);
      curveVertex(0, 0);
      curveVertex(0, 0);
      endShape();
    }
    pop();
  }
}

class Rain {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.rad = random(1, 20);
    this.mass = this.rad;
    this.angle = 0;
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
    this.angle = this.vel.heading();
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();

    fill(255, random(90, 100));
    rotate(this.angle);
    ellipse(0, 0, this.rad * 4, this.rad * 0.2);

    pop();
  }
}
