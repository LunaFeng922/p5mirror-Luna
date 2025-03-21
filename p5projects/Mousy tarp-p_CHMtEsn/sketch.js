let seaWeeds = [];
let sweeds = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 3; i++) {
    sweeds.push(new Seaweed(i * 90 + 20, 0));
  }
  for (let i = 5; i < 8; i++) {
    sweeds.push(new Seaweed(i * 90 + 50, 0));
  }
}

function draw() {
  background(0);
  for (let i = 0; i < sweeds.length; i++) {
    let sws = sweeds[i];
    sws.run();
  }
}

class Spring {
  constructor(a, b, restLength, stiffness) {
    this.bobA = a;
    this.bobB = b;
    this.len = restLength;
    this.k = stiffness;
  }
  update() {
    let vector = p5.Vector.sub(this.bobB.pos, this.bobA.pos);
    let distance = vector.mag();
    let stretch = distance - this.len;
    let strength = -1 * stretch * this.k;

    // force to bobB
    let force = vector.copy();
    force.normalize();
    force.mult(strength);
    this.bobB.applyForce(force);

    // force to bobB
    let force1 = vector.copy();
    force1.normalize();
    force1.mult(strength * -1);
    this.bobA.applyForce(force1);
  }
  display() {
    push();
    strokeWeight(5);
    stroke(255, random(90, 100));
    line(
      this.bobA.pos.x,
      this.bobA.pos.y,
      this.bobB.pos.x + random(-10, 10),
      this.bobB.pos.y
    );
    line(
      this.bobA.pos.x,
      this.bobA.pos.y,
      this.bobA.pos.x - (this.bobB.pos.x - this.bobA.pos.x + random(-5, 5)),
      this.bobA.pos.y - (this.bobB.pos.y - this.bobA.pos.y + random(-5, 15))
    );
    pop();
  }
}

class SeaweedPoint {
  constructor(x, y, rad, immovable = false) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.5;
    this.damping = 0.95;
    this.isImmovable = immovable;
  }
  update() {
    if (this.isImmovable) return;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.mult(this.damping);
  }
  applyForce(f) {
    if (this.mass > 0) {
      let force = p5.Vector.div(f, this.mass);
      this.acc.add(force);
    }
  }
  attractedTo(others) {
    for (let i = 0; i < others.length; i++) {
      let other = others[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);
        let magnitude =
          (C_GRAVITY * this.mass * other.mass) / (distance * distance);
        let force = p5.Vector.sub(other.pos, this.pos);
        force.normalize();
        force.mult(magnitude);
        this.applyForce(force);
      }
    }
  }
  repelledFrom(others) {
    for (let i = 0; i < others.length; i++) {
      let other = others[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);

        if (distance < this.rad + DISTANCE_BTW_BALLS) {
          let magnitude =
            (C_GRAVITY * this.mass * other.mass) / (distance * distance);
          let force = p5.Vector.sub(other.pos, this.pos);
          force.normalize();
          force.mult(-1);
          force.mult(magnitude);
          this.applyForce(force);
        }
      }
    }
  }

  drag(xOffset = 0, yOffset = 0) {
    if (this.isImmovable) return;
    if (mouseIsPressed) {
      let distance = dist(
        this.pos.x + xOffset,
        this.pos.y + yOffset,
        mouseX,
        mouseY
      );
      if (distance < this.rad) {
        // in
        this.pos.x = mouseX - xOffset;
        this.pos.y = mouseY - yOffset;
      }
    }
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    noFill();
    circle(0, 0, this.rad * 2);
    pop();
  }
}

class Seaweed {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.points = [];
    this.springs = [];
    this.generate();
  }
  generate() {
    this.points.push(new SeaweedPoint(0, height, 20));
    this.points.push(new SeaweedPoint(-8, height - 60, 20));
    this.points.push(new SeaweedPoint(-6, height - 90, 20));
    this.points.push(new SeaweedPoint(0, height - 120, 20));
    this.points.push(new SeaweedPoint(6, height - 90, 20));
    this.points.push(new SeaweedPoint(8, height - 60, 20));
    this.points.push(new SeaweedPoint(0, height, 20));

    for (let i = 0; i < this.points.length - 1; i++) {
      this.springs.push(
        new Spring(this.points[i], this.points[i + 1], 50, 0.5)
      );
    }
  }
  run() {
    //seaWeeds
    for (let s of this.springs) {
      s.update();
    }

    push();
    translate(this.x, this.y);
    stroke(255);
    noFill();
    beginShape();
    let firstPointPos = this.points[0].pos;
    let lastPointPos = this.points[this.points.length - 1].pos;
    curveVertex(firstPointPos.x, firstPointPos.y);
    for (let pt of this.points) {
      pt.drag(this.x, this.y);
      pt.update();
      curveVertex(pt.pos.x, pt.pos.y);
    }
    curveVertex(lastPointPos.x, lastPointPos.y);
    endShape(CLOSE);
    pop();
  }
}
