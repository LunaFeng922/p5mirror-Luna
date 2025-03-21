//
//Acknowledgment:
//Finding references in NOC example code by Prof.Moon
//Structure reorganized with the help of Prof.Moon
//Some parts coded by Prof.Moon. Can be seen in comments in those parts!

let scene = 0;

//scene1
let b1lVisible = false;
let eye1;
let eye2;
let z = 0;
let tears = [];
let lights1 = [];
let springs1 = [];
let C_GRAVITY = 1;
let DISTANCE_BTW_BALLS = 30;

//scene2
let boatInSea;
let WATER_LEVEL = 0;
let lights2 = [];
let springs2 = [];
let seaWeeds = [];
let seaWeedDrag = false;

//scene3
let boats = [];
let bounceCountBE = 0;
let sweeds = [];
let boatBounce = false;
let twist = false;

//scene4
let bowl;
let a = 0;
let b = 0;
let swinsoups = [];
let egg;
let chopsticks;
let hotgas = [];
let waterbubbles = [];

function setup() {
  createCanvas(700, 500);
  //noCursor(); 
  ll1 = new Light1(290, height + 80, 15, true);
  lights1.push(ll1);
  lm1 = new Light1(350, height, 30);
  lights1.push(lm1);
  lr1 = new Light1(410, height + 80, 15, true);
  lights1.push(lr1);
  springs1.push(new Spring(lm1, ll1, 100, 0.1));
  springs1.push(new Spring(lm1, lr1, 100, 0.1));

  ll2 = new Light2(260, 120, 15);
  lights2.push(ll2);
  lm2 = new Light2(350, 0, 15, true);
  lights2.push(lm2);
  lm2k = new Light2(350, 120, 30);
  lights2.push(lm2k);
  lr2 = new Light2(440, 120, 15);
  lights2.push(lr2);

  springs2.push(new Spring(lm2, ll2, 150, 0.1));
  springs2.push(new Spring(lm2, lr2, 150, 0.1));
  springs2.push(new Spring(lm2, lm2k, 120, 0.1));
  springs2.push(new Spring(lm2k, ll2, 90, 0.5));
  springs2.push(new Spring(lm2k, lr2, 90, 0.5));

  for (let i = 0; i < 3; i++) {
    sweeds.push(new Seaweed(i * 90 + 20, 0));
  }
  for (let i = 5; i < 8; i++) {
    sweeds.push(new Seaweed(i * 90 + 50, 0));
  }

  textAlign(CENTER);
  textSize(30);
}

function draw() {
  background(0, 10);

  if (scene == 1) {
    drawScene1();
  } else if (scene == 2) {
    drawScene2();
  } else if (scene == 3) {
    drawScene3();
  } else if (scene == 4) {
    drawScene4();
  }
}

function keyPressed() {
  if (key === "1") {
    b1lVisible = false;
    z = 0;
    eye1 = new Eye(200, 70);
    eye2 = new Eye(500, 70);

    scene = 1;
  }
}

