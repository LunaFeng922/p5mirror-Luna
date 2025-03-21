let gui;

// JS Object, Parameters (params)
let ui = {
  x: 200,
  y: 200,
  rad: 50,
};

let balls = [];

function setup() {
  createCanvas(400, 400);
  background(100);

  gui = new dat.GUI();
  gui.add(ui, "x", 0, 400).step(0.1).listen().onChange(updateObject);
  gui.add(ui, "y").min(0).max(400).step(0.1).listen().onChange(updateObject);
  gui.add(ui, "rad", 10, 100).step(0.1).listen().onChange(updateObject);

  balls.push(new Ball(200, 200,50));
  balls.push(new Ball(200, 200,50));
  balls.push(new Ball(200, 200,50));
}

function draw() {
  background(100);

  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.move();
    b.display();
  }
}

function updateObject() {
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.updateByGui();
  }
}

class Ball {
  constructor(x, y,rad) {
    this.x = x;
    this.y = y;
    this.xSpd = random(-1, 1);
    this.ySpd = random(-1, 1);
    this.rad = rad;
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  updateByGui() {
    this.x = ui.x;
    this.y = ui.y;
  }
  display() {
    circle(this.x, this.y, this.rad * 2);
  }
}

//
