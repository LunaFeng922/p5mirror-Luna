let waterbubbles = [];

function setup() {
  createCanvas(700, 500);
  background(0);

  for (let i = 0; i < 10; i++) {
    let x = random(20, width - 20);
    let y = random(100, height - 100);
    let rad = random(5, 20);
    waterbubbles.push(new Waterbubble(x, y, rad));
  }
}

function draw() {
  background(0);

  for (let i = 0; i < waterbubbles.length; i++) {
    let w = waterbubbles[i];
    let centerPos = createVector(width / 2, height / 2);
    let vector = p5.Vector.sub(centerPos, w.pos);
    vector.normalize();
    vector.mult(0.1);
    vector.rotate(radians(80));
    w.applyForce(vector);

    w.vel.mult(0.9); // slow down a bit
    w.checkBoundaries();
    w.update();
    w.display();
  }
}

///// CLASS /////

class Waterbubble {
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
    if (this.pos.y < 100) {
      this.pos.y = 100;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > height - 100) {
      this.pos.y = height - 200;
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
