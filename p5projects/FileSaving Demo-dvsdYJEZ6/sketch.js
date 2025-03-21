let rectX, rextY;
let r,g,b,a;
let x,y;

function setup() {
  createCanvas(400, 400);
  
}

function draw() { 
  r=random(0,255);
  g=random(0,255);
  b=random(0,255);
  a=random(0,100);
  rectX = random(width);
  rectY = random(height);
 x = random(50);
y = random(100);
  strokeWeight(0);
  fill(r,g,b,a);
  rect(rectX,rectY,x, y);
}

function mousePressed() {
  background(0);
}