let swinsoups = [];
let egg;

function setup() {
  createCanvas(700, 500);
  background(200);

  for (let i = 0; i < 12; i++) {
    let x = random(width / 2 - 250, width / 2 + 250);
    let y = random(100, height - 60);
    let rad = random(3, 20);
    swinsoups.push(new Particle(x, y, rad));
  }

  let eggX = random(width / 2 - 100, width / 2 + 100);
  let eggY = random(100, height - 60);
  let eggRad = 20;
  egg = new Egg(eggX, eggY, eggRad);
}

function draw() {
  background(200);

  let vector = p5.Vector.sub(egg.centerPos, egg.pos);
  vector.normalize();
  vector.mult(0.1);
  vector.rotate(radians(egg.angle));
  egg.applyForce(vector);
  egg.angleMovement();
  egg.vel.mult(0.8);
  egg.checkBoundaries();
  egg.update();
  egg.display();

  for (let i = 0; i < swinsoups.length; i++) {
    let p = swinsoups[i];

    p.angleMovement();

    let vector = p5.Vector.sub(p.centerPos, p.pos);
    vector.normalize();
    vector.mult(0.15);
    vector.rotate(radians(p.angle));
    p.applyForce(vector);

    p.vel.mult(0.8);
    p.checkBoundaries();
    p.update();
    p.display();
    p.drag();
  }
}

class Egg {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.05;
    this.centerPos = createVector(width / 2, height / 2);
    this.angle = 0;
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
    if (this.pos.x < 20) {
      this.pos.x = 20;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > width - 20) {
      this.pos.x = width - 20;
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y < 60) {
      this.pos.y = 60;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > height - 60) {
      this.pos.y = height - 60;
      this.vel.y = -this.vel.y;
    }
  }
  angleMovement() {
    this.angle = map(
      dist(this.centerPos.x, this.centerPos.y, this.pos.x, this.pos.y),
      0,
      290,
      10,
      80
    );
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255);
    scale(this.rad / 4);
    beginShape();
    curveVertex(-40, 0);
    curveVertex(-40, 0);
    curveVertex(-20, 4);
    curveVertex(0, 8);
    curveVertex(20, 4);
    curveVertex(40, 0);
    curveVertex(20, -4);
    curveVertex(0, -10);
    curveVertex(-20, -4);
    curveVertex(-40, 0);
    curveVertex(-40, 0);
    endShape();
    pop();

    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(220, 200, 50);
    scale(this.rad / 4);
    beginShape();
    curveVertex(-40, 0);
    curveVertex(-40, 0);
    curveVertex(-20, 4);
    curveVertex(0, 8);
    curveVertex(20, 4);
    curveVertex(40, 0);
    curveVertex(20, 6);
    curveVertex(0, 10);
    curveVertex(-20, 6);
    curveVertex(-40, 0);
    endShape();
    pop();

    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(220, 180, 50);
    scale(this.rad / 4);
    beginShape();
    curveVertex(-20, 2);
    curveVertex(0, 4);
    curveVertex(20, 3);
    curveVertex(20, -4);
    curveVertex(0, -10);
    curveVertex(-20, -3);
    endShape(CLOSE);
    pop();
  }
}

class Particle {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.05;
    this.centerPos = createVector(width / 2, height / 2);
    this.angle = 0;
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
  repelledFrom(others) {
    for (let i = 0; i < others.length; i++) {
      let other = others[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);

        if (distance < 50) {
          let magnitude = (this.mass * other.mass) / (distance * distance);
          let force = p5.Vector.sub(other.pos, this.pos);
          force.normalize();
          force.mult(-2);
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
  checkBoundaries() {
    if (this.pos.x < 20) {
      this.pos.x = 20;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > width - 20) {
      this.pos.x = width - 20;
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y < 60) {
      this.pos.y = 60;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > height - 60) {
      this.pos.y = height - 60;
      this.vel.y = -this.vel.y;
    }
  }
  angleMovement() {
    this.angle = map(
      dist(this.centerPos.x, this.centerPos.y, this.pos.x, this.pos.y),
      10,
      290,
      10,
      80
    );
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(0, random(20, 22), 0);
    rotate(this.angle * 0.05);
    scale(this.rad / 10);
    beginShape();
    curveVertex(-40, 0);
    curveVertex(-40, 0);
    curveVertex(-20, 4);
    curveVertex(0, -2);
    curveVertex(20, 4);
    curveVertex(40, 0);
    curveVertex(20, -4);
    curveVertex(0, -10);
    curveVertex(-20, -4);
    curveVertex(-40, 0);
    curveVertex(-40, 0);
    endShape();
    pop();
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255);
    beginShape();
    curveVertex(-2 * this.rad, 0);
    curveVertex(-2 * this.rad, 0);
    curveVertex(0, -this.rad / 10);
    curveVertex(2 * this.rad, 0);
    curveVertex(2 * this.rad, 0);
    curveVertex(-this.rad, -this.rad / 5);
    curveVertex(-2 * this.rad, 0);
    curveVertex(-2 * this.rad, 0);
    endShape();
    //circle(0, 0, this.rad * 2);
    pop();
  }
}
