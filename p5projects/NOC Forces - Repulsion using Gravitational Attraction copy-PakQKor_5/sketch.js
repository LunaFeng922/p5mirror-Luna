let C_GRAVITY = 5;
let particles = [];

function setup() {
  createCanvas(800, 500);
  background(0);

  for (let i = 0; i < 10; i++) {
    particles.push(new Particle(random(width), random(height), random(1, 20)));
  }
}

function draw() {
  background(0);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.repelledFrom(particles);
    p.update();
    p.limitVelocity(5);
    p.reappear();
    p.display();
  }
}

///// CLASS /////

class Particle {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.5; // MASS!
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
  
  repelledFrom(others) {
    // this method is duplicated from attractedTo()
    // then, the force vector is flipped.
    for (let i = 0; i < particles.length; i++) {
      let other = particles[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);
        let magnitude =
          (C_GRAVITY * this.mass * other.mass) / (distance * distance);
        let force = p5.Vector.sub(other.pos, this.pos);
        force.normalize();
        force.mult(-1); // ***
        force.mult(magnitude);
        this.applyForce(force);
      }
    }
  }
  limitVelocity(mag) {
    this.vel.limit(mag);
  }
  reappear() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }
  bounce() {
    // x
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -this.vel.x;
    }
    // y
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -this.vel.y;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke(0);
    fill(255);
    circle(0, 0, this.rad * 2);
    pop();
  }
}
