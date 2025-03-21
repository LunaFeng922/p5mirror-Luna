let vehicles = [];
let obstacles = [];
let C_GRAVITY = 3;

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < 20; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }

  for (let i = 0; i < 4; i++) {
    obstacles.push(new Obstacle(random(width), random(height)));
  }
}

function draw() {
  background(0, 50);

  for (let v of vehicles) {
    let target = createVector(mouseX, mouseY);
    v.seek(target);
    v.avoid(obstacles, vehicles);

    v.update();
    v.reappear();
    v.display();
  }

  for (let o of obstacles) {
    o.applyGravitationalAttraction(obstacles);
    o.update();
    o.limitVelocity(5);
    o.bounce();
    o.display();
  }
}

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    //
    this.mass = 1.5;
    this.size = random(15, 20);
    //
    this.angle = 0;
    //
    this.maxSpeed = 5;
    this.maxSteerForce = 0.1;
    //
    this.brakeRad = 120;
    this.senseRad = 100;
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
      desiredVel.mult(speed);
    } else {
      desiredVel.mult(this.maxSpeed); // desire
    }

    let steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxSteerForce);

    this.applyForce(steerForce);
  }
  avoid(obstacles, vehicles) {
    for (let obstacle of obstacles) {
      let desiredVel = p5.Vector.sub(obstacle.pos, this.pos);
      let distance = desiredVel.mag();
      desiredVel.normalize(); // direction
      if (distance > this.senseRad * 2) continue;
      desiredVel.mult(-this.maxSpeed);

      let steerForce = p5.Vector.sub(desiredVel, this.vel);
      steerForce.limit(this.maxSteerForce * 0.5); //***

      this.applyForce(steerForce);
    }

    for (let vehicle of vehicles) {
      if (this === vehicle) continue;
      let desiredVel = p5.Vector.sub(vehicle.pos, this.pos);
      let distance = desiredVel.mag();
      desiredVel.normalize(); // direction
      if (distance > this.senseRad) continue;
      desiredVel.mult(-this.maxSpeed);

      let steerForce = p5.Vector.sub(desiredVel, this.vel);
      steerForce.limit(this.maxSteerForce * 0.5); //***

      this.applyForce(steerForce);
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

    // noFill();
    // stroke(0, 0, 255);
    // circle(0, 0, this.senseRad * 2);
    // stroke(255, 0, 0);
    // circle(0, 0, this.brakeRad * 2);

    //     noStroke();
    //     noFill();
    //     triangle(
    //       0,
    //       0,
    //       -this.size * 1,
    //       -this.size * 0.4,
    //       -this.size * 1,
    //       this.size * 0.4
    //     );
    stroke(255);
    noFill();
    beginShape();
    curveVertex(this.size * 0.5, 0);
    curveVertex(this.size * 0.5, 0);
    curveVertex(0, this.size * 0.3);
    curveVertex(-this.size * 1, 0);
    curveVertex(-this.size * 2, -this.size * 0.2);
    curveVertex(-this.size * 2, -this.size * 0.2);
    endShape();
    beginShape();
    curveVertex(this.size * 0.5, 0);
    curveVertex(this.size * 0.5, 0);
    curveVertex(0, -this.size * 0.3);
    curveVertex(-this.size * 1, 0);
    curveVertex(-this.size * 2, this.size * 0.2);
    curveVertex(-this.size * 2, this.size * 0.2);
    endShape();
    // beginShape();
    // curveVertex(0, -this.size * 1);
    // curveVertex(0, -this.size * 1);
    // curveVertex(this.size * 0.5, 0);
    // curveVertex(0, this.size * 1);
    // curveVertex(0, this.size * 1);
    // endShape();
    pop();
  }
}

class Obstacle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = random(25, 50);
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
  applyGravitationalAttraction(other) {
    for (let i = 0; i < obstacles.length; i++) {
      let other = obstacles[i];
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
  display() {
    push();
    stroke(255);
    fill(255, 100);
    circle(this.pos.x, this.pos.y, this.rad * 2);
    pop();
  }
}
