let b1Visible = false;
let b2Visible = false;
let b3Visible = false;
let b4Visible = false;
let b1lVisible = false;

//scene1
let eye1;
let eye2;
let z = 0;
let tears = [];
let C_GRAVITY = 1;
let DISTANCE_BTW_BALLS = 30;
let lights = [];
let springs1 = [];
let waters = [];
let springs2 = [];
let tearBounce = false;

//scene2
let boatInSea;

function setup() {
  createCanvas(700, 500);
  ll = new Light(340, height, 15);
  lights.push(ll);
  lm = new Light(350, height - 80, 15);
  lights.push(lm);
  lr = new Light(360, height, 15);
  lights.push(lr);
  springs1.push(new Spring1(lm, ll, 100, 0.1));
  springs1.push(new Spring1(lm, lr, 100, 0.1));

  w1 = new Water(0, height - 10, 15);
  waters.push(w1);
  w2 = new Water(110, height - 10, 15);
  waters.push(w2);
  w3 = new Water(155, height - 10, 15);
  waters.push(w3);
  w4 = new Water(200, height - 10, 15);
  waters.push(w4);
  w5 = new Water(245, height - 10, 15);
  waters.push(w5);
  w6 = new Water(290, height - 10, 15);
  waters.push(w6);
  w7 = new Water(410, height - 10, 15);
  waters.push(w7);
  w8 = new Water(455, height - 10, 15);
  waters.push(w8);
  w9 = new Water(500, height - 10, 15);
  waters.push(w9);
  w10 = new Water(545, height - 10, 15);
  waters.push(w10);
  w11 = new Water(590, height - 10, 15);
  waters.push(w11);
  w12 = new Water(700, height - 10, 15);
  waters.push(w12);
  springs2.push(new Spring2(w1, w2, 110, 0.1));
  springs2.push(new Spring2(w2, w3, 45, 0.1));
  springs2.push(new Spring2(w3, w4, 45, 0.1));
  springs2.push(new Spring2(w4, w5, 45, 0.1));
  springs2.push(new Spring2(w5, w6, 45, 0.1));
  springs2.push(new Spring2(w6, w7, 120, 0.1));
  springs2.push(new Spring2(w7, w8, 45, 0.1));
  springs2.push(new Spring2(w8, w9, 45, 0.1));
  springs2.push(new Spring2(w9, w10, 45, 0.1));
  springs2.push(new Spring2(w10, w11, 45, 0.1));
  springs2.push(new Spring2(w11, w12, 110, 0.1));
}

function draw() {
  background(0, 10);
  ll.pos.x = 320;
  ll.pos.y = height;
  lr.pos.x = 380;
  lr.pos.y = height;

  //Scene1
  if (keyIsPressed && key === "1") {
    b1Visible = true;
    b2Visible = false;
    b3Visible = false;
    b4Visible = false;
    b1lVisible = false;
    tearBounce = false;
    z = 0;
    eye1 = new Eye(200, 70);
    eye2 = new Eye(500, 70);
  }

  if (b1Visible == true) {
    eye1.display();
    eye2.display();
    if (keyIsPressed && key === "z") {
      if (z < 60) {
        z = z + 1;
      }
      if (z >= 60) {
        z = 0;
      }
    }
    if (z == 50) {
      for (let i = 0; i < 5; i++) {
        tears.push(new Tear(i * 45, 10 + 30 * sin((i / 5) * PI)));
        b1lVisible = true;
      }
    }

    if (b1lVisible == true) {
      for (let s1 of springs1) {
        s1.update();
        s1.display();
      }

      for (let l of lights) {
        l.drag();
        l.update();
        l.display();
      }

      for (let s2 of springs2) {
        s2.update();
      }

      for (let w of waters) {
        w.drag();
        w.update();
      }
    }

    for (let i = 0; i < tears.length; i++) {
      let gravity = createVector(0, 0.05 * tears[i].rad);
      tears[i].applyForce(gravity);
      let resistance = tears[i].vel.copy();
      resistance.mult(-1);
      let sp = tears[i].vel.mag();
      let dragForce = sp * sp * 0.001;
      resistance.normalize();
      resistance.mult(dragForce);
      tears[i].applyForce(resistance);
      tears[i].update();
      tears[i].bounce();
      tears[i].display();
    }
    push();
    stroke(255);
    noFill();
    beginShape();
    curveVertex(w1.pos.x, w1.pos.y);
    curveVertex(w1.pos.x, w1.pos.y);
    curveVertex(w2.pos.x, w2.pos.y);
    curveVertex(w3.pos.x, w3.pos.y);
    curveVertex(w4.pos.x, w4.pos.y);
    curveVertex(w5.pos.x, w5.pos.y);
    curveVertex(w6.pos.x, w6.pos.y);
    curveVertex(w7.pos.x, w7.pos.y);
    curveVertex(w8.pos.x, w8.pos.y);
    curveVertex(w9.pos.x, w9.pos.y);
    curveVertex(w10.pos.x, w10.pos.y);
    curveVertex(w11.pos.x, w11.pos.y);
    curveVertex(w12.pos.x, w12.pos.y);
    curveVertex(w12.pos.x, w12.pos.y);
    endShape(CLOSE);
    pop();
  }

  //Scene2
  if (mouseIsPressed && lm.pos.y <= 350) {
    b1Visible = false;
    b2Visible = true;
    b3Visible = false;
    b4Visible = false;
    b1lVisible = false;
  }

  if (b2Visible == true) {
    push();
    fill(0, 90);
    rect(0, 0, width, height);
    pop();

    boatInSea = new Boat(350, 440);
    boatInSea.display();
  }
}

