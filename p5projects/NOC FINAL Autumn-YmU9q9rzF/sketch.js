//Finding references in the NOC example code by Prof. Moon.
let canvas;
let bgColor;
let smColor;
let dyColor;
let ltColor;
let joints = [];
let branches = [];
let pomes = [];
let pomeleaves = [];
let sunmoon;
let dayans = [];

function setup() {
  canvas = createCanvas(1280, 720);
  noCursor();

  let start1 = createVector(width + 80, height / 7.5);
  joints.push(start1);
  branch(start1, -PI / 7, 150);

  sunmoon = new SunMoon(width / 6.5, height / 4, 180);
  
  for (let i = 0; i < 9; i++) {
    dayans.push(new Dayan(random(0, 200), random(height)));
  }
}

function draw() {
  let xOffset = sin(frameCount * 0.01) * 20;
  translate(xOffset, 0);

  bgColor = color(
    map(sin(frameCount * 0.01), -1, 1, 255, 0),
    map(sin(frameCount * 0.01), -1, 1, 255, 5),
    map(sin(frameCount * 0.01), -1, 1, 200, 25),
    70
  );
  background(bgColor);

  let windForce = map(sin(frameCount * 0.05), -1, 1, -0.1, 0.1);

  let wind = createVector(windForce, 0);

  sunmoon.update();
  sunmoon.display();

  for (let i = 0; i < branches.length; i++) {
    branches[i].update(wind);
    branches[i].display();
  }

  for (let i = 0; i < pomeleaves.length; i++) {
    pomeleaves[i].display();
  }

  for (let i = 0; i < pomes.length; i++) {
    pomes[i].display();
  }

  for (let i = 0; i < dayans.length; i++) {
    let target = createVector(mouseX, mouseY);
    dayans[i].seek(target);
    dayans[i].avoidday(dayans);
    dayans[i].avoidbran(branches);
    dayans[i].update();
    dayans[i].reappear();
    dayans[i].display();
    dayans[i].waving = 5 * sin(frameCount * 0.05 + i * 0.5);
    dayans[i].farnear = map(
      dist(dayans[i].pos.x * 0.7, dayans[i].pos.y, 0, 0),
      0,
      600,
      0.5,
      2
    );
  }
}