function drawScene1() {
  eye1.display();
  eye2.display();
  if (mouseIsPressed) {
    if (z < 60) {
      z = z + 1;
    }
    if (z >= 60) {
      z = 0;
    }
  }
  if (z == 50) {
    for (let i = 0; i < 5; i++) {
      tears.push(new Tear(i * 45, 10 + 30 * sin((i / 5) * PI)));
      if (tears.length >= 10) {
        tears.shift();
      }
      b1lVisible = true;
    }
  } else if (lm1.pos.y <= 400) {
    b1lVisible = false;
  }

  if (b1lVisible == true) {
    if (lm1.pos.y == 500) {
      push();
      fill(255);
      textFont("Alike");
      //text("Why You Cry?", width / 2, lm1.pos.y - 150);
      pop();
    }

    for (let s1 of springs1) {
      s1.update();
      s1.display();
    }

    for (let l1 of lights1) {
      l1.drag();
      l1.update();
      l1.display();
    }

    for (let i = 0; i < tears.length; i++) {
      let gravity = createVector(0, 0.05 * tears[i].rad);
      tears[i].applyForce(gravity);
      let resistance = tears[i].vel.copy();
      resistance.mult(-1);
      let sp = tears[i].vel.mag();
      let dragForce = sp * sp * 0.001;
      resistance.normalize();
      resistance.mult(dragForce);
      tears[i].applyForce(resistance);
      tears[i].update();
      tears[i].display();
    }

    push();
    strokeWeight(random(1, 5));
    stroke(200, 225, 255, random(10, 100));
    noFill();
    beginShape();
    curveVertex(0, height + random(-3, 0) * sin(frameCount * 0.1));
    curveVertex(0, height + random(-3, 0) * sin(frameCount * 0.1));
    curveVertex(70, height + random(-10, 0) * sin(frameCount * 0.1));
    curveVertex(140, height + random(-20, 0) * sin(frameCount * 0.1));
    curveVertex(210, height + random(-10, 0) * sin(frameCount * 0.1));
    curveVertex(280, height + random(-20, 0) * sin(frameCount * 0.1));
    curveVertex(350, height + random(-10, 0) * sin(frameCount * 0.1));
    curveVertex(420, height + random(-20, 0) * sin(frameCount * 0.1));
    curveVertex(490, height + random(-10, 0) * sin(frameCount * 0.1));
    curveVertex(560, height + random(-20, 0) * sin(frameCount * 0.1));
    curveVertex(630, height + random(-10, 0) * sin(frameCount * 0.1));
    curveVertex(700, height + random(-3, 0) * sin(frameCount * 0.1));
    curveVertex(700, height + random(-3, 0) * sin(frameCount * 0.1));
    endShape();
    pop();
  }

  if (mouseIsPressed && lm1.pos.y <= 400) {
    b1lVisible = false;

    scene = 2;
    startFrameCount = frameCount;
  }
}

