let balls = [];
let windDirection = 0;
let WATER_LEVEL = 430;
let shouldRaiseWaterLevel = false;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(20, 4, 2, 90);

  // generate
  balls.push(new Ball(random(width), 1));

  // limit the number of rain drops
  if (balls.length >= 439) {
    balls.shift();
  }

  // WaterLevel
  if (!shouldRaiseWaterLevel) {
    // rain in air yet
    WATER_LEVEL = 430;
    for (let i = balls.length - 1; i >= 0; i--) {
      if (balls[i].pos.y >= 430 - balls[i].rad) {
        // first drop on water
        shouldRaiseWaterLevel = true;
      }
    }
  } else {
    // first drop on water, start raising
    WATER_LEVEL = 430 - balls.length * 0.2;
    if (WATER_LEVEL < height - 443) {
      // max height
      WATER_LEVEL = height - 443;
    }
  }

  //roof
  push();
  noStroke();
  fill(100, 25, 19, 50);
  rect(0, 400, width, 30);
  pop();

  // pool
  push();
  noStroke();
  fill(0, 200, 200, 90);
  rect(0, WATER_LEVEL, width, 430 - WATER_LEVEL);
  pop();

  //string
  push();
  noFill();
  stroke(200, 200, 0, 90);
  strokeWeight(9);
  beginShape();
  curveVertex(234, 0);
  curveVertex(234, 0);
  curveVertex(234 - windDirection * random(115, 125), 210);
  curveVertex(234, 430);
  curveVertex(234, 430);
  endShape();
  beginShape();
  curveVertex(334, 0);
  curveVertex(334, 0);
  curveVertex(334 - windDirection * random(115, 125), 210);
  curveVertex(334, 430);
  curveVertex(334, 430);
  endShape();
  beginShape();
  curveVertex(234 - windDirection * random(85, 89), 107.5);
  curveVertex(234 - windDirection * random(85, 89), 107.5);
  curveVertex(284 - windDirection * random(85, 89), random(110, 113));
  curveVertex(334 - windDirection * random(85, 89), 107.5);
  curveVertex(334 - windDirection * random(85, 89), 107.5);
  endShape();
  beginShape();
  curveVertex(234 - windDirection * random(115, 125), 215);
  curveVertex(234 - windDirection * random(115, 125), 215);
  curveVertex(284 - windDirection * random(115, 125), random(217.5, 220.5));
  curveVertex(334 - windDirection * random(115, 125), 215);
  curveVertex(334 - windDirection * random(115, 125), 215);
  endShape();
  beginShape();
  curveVertex(234 - windDirection * random(85, 89), 322.5);
  curveVertex(234 - windDirection * random(85, 89), 322.5);
  curveVertex(284 - windDirection * random(85, 89), random(325, 328));
  curveVertex(334 - windDirection * random(85, 89), 322.5);
  curveVertex(334 - windDirection * random(85, 89), 322.5);
  endShape();
  pop();

  //ladder
  push();
  strokeWeight(18);
  stroke(100, 0, 0, 90);
  line(243, 490, 234, 800);
  line(325, 490, 334, 800);
  line(240, 568, 328, 568);
  line(238, 645, 330, 645);
  line(236, 723, 332, 723);
  pop();

  //woods
  push();
  strokeWeight(18);
  stroke(255);
  line(380, 785, 600, 805);
  stroke(50, 15, 0);
  line(380, 780, 600, 800);
  strokeWeight(10);
  stroke(255);
  line(500, 745, 600, 805);
  stroke(50, 15, 0);
  line(500, 740, 600, 800);
  stroke(255);
  line(400, 795, 580, 775);
  stroke(50, 15, 0);
  line(400, 790, 580, 770);

  strokeWeight(16);
  stroke(255);
  line(630, 785, 780, 805);
  stroke(50, 15, 0);
  line(630, 780, 780, 800);
  stroke(255);
  line(640, 805, 760, 765);
  stroke(50, 15, 0);
  line(640, 800, 760, 760);
  strokeWeight(10);
  stroke(255);
  line(650, 783, 760, 743);
  stroke(50, 15, 0);
  line(650, 780, 760, 740);
  stroke(255);
  line(650, 743, 760, 803);
  stroke(50, 15, 0);
  line(650, 740, 760, 800);

  scale(0.8, 1);
  strokeWeight(16);
  stroke(255);
  line(30, 785, 180, 805);
  stroke(50, 15, 0);
  line(30, 780, 180, 800);
  stroke(255);
  line(40, 805, 160, 765);
  stroke(50, 15, 0);
  line(40, 800, 160, 760);
  strokeWeight(10);
  stroke(255);
  line(50, 783, 160, 743);
  stroke(50, 15, 0);
  line(50, 780, 160, 740);
  stroke(255);
  line(50, 743, 160, 803);
  stroke(50, 15, 0);
  line(50, 740, 160, 800);
  pop();

  // wall
  push();
  strokeWeight(3);
  stroke(255);
  let brickWidth = 80;
  let brickHeight = 30;
  let numBricks = width / brickWidth;
  fill(100, 15, 15);
  for (let i = 0; i < numBricks + 1; i++) {
    rect(i * brickWidth, 460, brickWidth, brickHeight);
    rect((i - 0.5) * brickWidth, 430, brickWidth, brickHeight);
  }
  pop();

  // rain drops
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];

    //gravity
    let gravity = createVector(0, 1 * b.mass);
    b.applyForce(gravity);
    //windforce
    let wind = createVector((-25 * windDirection) / b.mass, 0);
    b.applyForce(wind);

    // resistance
    let resistance = b.vel.copy();
    resistance.mult(-1);
    let sp = b.vel.mag();
    if (b.pos.y < WATER_LEVEL) {
      // in air
      let dragForce = sp * sp * 0.03; // res in air
      resistance.mult(dragForce);
    } else {
      // in water
      let dragForce = sp * sp * 0.4;
      resistance.mult(dragForce);
      let bouyancy = createVector(0, -20);
      b.applyForce(bouyancy);
    }
    b.applyForce(resistance);

    b.update();
    b.bounce();
    b.display(WATER_LEVEL, windDirection);

    b.checkCollision();
  }
}

function keyPressed() {
  if (key === "l" || key === "L") {
    windDirection -= 0.02;
  } else if (key === "r" || key === "R") {
    windDirection += 0.02;
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
    if (this.pos.y > WATER_LEVEL + 20) {
      this.pos.y = WATER_LEVEL + 20;
      this.vel.y *= -1;
    }
  }

  checkCollision() {
    if (this.pos.y >= WATER_LEVEL + 30) {
      for (let j = 0; j < balls.length; j++) {
        if (i !== j && balls[j].pos.y >= WATER_LEVEL) {
          let distance = p5.Vector.dist(b.pos, balls[j].pos);
          if (distance < b.rad + balls[j].rad) {
            balls.splice(i, 1);
            balls.splice(j, 1);
            break;
          }
        }
      }
    }
  }

  display(WATER_LEVEL, windDirection) {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();

    if (this.pos.y < WATER_LEVEL - this.rad) {
      // rain
      blendMode(ADD);
      fill(255, random(90, 100));
      rotate(windDirection);
      ellipse(0, 0, this.rad * 0.2, this.rad * 4);
    } else {
      // waterbubble
      blendMode(ADD);
      fill(255, random(90, 100));
      ellipse(0, 0, this.rad * 3, this.rad * 0.5);
    }

    pop();
  }
}
