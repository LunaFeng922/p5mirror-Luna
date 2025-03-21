let lls = []; //lotus leaf
let lfs = []; //lotus flower

function setup() {
  createCanvas(600, 600);
  background(255);
}

function draw() {
  noErase();
  // generate
  if (mouseIsPressed) {
    lls.push(new LL(mouseX, mouseY, random(50, 200)));
  }
  if (keyIsPressed && key === "f") {
    lfs.push(new LF(mouseX, mouseY, random(100, 500), random(10, 50)));
  }
  // update and display
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
    f.reappear();
    erase();
    f.display();
    noErase();
    f.bounce();
  }

  // limit
  //ll
  while (lls.length > 1000) {
    lls.splice(0, 1); // (index, howMany)
  }
  //lf
  while (lfs.length > 6) {
    lfs.splice(0, 1); // (index, howMany)
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
      lfs.splice(i, 1); // (index, howMany)
    }
  }

  // display the number of the particles
  //ll
  text(lls.length, 10, 20);
  //lf
  text(lfs.length, 590, 580);
}

function mousePressed() {
  //lls.push( new Ball(mouseX, mouseY, random(10, 20)) );
}
//

//ll
class LL {
  constructor(x, y, dia) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), 0);
    //this.vel = p5.Vector.fromAngle( radians(frameCount) );
    //
    this.dia = dia;
    //
    this.r = random(0, 20);
    this.g = random(200);
    this.b = random(0, 160);
    this.a = random(10, 60);
    //
    this.rotSpd = random(0.01, 0.03);
    //
    this.isDone = false;
  }
  move() {
    this.pos.add(this.vel); // pos += vel
    //this.pos.sub()
    //this.pos.mult()
    //this.pos.div(this.vel)
  }
  fall() {
    let acc = createVector(0, 0.5);
    acc = acc - 0.01;
    this.vel.add(acc);
  }
  speedUp() {
    //
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
    //rotate(frameCount * this.rotSpd);
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    ellipse(0, 0, this.dia, this.dia * random(0.03, 0.3));
    pop();
  }
}

//lf
class LF {
  constructor(x, y, dia) {
    this.pos = createVector(x, y);
    //
    this.vel = createVector(random(-0.2, 0.2), random(-0.2, 0.2));
    //
    this.dia1 = random(1, 1.5);
    this.dia2 = random(1, 1.5);
    //
    this.r = 255;
    this.g = random(80, 120);
    this.b = random(120, 200);
    this.a = random(40, 60);
    //
    this.isDone = false;
    //
    this.rotationAngle = 0;
    //
    this.rotationSpeed = random(-0.5, 0.5);
    //
  }
  bounce() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
      this.rotationSpeed *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
      this.rotationSpeed *= -1;
    }
  }
  move() {
    this.pos.add(this.vel); // pos += vel

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
  speedUp() {
    //
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
  //checkEdges() {
  //if (this.pos.x < 0 || this.pos.x > width) {
  // this.isDone = true;
  // }
  // if (this.pos.y < 0 || this.pos.y > height) {
  //  this.isDone = true;
  // }
  //  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
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
    translate(this.pos.x, this.pos.y);
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
    translate(this.pos.x, this.pos.y);
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
    translate(this.pos.x, this.pos.y);
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
    translate(this.pos.x, this.pos.y);
    rotate(radians(this.rotationAngle + 81));
    noStroke();
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
  }
}
