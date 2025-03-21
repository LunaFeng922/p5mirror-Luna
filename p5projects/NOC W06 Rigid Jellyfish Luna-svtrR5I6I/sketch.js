let balls = [];
let springs = [];

function setup() {
  createCanvas(800, 600);

  let a = new Ball(300, 75, 40);
  balls.push(a);
  let b = new Ball(150, 125, 20);
  balls.push(b);
  let c = new Ball(450, 125, 20);
  balls.push(c);
  let d = new Ball(450, 350, 20);
  balls.push(d);
  let e = new Ball(150, 350, 20);
  balls.push(e);
  let z = new Ball(300, 50, 20);
  balls.push(z);
  let f = new Ball(275, 200, 10);
  balls.push(f);
  let g = new Ball(300, 200, 10);
  balls.push(g);
  let h = new Ball(325, 200, 10);
  balls.push(h);
  let i = new Ball(275, 300, 5);
  balls.push(i);
  let j = new Ball(300, 300, 5);
  balls.push(j);
  let k = new Ball(325, 300, 5);
  balls.push(k);
  let l = new Ball(275, 350, 3);
  balls.push(l);
  let m = new Ball(300, 350, 3);
  balls.push(m);
  let n = new Ball(325, 350, 3);
  balls.push(n);
  let o = new Ball(275, 375, 3);
  balls.push(o);
  let p = new Ball(300, 375, 3);
  balls.push(p);
  let q = new Ball(325, 375, 3);
  balls.push(q);


  springs.push(new Spring(a, b, 175, 0.3));
  springs.push(new Spring(a, c, 175, 0.3));
  springs.push(new Spring(a, d, 225, 0.3));
  springs.push(new Spring(a, e, 225, 0.3));
  springs.push(new Spring(a, z, 30, 0.3));

  springs.push(new Spring(b, z, 200, 0.2));
  springs.push(new Spring(z, c, 200, 0.2));
  springs.push(new Spring(c, d, 150, 0.2));
  springs.push(new Spring(d, e, 200, 0.2));
  springs.push(new Spring(e, b, 150, 0.2));

  springs.push(new Spring(a, f, 130, 0.2));
  springs.push(new Spring(a, g, 140, 0.2));
  springs.push(new Spring(a, h, 130, 0.2));
  springs.push(new Spring(f, i, 100, 0.2));
  springs.push(new Spring(g, j, 100, 0.2));
  springs.push(new Spring(h, k, 100, 0.2));
  springs.push(new Spring(i, l, 50, 0.5));
  springs.push(new Spring(j, m, 50, 0.5));
  springs.push(new Spring(k, n, 50, 0.5));
  springs.push(new Spring(l, o, 50, 0.5));
  springs.push(new Spring(m, p, 50, 0.5));
  springs.push(new Spring(n, q, 50, 0.5));
  //springs.push(new Spring(e, a, 150, 0.3));
}

function draw() {
 background(0,80);

  for (let s of springs) {
    s.update();
    s.display();
  }

  beginShape();
  for (let b of balls) {
    b.drag();
    b.bounce();
    b.update();

    b.display();
  }
  endShape(CLOSE);
}

///// CLASS /////

let C_GRAVITY = 1;
let DISTANCE_BTW_BALLS = 30;

class Spring {
  constructor(a, b, restLength, stiffness) {
    this.bobA = a;
    this.bobB = b;
    this.len = restLength;
    this.k = stiffness; // spring constant
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

    //text(strength.toFixed(2), this.bobB.pos.x + 50, this.bobB.pos.y);
  }
  display() {
    stroke(255,80);
    line(this.bobA.pos.x, this.bobA.pos.y, this.bobB.pos.x, this.bobB.pos.y);
    //circle(this.bobB.pos.x, this.bobB.pos.y, 8);
    //bezier(this.bobA.pos.x, this.bobA.pos.y, this.bobB.pos.x, this.bobB.pos.y);
  }
}

class Ball {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad; // MASS!
    //
    this.damping = 0.95;
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // let's apply damping here
    this.vel.mult(this.damping); // -5%;
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
    // this method is duplicated from attractedTo()
    // then, the force vector is flipped.
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
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -this.vel.y;
    }
  }
  drag() {
    if (mouseIsPressed) {
      let distance = dist(this.pos.x, this.pos.y, mouseX, mouseY);
      if (distance < this.rad) {
        // in
        this.pos.x = mouseX;
        this.pos.y = mouseY;
      }
    }
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    //blendMode(ADD);
    fill(255, 150);
    circle(0, 0, this.rad * 2);
    pop();
  }
}
