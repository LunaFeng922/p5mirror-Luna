let angle1 = 0;
let angle2 = 0;
let angle3 = 0;
let s1 = 0.1;
let s2 = 0.5;
let e = 0.1;
let r;
let g;
let b;
let a;
let c;
let w1 = 200;
let w2;

function setup() {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  translate(width / 2, height / 2);

  //white lines
  push();
  angle1 = angle1 + 0.1 + 36;
  stroke(255);
  rotate(radians(angle1));
  strokeWeight(1);
  line(0, 0, 0, 100);
  pop();

  //red outline of the eye
  push();
  angle1 = angle1 + 0.01;
  rotate(radians(angle1));
  strokeWeight(15);
  stroke(150, 0, 0, 90);
  point(0, w1);
  pop();

  //red line that will pop up with the movement of the mouse
  push();
  angle1 = angle1 + 0.01;
  w2 = lerp(w1, mouseX, 0.8);
  rotate(radians(angle1));
  strokeWeight(2);
  stroke(150, 0, 0, 90);
  point(0, w2);
  pop();

  //color at four corners representing Destiny of the Uchiha Clan
  push();
  r = random(200 - 5 * e, 255 - 5 * e);
  g = random(200 - 3 * e, 255 - 3 * e);
  b = random(200 - 2 * e, 255 - 2 * e);
  a = random(10, 50);
  angle1 = angle1 + 0.1 + 36;
  stroke(r, g, b, a);
  rotate(radians(angle1));
  strokeWeight(100);
  point(0, 250);
  pop();

  //the "()" patterns in the middle
  push();
  s1 = constrain(mouseX * 0.005, 1, 2);
  angle2 = angle2 + 60;
  c = map(mouseX, 0, width, 0, 100);
  stroke(0);
  strokeWeight(3);
  fill(200, 0, 0, c);
  rotate(radians(angle2));
  beginShape();
  curveVertex(0, -100);
  curveVertex(-30, 0);
  curveVertex(0, 100);
  curveVertex(30, 0);
  curveVertex(0, -100);
  endShape();
  beginShape();
  curveVertex(0, 100);
  curveVertex(-30, 0);
  curveVertex(0, -100);
  curveVertex(30, 0);
  curveVertex(0, 100);
  endShape();
  scale(s1);
  beginShape();
  curveVertex(0, -100);
  curveVertex(-30, 0);
  curveVertex(0, 100);
  curveVertex(30, 0);
  curveVertex(0, -100);
  endShape();
  beginShape();
  curveVertex(0, 100);
  curveVertex(-30, 0);
  curveVertex(0, -100);
  curveVertex(30, 0);
  curveVertex(0, 100);
  endShape();
  pop();

  //the black hole in the middle
  push();
  noStroke();
  fill(0);
  circle(0, 0, 20);
  pop();

  //tomoes
  push();
  angle3 = angle3 + 30;
  rotate(radians(angle3));
  e = e + 0.1;
  noStroke();
  noFill();
  beginShape();
  curveVertex(0, -158);
  curveVertex(0, -158);
  curveVertex(-10, -145);
  curveVertex(-12, -142);
  curveVertex(-13, -140);
  curveVertex(-16, -129);
  curveVertex(-13, -119);
  curveVertex(-6, -114);
  curveVertex(0, -113);
  curveVertex(5, -114);
  curveVertex(11, -119);
  curveVertex(13, -129);
  curveVertex(9, -136);
  curveVertex(5, -138);
  curveVertex(2, -139);
  curveVertex(-1, -139);
  curveVertex(-5, -138);
  curveVertex(-6, -145);
  curveVertex(0, -158);
  curveVertex(0, -158);
  endShape();
  scale(s2);
  fill(200, 200 - e, 200 - e, e);
  beginShape();
  curveVertex(0, -158);
  curveVertex(0, -158);
  curveVertex(-10, -145);
  curveVertex(-12, -142);
  curveVertex(-13, -140);
  curveVertex(-16, -129);
  curveVertex(-13, -119);
  curveVertex(-6, -114);
  curveVertex(0, -113);
  curveVertex(5, -114);
  curveVertex(11, -119);
  curveVertex(13, -129);
  curveVertex(9, -136);
  curveVertex(5, -138);
  curveVertex(2, -139);
  curveVertex(-1, -139);
  curveVertex(-5, -138);
  curveVertex(-6, -145);
  curveVertex(0, -158);
  curveVertex(0, -158);
  endShape();
}
