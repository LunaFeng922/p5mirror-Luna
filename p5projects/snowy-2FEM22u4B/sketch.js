let ls = [];//light spot

function setup() {
  createCanvas(800, 600);
  background(0);
}

function draw() {
  background(0);
  // generate
  {
    ls.push(new LS(random(800), random(600), random(0.2, 1)));
  }

  // update and display
  for (let i = 0; i < ls.length; i++) {
    let s = ls[i];
    s.move();
    s.checkEdges();
    s.display();
  }

  // limit
  while (ls.length > 1000) {
    ls.splice(0, 1); // (index, howMany)
  }

  // control: if the particle is done, let's remove it!
  // FLIP the FOR LOOP!
  for (let i = ls.length - 1; i >= 0; i--) {
    let s = ls[i];
    if (s.isDone) {
      ls.splice(i, 1); // (index, howMany)
    }
  }
  
  // display the number of the particles
  text(ls.length, 580, 20);
}


class LS {
  constructor(x, y, dia) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.fromAngle( radians(frameCount) );
    //
    this.dia = dia;
    //
    this.r = random(220,250);
    this.g = 255;
    this.b = 255;
    this.a = random(60);
    //
    this.rotSpd = random(-0.01, 0.01);
    //
    this.isDone = false;
  }
  move() {    
    this.pos.add(this.vel); // pos += vel
    //this.pos.sub()
    //this.pos.mult()
    //this.pos.div()
  }
  fall() {
    let acc = createVector(0, 0.05);
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
    scale(0.6 * this.dia, 0.5 * this.dia);
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
    rotate(radians( - 54));
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    scale(0.6 * this.dia, 0.5 * this.dia);
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
    rotate(radians(54));
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    scale(0.6 * this.dia, 0.5 * this.dia);
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
    rotate(radians(- 81));
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    scale(0.3 * this.dia, 0.4 * this.dia);
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
    rotate(radians( 81));
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    scale(0.3 * this.dia, 0.4 * this.dia);
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
   translate(this.pos.x, this.pos.y);
    rotate(radians(this.rotationAngle));
    scale(0.6 * this.dia);
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    circle(0, 20, 10);
    rotate(radians(-30));
    circle(0, 20, 10);
    rotate(radians(60));
    circle(0, 20, 10);
    pop();
  }
}
