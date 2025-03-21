//Credit:
//Finding references in NOC W10 example code by Prof.Moon!
//A lot of objects from my previously weekly assignment homework!


let gui;
let fishes = [];
let leafs = [];
let stones = [];
let lotus;
let C_GRAVITY = 3;
const AREA_MARGIN = 250;

let ui = {
  ns: 10,
  gravity: 3,
};

function setup() {
  createCanvas(600, 600);

  gui = new dat.GUI();
  gui.add(ui, "ns", 2, 20).step(1).onChange(updateNs);
  gui.add(ui, "gravity", 1, 5).step(1).onChange(updateGravity);

  for (let i = 0; i < 10; i++) {
    fishes.push(
      new Fish(
        random(width),
        random(height),
        color(255, random(0, 100), 0, 90)
      )
    );
  }

  for (let i = 0; i < 4; i++) {
    leafs.push(
      new Leaf(
        random(width),
        random(height),
        color(random(0, 10), random(50, 60), random(20, 60), 80)
      )
    );
  }

  for (let i = 0; i < 4; i++) {
    stones.push(
      new Stone(
        random(200, width - 200),
        random(200, height - 200),
        color(100, random(80, 100))
      )
    );
  }

  noCursor();
  lotus = new Lotus(mouseX, mouseY);

  textAlign(CENTER);
  textSize(30);
}

function updateNs() {
  let diff = ui.ns - fishes.length;
  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      fishes.push(
        new Fish(
          random(width),
          random(height),
          color(255, random(0, 100), 0, 90)
        )
      );
    }
  } else if (diff < 0) {
    for (let i = 0; i < -diff; i++) {
      fishes.pop();
    }
  }
}

function updateGravity() {
  C_GRAVITY = ui.gravity;
}

function draw() {
  background(100*0.6, 170*0.6, 220*0.6, 50);

  push();
  translate(width / 2, height / 2 - 20);
  rotate(PI * 0.1);
  noFill();
  stroke(220, 220, 150);
  strokeWeight(2);
  for (let i = 0; i < 20; i++) {
    arc(0, 0, 500, 500, 0, PI * 0.05);
    rotate(PI * 0.1);
  }
  pop();

  push();
  //fill(210, 200, 140, 30);
  strokeWeight(2);
  stroke(210, 200, 140);
  line(width / 2 - 10, height - 70, width / 2 - 10, height);
  line(width / 2 + 10, height - 70, width / 2 + 10, height);
  pop();

  push();
  strokeWeight(2);
  fill(255, 255, 220, 50);
  stroke(220, 220, 150);
  ellipse(width / 2, height / 2 - 20, AREA_MARGIN * 2.2, AREA_MARGIN * 2.2);
  fill(80, 90, 40, 30);
  //stroke(220, 220, 150);
  noStroke();
  ellipse(width / 2, height / 2 - 20, AREA_MARGIN * 2, AREA_MARGIN * 2);
  pop();

  push();
  noStroke();
  fill(255);
  textFont("Long Cang");
  text("鱼", 580, 350);
  text("在", 580, 400);
  text("画", 580, 450);
  text("中", 580, 500);
  text("游", 580, 550);
  pop();

  for (let f of fishes) {
    let target = createVector(mouseX, mouseY);
    f.seek(target);
    f.avoidlea(leafs);
    f.avoidfis(fishes);
    f.avoidsto(stones);
    f.update();
    f.reappear();
    f.checkAreaBoundaries();
    f.display();
  }

  for (let l of leafs) {
    l.applyGravitationalAttraction(leafs);
    l.update();
    l.limitVelocity(5);
    l.bounce();
    l.checkAreaBoundaries();
    l.display();
  }

  for (let s of stones) {
    s.display();
  }

  lotus.update(mouseX, mouseY);
  lotus.display();

  for (let x = 0; x < 250; x++) {
    let freq = x * 0.03 + frameCount * 0.02; // position + time
    let amp = 20;
    let sinValue = sin(freq) * amp;
    push();
    noStroke();
    fill(255);
    circle(x - 20, 150 - sinValue + random(-10, 10) - 20, random(0.5, 1));
    circle(x, 150 + sinValue - random(-10, 10) - 20, random(0.5, 1));
    scale(1.2, 1);
    circle(x - 20, 150 - sinValue + random(-5, 5) - 20, random(0.5, 1));
    circle(x, 150 + sinValue - random(-5, 5) - 20, random(0.5, 1));
    pop();
  }

  for (let x = 350; x < width; x++) {
    let freq = -x * 0.03 + frameCount * 0.02; // position + time
    let amp = 20;
    let sinValue = sin(freq) * amp;
    push();
    noStroke();
    fill(255);
    circle(x - 20, 450 - sinValue + random(-10, 10) + 20, random(0.5, 1));
    circle(x, 450 + sinValue - random(-10, 10) + 20, random(0.5, 1));
    scale(1.2, 1);
    circle(x - 20, 450 - sinValue + random(-5, 5) + 20, random(0.5, 1));
    circle(x, 450 + sinValue - random(-5, 5) + 20, random(0.5, 1));
    pop();
  }
}

