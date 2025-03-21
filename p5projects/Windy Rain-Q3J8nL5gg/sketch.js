let balls = []; 
let windDirection = 0; 
let WATER_LEVEL=500; 
let shouldRaiseWaterLevel = false; 
let maxHeight = 300; 

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(200, 50, 0);


  if (balls.length >= 439) {
    balls.shift();
  }

  balls.push(new Ball(random(width), 1));

  if (!shouldRaiseWaterLevel) {
    WATER_LEVEL = 500; // 
    for (let i = balls.length - 1; i >= 0; i--) {
      if (balls[i].pos.y >= 500 - balls[i].rad) {
        shouldRaiseWaterLevel = true; 
      }
    }
  } else {
    WATER_LEVEL = 500 - balls.length * 0.2; 
    if (WATER_LEVEL < height - maxHeight) {
      WATER_LEVEL = height - maxHeight;
    }
  }

  push();
  noStroke();
  fill(0, 220, 255);
  rect(0, WATER_LEVEL, width, height - WATER_LEVEL);
  pop();

  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];

    let gravity = createVector(0, 1 * b.mass);

    let wind = createVector(windDirection, 0);

    b.applyForce(gravity);
    b.applyForce(wind);

    let resistance = b.vel.copy();
    resistance.mult(-1);
    let speed = b.vel.mag();
    if (b.pos.y < WATER_LEVEL) {
      let dragForce = speed * speed * 0.03;
      resistance.mult(dragForce);
    } else {
      let dragForce = speed * speed * 0.4;
      resistance.mult(dragForce);
      let bouyancy = createVector(0, -20);
      b.applyForce(bouyancy);
    }
    b.applyForce(resistance);

    b.update();

    b.bounce();

    b.display(WATER_LEVEL, windDirection);
  }
}

function keyPressed() {
  if (key === 'l' || key === 'L') {
    windDirection -= 0.2;
  }
  else if (key === 'r' || key === 'R') {
    windDirection += 0.2;
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
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  bounce() {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x *= -1;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x *= -1;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y *= -1;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y *= -1;
    }
  }

  display(WATER_LEVEL, windDirection) {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();

    if (this.pos.y < WATER_LEVEL) {
      // rain
      fill(255, random(90, 100));
      rotate(windDirection); 
      ellipse(0, 0, this.rad * 0.2, this.rad * 4);
    } else {
      // waterbubble
      fill(255, random(90, 100));
      ellipse(0, 0, this.rad * 3, this.rad);
    }

    pop();
  }
}