function drawScene2() {
  if ((frameCount - startFrameCount) * 0.8 < 400) {
    translate(0, 400 - (frameCount - startFrameCount) * 0.8);
  }
  //background
  push();
  noStroke();
  fill((120 - lm2k.pos.y) * 2.5, 120 - lm2k.pos.y * 2);
  rect(0, 0, width, height);
  pop();

  if (seaWeedDrag == false && twist == false) {
    push();
    fill(255, 50 + 50 * sin(frameCount * 0.02));
    textFont("Alike");
    //text("Cuz I'm trapped inside.", width / 2, lm2.pos.y + 300);
    pop();
  }

  if (seaWeedDrag == true && lm2k.pos.y == 120) {
    push();
    fill(255, 50 + 50 * sin(frameCount * 0.02));
    textFont("Alike");
    textSize(20);
    //text("Despairs are like seaweeds inside 海.", width / 2, lm2.pos.y + 310);
    pop();

    push();
    fill(255, 50 - 50 * sin(frameCount * 0.02));
    textFont("Alike");
    textSize(20);
    //text("而我就像沉在海里的船.", width / 2, lm2.pos.y + 345);
    pop();
  }

  if (lm2k.pos.y < 120 || lm2k.pos.y > 120) {
    seaWeedDrag = false;
    twist = true;
  }

  if (twist == true) {
    push();
    fill(255, 255, 200, 50 + 50 * sin(frameCount * 0.02));
    textFont("Alike");
    textSize(20);
    //text("但眼泪不能当饭.", width / 2, lm2.pos.y + 295);
    //text("How about twisting to another sight?", width / 2, lm2.pos.y + 330);
    pop();
  }

  //boat
  boatInSea = new Boat(350, 440);
  boatInSea.display();

  push();
  strokeWeight(random(1, 5));
  stroke(200, 225, 255, random(10, 100));
  noFill();
  beginShape();
  curveVertex(0, WATER_LEVEL + random(-3, 0) * sin(frameCount * 0.1));
  curveVertex(0, WATER_LEVEL + random(-3, 0) * sin(frameCount * 0.1));
  curveVertex(70, WATER_LEVEL + random(-10, 0) * sin(frameCount * 0.1));
  curveVertex(140, WATER_LEVEL + random(-20, 0) * sin(frameCount * 0.1));
  curveVertex(210, WATER_LEVEL + random(-10, 0) * sin(frameCount * 0.1));
  curveVertex(280, WATER_LEVEL + random(-20, 0) * sin(frameCount * 0.1));
  curveVertex(350, WATER_LEVEL + random(-10, 0) * sin(frameCount * 0.1));
  curveVertex(420, WATER_LEVEL + random(-20, 0) * sin(frameCount * 0.1));
  curveVertex(490, WATER_LEVEL + random(-10, 0) * sin(frameCount * 0.1));
  curveVertex(560, WATER_LEVEL + random(-20, 0) * sin(frameCount * 0.1));
  curveVertex(630, WATER_LEVEL + random(-10, 0) * sin(frameCount * 0.1));
  curveVertex(700, WATER_LEVEL + random(-3, 0) * sin(frameCount * 0.1));
  curveVertex(700, WATER_LEVEL + random(-3, 0) * sin(frameCount * 0.1));
  endShape();
  pop();

  //light
  for (let s2 of springs2) {
    s2.update();
  }

  push();
  stroke(255, 255, 200, random(0, 100));
  noFill();
  circle(lm2.pos.x, lm2.pos.y, 4);
  circle(
    (lm2k.pos.x - lm2.pos.x) / 3 + lm2.pos.x,
    (lm2k.pos.y - lm2.pos.y) / 3 + lm2.pos.y,
    6
  );
  circle((lm2.pos.x + lm2k.pos.x) / 2, (lm2.pos.y + lm2k.pos.y) / 2, 8);
  circle(
    (2 * (lm2k.pos.x - lm2.pos.x)) / 3 + lm2.pos.x,
    (2 * (lm2k.pos.y - lm2.pos.y)) / 3 + lm2.pos.y,
    10
  );
  circle(lm2k.pos.x, lm2k.pos.y, 12);
  pop();

  push();
  strokeWeight(3);
  stroke(255, random(80, 100));
  line(
    lm2.pos.x,
    lm2.pos.y,
    2 * lr2.pos.x - lm2.pos.x + random(-5, 5),
    2 * lr2.pos.y - lm2.pos.y + random(-5, 15)
  );
  line(
    lm2.pos.x,
    lm2.pos.y,
    2 * ll2.pos.x - lm2.pos.x + random(-5, 5),
    2 * ll2.pos.y - lm2.pos.y + random(-5, 15)
  );
  line(
    lm2.pos.x,
    lm2.pos.y,
    2 * lm2.pos.x - lr2.pos.x + random(-5, 5),
    2 * lm2.pos.y - lr2.pos.y + random(-5, 15) - 50
  );
  line(
    lm2.pos.x,
    lm2.pos.y,
    2 * lm2.pos.x - ll2.pos.x + random(-5, 5),
    2 * lm2.pos.y - ll2.pos.y + random(-5, 15) - 50
  );
  pop();

  for (let l2 of lights2) {
    l2.drag();
    l2.update();
    l2.display();
  }

  //added with the help of Prof.Moon
  for (let i = 0; i < sweeds.length; i++) {
    let sws = sweeds[i];
    sws.run();
  }

  // move to the next scene
  if (mouseIsPressed && lm2k.pos.y <= 10) {
    b1lVisible = false;
    bounceCountBE = 0;
    for (let i = 0; i < 10; i++) {
      let x = 20 + i * 30;
      let y = random(height);
      boats.push(new BoatEye(x, y, 50));
    }

    scene = 3;
  }
}

