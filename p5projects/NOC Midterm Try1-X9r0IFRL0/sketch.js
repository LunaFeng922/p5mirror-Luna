let b1Visible = false;
let b2Visible = false;
let b3Visible = false;
let b4Visible = false;
let b1lVisible = false;

//scene1
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
let rains = [];
let WATER_LEVEL = 150;
let shouldRaiseWaterLevel = false;
let lights2 = [];
let springs2 = [];
let seaWeeds = [];
let springs3 = [];

function setup() {
  createCanvas(700, 500);
  ll1 = new Light1(290, height, 15);
  lights1.push(ll1);
  lm1 = new Light1(350, height - 80, 30);
  lights1.push(lm1);
  lr1 = new Light1(410, height, 15);
  lights1.push(lr1);
  springs1.push(new Spring1(lm1, ll1, 100, 0.1));
  springs1.push(new Spring1(lm1, lr1, 100, 0.1));

  ll2 = new Light2(260, 255, 15);
  lights2.push(ll2);
  lm2 = new Light2(350, 135, 15);
  lights2.push(lm2);
  lm2k = new Light2(350, 255, 15);
  lights2.push(lm2k);
  lr2 = new Light2(440, 255, 15);
  lights2.push(lr2);

  springs2.push(new Spring2(lm2, ll2, 150, 0.1));
  springs2.push(new Spring2(lm2, lr2, 150, 0.1));
  springs2.push(new Spring2(lm2, lm2k, 120, 0.1));
  springs2.push(new Spring2(lm2k, ll2, 90, 0.5));
  springs2.push(new Spring2(lm2k, lr2, 90, 0.5));

  sw1 = new Seaweed(10, height, 10);
  seaWeeds.push(sw1);
  sw2 = new Seaweed(15, height - 60, 10);
  seaWeeds.push(sw2);
  sw3 = new Seaweed(10, height - 90, 10);
  seaWeeds.push(sw3);
  sw4 = new Seaweed(20, height - 120, 10);
  seaWeeds.push(sw4);
  sw5 = new Seaweed(15, height - 90, 10);
  seaWeeds.push(sw5);
  sw6 = new Seaweed(35, height - 70, 10);
  seaWeeds.push(sw6);
  sw7 = new Seaweed(30, height, 10);
  seaWeeds.push(sw7);
  for (let i=0;i<6-1;i++){
    springs3.push(new Spring3(seaWeeds[i], seaWeeds[i+1], 50, 0.5));
  }
  // springs3.push(new Spring3(sw4, sw3, 50, 0.5));
  // springs3.push(new Spring3(sw3, sw2, 50, 0.5));
  // springs3.push(new Spring3(sw2, sw1, 50, 0.5));
  // springs3.push(new Spring3(sw4, sw5, 50, 0.5));
  // springs3.push(new Spring3(sw5, sw6, 50, 0.5));
  // springs3.push(new Spring3(sw6, sw7, 50, 0.5));

}

