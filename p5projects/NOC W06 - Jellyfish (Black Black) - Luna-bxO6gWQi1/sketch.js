//Credit: finding references in NOC W06 example code by Prof. Moon!
//Credit: Thanks Lisa for helping me with the curveVertex and explaining the logic behind to me!
//Credit: Thanks David for helping me with the timer and explaining the logic behind to me!

let balls = [];
let springs = [];
let a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, z;
let w = 0;
let timer = 0;

function setup() {
  createCanvas(800, 600);

  a = new Ball(300, 75, 40);
  balls.push(a);
  b = new Ball(150, 125, 20);
  balls.push(b);
  z = new Ball(300, 50, 15);
  balls.push(z);
  c = new Ball(450, 125, 20);
  balls.push(c);
  d = new Ball(450, 350, 22);
  balls.push(d);
  e = new Ball(150, 350, 22);
  balls.push(e);
  f = new Ball(275, 200, 10);
  balls.push(f);
  g = new Ball(300, 200, 10);
  balls.push(g);
  h = new Ball(325, 200, 10);
  balls.push(h);
  i = new Ball(273, 300, 6);
  balls.push(i);
  j = new Ball(300, 300, 6);
  balls.push(j);
  k = new Ball(327, 300, 6);
  balls.push(k);
  l = new Ball(270, 350, 4);
  balls.push(l);
  m = new Ball(300, 350, 4);
  balls.push(m);
  n = new Ball(330, 350, 4);
  balls.push(n);
  o = new Ball(268, 375, 3);
  balls.push(o);
  p = new Ball(300, 375, 3);
  balls.push(p);
  q = new Ball(332, 375, 3);
  balls.push(q);

  springs.push(new Spring(a, d, 225, 0.3));
  springs.push(new Spring(a, e, 225, 0.3));
  springs.push(new Spring(a, z, 50, 0.3));
  springs.push(new Spring(a, b, 200, 0.3));
  springs.push(new Spring(a, c, 200, 0.3));

  springs.push(new Spring(b, z, 200, 0.2));
  springs.push(new Spring(z, c, 200, 0.2));
  springs.push(new Spring(c, d, 150, 0.2));
  springs.push(new Spring(d, e, 200, 0.2));
  springs.push(new Spring(e, b, 150, 0.2));

  springs.push(new Spring(a, f, 130, 0.2));
  springs.push(new Spring(a, g, 140, 0.2));
  springs.push(new Spring(a, h, 130, 0.2));

  springs.push(new Spring(f, i, 100, 0.2));
  springs.push(new Spring(g, j, 110, 0.2));
  springs.push(new Spring(h, k, 100, 0.2));

  springs.push(new Spring(i, l, 50, 0.2));
  springs.push(new Spring(j, m, 60, 0.2));
  springs.push(new Spring(k, n, 50, 0.2));

  springs.push(new Spring(l, o, 40, 0.2));
  springs.push(new Spring(m, p, 50, 0.2));
  springs.push(new Spring(n, q, 40, 0.2));
}

