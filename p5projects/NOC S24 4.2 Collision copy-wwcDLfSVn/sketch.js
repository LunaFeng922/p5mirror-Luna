let particles = [];

function setup() {
  createCanvas(600, 500);
  background(0);
  
  let p1 = new Particle(50, height/2, 10);
  particles.push( p1 );
  
  let p2 = new Particle(width-100, height/2, 30);
  particles.push( p2 );
  
}

function draw() {
  background(0);

  for (let i = 0; i < particles.length; i++) {
    p = particles[i];
    p.update();
    p.checkCollision(particles);
    p.bounce();
    p.display();
  }
}

///// CLASS /////

class Particle {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.5; // MASS!
    // 
    this.color = color(255); // p5 color object
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  applyForce(f) {
    if (this.mass > 0) {
      let force = p5.Vector.div(f, this.mass);
      this.acc.add(force);
    }
  }
  checkCollision(others) {
    for (let i = 0; i < particles.length; i++) {
      let other = particles[i];
      if (this != other) {
        // check!
      }
    }
  }
  limitVelocity(mag) {
    this.vel.limit(mag);
  }
  bounce() {
    // x
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -this.vel.x;
    }
    // y
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -this.vel.y;
    }
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(this.color);
    circle(0, 0, this.rad * 2);
    pop();
  }
}
