let lls = []; //lotus leaf
let lfs = []; //lotus flower
let fish = []; //fish

function setup() {
  createCanvas(600, 600);
  background(0);
}

function draw() {
  // generate
  if (mouseIsPressed) {
    lls.push(new LL(mouseX, mouseY, random(50, 200)));
  }
  if (keyIsPressed && key === "f") {
    lfs.push(new LF(mouseX, mouseY));
    fish.push(new SH());
  }

  for (let i = 0; i < lls.length; i++) {
    let l = lls[i];
    l.move();
    l.fall();
    l.reappear();
    l.checkEdges();
    l.display();
  }
  for (let i = 0; i < lfs.length; i++) {
    let f = lfs[i];
    f.move();
    f.fall();
    f.display();
    f.bounce();
  }
  for (let i = 0; i < fish.length; i++) {
    let s = fish[i];
    s.move();
    s.display();
    s.bounce();
  }

  // limit
  //ll
  while (lls.length > 1200) {
    lls.splice(0, 1); // (index, howMany)
  }
  //lf
  while (lfs.length > 12) {
    lfs.splice(0, 1);
  }
  //fish
  while (fish.length > 12) {
    fish.splice(0, 1);
  }

  // control: if the particle is done, let's remove it!
  // FLIP the FOR LOOP!
  //ll
  for (let i = lls.length - 1; i >= 0; i--) {
    let l = lls[i];
    if (l.isDone) {
      lls.splice(i, 1); // (index, howMany)
    }
  }
  //lf
  for (let i = lfs.length - 1; i >= 0; i--) {
    let f = lfs[i];
    if (f.isDone) {
      lfs.splice(i, 1);
    }
  }
  //fish
  for (let i = fish.length - 1; i >= 0; i--) {
    let s = fish[i];
    if (s.isDone) {
      fish.splice(i, 1);
    }
  }

  // display the number of the particles
  //ll
  //text(lls.length, 10, 20);
  //lf
  //text(lfs.length, 580, 580);
  //fish
  //text(fish.length, 10, 580);
}

//ll
class LL {
  constructor(x, y, dia) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), 0);
    this.dia = dia;
    //
    this.r = random(60 - mouseY * 0.1, 100 - mouseY * 0.1);
    this.g = random(mouseY * 0.1 + 160);
    this.b = random(0, 240);
    this.a = random(30, 80);
    //
    this.rotSpd = random(0.01, 0.03);
    //
    this.isDone = false;
  }
  move() {
    this.pos.add(this.vel); // pos += vel
  }
  fall() {
    let acc = createVector(0, 0.5);
    acc = acc - 0.01;
    this.vel.add(acc);
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
  checkEdges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.isDone = true;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.isDone = true;
    }
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    ellipse(0, 0, this.dia, this.dia * random(0.03, 0.3));
    fill(255, this.a);
    ellipse(
      this.dia,
      0,
      this.dia * random(0.5, 1),
      this.dia * random(0.01, 0.02)
    );
    ellipse(
      0,
      -this.dia * random(0.05, 0.1),
      this.dia * random(0.01, 0.02),
      this.dia * random(0.05, 0.5)
    );
    pop();
  }
}