function draw() {
  background(0, 10);
  ll1.pos.x = 320;
  ll1.pos.y = height;
  lr1.pos.x = 380;
  lr1.pos.y = height;

  lm2.pos.x = 350;
  lm2.pos.y = 140;

  sw1.pos.x = 20;
  sw1.pos.y = height;
  sw7.pos.x = 30;
  sw7.pos.y = height;

  //Scene1
  if (keyIsPressed && key === "1") {
    b1Visible = true;
    b2Visible = false;
    b3Visible = false;
    b4Visible = false;
    b1lVisible = false;
    z = 0;
    eye1 = new Eye(200, 70);
    eye2 = new Eye(500, 70);
  }

  if (b1Visible == true) {
    eye1.display();
    eye2.display();
    if (keyIsPressed && key === "z") {
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
    } else if (lm1.pos.y <= 330) {
      b1lVisible = false;
    }

    if (b1lVisible == true) {
      for (let s1 of springs1) {
        s1.update();
        s1.display();
      }

      for (let l1 of lights1) {
        l1.drag();
        l1.update();
        l1.display();
      }
      push();
      strokeWeight(random(1, 5));
      stroke(255);
      noFill();
      //fill(220, 90);
      beginShape();
      curveVertex(0, height - 80 + random(-3, 0) * sin(frameCount));
      curveVertex(0, height - 80 + random(-3, 0) * sin(frameCount));
      curveVertex(70, height - 80 + random(-10, 0) * sin(frameCount));
      curveVertex(140, height - 80 + random(-20, 0) * sin(frameCount));
      curveVertex(210, height - 80 + random(-10, 0) * sin(frameCount));
      curveVertex(280, height - 80 + random(-20, 0) * sin(frameCount));
      curveVertex(350, height - 80 + random(-10, 0) * sin(frameCount));
      curveVertex(420, height - 80 + random(-20, 0) * sin(frameCount));
      curveVertex(490, height - 80 + random(-10, 0) * sin(frameCount));
      curveVertex(560, height - 80 + random(-20, 0) * sin(frameCount));
      curveVertex(630, height - 80 + random(-10, 0) * sin(frameCount));
      curveVertex(700, height - 80 + random(-3, 0) * sin(frameCount));
      curveVertex(700, height + 10);
      curveVertex(0, height + 10);
      curveVertex(0, height - 80 + random(-3, 0) * sin(frameCount));
      curveVertex(0, height - 80 + random(-3, 0) * sin(frameCount));
      endShape();
      pop();
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
        tears[i].bounce();
        tears[i].display();
      }
    }
  }

  //Scene2
  if (mouseIsPressed && lm1.pos.y <= 330) {
    b1Visible = false;
    b2Visible = true;
    b3Visible = false;
    b4Visible = false;
    b1lVisible = false;
  }

  if (b2Visible == true) {
    //boat
    boatInSea = new Boat(350, 440);
    boatInSea.display();

    //rain
    for (let i = 0; i < 5; i++) {
      rains.push(new Rain(i * 45, 0));
      if (rains.length >= 100) {
        rains.shift();
      }

      for (let i = 0; i < rains.length; i++) {
        let r = rains[i];

        //gravity
        let gravity = createVector(0, 0.05 * r.mass);
        r.applyForce(gravity);
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
        r.display(WATER_LEVEL);
      }
    }
    //WaterLevel
    if (!shouldRaiseWaterLevel) {
      // rain in air yet
      WATER_LEVEL = 150;
      for (let i = rains.length - 1; i >= 0; i--) {
        if (rains[i].pos.y >= 150 - rains[i].rad) {
          // first drop on water
          shouldRaiseWaterLevel = true;
        }
      }
    } else {
      // first drop on water, start raising
      WATER_LEVEL = 150 - rains.length * 0.2;
      if (WATER_LEVEL < 100) {
        // max height
        WATER_LEVEL = 100;
      }
    }
    push();
    strokeWeight(random(1, 5));
    stroke(255, random(10, 100));
    //fill(255);
    noFill();
    beginShape();
    curveVertex(0, WATER_LEVEL + random(-3, 0) * sin(frameCount));
    curveVertex(0, WATER_LEVEL + random(-3, 0) * sin(frameCount));
    curveVertex(70, WATER_LEVEL + random(-10, 0) * sin(frameCount));
    curveVertex(140, WATER_LEVEL + random(-20, 0) * sin(frameCount));
    curveVertex(210, WATER_LEVEL + random(-10, 0) * sin(frameCount));
    curveVertex(280, WATER_LEVEL + random(-20, 0) * sin(frameCount));
    curveVertex(350, WATER_LEVEL + random(-10, 0) * sin(frameCount));
    curveVertex(420, WATER_LEVEL + random(-20, 0) * sin(frameCount));
    curveVertex(490, WATER_LEVEL + random(-10, 0) * sin(frameCount));
    curveVertex(560, WATER_LEVEL + random(-20, 0) * sin(frameCount));
    curveVertex(630, WATER_LEVEL + random(-10, 0) * sin(frameCount));
    curveVertex(700, WATER_LEVEL + random(-3, 0) * sin(frameCount));
    curveVertex(700, WATER_LEVEL + random(-3, 0) * sin(frameCount));
    endShape();
    pop();

    //light
    for (let s2 of springs2) {
      s2.update();
    }
    // push();
    // strokeWeight(3);
    // stroke(255, 255, 200);
    // line(lm2.pos.x, lm2.pos.y, lm2k.pos.x, lm2k.pos.y);
    // pop();

    push();
    noStroke();
    fill(255, 255, 200);
    circle(lm2.pos.x, lm2.pos.y, 4);
    circle(
      (lm2k.pos.x - lm2.pos.x) / 3 + lm2.pos.x,
      (lm2k.pos.y - lm2.pos.y) / 3 + lm2.pos.y,
      6
    );
    circle((lm2.pos.x + lm2k.pos.x) / 2, (lm2.pos.y + lm2k.pos.y) / 2, 8);
    circle(
      2*(lm2k.pos.x - lm2.pos.x) / 3 + lm2.pos.x,
      2*(lm2k.pos.y - lm2.pos.y) / 3 + lm2.pos.y,
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

    //seaWeeds
    for (let s3 of springs3) {
      s3.update();
    }

    for (let sw of seaWeeds) {
      sw.drag();
      sw.update();
      sw.display();
    }
    push();
    stroke(255);
    noFill();
    beginShape();
    curveVertex(sw1.pos.x, sw1.pos.y);
    curveVertex(sw1.pos.x, sw1.pos.y);
    curveVertex(sw2.pos.x, sw2.pos.y);
    curveVertex(sw3.pos.x, sw3.pos.y);
    curveVertex(sw4.pos.x, sw4.pos.y);
    curveVertex(sw5.pos.x, sw5.pos.y);
    curveVertex(sw6.pos.x, sw6.pos.y);
    curveVertex(sw7.pos.x, sw7.pos.y);
    curveVertex(sw7.pos.x, sw7.pos.y);
    endShape();
    pop();
  }
}

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
    this.parency = 100;
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.rad = this.pos.y * 0.01 + 2;
  }

  bounce() {
    if (this.pos.y > 350) {
      this.pos.y = 350;
      this.vel.y = -1 * this.vel.y;
    }
  }

  display() {
    if (this.pos.y < 350) {
      push();
      translate(110, 70);
      translate(this.pos.x + sin(this.pos.y / 30) * 0.8, this.pos.y);
      noStroke();
      fill(255);
      circle(0, 0, this.rad * 2);
      pop();

      push();
      translate(410, 70);
      translate(this.pos.x + sin(this.pos.y / 30) * 0.8, this.pos.y);
      noStroke();
      fill(255);
      circle(0, 0, this.rad * 2);
      pop();
    } else if (this.pos.y >= 350) {
      this.parency--;
      push();
      translate(110, 70);
      translate(this.pos.x + sin(this.pos.y / 30) * 0.8, this.pos.y);
      noStroke();
      fill(255, this.parency);
      circle(0, 0, this.rad * 2);
      pop();

      push();
      translate(410, 70);
      translate(this.pos.x + sin(this.pos.y / 30) * 0.8, this.pos.y);
      noStroke();
      fill(255, this.parency);
      circle(0, 0, this.rad * 2);
      pop();
    }
  }
}

