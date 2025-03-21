const RESOLUTION = 30;
const FREQ_POS = 0.001;
const FREQ_TIME = 0.002;


let rows, cols;
let angles = [];
let vehicles = [];

function setup() {
   createCanvas(1000, 562.5);
  background(0);

  cols = ceil(width / RESOLUTION);
  rows = ceil(height / RESOLUTION);

  for (let i = 0; i < 20; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }
}

function draw() {
  background(0,50);

  // empty the angles array
  angles = [];

  // draw and update the flow field;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let x = c * RESOLUTION;
      let y = r * RESOLUTION;

      // angle from noise
      let gridCenter = createVector(x + RESOLUTION / 2, y + RESOLUTION / 2);
      let mouse = createVector(mouseX, mouseY);
      let vectorToMouse = p5.Vector.sub(mouse, gridCenter);

      let rotateAngle = map(sin(frameCount * 0.01), -1, 1, 10, 80);
      vectorToMouse.rotate(radians(rotateAngle));
      let angleFromMouse = vectorToMouse.heading();

      // angle from noise
      let xFrq = x * FREQ_POS + frameCount * FREQ_TIME;
      let yFrq = y * FREQ_POS + frameCount * FREQ_TIME;
      let noiseValue = noise(xFrq, yFrq); // 0 to 1
      let angleFromNoise = map(noiseValue, 0, 1, 0, PI * 6); // ***
      
      let angle = angleFromNoise; // or angleFromNoise
      angles.push(angle);

      /*
      push();

      // draw grid
      translate(x, y);
      fill(255);
      stroke(0, 100);
      rect(0, 0, RESOLUTION, RESOLUTION);

      // diplay line
      translate(RESOLUTION / 2, RESOLUTION / 2);
      let vector = p5.Vector.fromAngle(angle);
      vector.mult(RESOLUTION / 2);
      stroke(0);
      line(0, 0, vector.x, vector.y);

      // draw index
      let index = angles.length;
      fill(0);
      noStroke();
      text(index, -15, -5);

      pop();
      */
    }
  }

  // vehicles
  for (let v of vehicles) {
    let c = floor(v.pos.x / RESOLUTION);
    let r = floor(v.pos.y / RESOLUTION);
    let index = c + r * cols;
    let angle = angles[index];
    v.flow(angle);
    v.update();
    v.reappear();
    v.displayPoint();
  }
}

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    //
    this.mass = 1;
    this.size = 20;
    //
    this.angle = 0;
    //
    this.maxSpeed = 5;
    this.maxSteerForce = 0.1;
  }
  attractedTo(target) {
    let vector = p5.Vector.sub(target, this.pos);
    vector.mult(0.05);
    this.applyForce(vector);
    //
    this.vel.mult(0.9);
  }
  flow(angle) {
    let desiredVel = p5.Vector.fromAngle(angle); // direction
    desiredVel.mult(this.maxSpeed); // desire

    let steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxSteerForce);

    this.applyForce(steerForce);
  }
  seek(target) {
    let desiredVel = p5.Vector.sub(target, this.pos);
    desiredVel.normalize(); // direction
    desiredVel.mult(this.maxSpeed); // desire

    let steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxSteerForce);

    this.applyForce(steerForce);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    //
    this.angle = this.vel.heading();
  }
  applyForce(f) {
    if (this.mass <= 0) {
      console.log("Wrong mass");
      return;
    }
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
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
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    noStroke();
    fill(0);
    triangle(0, 0, -this.size, -this.size * 0.4, -this.size, this.size * 0.4);
    pop();
  }
  displayPoint() {
    push();
    stroke(255);
    point(this.pos.x, this.pos.y);
    pop();
  }
}
