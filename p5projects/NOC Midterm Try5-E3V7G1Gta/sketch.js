let scene = 0;

let b1lVisible = false;

//scene1
let eye1;
let eye2;
let z = 0;
let tears = [];
let lights1 = [];
let springs1 = [];
let C_GRAVITY = 1;
let DISTANCE_BTW_BALLS = 30;

//scene2
let boatInSea;
let WATER_LEVEL = 0;
let lights2 = [];
let springs2 = [];
let seaWeeds = [];
let springs3_1 = [];
let springs3_2 = [];

//scene3
let boats = [];
let bounceCountBE = 0;
let sweeds = [];

//scene4
let bowl;
let a = 100;

function setup() {
  createCanvas(700, 500);
  ll1 = new Light1(290, height + 80, 15, true);
  lights1.push(ll1);
  lm1 = new Light1(350, height, 30);
  lights1.push(lm1);
  lr1 = new Light1(410, height + 80, 15, true);
  lights1.push(lr1);
  springs1.push(new Spring(lm1, ll1, 100, 0.1));
  springs1.push(new Spring(lm1, lr1, 100, 0.1));

  ll2 = new Light2(260, 120, 15);
  lights2.push(ll2);
  lm2 = new Light2(350, 0, 15, true);
  lights2.push(lm2);
  lm2k = new Light2(350, 120, 30);
  lights2.push(lm2k);
  lr2 = new Light2(440, 120, 15);
  lights2.push(lr2);

  springs2.push(new Spring(lm2, ll2, 150, 0.1));
  springs2.push(new Spring(lm2, lr2, 150, 0.1));
  springs2.push(new Spring(lm2, lm2k, 120, 0.1));
  springs2.push(new Spring(lm2k, ll2, 90, 0.5));
  springs2.push(new Spring(lm2k, lr2, 90, 0.5));

  for (let i = 0; i < 3; i++) {
    sweeds.push(new Seaweed(i * 90 + 20, 0));
  }
  for (let i = 5; i < 8; i++) {
    sweeds.push(new Seaweed(i * 90 + 50, 0));
  }
}

function draw() {
  background(0, 10);

  if (scene == 1) {
    drawScene1();
  } else if (scene == 2) {
    drawScene2();
  } else if (scene == 3) {
    drawScene3();
  } else if (scene == 4) {
    drawScene4();
  }
}

function keyPressed() {
  if (key === "1") {
    b1lVisible = false;
    z = 0;
    eye1 = new Eye(200, 70);
    eye2 = new Eye(500, 70);

    scene = 1;
  }
}

function drawScene1() {
  eye1.display();
  eye2.display();
  if (mouseIsPressed) {
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
      if (tears.length >= 10) {
        tears.shift();
      }
      b1lVisible = true;
    }
  } else if (lm1.pos.y <= 330) {
    b1lVisible = false;
  }

  if (b1lVisible == true) {
    for (let s1 of springs1) {
      s1.update();
      s1.display();
    }

    for (let l1 of lights1) {
      l1.drag();
      l1.update();
      l1.display();
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
      tears[i].display();
    }

    push();
    strokeWeight(random(1, 5));
    stroke(255, random(10, 100));
    noFill();
    beginShape();
    curveVertex(0, height + random(-3, 0) * sin(frameCount * 0.1));
    curveVertex(0, height + random(-3, 0) * sin(frameCount * 0.1));
    curveVertex(70, height + random(-10, 0) * sin(frameCount * 0.1));
    curveVertex(140, height + random(-20, 0) * sin(frameCount * 0.1));
    curveVertex(210, height + random(-10, 0) * sin(frameCount * 0.1));
    curveVertex(280, height + random(-20, 0) * sin(frameCount * 0.1));
    curveVertex(350, height + random(-10, 0) * sin(frameCount * 0.1));
    curveVertex(420, height + random(-20, 0) * sin(frameCount * 0.1));
    curveVertex(490, height + random(-10, 0) * sin(frameCount * 0.1));
    curveVertex(560, height + random(-20, 0) * sin(frameCount * 0.1));
    curveVertex(630, height + random(-10, 0) * sin(frameCount * 0.1));
    curveVertex(700, height + random(-3, 0) * sin(frameCount * 0.1));
    curveVertex(700, height + random(-3, 0) * sin(frameCount * 0.1));
    endShape();
    pop();
  }

  if (mouseIsPressed && lm1.pos.y <= 330) {
    b1lVisible = false;

    scene = 2;
    startFrameCount = frameCount;
  }
}