function drawScene3() {
  //backgroundcolor
  push();
  noStroke();
  if (boatBounce == false) {
    fill(0);
  }
  if (boatBounce == true) {
    fill(125, 0, 0);
  }
  rect(0, 0, width, height);
  pop();

  if (bounceCountBE > 0 && bounceCountBE <= 1000) {
    push();
    fill(255, bounceCountBE * 0.1 + random(-5, 5));
    textFont("Alike");
    textSize(90);
    // text("SeaWeed...", 225, 275);
    // text("海苔!", 575, 275);
    pop();
  }

  if (bounceCountBE > 1000 && bounceCountBE <= 2000) {
    push();
    fill(255, (bounceCountBE - 1000) * 0.1 + random(-5, 5));
    textFont("Alike");
    textSize(90);
    // text("Boat...", 150, 275);
    // text("鸡蛋!", 550, 275);
    pop();
  }

  if (bounceCountBE > 2000 && bounceCountBE <= 3000) {
    push();
    fill(255, (bounceCountBE - 2000) * 0.1 + random(-5, 5));
    textFont("Alike");
    textSize(90);
    // text("眼泪...", 150, 275);
    // text("泡饭!", 550, 275);
    pop();
  }

  //boats
  for (let i = 0; i < boats.length; i++) {
    let boat = boats[i];
    boat.applyGravitationalAttraction(boats);
    boat.update();
    boat.limitVelocity(5);
    boat.checkCollision();
    boat.bounce();
    boat.display();
  }
  // move to the next scene
  if (bounceCountBE >= 3000) {
    b1lVisible = false;

    scene = 4;
    bowl = new Bowl(350, 250);
    for (let i = 0; i < 12; i++) {
      let x = random(width / 2 - 200, width / 2 + 200);
      let y = random(100, height - 80);
      let rad = random(3, 20);
      swinsoups.push(new Swinsoup(x, y, rad));
    }

    let eggX = random(width / 2 - 100, width / 2 + 100);
    let eggY = random(120, height - 100);
    let eggRad = 20;
    egg = new Egg(eggX, eggY, eggRad);
    chopsticks = new Chopstick();

    for (let i = 0; i < 100; i++) {
      let hgasY = -i * random(1, 2);
      let hgasX = 10 * sin((PI * hgasY) / 45);
      let hgasRad = 4 - i * 0.03;
      hotgas.push(new Hotgas(hgasX, hgasY, hgasRad));
    }
    for (let i = 0; i < 12; i++) {
      let x = random(100, width - 100);
      let y = random(300, height - 150);
      let rad = random(5, 20);
      waterbubbles.push(new Waterbubble(x, y, rad));
    }
  }
}

function drawScene4() {
  if (a <= 255) {
    a++;
  } else if (a > 255) {
    a = 255;
  }
  bowl.display();

  if (a >= 255) {
    b++;
    push();
    translate(355, 350);
    fill(255, b);
    textFont("Alike");
    //text("海带难缠，", 0, 0);
    //text("也终成Soup一碗。", 0, 35);
    pop();
  }

  //modified with the help of Prof.Moon to get things more realistic
  push();
  translate(width / 2, height / 2);
  scale(1.7, 0.9);
  translate(-width / 2, -height / 2);
  
  for (let i = 0; i < waterbubbles.length; i++) {
    let w = waterbubbles[i];
    let anglewb = map(sin(frameCount), -1, 1, 80, 90);
    let centerPos = createVector(width / 2, height / 2);
    let vector = p5.Vector.sub(centerPos, w.pos);
    vector.normalize();
    vector.mult(0.1);
    vector.rotate(radians(anglewb));
    w.applyForce(vector);

    w.vel.mult(0.9); // slow down a bit
    w.checkBoundaries();
    w.update();
    if (a >= 255) {
      w.display();
    }
  }
  pop();

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
  chopsticks.updatePosition(mouseX, mouseY);
  chopsticks.display();
  for (let i = 0; i < hotgas.length; i++) {
    let gs = hotgas[i];
    if (a >= 255) {
      gs.display();
    }
  }

  push();
  noStroke();
  fill(255, 100 - a * 0.4);
  rect(0, 0, width, height);
  pop();
}

class Spring {
  constructor(a, b, restLength, stiffness) {
    this.bobA = a;
    this.bobB = b;
    this.len = restLength;
    this.k = stiffness;
  }
  update() {
    let vector = p5.Vector.sub(this.bobB.pos, this.bobA.pos);
    let distance = vector.mag();
    let stretch = distance - this.len;
    let strength = -1 * stretch * this.k;

    // force to bobB
    let force = vector.copy();
    force.normalize();
    force.mult(strength);
    this.bobB.applyForce(force);

    // force to bobB
    let force1 = vector.copy();
    force1.normalize();
    force1.mult(strength * -1);
    this.bobA.applyForce(force1);
  }
  display() {
    push();
    strokeWeight(5);
    stroke(255, random(90, 100));
    line(
      this.bobA.pos.x,
      this.bobA.pos.y,
      this.bobB.pos.x + random(-10, 10),
      this.bobB.pos.y
    );
    line(
      this.bobA.pos.x,
      this.bobA.pos.y,
      this.bobA.pos.x - (this.bobB.pos.x - this.bobA.pos.x + random(-5, 5)),
      this.bobA.pos.y - (this.bobB.pos.y - this.bobA.pos.y + random(-5, 15))
    );
    pop();
  }
}

