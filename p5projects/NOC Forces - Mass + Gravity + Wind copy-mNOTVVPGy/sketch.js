let GRAVITY_MAGNITUDE = 1;
let particles = [];

function setup() {
  createCanvas(500, 600);
  background(0);

  particles.push( new Particle(100, height / 2, random(5, 30)) );
  particles.push( new Particle(250, height / 2, random(5, 30)) );
  particles.push( new Particle(400, height / 2, random(5, 30)) );
}

function draw() {
  background(0,90);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    if (mouseIsPressed) {
      let wind = createVector(random(0.1, 1), 0);
      p.applyForce(wind);
    }

    let gravity = createVector(0, GRAVITY_MAGNITUDE * p.mass); // ***
    p.applyForce(gravity);

    p.update();
    p.checkBoundaries();
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
    this.mass = rad * 0.05; // MASS!
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
  checkBoundaries() {
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
    noStroke();
    fill(255);
    circle(0, 0, this.rad * 2);
    pop();
  }
}
