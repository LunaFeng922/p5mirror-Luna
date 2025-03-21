let angle=0;
let x =0;
let y =0;
let w =0;
let h =0;
function setup() {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  let r = random(0,200);
  let g = random(0,100);
  let b = random(0,200);
  let a = random(0,60);
  angle=angle+0.1+54;
  x=x+0.1
  y=y+0.2
  w=w+0.1;
  h=h+0.2;
  translate(width/2,height/2);
  rotate(radians(angle));
  //rectMode(CENTER);
  fill(r,g,b,a);
  noStroke();
  //rect(x,y,w,h);
  // scale(0.5, 0.5);
  //rect(x,y,w);
  translate(x, y);
  translate(p5.Vector.fromAngle(millis() / 2000, 40));
  triangle(x,y, x-10, y-10, x+10, y-10);
  scale(0.5, 0.5);
  triangle(x,y, x-10, y-10, x+10, y-10);
  //arc(30, 30, 50, 50, 0, HALF_PI);
  //scale(0.1, 0.1);
  //arc(50, 50, 50, 50, 0, HALF_PI);
}
function keyPressed() {
  if (key == "s" || key == "S") {
    save("sketch.png");
  }
}
