//finding references in NOC W03 example code by Prof. Moon
//inspired by the song "Gravity" by John Mayer
//try pressing key"1"/"2"/"3"/"4"
//after pressing key "3", try pressing key "u" 

// class 1
let b1;
let b1l, b1r;
let bounceCountB1 = 0;
let b1Visible = false;

// class 2
let C_GRAVITY = 5;
let b2s1 = [];
let b2s2 = [];
let b2s3 = [];
let reappearCountB2 = 0;
let b2Visible = false;

// class 3
let b3s = [];
let b3Visible = false;
let spacing = 20;

// class 4
let b4s = [];
let bounceCountB4 = 0;
let b4Visible = false;

function setup() {
  createCanvas(400, 400);
  frameRate(30);
}

function draw() {
  background(0, 40);

  // Key Control
  if (keyIsPressed && key === "1") {
    b1Visible = true;
    b2Visible = false;
    b3Visible = false;
    b4Visible = false;
    b1 = new B1(200, 100);
    bounceCountB1 = 0;
    b1l = undefined;
    b1r = undefined;
  }

  if (keyIsPressed && key === "2") {
    b1Visible = false;
    b2Visible = true;
    b3Visible = false;
    b4Visible = false;
    reappearCountB2 = 0;
    b2s1 = [];
    b2s2 = [];
    b2s3 = [];
    if (b2s1.length === 0) {
      b2s1.push(new B2(200, 200, 10, 200, 200, true));
      for (let i = 0; i < 18; i++) {
        let angle = (i * TWO_PI) / 18;
        let x = 200 + cos(angle) * 100;
        let y = 200 + sin(angle) * 100;
        let rad = i % 2 === 0 ? 1 : 0.5;
        b2s1.push(new B2(x, y, rad, x, y, false));
      }
    }
    if (b2s2.length === 0) {
      b2s2.push(new B2(200, 200, 10, 200, 200, true));
      for (let i = 0; i < 36; i++) {
        let angle = (i * TWO_PI) / 36;
        let x = 200 + cos(angle) * 150;
        let y = 200 + sin(angle) * 150;
        let rad = i % 2 === 0 ? 1 : 0.5;
        b2s2.push(new B2(x, y, rad, x, y, false));
      }
    }
    if (b2s3.length === 0) {
      b2s3.push(new B2(200, 200, 10, 200, 200, true));
      for (let i = 0; i < 72; i++) {
        let angle = (i * TWO_PI) / 72;
        let x = 200 + cos(angle) * 200;
        let y = 200 + sin(angle) * 200;
        let rad = i % 2 === 0 ? 1 : 0.5;
        b2s3.push(new B2(x, y, rad, x, y, false));
      }
    }
  }

  if (keyIsPressed && key === "3") {
    b1Visible = false;
    b2Visible = false;
    b3Visible = true;
    b4Visible = false;
    b3s = [];
    startFrameCount = frameCount;
    for (let i = 0; i < 20; i++) {
      b3s.push(new B3(i * spacing, 100 + 50 * sin(i * 0.1 * PI - PI)));
    }
  }

  if (keyIsPressed && key === "4") {
    b1Visible = false;
    b2Visible = false;
    b3Visible = false;
    b4Visible = true;
    bounceCountB4 = 0;
    b4s = [];
    if (b4s.length === 0) {
      for (let i = 0; i < 4; i++) {
        let angle = (i * TWO_PI) / 4;
        let x = 200 + cos(angle + PI * 0.25) * 280;
        let y = 200 + sin(angle + PI * 0.25) * 280;
        b4s.push(new B4(x, y, 50));
      }
    }
  }

  //b1/b1l/b1r
  // Forces on b1
  if (b1Visible && b1) {
    let gravityb1 = createVector(0, 0.05 * b1.rad);
    b1.applyForce(gravityb1);
    b1.update();
    b1.bounce();
    b1.display();
  }

  // Check bounce times3
  if (b1Visible && b1 && bounceCountB1 >= 14) {
    if (!b1l) {
      b1l = new B1(150, 200);
    }
    if (!b1r) {
      b1r = new B1(250, 200);
    }

    // B1s Forces
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

  // B2s1
  if (b2Visible && b2s1.length > 0) {
    for (let a = 0; a < b2s1.length; a++) {
      for (let b = 0; b < b2s1.length; b++) {
        if (a != b) {
          b2s1[a].attractedTo(b2s1[b]);
        }
      }
      b2s1[a].update();
      b2s1[a].limitVelocity(5);
      b2s1[a].reappear();
      b2s1[a].display();
    }
  }

  // B2s2
  if (b2Visible && b2s2.length > 0) {
    for (let a = 0; a < b2s2.length; a++) {
      for (let b = 0; b < b2s2.length; b++) {
        if (a != b) {
          b2s2[a].attractedTo(b2s2[b]);
        }
      }
      b2s2[a].update();
      b2s2[a].limitVelocity(5);
      b2s2[a].reappear();
      b2s2[a].display();
    }
  }

  // B2s3
  if (b2Visible && b2s3.length > 0) {
    for (let a = 0; a < b2s3.length; a++) {
      for (let b = 0; b < b2s3.length; b++) {
        if (a != b) {
          b2s3[a].attractedTo(b2s3[b]);
        }
      }
      b2s3[a].update();
      b2s3[a].limitVelocity(5);
      b2s3[a].reappear();
      b2s3[a].display();
    }
  }

  // B3s
  if (b3Visible && b3s.length > 0) {
    for (let i = 0; i < b3s.length; i++) {
      if (frameCount > startFrameCount + i * 10) {
        let gravity = createVector(0, 0.05 * b3s[i].rad);
        b3s[i].applyForce(gravity);
        let resistance = b3s[i].vel.copy();
        resistance.mult(-1);
        let sp = b3s[i].vel.mag();
        let dragForce = sp * sp * 0.001;
        resistance.normalize();
        resistance.mult(dragForce);
        b3s[i].applyForce(resistance);
        if (keyIsPressed && key == "u") {
          let wind = createVector(0, -1 / b3s[i].rad);
          b3s[i].applyForce(wind);
        }
        b3s[i].update();
        b3s[i].bounce();
        b3s[i].display();
        b3s[i].checkCollision();
      }
    }
  }

  // B4s
  if (b4Visible && b4s.length > 0) {
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
  constructor(x, y, rad, initialX, initialY, isCentral) {
    this.initialPos = createVector(initialX, initialY);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = this.rad * 0.5;
    this.isCentral = isCentral;
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
      reappearCountB2++;
      if (this.isCentral) {
        this.rad = this.rad + reappearCountB2 * 0.0001;
      }
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    blendMode(ADD);
    fill(255, reappearCountB2);
    circle(0, 0, this.rad * 2);
    pop();
  }
}

class B3 {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.rad = abs(100 - this.pos.y) * 0.05;
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  bounce() {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -0.9 * this.vel.x;
    } else if (this.pos.x > 400) {
      this.pos.x = 400;
      this.vel.x = -0.9 * this.vel.x;
    }
    if (this.pos.y < 0 && this.pos.x < 200) {
      this.pos.y = 0;
      this.vel.y = -1 * this.vel.y;
      this.vel.x = this.vel.x - 3;
    }
    if (this.pos.y < 0 && this.pos.x > 200) {
      this.pos.y = 0;
      this.vel.y = -1 * this.vel.y;
      this.vel.x = this.vel.x + 3;
    } else if (this.pos.y > 300) {
      this.pos.y = 300;
      this.vel.y = -1 * this.vel.y;
    }
  }

  checkCollision() {
    for (let j = 0; j < b3s.length; j++) {
      if (this !== b3s[j]) {
        let distance = p5.Vector.dist(this.pos, b3s[j].pos);
        if (distance < this.rad + b3s[j].rad) {
          b3s.splice(b3s.indexOf(this), 1);
          b3s.splice(b3s.indexOf(b3s[j]), 1);
          break;
        }
      }
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

class B4 {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.initRad = rad;
    this.maxDistanceToCenter = dist(x, y, 200, 200);
    this.rad = rad;
    this.mass = this.rad * 0.5;
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    let distanceToCenter = dist(this.pos.x, this.pos.y, 200, 200);
    this.rad =
      (bounceCountB4 * 0.01 + 1) *
      this.initRad *
      (distanceToCenter / this.maxDistanceToCenter);
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
      bounceCountB4++;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -0.9 * this.vel.x;
      bounceCountB4++;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = -0.9 * this.vel.y;
      bounceCountB4++;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -0.9 * this.vel.y;
      bounceCountB4++;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke(0);
    blendMode(ADD);
    fill(255, 20 + this.rad * 2);
    circle(0, 0, this.rad * 2);
    pop();
  }
}
