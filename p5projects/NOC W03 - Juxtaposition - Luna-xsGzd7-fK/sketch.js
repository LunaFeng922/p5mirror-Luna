//Credit:Finding refrences in NOC W3 Example Code by Prof. Moon;
//Try pressing "f" first! Constantly!
//Then try pressing "l" and "r". Don't do it constantly.

let rains = [];
let fires = [];
let w = 0;
let WATER_LEVEL = 430;
let shouldRaiseWaterLevel = false;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(20, 4, 2, 90);
  //console.log(frameRate());

  //generate
  //rain
  rains.push(new Rain(random(width), 1));
  //fire
  let xRanges = [
    { min: 50, max: 100 },
    { min: 450, max: 550 },
    { min: 680, max: 730 },
  ];
  let rangeIndex = int(random(0, xRanges.length));
  let xPos = random(xRanges[rangeIndex].min, xRanges[rangeIndex].max);
  if (keyIsPressed && key === "f") {
    fires.push(new Fire(xPos, random(780, 790)));
  }

  //
  if (keyIsPressed && key === "l") {
    w -= 0.02;
  } else if (keyIsPressed && key === "r") {
    w += 0.02;
  }

  //limit the number
  if (rains.length >= 439) {
    rains.shift();
  }

  if (fires.length >= 439) {
    fires.shift();
  }

  //WaterLevel
  if (!shouldRaiseWaterLevel) {
    // rain in air yet
    WATER_LEVEL = 430;
    for (let i = rains.length - 1; i >= 0; i--) {
      if (rains[i].pos.y >= 430 - rains[i].rad) {
        // first drop on water
        shouldRaiseWaterLevel = true;
      }
    }
  } else {
    // first drop on water, start raising
    WATER_LEVEL = 430 - rains.length * 0.2;
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

  //pool
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
  curveVertex(234 - w * random(115, 125), 210);
  curveVertex(234, 430);
  curveVertex(234, 430);
  endShape();
  beginShape();
  curveVertex(334, 0);
  curveVertex(334, 0);
  curveVertex(334 - w * random(115, 125), 210);
  curveVertex(334, 430);
  curveVertex(334, 430);
  endShape();
  beginShape();
  curveVertex(234 - w * random(85, 89), 107.5);
  curveVertex(234 - w * random(85, 89), 107.5);
  curveVertex(284 - w * random(85, 89), random(110, 113));
  curveVertex(334 - w * random(85, 89), 107.5);
  curveVertex(334 - w * random(85, 89), 107.5);
  endShape();
  beginShape();
  curveVertex(234 - w * random(115, 125), 215);
  curveVertex(234 - w * random(115, 125), 215);
  curveVertex(284 - w * random(115, 125), random(217.5, 220.5));
  curveVertex(334 - w * random(115, 125), 215);
  curveVertex(334 - w * random(115, 125), 215);
  endShape();
  beginShape();
  curveVertex(234 - w * random(85, 89), 322.5);
  curveVertex(234 - w * random(85, 89), 322.5);
  curveVertex(284 - w * random(85, 89), random(325, 328));
  curveVertex(334 - w * random(85, 89), 322.5);
  curveVertex(334 - w * random(85, 89), 322.5);
  endShape();
  pop();

  //ladder
  push();
  noFill();
  strokeWeight(18);
  stroke(100, 0, 0, 90);
  beginShape();
  curveVertex(243, 490);
  curveVertex(243, 490);
  curveVertex(238.5 + w * random(15, 25), 645);
  curveVertex(234, 800);
  curveVertex(234, 800);
  endShape();

  beginShape();
  curveVertex(325, 490);
  curveVertex(325, 490);
  curveVertex(329.5 + w * random(15, 25), 645);
  curveVertex(334, 800);
  curveVertex(334, 800);
  endShape();

  beginShape();
  curveVertex(240 + w * random(15, 25), 568);
  curveVertex(240 + w * random(15, 25), 568);
  curveVertex(328 + w * random(15, 25), 568);
  curveVertex(328 + w * random(15, 25), 568);
  endShape();

  beginShape();
  curveVertex(238 + w * random(15, 25), 645);
  curveVertex(238 + w * random(15, 25), 645);
  curveVertex(330 + w * random(15, 25), 645);
  curveVertex(330 + w * random(15, 25), 645);
  endShape();

  beginShape();
  curveVertex(236 + w * random(15, 25), 723);
  curveVertex(236 + w * random(15, 25), 723);
  curveVertex(332 + w * random(15, 25), 723);
  curveVertex(332 + w * random(15, 25), 723);
  endShape();
  pop();

  //wood
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

  //wall
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

  //fire
  for (let i = 0; i < fires.length; i++) {
    let h = fires[i];
    //gravity
    let gravity = createVector(0, 0.01 * h.mass);
    h.applyForce(gravity);

    // bouyancy
    let bouyancy = createVector(random(-0.1, 0.1), -0.015 * h.mass);
    h.applyForce(bouyancy);

    // resistance
    let resistance = h.vel.copy();
    resistance.mult(-1);
    let sp = h.vel.mag();
    let dragForce = sp * sp * 0.01;
    resistance.normalize();
    resistance.mult(dragForce);
    h.applyForce(resistance);
    h.bounce();
    h.update();
    h.display();
  }

  //rain drops
  for (let i = 0; i < rains.length; i++) {
    let r = rains[i];

    //gravity
    let gravity = createVector(0, 1 * r.mass);
    r.applyForce(gravity);

    //windforce
    let wind = createVector(-6 * w, 0);
    r.applyForce(wind);

    //resistance
    let resistance = r.vel.copy();
    resistance.mult(-1);
    let sp = r.vel.mag();
    if (r.pos.y < WATER_LEVEL) {
      //in air
      let dragForce = sp * sp * 0.03; // res in air
      resistance.mult(dragForce);
    } else {
      // in water
      let dragForce = 2; //r.rad * 0.1; //sp * sp * 0.01;
      //console.log(dragForce);
      resistance.mult(dragForce);
      let bouyancy = createVector(0, -20);
      r.applyForce(bouyancy);
    }
    r.applyForce(resistance);

    r.update();
    r.bounce();
    r.checkCollision();
    r.display(WATER_LEVEL);
  }
}

