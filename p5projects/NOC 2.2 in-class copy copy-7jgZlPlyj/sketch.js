let balls = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  
  //if (mouseIsPressed) {
  balls.push( new Ball(mouseX, mouseY, random(10, 20)) );  
  balls.push( new Ball(mouseX, mouseY, random(10, 20)) );  
  balls.push( new Ball(mouseX, mouseY, random(10, 20)) );  
  balls.push( new Ball(mouseX, mouseY, random(10, 20)) );  
  balls.push( new Ball(mouseX, mouseY, random(10, 20)) );  
  //}
  
  for (let i=0; i<balls.length; i++) {
    let b = balls[i];
    b.move();
    b.display();
  }
  
  while (balls.length > 100) {
    balls.splice(0, 1); // (index, howMany)
  }
  
  text(balls.length, 10, 20);
}

function mousePressed() {
  //balls.push( new Ball(mouseX, mouseY, random(10, 20)) );  
}
//

class Ball {
  constructor(x, y, dia) {
    this.x = x;
    this.y = y;
    this.xSpd = random(-1, 1);
    this.ySpd = random(0, 10);
    this.dia = dia;
    this.r=random(255);
    this.g=random(255);
    this.b=random(255);
    this.rotSpd=random(0.01,0.03);
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  display() {
    push();
    translate(this.x,this.y);
    rotate(frameCount*this.rotSpd);
    noStroke();
    fill(this.r,this.g,this.b);
    ellipse(0, 0, this.dia,this.dia*0.8);
    pop();
  }
}