//Scene1 classes
class Eye {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = 30;
  }

  display() {
    push();
    noFill();
    stroke(255);
    beginShape();
    curveVertex(
      this.pos.x - 0.9 * this.rad,
      this.pos.y - 0.8 * this.rad + z * 0.8
    );
    curveVertex(
      this.pos.x - 0.9 * this.rad,
      this.pos.y - 0.8 * this.rad + z * 0.8
    );
    curveVertex(this.pos.x - 1.1 * this.rad, this.pos.y + z * 0.4);
    curveVertex(this.pos.x - 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    curveVertex(this.pos.x - 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    endShape();
    pop();

    push();
    noFill();
    stroke(255);
    beginShape();
    curveVertex(
      this.pos.x + 0.9 * this.rad,
      this.pos.y - 0.8 * this.rad + z * 0.8
    );
    curveVertex(
      this.pos.x + 0.9 * this.rad,
      this.pos.y - 0.8 * this.rad + z * 0.8
    );
    curveVertex(this.pos.x + 1.1 * this.rad, this.pos.y + z * 0.4);
    curveVertex(this.pos.x + 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    curveVertex(this.pos.x + 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    endShape();
    pop();

    push();
    noFill();
    stroke(255);
    beginShape();
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y + this.rad);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    endShape();
    pop();

    push();
    noFill();
    stroke(255);
    beginShape();
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y - this.rad + z);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    endShape();
    pop();

    push();
    noFill();
    stroke(255);
    beginShape();
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y - 1.2 * this.rad + z);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    endShape();
    pop();
  }
}

class Tear {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.rad = this.pos.y * 0.01 + 2;
    this.r = 255 - this.pos.y * 0.1;
    this.g = 255 - this.pos.y * 0.1;
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.rad = this.pos.y * 0.01 + 2;
    this.r = 255 - this.pos.y * 0.5;
    this.g = 255 - this.pos.y * 0.2;
  }

  display() {
    push();
    translate(110, 70);
    translate(this.pos.x + sin(this.pos.y / 30) * 0.8, this.pos.y);
    noStroke();
    fill(this.r, this.g, 255);
    circle(0, 0, this.rad * 2);
    pop();

    push();
    translate(410, 70);
    translate(this.pos.x + sin(this.pos.y / 30) * 0.8, this.pos.y);
    noStroke();
    fill(this.r, this.g, 255);
    circle(0, 0, this.rad * 2);
    pop();
  }
}

class Light1 {
  constructor(x, y, rad, immovable = false) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.5;
    this.damping = 0.95;
    this.isImmovable = immovable;
  }
  update() {
    if (this.isImmovable) return;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.mult(this.damping);
  }
  applyForce(f) {
    if (this.mass > 0) {
      let force = p5.Vector.div(f, this.mass);
      this.acc.add(force);
    }
  }
  attractedTo(others) {
    for (let i = 0; i < others.length; i++) {
      let other = others[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);
        let magnitude =
          (C_GRAVITY * this.mass * other.mass) / (distance * distance);
        let force = p5.Vector.sub(other.pos, this.pos);
        force.normalize();
        force.mult(magnitude);
        this.applyForce(force);
      }
    }
  }
  repelledFrom(others) {
    for (let i = 0; i < others.length; i++) {
      let other = others[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);

        if (distance < this.rad + DISTANCE_BTW_BALLS) {
          let magnitude =
            (C_GRAVITY * this.mass * other.mass) / (distance * distance);
          let force = p5.Vector.sub(other.pos, this.pos);
          force.normalize();
          force.mult(-1);
          force.mult(magnitude);
          this.applyForce(force);
        }
      }
    }
  }

  drag() {
    if (this.isImmovable) return;
    if (mouseIsPressed) {
      let distance = dist(this.pos.x, this.pos.y, mouseX, mouseY);
      if (distance < this.rad) {
        // in
        this.pos.x = mouseX;
        this.pos.y = mouseY;
      }
    }
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    noFill();
    circle(0, 0, this.rad * 2);
    pop();
  }
}

//Scene2 classes
class Boat {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = 50;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(random(200, 255));
    strokeWeight(2);
    beginShape();
    curveVertex(-0.9 * this.rad, -0.8 * this.rad);
    curveVertex(-0.9 * this.rad, -0.8 * this.rad);
    curveVertex(-1.1 * this.rad, 0);
    curveVertex(-0.9 * this.rad, 0.8 * this.rad);
    curveVertex(-0.9 * this.rad, 0.8 * this.rad);
    endShape();

