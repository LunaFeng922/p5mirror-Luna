let BRANCH_ANGLE;
let joints = [];
let branches = [];
let pomes = [];
let pomeleaves = [];
let sunmoon;
let dayans = []; //wild geese

function setup() {
  createCanvas(1000, 500);

  BRANCH_ANGLE = PI / 9;

  let start1 = createVector(width + 80, height / 10);
  joints.push(start1);

  branch(start1, -PI / 7, 130);

  sunmoon = new SunMoon(width / 7, height / 4.5, 150);
  for (let i = 0; i < 8; i++) {
    dayans.push(new Dayan(random(0, 200), random(height), color(0, 90)));
  }
}

function draw() {
  background(255, 240, 220, 50);

  let windForce = map(sin(frameCount * 0.05), -1, 1, -0.1, 0.1);

  let wind = createVector(windForce, 0);

  sunmoon.update();
  sunmoon.display();

  for (let i = 0; i < branches.length; i++) {
    noFill();
    let r = map(branches[i].gen, 0, 7, 20, 60, true);
    stroke(r, 0, 0);
    branches[i].update(wind);
    branches[i].display();
  }

  for (let i = 0; i < pomeleaves.length; i++) {
    pomeleaves[i].display();
  }

  for (let i = 0; i < pomes.length; i++) {
    let r = map(branches[i].gen, 0, 7, 120, 80, true);
    let g = map(branches[i].gen, 0, 7, 30, 10, true);
    fill(r, g, 0);
    pomes[i].display();
  }

  for (let i = 0; i < dayans.length; i++) {
    let target = createVector(mouseX, mouseY);
    dayans[i].seek(target);
    // dayans[i].avoidlea(pomeleafs);
    // dayans[i].avoidpom(pomes);
    dayans[i].avoidday(dayans);
    dayans[i].avoidbran(branches);
    dayans[i].update();
    dayans[i].reappear();
    dayans[i].display();
    dayans[i].waving = 5 * sin(frameCount * 0.05 + i * 0.5);
    dayans[i].farnear = map(
      dist(dayans[i].pos.x * 0.5, dayans[i].pos.y, 0, 0),
      0,
      600,
      0.5,
      1.8
    );
  }

  //   for (let i = 0; i < joints.length; i++) {
  //     noStroke();
  //     noFill();
  //     //fill(255, 0, 0);
  //     circle(joints[i].x, joints[i].y, 10);
  //   }
}

function branch(from, angle, len, gen = 0) {
  let vector = p5.Vector.fromAngle(angle - PI).setMag(len);
  let to = p5.Vector.add(from, vector);

  joints.push(to);

  let thickness = map(len, 35, 150, 0.5, 50);
  let stiffness = map(len, 0, 150, 1, 0);

  // construct objects
  branches.push(new Branch(from, to, thickness, 150, stiffness, gen));

  if (gen >= 1) {
    // linear: random()
    // let chance = random() ** 3 // exponential:
    // if (chance > 0.8) { /// }
    if (random() < 0.8) {
      pomeleaves.push(new PomeLeave(from, to, 1, 50));
    }
  }

  if (gen >= 4) {
    // linear: random()
    // let chance = random() ** 3 // exponential:
    // if (chance > 0.8) { /// }
    if (random() < 0.08) {
      pomes.push(new Pome(from, to, 1, 50));
    }
  }

  // alteration
  len = (len * 5) / 6;
  gen++;

  // recursion
  if (gen >= 0 && gen < 3) {
    let angle1 = angle + BRANCH_ANGLE * 0.5 + random(-0.1, 0.1);
    branch(to, angle1, len, gen);

    let angle2 = angle - BRANCH_ANGLE * 0.5 + random(-0.1, 0.1);
    branch(to, angle2, len, gen);
  } else if (gen >= 3 && gen < 7) {
    if (random() < 0.5) {
      let angle1 = angle + BRANCH_ANGLE * 0.8 + random(-0.5, 0.5);
      branch(to, angle1, len, gen);
    }

    if (random() < 0.4) {
      let angle1 = angle + 0.5 * BRANCH_ANGLE + random(-0.5, 0.5);
      branch(to, angle1, len, gen);
    }

    if (random() < 0.4) {
      let angle3 = angle - 0.5 * BRANCH_ANGLE + random(-0.5, 0.5);
      branch(to, angle3, len, gen);
    }

    if (random() < 0.5) {
      let angle4 = angle - BRANCH_ANGLE * 0.8 + random(-0.5, 0.5);
      branch(to, angle4, len, gen);
    }
  }
}

class SunMoon {
  constructor(x, y, size) {
    this.pos = createVector(x, y);
    this.size = size;
  }
  update() {
    this.pos.x = this.pos.x + sin(frameCount * 0.05) * 0.09;
  }

