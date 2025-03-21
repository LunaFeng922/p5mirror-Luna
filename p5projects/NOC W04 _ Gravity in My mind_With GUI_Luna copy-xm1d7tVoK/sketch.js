let C_GRAVITY = 2;
let gui;
let n = 6;

let ui = {
  rad4: 50,
  r: 255,
  g: 255,
  b: 255,
  numObjects: 6,
  gravity: 2,
};

let b4s = [];

function setup() {
  createCanvas(400, 400);
  frameRate(30);

  gui = new dat.GUI();
  gui.add(ui, "rad4", 1, 100).onChange(updateRad4);
  gui.add(ui, "r", 0, 255).onChange(updateR);
  gui.add(ui, "g", 0, 255).onChange(updateG);
  gui.add(ui, "b", 0, 255).onChange(updateB);
  gui.add(ui, "numObjects", 1, 100).step(1).onChange(updateNumObjects);
  gui.add(ui, "gravity", 1, 10).step(1).onChange(updateGravity);
}

function updateRad4() {
  for (let i = 0; i < b4s.length; i++) {
    b4s[i].updateRad4();
  }
}

function updateR() {
  for (let i = 0; i < b4s.length; i++) {
    b4s[i].updateR();
  }
}

function updateG() {
  for (let i = 0; i < b4s.length; i++) {
    b4s[i].updateG();
  }
}

function updateB() {
  for (let i = 0; i < b4s.length; i++) {
    b4s[i].updateB();
  }
}

function updateNumObjects() {
  let diff = ui.numObjects - b4s.length;
  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      let angle = ((b4s.length + i) * TWO_PI) / ui.numObjects;
      let x = 200 + cos(angle + PI * 0.25) * 200;
      let y = 200 + sin(angle + PI * 0.25) * 200;
      let r = 255;
      let g = 255;
      let b = 255;
      b4s.push(new B4(x, y, 50, r, g, b));
    }
  } else if (diff < 0) {
    for (let i = 0; i < -diff; i++) {
      b4s.pop();
    }
  }
}

function updateGravity() {
  C_GRAVITY = ui.gravity;
}

function draw() {
  background(255, 5);

  if (b4s.length === 0) {
    for (let i = 0; i < n; i++) {
      let angle = (i * TWO_PI) / n;
      let x = 200 + cos(angle + PI * 0.25) * 200;
      let y = 200 + sin(angle + PI * 0.25) * 200;
      let r = 255;
      let g = 255;
      let b = 255;
      b4s.push(new B4(x, y, 50, r, g, b));
    }
  }

  if (b4s.length > 0) {
    for (let i = 0; i < b4s.length; i++) {
      let b4 = b4s[i];
      b4.applyGravitationalAttraction(b4s);
      b4.update();
      b4.limitVelocity(5);
      b4.bounce();
      b4.display();
    }
  }
}

class B4 {
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
    for (let i = 0; i < b4s.length; i++) {
      let other = b4s[i];
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
    //stroke(this.r, this.g, this.b, this.rad);
    noStroke();
    fill(this.r, this.g, this.b, 20);
    circle(random(-1, 1), random(-1, 1), this.rad * 2);
    pop();
  }
}