function draw() {
  background(0, 60);
  stroke(255);
  noFill();
  beginShape();
  curveVertex(z.pos.x, z.pos.y);
  curveVertex(z.pos.x, z.pos.y);
  curveVertex(c.pos.x, c.pos.y);
  curveVertex(d.pos.x, d.pos.y);
  curveVertex(e.pos.x, e.pos.y);
  curveVertex(b.pos.x, b.pos.y);
  endShape(CLOSE);

  noFill();
  beginShape();
  curveVertex(a.pos.x, a.pos.y);
  curveVertex(a.pos.x, a.pos.y);
  curveVertex((a.pos.x + b.pos.x) / 2, (a.pos.y + b.pos.y) / 2 - 10);
  curveVertex(b.pos.x, b.pos.y);
  curveVertex(b.pos.x, b.pos.y);
  endShape();

  noFill();
  beginShape();
  curveVertex(a.pos.x, a.pos.y);
  curveVertex(a.pos.x, a.pos.y);
  curveVertex((a.pos.x + c.pos.x) / 2, (a.pos.y + c.pos.y) / 2 - 10);
  curveVertex(c.pos.x, c.pos.y);
  curveVertex(c.pos.x, c.pos.y);
  endShape();

  noFill();
  beginShape();
  curveVertex(a.pos.x, a.pos.y);
  curveVertex(a.pos.x, a.pos.y);
  curveVertex((a.pos.x + d.pos.x) / 2, (a.pos.y + d.pos.y) / 2 - 10);
  curveVertex(d.pos.x, d.pos.y);
  curveVertex(d.pos.x, d.pos.y);
  endShape();

  noFill();
  beginShape();
  curveVertex(a.pos.x, a.pos.y);
  curveVertex(a.pos.x, a.pos.y);
  curveVertex((a.pos.x + e.pos.x) / 2, (a.pos.y + e.pos.y) / 2 - 10);
  curveVertex(e.pos.x, e.pos.y);
  curveVertex(e.pos.x, e.pos.y);
  endShape();

  noFill();
  beginShape();
  curveVertex(a.pos.x, a.pos.y);
  curveVertex(a.pos.x, a.pos.y);
  curveVertex((a.pos.x + z.pos.x) / 2, (a.pos.y + z.pos.y) / 2 - 10);
  curveVertex(z.pos.x, z.pos.y);
  curveVertex(z.pos.x, z.pos.y);
  endShape();

  noFill();
  beginShape();
  curveVertex(a.pos.x, a.pos.y);
  curveVertex(a.pos.x, a.pos.y);
  curveVertex(f.pos.x, f.pos.y);
  curveVertex(i.pos.x, i.pos.y);
  curveVertex(l.pos.x, l.pos.y);
  curveVertex(o.pos.x, o.pos.y);
  curveVertex(o.pos.x, o.pos.y);
  endShape();

  noFill();
  beginShape();
  curveVertex(a.pos.x, a.pos.y);
  curveVertex(a.pos.x, a.pos.y);
  curveVertex(g.pos.x, g.pos.y);
  curveVertex(j.pos.x, j.pos.y);
  curveVertex(m.pos.x, m.pos.y);
  curveVertex(p.pos.x, p.pos.y);
  curveVertex(p.pos.x, p.pos.y);
  endShape();

  noFill();
  beginShape();
  curveVertex(a.pos.x, a.pos.y);
  curveVertex(a.pos.x, a.pos.y);
  curveVertex(h.pos.x, h.pos.y);
  curveVertex(k.pos.x, k.pos.y);
  curveVertex(n.pos.x, n.pos.y);
  curveVertex(q.pos.x, q.pos.y);
  curveVertex(q.pos.x, q.pos.y);
  endShape();

  for (let i = 0; i < springs.length; i++) {
    let s = springs[i];
    s.update();
  }

  for (let b of balls) {
    b.drag();
    b.bounce();
    b.update();
    let gravity = createVector(0, 0.05 * b.mass);
    b.applyForce(gravity);
    let resistance = b.vel.copy();
    resistance.mult(-1);
    let sp = b.vel.mag();
    let dragForce = sp * sp * 0.03;
    resistance.mult(dragForce);
    b.applyForce(resistance);
    let bouyancy = createVector(0, -0.1);
    b.applyForce(bouyancy);
    let waterwind = createVector(0, w * b.mass * b.mass);
    b.applyForce(waterwind);
    b.display();
  }
}

///// CLASS /////

let C_GRAVITY = 1;
let DISTANCE_BTW_BALLS = 30;

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
    let strength = -0.9 * stretch * this.k; // hooke's law

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
}

class Ball {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad;
    this.damping = 0.95;
  }
  update() {
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
          force.mult(-1); // ***
          force.mult(magnitude);
          this.applyForce(force);
        }
      }
    }
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
      w = w + 0.0001;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -this.vel.y;
      w = w - 0.0001;
    }
    if (
      this.pos.x == 0 ||
      this.pos.y == 0 ||
      this.pos.y == height ||
      this.pos.x == width
    ) {
      timer = 15000;
    }
  }

  drag() {
    if (mouseIsPressed) {
      let distance = dist(this.pos.x, this.pos.y, mouseX, mouseY);
      if (distance < this.rad) {
        this.pos.x = mouseX;
        this.pos.y = mouseY;
      }
    }
  }
  display() {
    if (timer > 0) {
      push();
      translate(this.pos.x, this.pos.y);
      blendMode(ADD);
      noStroke();
      fill(255, 150);
      circle(0, 0, this.rad * 2);
      pop();
      timer -= deltaTime;
    } else {
      push();
      translate(this.pos.x, this.pos.y);
      noStroke();
      fill(255,150);
      circle(0, 0, this.rad * 2);
      pop();
    }
  }
}
