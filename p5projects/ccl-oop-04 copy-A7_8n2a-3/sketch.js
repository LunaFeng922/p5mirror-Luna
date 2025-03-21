let balls = [];

function setup() {
  createCanvas(400, 400);
  background(50);
}

function draw() {
   background(50);
 // if (mouseIsPressed){
  balls.push(new Ball(mouseX, mouseY,random(10,20)));
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.move();
    b.display();
  }
  while (balls.length>100){
    balls.splice(0,1);//index,howMany
  }
  text(balls.length,10,20);
 // }
}

class Ball {
  constructor(x, y,dia) {
    this.x = x;
    this.y = y;
     this.dia = dia;
    this.xSpd = random(-2, 2);
    this.ySpd = random(-2, 2);
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  display() {
    ellipse(this.x, this.y, this.dia, this.dia);
  }
}