    beginShape();
    curveVertex(0.9 * this.rad, -0.8 * this.rad);
    curveVertex(0.9 * this.rad, -0.8 * this.rad);
    curveVertex(1.1 * this.rad, 0);
    curveVertex(0.9 * this.rad, 0.8 * this.rad);
    curveVertex(0.9 * this.rad, 0.8 * this.rad);
    endShape();

    beginShape();
    curveVertex(-this.rad * 3, 0);
    curveVertex(-this.rad * 3, 0);
    curveVertex(0, this.rad);
    curveVertex(this.rad * 3, 0);
    curveVertex(this.rad * 3, 0);
    endShape();

    beginShape();
    curveVertex(-this.rad * 3, 0);
    curveVertex(-this.rad * 3, 0);
    curveVertex(0, -this.rad);
    curveVertex(this.rad * 3, 0);
    curveVertex(this.rad * 3, 0);
    endShape();

    beginShape();
    curveVertex(-this.rad * 3, 0);
    curveVertex(-this.rad * 3, 0);
    curveVertex(0, 1.2 * this.rad);
    curveVertex(this.rad * 3, 0);
    curveVertex(this.rad * 3, 0);
    endShape();
    pop();
  }
}

class Light2 {
  constructor(x, y, rad, immovable = false) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.5;
    this.damping = 0.95;
    this.isImmovable = immovable;
  }
  update() {
    if (this.isImmovable) return;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.mult(this.damping);
  }
  applyForce(f) {
    if (this.mass > 0) {
      let force = p5.Vector.div(f, this.mass);
      this.acc.add(force);
    }
  }
  attractedTo(others) {
    for (let i = 0; i < others.length; i++) {
      let other = others[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);
        let magnitude =
          (C_GRAVITY * this.mass * other.mass) / (distance * distance);
        let force = p5.Vector.sub(other.pos, this.pos);
        force.normalize();
        force.mult(magnitude);
        this.applyForce(force);
      }
    }
  }
  repelledFrom(others) {
    for (let i = 0; i < others.length; i++) {
      let other = others[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);

        if (distance < this.rad + DISTANCE_BTW_BALLS) {
          let magnitude =
            (C_GRAVITY * this.mass * other.mass) / (distance * distance);
          let force = p5.Vector.sub(other.pos, this.pos);
          force.normalize();
          force.mult(-1); // ***
          force.mult(magnitude);
          this.applyForce(force);
        }
      }
    }
  }

  drag() {
    if (this.isImmovable) return;
    if (mouseIsPressed) {
      let distance = dist(this.pos.x, this.pos.y, mouseX, mouseY);
      if (distance < this.rad) {
        // in
        this.pos.x = mouseX;
        this.pos.y = mouseY;
      }
    }
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    noFill();
    circle(0, 0, this.rad * 2);
    pop();
  }
}

class SeaweedPoint {
  constructor(x, y, rad, immovable = false) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.5;
    this.damping = 0.95;
    this.isImmovable = immovable;
  }
  update() {
    if (this.isImmovable) return;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.mult(this.damping);
  }
  applyForce(f) {
    if (this.mass > 0) {
      let force = p5.Vector.div(f, this.mass);
      this.acc.add(force);
    }
  }
  attractedTo(others) {
    for (let i = 0; i < others.length; i++) {
      let other = others[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);
        let magnitude =
          (C_GRAVITY * this.mass * other.mass) / (distance * distance);
        let force = p5.Vector.sub(other.pos, this.pos);
        force.normalize();
        force.mult(magnitude);
        this.applyForce(force);
      }
    }
  }
  repelledFrom(others) {
    for (let i = 0; i < others.length; i++) {
      let other = others[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);

        if (distance < this.rad + DISTANCE_BTW_BALLS) {
          let magnitude =
            (C_GRAVITY * this.mass * other.mass) / (distance * distance);
          let force = p5.Vector.sub(other.pos, this.pos);
          force.normalize();
          force.mult(-1);
          force.mult(magnitude);
          this.applyForce(force);
        }
      }
    }
  }