class Fish {
  constructor(x, y, color) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    //
    this.mass = 1.5;
    this.size = random(15, 20);
    //
    this.angle = 0;
    //
    this.maxSpeed = 4;
    this.maxSteerForce = 0.1;
    //
    this.brakeRad = 120;
    this.senseRad = 100;
    this.col = color;
  }
  checkAreaBoundaries() {
    let distanceToCenter = dist(
      this.pos.x,
      this.pos.y,
      width / 2,
      height / 2 - 20
    );
    if (distanceToCenter > AREA_MARGIN) {
      let desired = createVector(width / 2, height / 2 - 20).sub(this.pos);
      desired.normalize();
      desired.mult(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxSteerForce);
      this.applyForce(steer);
    }
  }
  attracted(target) {
    let vector = p5.Vector.sub(target, this.pos);
    vector.mult(0.05);
    this.applyForce(vector);
    //
    this.vel.mult(0.9);
  }
  seek(target) {
    let desiredVel = p5.Vector.sub(target, this.pos);
    let distance = desiredVel.mag();

    desiredVel.normalize(); // direction

    // arriving
    if (distance < this.brakeRad) {
      let speed = map(distance, 0, this.brakeRad, 0, this.maxSpeed);
      desiredVel.mult(speed * 0.5);
    } else {
      desiredVel.mult(this.maxSpeed * 0.5); // desire
    }

    let steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxSteerForce * 0.5);

    this.applyForce(steerForce);
  }
  avoidfis(fishes) {
    for (let fish of fishes) {
      if (this === fish) continue;
      let desiredVel = p5.Vector.sub(fish.pos, this.pos);
      let distance = desiredVel.mag();
      desiredVel.normalize(); // direction
      if (distance > this.senseRad) continue;
      desiredVel.mult(-this.maxSpeed);

      let steerForce = p5.Vector.sub(desiredVel, this.vel);
      steerForce.limit(this.maxSteerForce * 0.5); //***

      this.applyForce(steerForce);
    }
  }
  avoidlea(leafs) {
    for (let i = 0; i < leafs.length; i++) {
      let lea = leafs[i];

      let desiredVec = p5.Vector.sub(lea.pos, this.pos);

      let distance = desiredVec.mag();
      if (distance < this.senseRad + lea.rad) {
        desiredVec.normalize();
        desiredVec.mult(this.maxSpeed);
        desiredVec.mult(-1); // *** flip this to avoid!

        let steerForce = p5.Vector.sub(desiredVec, this.vel);
        steerForce.limit(this.maxSteerForce);

        this.applyForce(steerForce);
      }
    }
  }
  avoidsto(stones) {
    for (let i = 0; i < stones.length; i++) {
      let sto = stones[i];

      let desiredVec = p5.Vector.sub(sto.pos, this.pos);

      let distance = desiredVec.mag();
      if (distance < this.senseRad + sto.rad) {
        desiredVec.normalize();
        desiredVec.mult(this.maxSpeed);
        desiredVec.mult(-1); // *** flip this to avoid!

        let steerForce = p5.Vector.sub(desiredVec, this.vel);
        steerForce.limit(this.maxSteerForce);

        this.applyForce(steerForce);
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
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }
  applyForce(f) {
    if (this.mass <= 0) {
      console.log("Wrong mass");
      return;
    }
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    stroke(this.col);
    noFill();
    beginShape();
    curveVertex(this.size * 0.5, 0);
    curveVertex(this.size * 0.5, 0);
    curveVertex(0, this.size * 0.2);
    curveVertex(-this.size * 1, 0);
    curveVertex(-this.size * 2, -this.size * 0.2);
    curveVertex(-this.size * 2, -this.size * 0.2);
    endShape();
    beginShape();
    curveVertex(this.size * 0.5, 0);
    curveVertex(this.size * 0.5, 0);
    curveVertex(0, -this.size * 0.2);
    curveVertex(-this.size * 1, 0);
    curveVertex(-this.size * 2, this.size * 0.2);
    curveVertex(-this.size * 2, this.size * 0.2);
    endShape();
    pop();

    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    noFill();
    stroke(255);
    beginShape();
    curveVertex(-this.size * 2.3, this.size * 0.2);
    curveVertex(-this.size * 2.3, this.size * 0.2);
    curveVertex(-this.size * 2.5, this.size * 0.25);
    curveVertex(-this.size * 3, this.size * 0.2);
    curveVertex(-this.size * 3, this.size * 0.2);
    endShape();

    beginShape();
    curveVertex(-this.size * 2.3, this.size * 0.2);
    curveVertex(-this.size * 2.3, this.size * 0.2);
    curveVertex(-this.size * 2.5, this.size * 0.25);
    curveVertex(-this.size * 3, this.size * 0.4);
    curveVertex(-this.size * 3, this.size * 0.4);
    endShape();

    beginShape();
    curveVertex(-this.size * 2.3, -this.size * 0.2);
    curveVertex(-this.size * 2.3, -this.size * 0.2);
    curveVertex(-this.size * 2.5, -this.size * 0.25);
    curveVertex(-this.size * 3, -this.size * 0.2);
    curveVertex(-this.size * 3, -this.size * 0.2);
    endShape();

    beginShape();
    curveVertex(-this.size * 2.3, -this.size * 0.2);
    curveVertex(-this.size * 2.3, -this.size * 0.2);
    curveVertex(-this.size * 2.5, -this.size * 0.25);
    curveVertex(-this.size * 3, -this.size * 0.4);
    curveVertex(-this.size * 3, -this.size * 0.4);
    endShape();
    pop();
  }
}

class Leaf {
  constructor(x, y, color) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = random(25, 50);
    this.mass = this.rad * 0.5;
    this.col = color;
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
    for (let i = 0; i < leafs.length; i++) {
      let other = leafs[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);
        let magnitude =
          (C_GRAVITY * this.mass * other.mass) / (distance * distance);
        let force = p5.Vector.sub(other.pos, this.pos);
        force.normalize();
        force.mult(magnitude);
        if (distance < this.rad) {
          force.mult(-1);
          force.mult(2);
        }
        this.applyForce(force);
        this.acc.limit(5);
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
  checkAreaBoundaries() {
    let distanceToCenter = dist(
      this.pos.x,
      this.pos.y,
      width / 2,
      height / 2 - 20
    );
    if (distanceToCenter > AREA_MARGIN) {
      let desired = createVector(width / 2, height / 2 - 20).sub(this.pos);
      desired.normalize();
      desired.mult(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxSteerForce * 0.1);
      this.applyForce(steer);
    }
  }
  display() {
    push();
    noStroke();
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.rad * 2.5, this.rad * 2);
    pop();
  }
}

class Lotus {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    //
    this.dia1 = 1;
    this.dia2 = 1.5;
    //
    this.r = 240;
    this.g = 190;
    this.b = 180;
    this.a = 100;
  }
  update(x, y) {
    this.x = x;
    this.y = y;
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(radians(-110));
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    scale(0.3 * this.dia1, 0.4 * this.dia2);
    beginShape();
    curveVertex(-25, -110);
    curveVertex(-25, -110);
    curveVertex(-55, -25);
    curveVertex(-45, 10);
    curveVertex(-5, 10);
    curveVertex(5, -25);
    curveVertex(-25, -110);
    curveVertex(-25, -110);
    endShape();
    pop();

    push();
    translate(this.x, this.y);
    rotate(radians(110));
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    scale(0.3 * this.dia1, 0.4 * this.dia2);
    beginShape();
    curveVertex(25, -110);
    curveVertex(25, -110);
    curveVertex(-5, -25);
    curveVertex(5, 10);
    curveVertex(45, 10);
    curveVertex(55, -25);
    curveVertex(25, -110);
    curveVertex(25, -110);
    endShape();
    pop();

    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    scale(0.6 * this.dia1, 0.5 * this.dia2);
    beginShape();
    curveVertex(0, -100);
    curveVertex(0, -100);
    curveVertex(-30, -15);
    curveVertex(-20, 20);
    curveVertex(20, 20);
    curveVertex(30, -15);
    curveVertex(0, -100);
    curveVertex(0, -100);
    endShape();
    scale(0.5, 0.8);
    fill(this.r, this.g - 30, this.b - 30, this.a + 10);
    beginShape();
    curveVertex(0, -100);
    curveVertex(0, -100);
    curveVertex(-30, -15);
    curveVertex(-20, 20);
    curveVertex(20, 20);
    curveVertex(30, -15);
    curveVertex(0, -100);
    curveVertex(0, -100);
    endShape();
    pop();

    push();
    translate(this.x, this.y);
    rotate(radians(-54));
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    scale(0.6 * this.dia1, 0.5 * this.dia2);
    beginShape();
    curveVertex(-5, -110);
    curveVertex(-5, -110);
    curveVertex(-35, -25);
    curveVertex(-25, 10);
    curveVertex(15, 10);
    curveVertex(25, -25);
    curveVertex(-5, -110);
    curveVertex(-5, -110);
    endShape();
    scale(0.5, 0.8);
    fill(this.r, this.g - 30, this.b - 30, this.a + 10);
    beginShape();
    curveVertex(-5, -110);
    curveVertex(-5, -110);
    curveVertex(-35, -25);
    curveVertex(-25, 10);
    curveVertex(15, 10);
    curveVertex(25, -25);
    curveVertex(-5, -110);
    curveVertex(-5, -110);
    endShape();
    pop();

    push();
    translate(this.x, this.y);
    rotate(radians(54));
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    scale(0.6 * this.dia1, 0.5 * this.dia2);
    beginShape();
    curveVertex(5, -110);
    curveVertex(5, -110);
    curveVertex(-25, -25);
    curveVertex(-15, 10);
    curveVertex(25, 10);
    curveVertex(35, -25);
    curveVertex(5, -110);
    curveVertex(5, -110);
    endShape();
    scale(0.5, 0.8);
    fill(this.r, this.g - 30, this.b - 30, this.a + 10);
    beginShape();
    curveVertex(5, -110);
    curveVertex(5, -110);
    curveVertex(-25, -25);
    curveVertex(-15, 10);
    curveVertex(25, 10);
    curveVertex(35, -25);
    curveVertex(5, -110);
    curveVertex(5, -110);
    endShape();
    pop();

    push();
    translate(this.x, this.y);
    rotate(radians(-81));
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    scale(0.3 * this.dia1, 0.4 * this.dia2);
    beginShape();
    curveVertex(-25, -110);
    curveVertex(-25, -110);
    curveVertex(-55, -25);
    curveVertex(-45, 10);
    curveVertex(-5, 10);
    curveVertex(5, -25);
    curveVertex(-25, -110);
    curveVertex(-25, -110);
    endShape();
    pop();

    push();
    translate(this.x, this.y);
    rotate(radians(81));
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    scale(0.3 * this.dia1, 0.4 * this.dia2);
    beginShape();
    curveVertex(25, -110);
    curveVertex(25, -110);
    curveVertex(-5, -25);
    curveVertex(5, 10);
    curveVertex(45, 10);
    curveVertex(55, -25);
    curveVertex(25, -110);
    curveVertex(25, -110);
    endShape();
    pop();

    push();
    translate(this.x, this.y);
    scale(0.6 * this.dia1);
    noStroke();
    fill(this.r, 0, 0, this.a);
    circle(0, 20, 7);
    rotate(radians(-30));
    circle(0, 20, 5);
    rotate(radians(60));
    circle(0, 20, 5);
    pop();
  }
}

class Stone {
  constructor(x, y, color) {
    this.pos = createVector(x, y);
    this.rad = 15;
    this.col = color;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(this.col);
    ellipse(0, 0, this.rad * 2, this.rad * 1.5);
    pop();
  }
}