class Rain {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.rad = random(1, 20);
    this.mass = this.rad;
    this.angle = 0;
  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }

  bounce() {
    if (this.pos.y > WATER_LEVEL + 20) {
      this.pos.y = WATER_LEVEL + 20;
      this.vel.y *= -1;
    }
  }

  checkCollision() {
    if (this.pos.y >= WATER_LEVEL + 30) {
      for (let j = 0; j < rains.length; j++) {
        if (this !== rains[j] && rains[j].pos.y >= WATER_LEVEL) {
          let distance = p5.Vector.dist(this.pos, rains[j].pos);
          if (distance < this.rad + rains[j].rad) {
            rains.splice(rains.indexOf(this), 1);
            rains.splice(rains.indexOf(rains[j]), 1);
            break;
          }
        }
      }
    }
  }

  display(WATER_LEVEL) {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();

    if (this.pos.y < WATER_LEVEL - this.rad) {
      // rain
      blendMode(ADD);
      fill(255, random(90, 100));
      rotate(this.angle);
      ellipse(0, 0, this.rad * 4, this.rad * 0.2);
    } else {
      // waterbubble
      blendMode(ADD);
      fill(255, random(90, 100));
      ellipse(0, 0, this.rad * 3, this.rad * 0.5);
    }

    pop();
  }
}

