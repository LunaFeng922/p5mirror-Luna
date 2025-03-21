

function setup() {
  createCanvas(500, 400);

  for (let i = 0; i < 500; i++) {
    //
  }
}

function draw() {
  background(220);

  //for (let i = 0; i < x.length; i++) {
    //
  //}
}






class Ball {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.xSpd = random(-3, 3);
    this.ySpd = random(-3, 3);
    this.dia = random(5, 30);
  }
  
  display() {
    circle(this.x,this.y,this.dia);
  }
}




