let balls = [];

function setup() {
  createCanvas(600, 600);
  background(255);
}

function draw() {

  // generate
  if (mouseIsPressed) {
    balls.push(new Ball(mouseX, mouseY, random(50, 200)));
  }

  // update and display
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.move();
    b.fall();
    b.reappear();
    b.checkEdges();
    b.display();
  }

  // limit
  while (balls.length > 1000) {
    balls.splice(0, 1); // (index, howMany)
  }

  // control: if the particle is done, let's remove it!
  // FLIP the FOR LOOP!
  for (let i = balls.length - 1; i >= 0; i--) {
    let b = balls[i];
    if (b.isDone) {
      balls.splice(i, 1); // (index, howMany)
    }
  }

  // display the number of the particles
  //text(balls.length, 10, 20);
}

function mousePressed() {
  //balls.push( new Ball(mouseX, mouseY, random(10, 20)) );
}
//

class Ball {
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
    ellipse(0, 0, this.dia, this.dia * random(0.03,0.3));
    pop();
  }
}