class Fire {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = random(1, 5);
    this.mass = this.rad;
    this.r = random(240, 255);
    this.g = random(230, 255);
    this.b = random(200, 255);
    this.a = (this.pos.y - 781) * 0.3 + 100;
  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }

  bounce() {
    if (this.pos.y < 500) {
      this.pos.y = 500;
      this.vel.y = this.vel.y * -0.8;
    }
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = this.vel.x * -0.8;
    }
    if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = this.vel.x * -0.8;
    }
    if (dist(this.pos.x, this.pos.y, 500, 600) < 30 + this.rad) {
      this.vel.x = this.vel.y * -1;
      this.vel.y = this.vel.y * -1;
    }
    if (dist(this.pos.x, this.pos.y, 700, 600) < 30 + this.rad) {
      this.vel.x = this.vel.y * -1;
      this.vel.y = this.vel.y * -1;
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    //fire
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    blendMode(ADD);
    fill(this.r, this.g, this.b, this.a);
    rotate(30);
    ellipse(0, 0, this.rad, this.rad);
    pop();
    //cat
    push();
    //eyes
    noStroke();
    fill(255, fires.length / 4.39);
    ellipse(500, 600, 55, 60);
    ellipse(700, 600, 55, 60);
    fill(0, fires.length / 2);
    ellipse(505 - w * random(15, 25), 600, 25, 30);
    ellipse(695 - w * random(15, 25), 600, 25, 30);
    //nose
    fill(100, 0, 0, fires.length / 4.39);
    ellipse(600, 650, 50, 30);
    noFill();
    beginShape();
    stroke(100, 0, 0, fires.length / 4.39);
    strokeWeight(9);
    curveVertex(600, 665);
    curveVertex(600, 665);
    curveVertex(600 - w * random(15, 25), 685);
    curveVertex(600, 700);
    curveVertex(600, 700);
    endShape();
    //mouse
    beginShape();
    stroke(100, 0, 0, fires.length / 4.39);
    strokeWeight(9);
    curveVertex(540, 700);
    curveVertex(540, 700);
    curveVertex(570, 690 + fires.length / 10);
    curveVertex(600, 700);
    curveVertex(600, 700);
    endShape();
    beginShape();
    stroke(100, 0, 0, fires.length / 4.39);
    strokeWeight(9);
    curveVertex(600, 700);
    curveVertex(600, 700);
    curveVertex(630, 690 + fires.length / 10);
    curveVertex(660, 700);
    curveVertex(660, 700);
    endShape();
    //left ear
    beginShape();
    stroke(255, fires.length / 4.39);
    strokeWeight(8);
    curveVertex(370, 520);
    curveVertex(370, 520);
    curveVertex(375 + w * random(15, 25), 560);
    curveVertex(385, 600);
    curveVertex(385, 600);
    endShape();
    beginShape();
    stroke(255, fires.length / 4.39);
    strokeWeight(8);
    curveVertex(370, 520);
    curveVertex(370, 520);
    curveVertex(410, 525 + w * random(15, 25));
    curveVertex(450, 535);
    curveVertex(450, 535);
    endShape();
    beginShape();
    stroke(255, fires.length / 4.39);
    strokeWeight(8);
    curveVertex(350, 500);
    curveVertex(350, 500);
    curveVertex(355 + w * random(15, 25), 550);
    curveVertex(365, 600);
    curveVertex(365, 600);
    endShape();
    beginShape();
    stroke(255, fires.length / 4.39);
    strokeWeight(8);
    curveVertex(350, 500);
    curveVertex(350, 500);
    curveVertex(400, 505 + w * random(15, 25));
    curveVertex(450, 515);
    curveVertex(450, 515);
    endShape();
    //right ear
    beginShape();
    stroke(255, fires.length / 4.39);
    strokeWeight(8);
    curveVertex(1150 - 380, 520);
    curveVertex(1150 - 380, 520);
    curveVertex(1150 - (385 + w * random(15, 25)), 560);
    curveVertex(1150 - 395, 600);
    curveVertex(1150 - 395, 600);
    endShape();
    beginShape();
    stroke(255, fires.length / 4.39);
    strokeWeight(8);
    curveVertex(1150 - 380, 520);
    curveVertex(1150 - 380, 520);
    curveVertex(1150 - 420, 525 + w * random(15, 25));
    curveVertex(1150 - 460, 535);
    curveVertex(1150 - 460, 535);
    endShape();
    beginShape();
    stroke(255, fires.length / 4.39);
    strokeWeight(8);
    curveVertex(1150 - 360, 500);
    curveVertex(1150 - 360, 500);
    curveVertex(1150 - (365 + w * random(15, 25)), 550);
    curveVertex(1150 - 375, 600);
    curveVertex(1150 - 375, 600);
    endShape();
    beginShape();
    stroke(255, fires.length / 4.39);
    strokeWeight(8);
    curveVertex(1150 - 360, 500);
    curveVertex(1150 - 360, 500);
    curveVertex(1150 - 410, 505 + w * random(15, 25));
    curveVertex(1150 - 460, 515);
    curveVertex(1150 - 460, 515);
    endShape();
    pop();
  }
}