class Spring1 {
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
      this.bobA.pos.x - (this.bobB.pos.x - this.bobA.pos.x + random(-5, 5)) * 2,
      this.bobA.pos.y - (this.bobB.pos.y - this.bobA.pos.y + random(-5, 15)) * 2
    );
    pop();
  }
}

class Light1 {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.5;
    this.damping = 0.95;
  }
  update() {
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
    // this method is duplicated from attractedTo()
    // then, the force vector is flipped.
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

class Rain {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.rad = random(1, 20);
    this.mass = this.rad;
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
  }

  bounce() {
    if (this.pos.y > WATER_LEVEL + 20) {
      this.pos.y = WATER_LEVEL + 20;
      this.vel.y *= -1;
    }
  }

  display(WATER_LEVEL) {
    push();
    translate(110, 0);
    translate(this.pos.x, this.pos.y);
    noStroke();
    if (this.pos.y < WATER_LEVEL) {
      // rain
      fill(255, 10);
      circle(0, 0, this.rad);
    } else {
      // waterbubble
      fill(255, 10);
      ellipse(0, 0, this.rad * 3, this.rad * 0.5);
    }
    pop();

    push();
    translate(410, 0);
    translate(this.pos.x, this.pos.y);
    noStroke();
    if (this.pos.y < WATER_LEVEL) {
      // rain
      fill(255, 10);
      circle(0, 0, this.rad);
    } else {
      // waterbubble
      fill(255, 10);
      ellipse(0, 0, this.rad * 3, this.rad * 0.3);
    }
    pop();
  }
}

class Spring2 {
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
}

class Light2 {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.5;
    this.damping = 0.95;
  }
  update() {
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

class Spring3 {
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
}

class Seaweed {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.5;
    this.damping = 0.95;
  }
  update() {
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
