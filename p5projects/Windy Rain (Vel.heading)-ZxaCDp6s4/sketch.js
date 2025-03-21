let rains = [];
let w = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(200, 50, 0);

  if (rains.length >= 439) {
    rains.shift();
  }

  rains.push(new Ball(random(width), 1));

  for (let i = 0; i < rains.length; i++) {
    let r = rains[i];

    let gravity = createVector(0, 0.5 * r.mass);

    let wind = createVector(-w, 0);

    r.applyForce(gravity);
    r.applyForce(wind);

    let resistance = r.vel.copy();
    resistance.mult(-1);
    let speed = r.vel.mag();

    let dragForce = speed * speed * 0.03;
    resistance.mult(dragForce);

    r.applyForce(resistance);

    r.update();

    r.display();
  }
}

function keyPressed() {
  if (key === "l" || key === "L") {
    w -= 0.2;
  } else if (key === "r" || key === "R") {
    w += 0.2;
  }
}

class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.rad = random(1, 20);
    this.mass = this.rad;
    this.angle = 0;
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
    this.angle = this.vel.heading();
  }


  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();

    fill(255, random(90, 100));
    rotate(this.angle);
    ellipse(0, 0, this.rad * 4, this.rad * 0.2);

    pop();
  }
}
