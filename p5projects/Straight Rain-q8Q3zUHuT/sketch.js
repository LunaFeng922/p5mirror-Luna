const C_GARAVITY = 1;
const C_FRICTION = 9;
const C_AIR_RESISTANCE = 0.03;
const C_WATER_RESISTANCE = 0.4;

let balls = [];

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(200, 50, 0);

  if (balls.length >= 439) {
    balls.shift(); 
  }

  balls.push(new Ball(random(width), 1));
  let WATER_LEVEL = 500 - balls.length * 0.1;

  push();
  noStroke();
  fill(0, 220, 255);
  rect(0, WATER_LEVEL, width, height - WATER_LEVEL);
  pop();

  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];

    let gravity = createVector(0, C_GARAVITY * b.mass);
    b.applyForce(gravity);

    let resistance = b.vel.copy();
    resistance.mult(-1);
    let speed = b.vel.mag();
    if (b.pos.y < WATER_LEVEL) {
      // air
      let dragForce = speed * speed * C_AIR_RESISTANCE;
      resistance.mult(dragForce);
    } else {
      // water
      let dragForce = speed * speed * C_WATER_RESISTANCE;
      resistance.mult(dragForce);

      // bouyancy
      let bouyancy = createVector(0, -20);
      b.applyForce(bouyancy);
    }
    b.applyForce(resistance);

    b.update();
    b.bounce();
    b.display(WATER_LEVEL);
  }
}

class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.rad = random(1, 20);
    this.mass = this.rad;
  }
  applyForce(f) {
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }
  update() {
    // ACC -> VEL -> POS
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // ***
  }
  bounce() {
    // on x
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x *= -1;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x *= -1;
    }
    // on y
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y *= -1;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y *= -1;
    }
  }
  display(WATER_LEVEL) {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();


    if (this.pos.y < WATER_LEVEL) {
      fill(255, random(90, 100));
      ellipse(0, 0, this.rad * 0.2, this.rad * 4);
    } else {
      fill(255, random(90, 100));
      ellipse(0, 0, this.rad * 3, this.rad); 
    }

    pop();
  }
}