//lf
class LF {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    //
    this.xSpd = random(-0.2, 0.2);
    this.ySpd = random(-0.2, 0.2);
    this.vel = createVector(random(-0.2, 0.2), random(-0.2, 0.2));
    //
    this.dia1 = random(0.8, 1.5);
    this.dia2 = random(0.8, 1.5);
    //
    this.r = random(230, 255);
    this.g = random(210, 240);
    this.b = random(220, 255);
    this.a = random(50, 90);
    //
    this.isDone = false;
    //
    this.rotationAngle = 0;
    //
    this.rotationSpeed = random(-0.5, 0.5);
    //
  }
  bounce() {
    if (this.x < 0) {
      this.x = 0;
      this.xSpd = this.xSpd * -1;
      this.rotationAngle *= -0.8;
    } else if (this.x > width) {
      this.x = width;
      this.xSpd = this.xSpd * -1;
      this.rotationAngle *= -0.8;
    }
    if (this.y < 0) {
      this.y = 0;
      this.ySpd = this.ySpd * -1;
      this.rotationAngle *= -0.8;
    } else if (this.y > height) {
      this.y = height;
      this.ySpd = this.ySpd * -1;
      this.rotationAngle *= -0.8;
    }
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;

    if (this.rotationAngle > -5 && this.rotationAngle < 5) {
      this.rotationAngle = this.rotationAngle + this.rotationSpeed;
    } else {
      this.rotationSpeed *= -1;
    }
  }
  fall() {
    let acc = createVector(0, 0.5);
    acc = acc - 0.01;
    this.vel.add(acc);
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.rotationAngle - 110));
    noStroke();
    fill(
      this.r * 0.5,
      this.g * random(0.7, 1),
      this.b * random(0.7, 1),
      this.a
    );
    scale(0.3 * this.dia1, 0.4 * this.dia2);
    beginShape();
    curveVertex(-25, -110);
    curveVertex(-25, -110);
    curveVertex(-55, -25);
    curveVertex(-45, 10);
    curveVertex(-5, 10);
    curveVertex(5, -25);
    curveVertex(-25, -110);
    curveVertex(-25, -110);
    endShape();
    pop();

    push();
    translate(this.x, this.y);
    rotate(radians(this.rotationAngle + 110));
    noStroke();
    fill(
      this.r * 0.5,
      this.g * random(0.5, 0.7),
      this.b * random(0.5, 0.6),
      this.a
    );
    scale(0.3 * this.dia1, 0.4 * this.dia2);
    beginShape();
    curveVertex(25, -110);
    curveVertex(25, -110);
    curveVertex(-5, -25);
    curveVertex(5, 10);
    curveVertex(45, 10);
    curveVertex(55, -25);
    curveVertex(25, -110);
    curveVertex(25, -110);
    endShape();
    pop();

    push();
    translate(this.x, this.y);
    rotate(radians(this.rotationAngle));
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    scale(0.6 * this.dia1, 0.5 * this.dia2);
    beginShape();
    curveVertex(0, -100);
    curveVertex(0, -100);
    curveVertex(-30, -15);
    curveVertex(-20, 20);
    curveVertex(20, 20);
    curveVertex(30, -15);
    curveVertex(0, -100);
    curveVertex(0, -100);
    endShape();
    scale(0.5, 0.8);
    fill(this.r, this.g - 30, this.b - 30, this.a + 10);
    beginShape();
    curveVertex(0, -100);
    curveVertex(0, -100);
    curveVertex(-30, -15);
    curveVertex(-20, 20);
    curveVertex(20, 20);
    curveVertex(30, -15);
    curveVertex(0, -100);
    curveVertex(0, -100);
    endShape();
    pop();

    push();
    translate(this.x, this.y);
    rotate(radians(this.rotationAngle - 54));
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    scale(0.6 * this.dia1, 0.5 * this.dia2);
    beginShape();
    curveVertex(-5, -110);
    curveVertex(-5, -110);
    curveVertex(-35, -25);
    curveVertex(-25, 10);
    curveVertex(15, 10);
    curveVertex(25, -25);
    curveVertex(-5, -110);
    curveVertex(-5, -110);
    endShape();
    scale(0.5, 0.8);
    fill(this.r, this.g - 30, this.b - 30, this.a + 10);
    beginShape();
    curveVertex(-5, -110);
    curveVertex(-5, -110);
    curveVertex(-35, -25);
    curveVertex(-25, 10);
    curveVertex(15, 10);
    curveVertex(25, -25);
    curveVertex(-5, -110);
    curveVertex(-5, -110);
    endShape();
    pop();

    push();
    translate(this.x, this.y);
    rotate(radians(this.rotationAngle + 54));
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    scale(0.6 * this.dia1, 0.5 * this.dia2);
    beginShape();
    curveVertex(5, -110);
    curveVertex(5, -110);
    curveVertex(-25, -25);
    curveVertex(-15, 10);
    curveVertex(25, 10);
    curveVertex(35, -25);
    curveVertex(5, -110);
    curveVertex(5, -110);
    endShape();
    scale(0.5, 0.8);
    fill(this.r, this.g - 30, this.b - 30, this.a + 10);
    beginShape();
    curveVertex(5, -110);
    curveVertex(5, -110);
    curveVertex(-25, -25);
    curveVertex(-15, 10);
    curveVertex(25, 10);
    curveVertex(35, -25);
    curveVertex(5, -110);
    curveVertex(5, -110);
    endShape();
    pop();

    push();
    translate(this.x, this.y);
    rotate(radians(this.rotationAngle - 81));
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    scale(0.3 * this.dia1, 0.4 * this.dia2);
    beginShape();
    curveVertex(-25, -110);
    curveVertex(-25, -110);
    curveVertex(-55, -25);
    curveVertex(-45, 10);
    curveVertex(-5, 10);
    curveVertex(5, -25);
    curveVertex(-25, -110);
    curveVertex(-25, -110);
    endShape();
    pop();

    push();
    translate(this.x, this.y);
    rotate(radians(this.rotationAngle + 81));
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    scale(0.3 * this.dia1, 0.4 * this.dia2);
    beginShape();
    curveVertex(25, -110);
    curveVertex(25, -110);
    curveVertex(-5, -25);
    curveVertex(5, 10);
    curveVertex(45, 10);
    curveVertex(55, -25);
    curveVertex(25, -110);
    curveVertex(25, -110);
    endShape();
    pop();

    push();
    translate(this.x, this.y);
    rotate(radians(this.rotationAngle));
    scale(0.6 * this.dia1);
    noStroke();
    fill(this.r, 0, 0, this.a);
    circle(0, 20, 7);
    rotate(radians(-30));
    circle(0, 20, 5);
    rotate(radians(60));
    circle(0, 20, 5);
    pop();
  }
}

//fish
class SH {
  constructor(x, y) {
    do {
      this.x = mouseX + random(-40, 40);
      this.y = mouseY + random(-40, 40);
    } while (
      this.x > mouseX - 20 &&
      this.x < mouseX + 20 &&
      this.y > mouseY - 20 &&
      this.y < mouseY + 20
    );
    //
    this.vel = createVector(random(-0.2, 0.2), random(-0.2, 0.2));
    this.speed = random(1, 1.5);
    //
    this.a = random(0, 20);
    this.a = this.a++;
    //
    this.isDone = false;
  }
  bounce() {
    if (this.x < 0) {
      this.x = 0;
      this.vel.x = abs(this.vel.x);
    } else if (this.x > width) {
      this.x = width;
      this.vel.x = -abs(this.vel.x);
    }
    if (this.y < 0) {
      this.y = 0;
      this.vel.y = abs(this.vel.y);
    } else if (this.y > height) {
      this.y = height;
      this.vel.y = -abs(this.vel.y);
    }
  }
  move() {
    this.x += this.vel.x * this.speed;
    this.y += this.vel.y * this.speed;
    this.bounce();
  }
  speedUp() {
    this.speed *= 1.05;
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.vel.heading());
    noStroke();
    fill(255, 0, 0, this.a);
    scale(random(1, 2));
    ellipse(0, 0, 15, 6);
    triangle(-6, 0, -12, -3, -12, 3);
    pop();
  }
}