//Thanks Prof.Moon for helping me add xOffset and yOffset functions! I think I do need them Haha!
  drag(xOffset = 0, yOffset = 0) {
    if (this.isImmovable) return;
    if (mouseIsPressed) {
      let distance = dist(
        this.pos.x + xOffset,
        this.pos.y + yOffset,
        mouseX,
        mouseY
      );
      if (distance < this.rad) {
        // in
        this.pos.x = mouseX - xOffset;
        this.pos.y = mouseY - yOffset;
        seaWeedDrag = true;
      }
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    noFill();
    circle(0, 0, this.rad * 2);
    pop();
  }
}

//Add array in array. Coded by Prof.Moon.
class Seaweed {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.points = [];
    this.springs = [];
    this.generate();
  }
  generate() {
    this.points.push(new SeaweedPoint(-10, height, 20, true));
    this.points.push(new SeaweedPoint(-8, height - 60, 20));
    this.points.push(new SeaweedPoint(-6, height - 90, 20));
    this.points.push(new SeaweedPoint(0, height - 120, 20));
    this.points.push(new SeaweedPoint(6, height - 90, 20));
    this.points.push(new SeaweedPoint(8, height - 60, 20));
    this.points.push(new SeaweedPoint(10, height, 20, true));

    for (let i = 0; i < this.points.length - 1; i++) {
      this.springs.push(
        new Spring(this.points[i], this.points[i + 1], 50, 0.5)
      );
    }
  }
  run() {
    //seaWeeds
    for (let s of this.springs) {
      s.update();
    }

    push();
    translate(this.x, this.y);
    stroke(255, random(80, 100));
    noFill();
    beginShape();
    let firstPointPos = this.points[0].pos;
    let lastPointPos = this.points[this.points.length - 1].pos;
    curveVertex(firstPointPos.x, firstPointPos.y);
    for (let pt of this.points) {
      pt.drag(this.x, this.y);
      pt.update();
      curveVertex(pt.pos.x, pt.pos.y);
    }
    curveVertex(lastPointPos.x, lastPointPos.y);
    endShape();
    pop();
  }
}

//Scene3 classes
class BoatEye {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.initRad = rad;
    this.rad = rad;
    this.mass = this.rad * this.rad;
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    //this.rad = (bounceCountBE * 0.003 + 1) * this.initRad;
  }

  applyForce(f) {
    if (this.mass > 0) {
      let force = p5.Vector.div(f, this.mass);
      this.acc.add(force);
    }
  }

  applyGravitationalAttraction(other) {
    for (let i = 0; i < boats.length; i++) {
      let other = boats[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);
        let magnitude =
          (C_GRAVITY * this.mass * other.mass) / (distance * distance);
        let force = p5.Vector.sub(other.pos, this.pos);
        force.normalize();
        force.mult(magnitude);
        if (distance < this.rad) {
          force.mult(-1);
          force.mult(5);
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
      this.vel.x = -1.1 * this.vel.x;
      boatBounce = true;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -1.1 * this.vel.x;
      boatBounce = true;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = -1.1 * this.vel.y;
      boatBounce = true;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -1.1 * this.vel.y;
      boatBounce = true;
    } else {
      boatBounce = false;
    }
  }

  checkCollision() {
    for (let j = 0; j < boats.length; j++) {
      if (this !== boats[j]) {
        let distance = p5.Vector.dist(this.pos, boats[j].pos);
        if (distance < (this.rad + boats[j].rad) * 2) {
          bounceCountBE++;
          boatBounce = true;
        } else {
          boatBounce = false;
        }
      }
    }
  }

  display() {
    push();
    noFill();
    stroke(255, 255 - bounceCountBE * 0.02, 255 - bounceCountBE * 0.06);
    strokeWeight(1 + bounceCountBE * 0.05);
    beginShape();
    curveVertex(this.pos.x - 0.9 * this.rad, this.pos.y - 0.8 * this.rad);
    curveVertex(this.pos.x - 0.9 * this.rad, this.pos.y - 0.8 * this.rad);
    curveVertex(this.pos.x - 1.1 * this.rad, this.pos.y);
    curveVertex(this.pos.x - 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    curveVertex(this.pos.x - 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    endShape();

    beginShape();
    curveVertex(this.pos.x + 0.9 * this.rad, this.pos.y - 0.8 * this.rad);
    curveVertex(this.pos.x + 0.9 * this.rad, this.pos.y - 0.8 * this.rad);
    curveVertex(this.pos.x + 1.1 * this.rad, this.pos.y);
    curveVertex(this.pos.x + 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    curveVertex(this.pos.x + 0.9 * this.rad, this.pos.y + 0.8 * this.rad);
    endShape();

    beginShape();
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y + this.rad);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    endShape();

    beginShape();
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y - this.rad);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    endShape();

    beginShape();
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y + 1.2 * this.rad);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    endShape();
    pop();
  }
}