function keyPressed() {
  if (key == "f") {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function branch(from, angle, len, gen = 0) {
  let vector = p5.Vector.fromAngle(angle - PI).setMag(len);
  let to = p5.Vector.add(from, vector);

  joints.push(to);

  let thickness = map(len, 35, 150, 0.5, 45);
  let stiffness = map(len, 0, 150, 1, 0);

  branches.push(new Branch(from, to, thickness, 180, stiffness, gen));

  if (gen >= 1) {
    if (random() < 0.7) {
      pomeleaves.push(new PomeLeave(from, to, 1, 50));
    }
  }

  if (gen >= 4) {
    if (random() < 0.1) {
      pomes.push(new Pome(from, to, 1, 50));
    }
  }

  // alteration
  len = (len * 5) / 6;
  gen++;

  // recursion
  if (gen >= 0 && gen < 3) {
    let angle1 = angle + (PI / 8) * 0.5 + random(-0.1, 0.1);
    branch(to, angle1, len, gen);

    let angle2 = angle - (PI / 8) * 0.5 + random(-0.1, 0.1);
    branch(to, angle2, len, gen);
  } else if (gen >= 3 && gen < 7) {
    if (random() < 0.3) {
      let angle1 = angle + (PI / 8) * 0.8 + random(-0.5, 0.5);
      branch(to, angle1, len, gen);
    }

    if (random() < 0.2) {
      let angle1 = angle + (0.5 * PI) / 8 + random(-0.5, 0.5);
      branch(to, angle1, len, gen);
    }

    if (random() < 0.6) {
      let angle3 = angle - (0.5 * PI) / 8 + random(-0.5, 0.5);
      branch(to, angle3, len, gen);
    }

    if (random() < 0.8) {
      let angle4 = angle - (PI / 8) * 0.8 + random(-0.5, 0.5);
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
    smColor = color(
      map(sin(frameCount * 0.01), -1, 1, 120, 255),
      map(sin(frameCount * 0.01), -1, 1, 10, 255),
      map(sin(frameCount * 0.01), -1, 1, 0, 180),
      80
    );

    ltColor = color(
      map(sin(frameCount * 0.01), -1, 1, 200, 200),
      map(sin(frameCount * 0.01), -1, 1, 150, 230),
      map(sin(frameCount * 0.01), -1, 1, 50, 255),
      80
    );

    push();
    noStroke();
    fill(smColor);
    circle(this.pos.x, this.pos.y, this.size);
    pop();

    push();
    translate(this.pos.x, this.pos.y);
    strokeWeight(2);
    stroke(ltColor);
    noFill();
    rotate(sin(frameCount * 0.1) * 0.002);
    triangle(30, 90, 420, 450, 440, 455);
    triangle(15, 80, 400, 480, 420, 485);
    triangle(10, 100, 380, 500, 400, 505);
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
    let inc = 7;
    this.col = color(
      40 + random(-20, 20) + gen * inc,
      28 + random(-10, 10) + gen * inc,
      14 + random(-20, 20) + gen * inc,
      180
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

    push();
    noStroke();
    fill(this.col);
    ellipse(midX1 - 5, midY1, 15 - this.gen);
    ellipse(midX2 + 5, midY2, 15 - this.gen);
    ellipse(midX3 - 5, midY3, 15 - this.gen);
    ellipse(midX4 + 5, midY4, 15 - this.gen);
    pop();
  }
}

class PomeLeave {
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
      80
    );

    this.angle = random(PI * 2);
  }
  display() {
    let Px1 = lerp(this.from.x, this.to.x, this.pct1);
    let Py1 = lerp(this.from.y, this.to.y, this.pct1);

    push();
    translate(Px1, Py1); // anchor of the transformation
    rotate(this.angle);
    noStroke();
    fill(this.col);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(-10, 20);
    curveVertex(sin(frameCount * 0.05) * 2, 40);
    curveVertex(10, 20);
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape();
    pop();

    let Px2 = lerp(this.from.x, this.to.x, this.pct2);
    let Py2 = lerp(this.from.y, this.to.y, this.pct2);

    push();
    translate(Px2, Py2); // anchor of the transformation
    rotate(this.angle);
    noStroke();
    fill(this.col);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(-10, -20);
    curveVertex(sin(frameCount * 0.05) * 2, -40);
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
    this.col = color(
      120 + random(-30, 30),
      20 + random(-10, 10),
      5 + random(-10, 10),
      190
    );
  }
  display() {
    push();
    noStroke();
    fill(this.col);
    let Px = lerp(this.from.x, this.to.x, this.pct);
    let Py = lerp(this.from.y, this.to.y, this.pct);
    translate(Px, Py);
    rotate(this.angle + sin(frameCount * 0.05) * 0.02);
    ellipse(0, 0, this.size, this.size * 0.9);
    pop();

    push();
    translate(Px, Py);
    rotate(this.angle + sin(frameCount * 0.05) * 0.02);
    noStroke();
    fill(this.col);
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
      -5,
      5 - this.size * 0.8,
      -5 - this.size * 0.2,
      5 - this.size * 0.4,
      -5 + this.size * 0.2,
      5 - this.size * 0.4
    );
    rotate(-PI / 3);
    triangle(
      5,
      5 - this.size * 0.8,
      5 - this.size * 0.2,
      5 - this.size * 0.4,
      5 + this.size * 0.2,
      5 - this.size * 0.4
    );
    pop();

    push();
    translate(Px, Py);
    rotate(this.angle);
    strokeWeight(0.5);
    noStroke();
    fill(255, 50);
    circle(-10, -10, this.size * 0.08);
    fill(0, 50);
    circle(10, 10, this.size * 0.08);
    pop();
  }
}

class Dayan {
  constructor(x, y) {
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
    dyColor = color(
      map(sin(frameCount * 0.01), -1, 1, 0, 255),
      map(sin(frameCount * 0.01), -1, 1, 0, 255),
      map(sin(frameCount * 0.01), -1, 1, 0, 255),
      80
    );

    push();
    translate(this.pos.x, this.pos.y);
    scale(this.farnear);
    noFill();
    stroke(dyColor);

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
    stroke(dyColor);
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
