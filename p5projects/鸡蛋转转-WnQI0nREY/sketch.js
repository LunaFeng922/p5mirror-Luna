let egg;

function setup() {
  createCanvas(700, 500);
  background(0);

  let x = random(width);
  let y = random(60, height - 60);
  let rad = 20;
  egg = new Egg(x, y, rad);
}

function draw() {
  background(0);

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
      80,
      60
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
    curveVertex(20,6);
    curveVertex(0,10);
    curveVertex(-20,6);
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
