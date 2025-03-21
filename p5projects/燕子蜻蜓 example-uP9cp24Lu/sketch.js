let vehicles = [];

function setup() {
  createCanvas(1000, 800);
  background(0);

  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height);
    vehicles.push(new Vehicle(x, y, 15));
  }
}

function draw() {
  background(0);
  for (const v of vehicles) {
    let mousePos = createVector(mouseX, mouseY);
    v.seek(mousePos);
    v.reappear();
    v.update();
    v.display();
  }
}

///// CLASS /////

class Vehicle {
  constructor(x = 0, y = 0, size = 1) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.size = size;
    this.mass = 1;
    //
    this.angle = 0;
    //
    this.maxSpeed = 3;
    this.maxSteerForce = 0.1;
  }
  seek(targetPos) {
    let desiredVec = p5.Vector.sub(targetPos, this.pos);
    desiredVec.normalize();
    desiredVec.mult(this.maxSpeed);

    let steerForce = p5.Vector.sub(desiredVec, this.vel);
    steerForce.limit(this.maxSteerForce);

    this.applyForce(steerForce);
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
    //
    this.angle = this.vel.heading();
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
  
    noStroke();
    fill(255);
    triangle(0, 0, -this.size, -this.size * 0.4, -this.size, this.size * 0.4);
    pop();
  }
}