function drawScene2() {
  if ((frameCount - startFrameCount) * 0.8 < 330) {
    translate(0, 330 - (frameCount - startFrameCount) * 0.8);
  }
  //background
  push();
  noStroke();
  fill((120 - lm2k.pos.y) * 2.5, 120 - lm2k.pos.y * 2);
  rect(0, 0, width, height);
  pop();

  //boat
  boatInSea = new Boat(350, 440);
  boatInSea.display();

  push();
  strokeWeight(random(1, 5));
  stroke(255, random(10, 100));
  noFill();
  beginShape();
  curveVertex(0, WATER_LEVEL + random(-3, 0) * sin(frameCount * 0.1));
  curveVertex(0, WATER_LEVEL + random(-3, 0) * sin(frameCount * 0.1));
  curveVertex(70, WATER_LEVEL + random(-10, 0) * sin(frameCount * 0.1));
  curveVertex(140, WATER_LEVEL + random(-20, 0) * sin(frameCount * 0.1));
  curveVertex(210, WATER_LEVEL + random(-10, 0) * sin(frameCount * 0.1));
  curveVertex(280, WATER_LEVEL + random(-20, 0) * sin(frameCount * 0.1));
  curveVertex(350, WATER_LEVEL + random(-10, 0) * sin(frameCount * 0.1));
  curveVertex(420, WATER_LEVEL + random(-20, 0) * sin(frameCount * 0.1));
  curveVertex(490, WATER_LEVEL + random(-10, 0) * sin(frameCount * 0.1));
  curveVertex(560, WATER_LEVEL + random(-20, 0) * sin(frameCount * 0.1));
  curveVertex(630, WATER_LEVEL + random(-10, 0) * sin(frameCount * 0.1));
  curveVertex(700, WATER_LEVEL + random(-3, 0) * sin(frameCount * 0.1));
  curveVertex(700, WATER_LEVEL + random(-3, 0) * sin(frameCount * 0.1));
  endShape();
  pop();

  //light
  for (let s2 of springs2) {
    s2.update();
  }

  push();
  stroke(255, 255, 200, random(0, 100));
  noFill();
  circle(lm2.pos.x, lm2.pos.y, 4);
  circle(
    (lm2k.pos.x - lm2.pos.x) / 3 + lm2.pos.x,
    (lm2k.pos.y - lm2.pos.y) / 3 + lm2.pos.y,
    6
  );
  circle((lm2.pos.x + lm2k.pos.x) / 2, (lm2.pos.y + lm2k.pos.y) / 2, 8);
  circle(
    (2 * (lm2k.pos.x - lm2.pos.x)) / 3 + lm2.pos.x,
    (2 * (lm2k.pos.y - lm2.pos.y)) / 3 + lm2.pos.y,
    10
  );
  circle(lm2k.pos.x, lm2k.pos.y, 12);
  pop();

  push();
  strokeWeight(3);
  stroke(255, random(80, 100));
  line(
    lm2.pos.x,
    lm2.pos.y,
    2 * lr2.pos.x - lm2.pos.x + random(-5, 5),
    2 * lr2.pos.y - lm2.pos.y + random(-5, 15)
  );
  line(
    lm2.pos.x,
    lm2.pos.y,
    2 * ll2.pos.x - lm2.pos.x + random(-5, 5),
    2 * ll2.pos.y - lm2.pos.y + random(-5, 15)
  );
  line(
    lm2.pos.x,
    lm2.pos.y,
    2 * lm2.pos.x - lr2.pos.x + random(-5, 5),
    2 * lm2.pos.y - lr2.pos.y + random(-5, 15) - 50
  );
  line(
    lm2.pos.x,
    lm2.pos.y,
    2 * lm2.pos.x - ll2.pos.x + random(-5, 5),
    2 * lm2.pos.y - ll2.pos.y + random(-5, 15) - 50
  );
  pop();

  for (let l2 of lights2) {
    l2.drag();
    l2.update();
    l2.display();
  }

  for (let i = 0; i < sweeds.length; i++) {
    let sws = sweeds[i];
    sws.run();
  }

  // move to the next scene
  if (mouseIsPressed && lm2k.pos.y <= 10) {
    b1lVisible = false;
    bounceCountBE = 0;
    for (let i = 0; i < 2; i++) {
      let x = 200 + i * 300;
      let y = 250 + random(-3, 3);
      boats.push(new BoatEye(x, y, 50));
    }

    scene = 3;
  }
}

