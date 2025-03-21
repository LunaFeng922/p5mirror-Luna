//class 1
let b1;
let b1l, b1r;
let b1Visible = false;
let bounceCountB1 = 0;

//class 2
let C_GRAVITY = 5;
let b2s = [];
let b2Visible = false;

function setup() {
  createCanvas(400, 400);
  frameRate(32);
}

function draw() {
  background(0, 90);

  // Key Control
  if (keyIsPressed && key === "1") {
    b1Visible = true;
  } else if (keyIsPressed && (key === "2" || key === "3" || key === "4")) {
    b1Visible = false;
  }
  if (keyIsPressed && key === "2") {
    b2Visible = true;
  } else if (keyIsPressed && (key === "1" || key === "3" || key === "4")) {
    b2Visible = false;
  }

  // Generate
  if (b1Visible && b1 === undefined) {
    b1 = new B1(200, 100);
  }
  if (b2Visible && b2s.length === 0) {
    for (let i = 0; i < 36; i++) {
      let angle = (i * TWO_PI) / 36;
      let x = 200 + cos(angle) * 150;
      let y = 200 + sin(angle) * 150;
      let radius = i % 2 === 0 ? 1 : 0.5;
      b2s.push(new B2(x, y, radius, x, y));
    }

    b2s.push(new B2(200, 200, 10, 200, 200));
  }

  // Forces on b1
  if (b1Visible && b1) {
    let gravityb1 = createVector(0, 0.05 * b1.rad);
    b1.applyForce(gravityb1);
    b1.update();
    b1.bounce();
    b1.display();
  }

  // Check if b1 has bounced 7 times
  if (b1Visible && b1 && bounceCountB1 >= 14) {
    if (!b1l) {
      b1l = new B1(150, 200);
    }
    if (!b1r) {
      b1r = new B1(250, 200);
    }

    // Forces on b1l and b1r
    let gravityB1l = createVector(0, 0.05 * b1l.rad);
    let windB1l = createVector(-1, 0);
    b1l.applyForce(gravityB1l);
    b1l.applyForce(windB1l);
    b1l.update();
    b1l.bounce();
    b1l.display();

    let gravityB1r = createVector(0, 0.05 * b1r.rad);
    let windB1r = createVector(1, 0);
    b1r.applyForce(gravityB1r);
    b1r.applyForce(windB1r);
    b1r.update();
    b1r.bounce();
    b1r.display();
  }

  if (b2Visible && b2s) {
    for (let a = 0; a < b2s.length; a++) {
      for (let b = 0; b < b2s.length; b++) {
        if (a != b) {
          b2s[a].attractedTo(b2s[b]);
        }
      }
      b2s[a].update();
      b2s[a].limitVelocity(5);
      b2s[a].reappear();
      // b2s[a].bounce();
      b2s[a].display();
    }
  }
}

class B1 {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.rad = 0.1 * (301 - this.pos.y);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.rad = 0.1 * (301 - this.pos.y);
  }

  bounce() {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > 400) {
      this.pos.x = 400;
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y < 100) {
      this.pos.y = 100;
      this.vel.y = -this.vel.y;
      bounceCountB1++;
    } else if (this.pos.y > 300) {
      this.pos.y = 300;
      this.vel.y = -this.vel.y;
      bounceCountB1++;
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

class B2 {
  constructor(x, y, rad, initialX, initialY) {
    this.initialPos = createVector(initialX, initialY);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = this.rad * 0.5;
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
  attractedTo(other) {
    let distance = this.pos.dist(other.pos);
    let magnitude =
      (C_GRAVITY * this.mass * other.mass) / (distance * distance);
    let force = p5.Vector.sub(other.pos, this.pos);
    force.normalize();
    force.mult(magnitude);
    this.applyForce(force);
  }
  limitVelocity(mag) {
    this.vel.limit(mag);
  }
  reappear() {
    if (
      this.pos.x > 180 &&
      this.pos.x < 220 &&
      this.pos.y > 180 &&
      this.pos.y < 220
    ) {
      this.pos.x = this.initialPos.x;
      this.pos.y = this.initialPos.y;
    }
  }
  // bounce() {
  //   // x
  //   if (this.pos.x < 0) {
  //     this.pos.x = 0;
  //     this.vel.x = -this.vel.x;
  //   } else if (this.pos.x > width) {
  //     this.pos.x = width;
  //     this.vel.x = -this.vel.x;
  //   }
  //   // y
  //   if (this.pos.y < 0) {
  //     this.pos.y = 0;
  //     this.vel.y = -this.vel.y;
  //   } else if (this.pos.y > height) {
  //     this.pos.y = height;
  //     this.vel.y = -this.vel.y;
  //   }
  //   if (this.pos.x == 200 && this.pos.y == 200) {
  //     this.vel.x = -this.vel.x;
  //     this.vel.y = -this.vel.y;
  //   }
  // }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255);
    circle(0, 0, this.rad * 2);
    pop();
  }
}
