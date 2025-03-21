let gui;
let n = 6;
let C_GRAVITY = 2;

let ui = {
  rad: 50,
  r: 255,
  g: 255,
  b: 255,
  ns: 6,
  gravity: 2,
};

let bs = [];

function setup() {
  createCanvas(600, 600);
  frameRate(30);

  gui = new dat.GUI();
  gui.add(ui, "ns", 1, 200).step(1).onChange(updateNs);
  gui.add(ui, "gravity", 1, 20).step(1).onChange(updateGravity);
  gui.add(ui, "rad", 1, 100).onChange(updateRad);
  gui.add(ui, "r", 0, 255).onChange(updateR);
  gui.add(ui, "g", 0, 255).onChange(updateG);
  gui.add(ui, "b", 0, 255).onChange(updateB);
}

function updateNs() {
  let diff = ui.ns - bs.length;
  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      let angle = ((bs.length + i) * TWO_PI) / ui.ns;
      let x = 300 + cos(angle + PI * 0.25) * 200;
      let y = 300 + sin(angle + PI * 0.25) * 200;
      let r = 255;
      let g = 255;
      let b = 255;
      bs.push(new B(x, y, 50, r, g, b));
    }
  } else if (diff < 0) {
    for (let i = 0; i < -diff; i++) {
      bs.pop();
    }
  }
}

function updateGravity() {
  C_GRAVITY = ui.gravity;
}

function updateRad() {
  for (let i = 0; i < bs.length; i++) {
    bs[i].updateRad();
  }
}

function updateR() {
  for (let i = 0; i < bs.length; i++) {
    bs[i].updateR();
  }
}

function updateG() {
  for (let i = 0; i < bs.length; i++) {
    bs[i].updateG();
  }
}

function updateB() {
  for (let i = 0; i < bs.length; i++) {
    bs[i].updateB();
  }
}

function draw() {
  background(200, 5);

  for (let i = 0; i < bs.length; i++) {
    bs[i].applyGravitationalAttraction(bs);
    bs[i].update();
    bs[i].limitVelocity(5);
    bs[i].bounce();
    bs[i].display();
  }
}

class B {
  constructor(x, y, rad, r, g, b) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = this.rad * 0.5;
    this.r = r;
    this.g = g;
    this.b = b;
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

  applyGravitationalAttraction(other) {
    for (let i = 0; i < bs.length; i++) {
      let other = bs[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);
        let magnitude =
          (C_GRAVITY * this.mass * other.mass) / (distance * distance);
        let force = p5.Vector.sub(other.pos, this.pos);
        force.normalize();
        force.mult(magnitude);
        if (distance < this.rad) {
          force.mult(-1);
          force.mult(3);
        }
        this.applyForce(force);
        this.acc.limit(10);
      }
    }
  }

  limitVelocity(mag) {
    this.vel.limit(mag);
  }

  bounce() {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -0.9 * this.vel.x;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -0.9 * this.vel.x;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = -0.9 * this.vel.y;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -0.9 * this.vel.y;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    strokeWeight(3);
    noStroke();
    fill(this.r, this.g, this.b, 20);
    circle(random(-1, 1), random(-1, 1), this.rad * 2);
    pop();
  }

  updateRad() {
    this.rad = ui.rad;
  }

  updateR() {
    this.r = ui.r;
  }

  updateG() {
    this.g = ui.g;
  }

  updateB() {
    this.b = ui.b;
  }
}