class Eye {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = 30;
  }

  display() {
    push();
    noFill();
    stroke(255);
    beginShape();
    curveVertex(
      this.pos.x - 0.9 * this.rad,
      this.pos.y - 0.8 * this.rad + z * 0.8
    );
    curveVertex(
      this.pos.x - 0.9 * this.rad,
      this.pos.y - 0.8 * this.rad + z * 0.8
    );
    curveVertex(this.pos.x - 1.1 * this.rad, this.pos.y + z * 0.4);
    curveVertex(this.pos.x - 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    curveVertex(this.pos.x - 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    endShape();
    pop();

    push();
    noFill();
    stroke(255);
    beginShape();
    curveVertex(
      this.pos.x + 0.9 * this.rad,
      this.pos.y - 0.8 * this.rad + z * 0.8
    );
    curveVertex(
      this.pos.x + 0.9 * this.rad,
      this.pos.y - 0.8 * this.rad + z * 0.8
    );
    curveVertex(this.pos.x + 1.1 * this.rad, this.pos.y + z * 0.4);
    curveVertex(this.pos.x + 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    curveVertex(this.pos.x + 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    endShape();
    pop();

    push();
    noFill();
    stroke(255);
    beginShape();
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y + this.rad);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    endShape();
    pop();

    push();
    noFill();
    stroke(255);
    beginShape();
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y - this.rad + z);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    endShape();
    pop();

    push();
    noFill();
    stroke(255);
    beginShape();
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y - 1.2 * this.rad + z);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    endShape();
    pop();
  }
}

class Tear {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.rad = this.pos.y * 0.01 + 2;
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.rad = this.pos.y * 0.01 + 2;
  }

  bounce() {
    if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -0.7 * this.vel.y;
      tearBounce = true;
    } else {
      tearBounce = false;
    }
  }

  display() {
    push();
    translate(110, 70);
    translate(this.pos.x + sin(this.pos.y / 30) * 0.8, this.pos.y);
    noStroke();
    fill(255);
    circle(0, 0, this.rad * 2);
    pop();

    push();
    translate(410, 70);
    translate(this.pos.x + sin(this.pos.y / 30) * 0.8, this.pos.y);
    noStroke();
    fill(255);
    circle(0, 0, this.rad * 2);
    pop();
  }
}

class Spring1 {
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
    let strength = -1 * stretch * this.k;

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
  display() {
    push();
    strokeWeight(3);
    stroke(200, 50);
    line(
      this.bobA.pos.x,
      this.bobA.pos.y,
      this.bobB.pos.x + random(-10, 10),
      this.bobB.pos.y
    );
    line(
      this.bobA.pos.x,
      this.bobA.pos.y,
      this.bobA.pos.x - (this.bobB.pos.x - this.bobA.pos.x) + random(-10, 10),
      this.bobA.pos.y - (this.bobB.pos.y - this.bobA.pos.y) + random(-10, 20)
    );
    pop();
  }
}

class Light {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.5;
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
    noFill();
    circle(0, 0, this.rad * 2);
    pop();
  }
}

class Spring2 {
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
    let strength = -1 * stretch * this.k;

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

class Water {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.5;
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

  drag() {
    if (tearBounce == true) {
      this.pos.y = this.pos.y + 2;
    } else {
      this.pos.y = 490;
    }
  }

}

class Boat {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = 50;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(random(160, 180));
    strokeWeight(2);
    beginShape();
    curveVertex(-0.9 * this.rad, -0.8 * this.rad);
    curveVertex(-0.9 * this.rad, -0.8 * this.rad);
    curveVertex(-1.1 * this.rad, 0);
    curveVertex(-0.9 * this.rad, 0.8 * this.rad);
    curveVertex(-0.9 * this.rad, 0.8 * this.rad);
    endShape();

    beginShape();
    curveVertex(0.9 * this.rad, -0.8 * this.rad);
    curveVertex(0.9 * this.rad, -0.8 * this.rad);
    curveVertex(1.1 * this.rad, 0);
    curveVertex(0.9 * this.rad, 0.8 * this.rad);
    curveVertex(0.9 * this.rad, 0.8 * this.rad);
    endShape();

    beginShape();
    curveVertex(-this.rad * 3, 0);
    curveVertex(-this.rad * 3, 0);
    curveVertex(0, this.rad);
    curveVertex(this.rad * 3, 0);
    curveVertex(this.rad * 3, 0);
    endShape();

    beginShape();
    curveVertex(-this.rad * 3, 0);
    curveVertex(-this.rad * 3, 0);
    curveVertex(0, -this.rad);
    curveVertex(this.rad * 3, 0);
    curveVertex(this.rad * 3, 0);
    endShape();

    beginShape();
    curveVertex(-this.rad * 3, 0);
    curveVertex(-this.rad * 3, 0);
    curveVertex(0, 1.2 * this.rad);
    curveVertex(this.rad * 3, 0);
    curveVertex(this.rad * 3, 0);
    endShape();
    pop();
  }
}
