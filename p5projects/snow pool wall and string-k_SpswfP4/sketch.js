let balls = [];
let windDirection = 0; 
let WATER_LEVEL = 430;
let shouldRaiseWaterLevel = false; 
let maxHeight = 443; 

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(20, 4, 2, 90);

  // generate
  balls.push(new Ball(random(width), 1));

  // remove rain drops
  if (balls.length >= 439) {
    balls.shift();
  }

  if (!shouldRaiseWaterLevel) {
    WATER_LEVEL = 430; //
    for (let i = balls.length - 1; i >= 0; i--) {
      if (balls[i].pos.y >= 430 - balls[i].rad) {
        shouldRaiseWaterLevel = true;
      }
    }
  } else {
    WATER_LEVEL = 430 - balls.length * 0.2;
    if (WATER_LEVEL < height - maxHeight) {
      WATER_LEVEL = height - maxHeight;
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

  // wall
  push();
  strokeWeight(3);
  let brickWidth = 80;
  let brickHeight = 30;
  let numBricks = width / brickWidth;
  fill(100, 25, 19);
  for (let i = 0; i < numBricks + 1; i++) {
    rect(i * brickWidth, 460, brickWidth, brickHeight);
    rect((i - 0.5) * brickWidth, 430, brickWidth, brickHeight);
  }
  pop();


  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];

    let gravity = createVector(0, 1 * b.mass);
    let wind = createVector(-25*windDirection/b.mass, 0); 

    b.applyForce(gravity); 
    b.applyForce(wind); 

    let resistance = b.vel.copy();
    resistance.mult(-1);
    let sp = b.vel.mag();
    if (b.pos.y < WATER_LEVEL) {
      let dragForce = sp * sp * 0.03;
      resistance.mult(dragForce);
    } else {
      let dragForce = sp * sp * 0.4;
      resistance.mult(dragForce);
      let bouyancy = createVector(0, -20);
    }
    b.applyForce(resistance);

    b.update();
    b.bounce();
    b.display(WATER_LEVEL, windDirection);
    if (b.pos.y >= WATER_LEVEL + 30) {
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
}

function keyPressed() {
  if (key === "l" || key === "L") {
    windDirection -= 0.02; 
  }
  else if (key === "r" || key === "R") {
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
 if (this.pos.y > WATER_LEVEL+20) {
      this.pos.y = WATER_LEVEL+20;
      this.vel.y *= -1;
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
