let swinsoups = [];

function setup() {
  createCanvas(700, 500);
  background(0);

  for (let i = 0; i < 12; i++) {
    let x = random(width);
    let y = random(60, height - 60);
    let rad = random(3, 20);
    swinsoups.push(new Particle(x, y, rad));
  }
}

function draw() {
  background(0);

  for (let i = 0; i < swinsoups.length; i++) {
    let p = swinsoups[i];

    p.angleMovement();

    let vector = p5.Vector.sub(p.centerPos, p.pos);
    vector.normalize();
    vector.mult(0.1);
    vector.rotate(radians(p.angle));
    p.applyForce(vector);

    p.vel.mult(0.8);
    p.checkBoundaries();
    p.update();
    p.display();
  }
}

class Particle {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.05;
    this.centerPos = createVector(width / 2, height / 2);
    this.angle = 0;
  }
  applyForce(f) {
    if (this.mass > 0) {
      let force = p5.Vector.div(f, this.mass);
      this.acc.add(force);
    }
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  repelledFrom(others) {
    for (let i = 0; i < others.length; i++) {
      let other = others[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);

        if (distance < this.rad) {
          let magnitude = (this.mass * other.mass) / (distance * distance);
          let force = p5.Vector.sub(other.pos, this.pos);
          force.normalize();
          force.mult(-2);
          force.mult(magnitude);
          this.applyForce(force);
        }
      }
    }
  }
  checkBoundaries() {
    if (this.pos.x < 20) {
      this.pos.x = 20;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > width - 20) {
      this.pos.x = width - 20;
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y < 60) {
      this.pos.y = 60;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > height - 60) {
      this.pos.y = height - 60;
      this.vel.y = -this.vel.y;
    }
  }
  angleMovement() {
    this.angle = map(
      dist(this.centerPos.x, this.centerPos.y, this.pos.x, this.pos.y),
      0,
      290,
      80,
      10
    );
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(0, random(20, 22), 0);
    rotate(this.angle * 0.05);
    scale(this.rad / 10);
    beginShape();
    curveVertex(-40, 0);
    curveVertex(-40, 0);
    curveVertex(-20, 4);
    curveVertex(0, -2);
    curveVertex(20, 4);
    curveVertex(40, 0);
    curveVertex(20, -4);
    curveVertex(0, -10);
    curveVertex(-20, -4);
    curveVertex(-40, 0);
    curveVertex(-40, 0);
    endShape();
    pop();
  }
}