function drawScene3() {
  //white background
  push();
  noStroke();
  fill(0);
  rect(0, 0, width, height);
  pop();
  //boats
  for (let i = 0; i < boats.length; i++) {
    let boat = boats[i];
    boat.applyGravitationalAttraction(boats);
    boat.update();
    boat.limitVelocity(5);
    boat.checkCollision();
    boat.bounce();
    boat.display();
  }
  // move to the next scene
  if (bounceCountBE >= 3000) {
    b1lVisible = false;

    scene = 4;
    bowl = new Bowl(350, 250);
  }
}

function drawScene4() {
  if (a >= 25) {
    a = a - 0.5;
  } else if (a < 25) {
    a = 25;
  }
  bowl.display();
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
    this.parency = 100;
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

  display() {
    if (this.pos.y < 350) {
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
    } else if (this.pos.y >= 350) {
      this.parency--;
      push();
      translate(110, 70);
      translate(this.pos.x + sin(this.pos.y / 30) * 0.8, this.pos.y);
      noStroke();
      fill(255, this.parency);
      circle(0, 0, this.rad * 2);
      pop();

      push();
      translate(410, 70);
      translate(this.pos.x + sin(this.pos.y / 30) * 0.8, this.pos.y);
      noStroke();
      fill(255, this.parency);
      circle(0, 0, this.rad * 2);
      pop();
    }
  }
}

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
    strokeWeight(5);
    stroke(255, random(90, 100));
    line(
      this.bobA.pos.x,
      this.bobA.pos.y,
      this.bobB.pos.x + random(-10, 10),
      this.bobB.pos.y
    );
    line(
      this.bobA.pos.x,
      this.bobA.pos.y,
      this.bobA.pos.x - (this.bobB.pos.x - this.bobA.pos.x + random(-5, 5)),
      this.bobA.pos.y - (this.bobB.pos.y - this.bobA.pos.y + random(-5, 15))
    );
    pop();
  }
}