//Scene4 classes
class Bowl {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = 200;
  }

  display() {
    push();
    noStroke();
    fill(255 - a / 2, 255 - a, 255 - a);
    rect(0, 0, width, height);
    pop();

    push();
    fill(200, 120, 40);
    strokeWeight(10);
    stroke(100, 60, 20);
    beginShape();
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y + this.rad);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y - 0.8 * this.rad);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    endShape();
    pop();

    push();
    fill(255, random(50, 55));
    noStroke();
    beginShape();
    curveVertex(this.pos.x - this.rad * 2.5, this.pos.y);
    curveVertex(this.pos.x - this.rad * 2.5, this.pos.y);
    curveVertex(this.pos.x, this.pos.y + this.rad);
    curveVertex(this.pos.x + this.rad * 2.5, this.pos.y);
    curveVertex(this.pos.x + this.rad * 2.5, this.pos.y);
    curveVertex(this.pos.x, this.pos.y - 0.6 * this.rad);
    curveVertex(this.pos.x - this.rad * 2.5, this.pos.y);
    curveVertex(this.pos.x - this.rad * 2.5, this.pos.y);
    endShape();
    pop();

    push();
    fill(100, 60, 20);
    strokeWeight(10);
    stroke(100, 60, 20);
    beginShape();
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y + 1.2 * this.rad);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x + this.rad * 3, this.pos.y);
    curveVertex(this.pos.x, this.pos.y + this.rad);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    curveVertex(this.pos.x - this.rad * 3, this.pos.y);
    endShape();
    pop();
  }
}

//adapted from the example code given by Prof.Moon: //https://editor.p5js.org/MOQN/sketches/gtzqJ5kKZ
class Waterbubble {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-2, 2), 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.05;
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
    // x
    if (this.pos.x < 20) {
      this.pos.x = 20;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > width - 20) {
      this.pos.x = width - 20;
      this.vel.x = -this.vel.x;
    }
    // y
    if (this.pos.y < 150) {
      this.pos.y = 150;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > height - 100) {
      this.pos.y = height - 200;
      this.vel.y = -this.vel.y;
    }
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255, random(80, 90));
    circle(0, 0, this.rad * 2);
    pop();
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
    scale(this.rad / 3.8);
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
    scale(this.rad / 3.8);
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
    scale(this.rad / 3.8);
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

class Swinsoup {
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
    fill(0, random(30, 32), 0);
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
  }
}

class Chopstick {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.pos.x = mouseX;
    this.pos.y = mouseY;
  }

  updatePosition(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(120, 60, 20);
    scale(1.8);
    strokeWeight(10);
    if (mouseIsPressed) {
      line(-28, -18, 120, 120);
      line(-28, -18, 130, 110);
    } else {
      line(-28, -18, 120, 120);
      rotate(PI / 8);
      line(-24, -18, 130, 110);
    }
    pop();
  }
}

class Hotgas {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.rad = rad;
  }
  display() {
    push();
    translate(width / 2, height / 2 - 65);
    translate(this.pos.x, this.pos.y);
    scale(1.5);
    noStroke();
    fill(255, 50 + 50 * sin(this.pos.y * frameCount * 0.01));
    circle(0, 0, this.rad * 2);
    pop();

    push();
    translate(width / 2 - 50, height / 2 - 55);
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255, 50 + 50 * sin(this.pos.y * frameCount * 0.01));
    circle(0, 0, this.rad * 2);
    pop();

    push();
    translate(width / 2 + 50, height / 2 - 55);
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255, 50 + 50 * sin(this.pos.y * frameCount * 0.01));
    circle(0, 0, this.rad * 2);
    pop();
  }
}
