let particles = [];

function setup() {
  createCanvas(700, 500);
  background(0);

  for (let i = 0; i < 10; i++) {
    let x = random(20, width - 20);
    let y = random(60, height - 60);
    let rad = random(3, 15);
    particles.push(new Particle(x, y, rad));
  }
}

function draw() {
  background(0);

  let centerPos = createVector(width / 2, height / 2);
  let angle = map(
    dist(width / 2, height / 2, p.pos.x, p.pos.y),
    0,
    290,
    80,
    10
  );

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    let vector = p5.Vector.sub(centerPos, p.pos);
    vector.normalize();
    vector.mult(0.1);
    vector.rotate(radians(angle));
    p.applyForce(vector);

    p.vel.mult(0.8); // slow down a bit
    p.checkBoundaries();
    p.update();
    p.display();
  }

  fill(255);
  text(angle.toFixed(2), 10, 20);
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
    if (this.pos.x < 20) {
      this.pos.x = 20;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > width - 20) {
      this.pos.x = width - 20;
      this.vel.x = -this.vel.x;
    }
    // y
    if (this.pos.y < 60) {
      this.pos.y = 60;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > height - 60) {
      this.pos.y = height - 60;
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