  display() {
    push();
    noStroke();
    fill(100, 10, 0, 80);
    circle(this.pos.x, this.pos.y, this.size);
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
    this.col = color(55, 33, 16);
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

    beginShape();
    strokeWeight(this.thickness);
    //stroke(this.col);
    //noFill();
    curveVertex(this.from.x, this.from.y);
    curveVertex(this.from.x, this.from.y);
    curveVertex(midX1 + this.bend, midY1);
    curveVertex(midX2 + this.bend * 0.4, midY2);
    curveVertex(midX2 + this.bend * 0.4, midY2);
    endShape();

    beginShape();
    strokeWeight(this.thickness * 0.95);
    //stroke(this.col);
    //noFill();
    curveVertex(midX2 + this.bend * 0.4, midY2);
    curveVertex(midX2 + this.bend * 0.4, midY2);
    curveVertex(midX3, midY3);
    curveVertex(midX4 - this.bend * 0.4, midY4);
    curveVertex(midX4 - this.bend * 0.4, midY4);
    endShape();

    beginShape();
    strokeWeight(this.thickness * 0.9);
    //stroke(this.col);
    //noFill();
    curveVertex(midX4 - this.bend * 0.4, midY4);
    curveVertex(midX4 - this.bend * 0.4, midY4);
    curveVertex(midX5 - this.bend, midY5);
    curveVertex(this.to.x, this.to.y);
    curveVertex(this.to.x, this.to.y);
    endShape();
  }
}

class PomeLeave {
  constructor(from, to, pct, size) {
    this.from = from;
    this.to = to;
    this.pct1 = pct * random(0.2, 0.5);
    this.pct2 = pct * random(0.5, 1);
    this.size = size * random(0.25, 0.5);
    this.z = floor(random(0, 5));

    this.angle = random(PI * 2);
  }
  display() {
    let Px1 = lerp(this.from.x, this.to.x, this.pct1);
    let Py1 = lerp(this.from.y, this.to.y, this.pct1);

    push();
    translate(Px1, Py1); // anchor of the transformation
    rotate(this.angle); //
    noStroke();
    fill(0, 20, 0);

    circle(0, 0, this.size);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(-10, 20);
    curveVertex(0, 40);
    curveVertex(10, 20);
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape();
    pop();

    let Px2 = lerp(this.from.x, this.to.x, this.pct2);
    let Py2 = lerp(this.from.y, this.to.y, this.pct2);

    push();
    translate(Px2, Py2); // anchor of the transformation
    rotate(this.angle); //
    noStroke();
    fill(0, 40, 0);
    circle(0, 0, this.size);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(-10, -20);
    curveVertex(0, -40);
    curveVertex(10, -20);
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape();
    pop();
  }
}

class Pome {
  constructor(from, to, pct, size) {
    this.from = from;
    this.to = to;
    this.pct = pct * random(0.2, 0.8);
    this.size = size * random(0.5, 1);
    this.angle = random(PI * 2);
  }
  display() {
    push();
    noStroke();
    //fill(100, 20, 0);
    let Px = lerp(this.from.x, this.to.x, this.pct);
    let Py = lerp(this.from.y, this.to.y, this.pct);
    circle(Px, Py, this.size);
    pop();

    push();
    translate(Px, Py);
    rotate(this.angle);
    strokeWeight(0.5);
    noStroke();
    //fill(100, 20, 0);
    triangle(
      0,
      5 - this.size * 0.8,
      0 - this.size * 0.2,
      5 - this.size * 0.4,
      0 + this.size * 0.2,
      5 - this.size * 0.4
    );
    rotate(PI / 6);
    triangle(
      -10,
      5 - this.size * 0.8,
      -10 - this.size * 0.2,
      5 - this.size * 0.4,
      -10 + this.size * 0.2,
      5 - this.size * 0.4
    );
    rotate(-PI / 3);
    triangle(
      10,
      5 - this.size * 0.8,
      10 - this.size * 0.2,
      5 - this.size * 0.4,
      10 + this.size * 0.2,
      5 - this.size * 0.4
    );
    pop();
    
    push();
    translate(Px, Py);
    rotate(this.angle);
    strokeWeight(0.5);
    stroke(255, 50);
    fill(255, 50);
    circle(-10, -10, this.size * 0.2);
    pop();
  }
}

class Dayan {
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
    this.farnear = 1;
  }
  attracted(target) {
    let vector = p5.Vector.sub(target, this.pos);
    vector.mult(0.5);
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
  avoidday(dayans) {
    for (let dayan of dayans) {
      if (this === dayan) continue;
      let desiredVel = p5.Vector.sub(dayan.pos, this.pos);
      let distance = desiredVel.mag();
      desiredVel.normalize(); // direction
      if (distance > this.senseRad) continue;
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
    scale(this.farnear);

    noFill();
    stroke(0);
    strokeWeight(0.5);

    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(
      -this.size / 2 - this.waving * 0.25,
      -this.size / 3 + this.waving
    );
    curveVertex(-this.size, this.waving);
    curveVertex(-this.size - this.waving * 0.25, this.waving);
    endShape();

    noFill();
    stroke(0);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(this.size / 2, -this.size / 3 + this.waving);
    curveVertex(this.size + this.waving * 0.25, this.waving);
    curveVertex(this.size + this.waving * 0.25, this.waving);
    endShape();
    pop();
  }
}