class Light1 {
  constructor(x, y, rad, immovable = false) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.5;
    this.damping = 0.95;
    this.isImmovable = immovable;
  }
  update() {
    if (this.isImmovable) return;
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
          force.mult(-1);
          force.mult(magnitude);
          this.applyForce(force);
        }
      }
    }
  }

  drag() {
    if (this.isImmovable) return;
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

class Boat {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = 50;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(random(200, 255));
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

class Light2 {
  constructor(x, y, rad, immovable = false) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.5;
    this.damping = 0.95;
    this.isImmovable = immovable;
  }
  update() {
    if (this.isImmovable) return;
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
    if (this.isImmovable) return;
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

class SeaweedPoint {
  constructor(x, y, rad, immovable = false) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.5;
    this.damping = 0.95;
    this.isImmovable = immovable;
  }
  update() {
    if (this.isImmovable) return;
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
          force.mult(-1);
          force.mult(magnitude);
          this.applyForce(force);
        }
      }
    }
  }

  drag(xOffset = 0, yOffset = 0) {
    if (this.isImmovable) return;
    if (mouseIsPressed) {
      let distance = dist(
        this.pos.x + xOffset,
        this.pos.y + yOffset,
        mouseX,
        mouseY
      );
      if (distance < this.rad) {
        // in
        this.pos.x = mouseX - xOffset;
        this.pos.y = mouseY - yOffset;
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

class BoatEye {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.initRad = rad;
    this.rad = rad;
    this.mass = this.rad * this.rad;
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.rad = (bounceCountBE * 0.003 + 1) * this.initRad;
  }

  applyForce(f) {
    if (this.mass > 0) {
      let force = p5.Vector.div(f, this.mass);
      this.acc.add(force);
    }
  }

  applyGravitationalAttraction(other) {
    for (let i = 0; i < boats.length; i++) {
      let other = boats[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);
        let magnitude =
          (C_GRAVITY * this.mass * other.mass) / (distance * distance);
        let force = p5.Vector.sub(other.pos, this.pos);
        force.normalize();
        force.mult(magnitude);
        if (distance < this.rad) {
          force.mult(-1);
          force.mult(5);
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
      this.vel.x = -1.1 * this.vel.x;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -1.1 * this.vel.x;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = -1.1 * this.vel.y;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -1.1 * this.vel.y;
    }
  }

  checkCollision() {
    for (let j = 0; j < boats.length; j++) {
      if (this !== boats[j]) {
        let distance = p5.Vector.dist(this.pos, boats[j].pos);
        if (distance < this.rad + boats[j].rad) {
          bounceCountBE++;
        }
      }
    }
  }

  display() {
    push();
    noFill();
    stroke(255);
    strokeWeight(1 + bounceCountBE * 0.05);
    beginShape();
    curveVertex(this.pos.x - 0.9 * this.rad, this.pos.y - 0.8 * this.rad);
    curveVertex(this.pos.x - 0.9 * this.rad, this.pos.y - 0.8 * this.rad);
    curveVertex(this.pos.x - 1.1 * this.rad, this.pos.y);
    curveVertex(this.pos.x - 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    curveVertex(this.pos.x - 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    endShape();

    beginShape();
    curveVertex(this.pos.x + 0.9 * this.rad, this.pos.y - 0.8 * this.rad);
    curveVertex(this.pos.x + 0.9 * this.rad, this.pos.y - 0.8 * this.rad);
    curveVertex(this.pos.x + 1.1 * this.rad, this.pos.y);
    curveVertex(this.pos.x + 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    curveVertex(this.pos.x + 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    endShape();

    beginShape();
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y + this.rad);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    endShape();

    beginShape();
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y - this.rad);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    endShape();

    beginShape();
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y + 1.2 * this.rad);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    endShape();
    pop();
  }
}

class Seaweed {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.points = [];
    this.springs = [];
    this.generate();
  }
  generate() {
    this.points.push(new SeaweedPoint(-10, height, 20, true));
    this.points.push(new SeaweedPoint(-8, height - 60, 20));
    this.points.push(new SeaweedPoint(-6, height - 90, 20));
    this.points.push(new SeaweedPoint(0, height - 120, 20));
    this.points.push(new SeaweedPoint(6, height - 90, 20));
    this.points.push(new SeaweedPoint(8, height - 60, 20));
    this.points.push(new SeaweedPoint(10, height, 20, true));

    for (let i = 0; i < this.points.length - 1; i++) {
      this.springs.push(
        new Spring(this.points[i], this.points[i + 1], 50, 0.5)
      );
    }
  }
  run() {
    //seaWeeds
    for (let s of this.springs) {
      s.update();
    }

    push();
    translate(this.x, this.y);
    stroke(255, random(80, 100));
    noFill();
    beginShape();
    let firstPointPos = this.points[0].pos;
    let lastPointPos = this.points[this.points.length - 1].pos;
    curveVertex(firstPointPos.x, firstPointPos.y);
    for (let pt of this.points) {
      pt.drag(this.x, this.y);
      pt.update();
      curveVertex(pt.pos.x, pt.pos.y);
    }
    curveVertex(lastPointPos.x, lastPointPos.y);
    endShape();
    pop();
  }
}

class Bowl {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = 200;
  }

  display() {
    //     beginShape();
    //     curveVertex(this.pos.x - 0.9 * this.rad, this.pos.y - 0.8 * this.rad);
    //     curveVertex(this.pos.x - 0.9 * this.rad, this.pos.y - 0.8 * this.rad);
    //     curveVertex(this.pos.x - 1.1 * this.rad, this.pos.y);
    //     curveVertex(this.pos.x - 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    //     curveVertex(this.pos.x - 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    //     endShape();

    //     beginShape();
    //     curveVertex(this.pos.x + 0.9 * this.rad, this.pos.y - 0.8 * this.rad);
    //     curveVertex(this.pos.x + 0.9 * this.rad, this.pos.y - 0.8 * this.rad);
    //     curveVertex(this.pos.x + 1.1 * this.rad, this.pos.y);
    //     curveVertex(this.pos.x + 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    //     curveVertex(this.pos.x + 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    //     endShape();
    push();
    fill(100, 60, 20, 50);
    strokeWeight(10);
    stroke(100, 60, 20);
    beginShape();
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y + this.rad);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y - 0.8 * this.rad);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    endShape();
    pop();

    push();
    fill(255, random(50, 55));
    noStroke();
    beginShape();
    curveVertex(this.pos.x - this.rad * 2.5, this.pos.y);
    curveVertex(this.pos.x - this.rad * 2.5, this.pos.y);
    curveVertex(this.pos.x, this.pos.y + this.rad);
    curveVertex(this.pos.x + this.rad * 2.5, this.pos.y);
    curveVertex(this.pos.x + this.rad * 2.5, this.pos.y);
    curveVertex(this.pos.x, this.pos.y - 0.6 * this.rad);
    curveVertex(this.pos.x - this.rad * 2.5, this.pos.y);
    curveVertex(this.pos.x - this.rad * 2.5, this.pos.y);
    endShape();
    pop();

    push();
    fill(100, 60, 20);
    strokeWeight(10);
    stroke(100, 60, 20);
    beginShape();
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y + 1.2 * this.rad);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y + this.rad);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    endShape();
    pop();

    push();
    noStroke();
    fill(255, a);
    rect(0, 0, width, height);
    pop();
  }
}
