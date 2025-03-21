//Credit: finding references in NOC W09 Example codes by Prof.Moon.

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0,50);
  translate(width/2,height/2);
  noFill();
  fur(20,0, 20, 0);
}

function fur(x, y, len, deg) {
  let angle = radians(deg);
  let targetX = x + cos(angle) * len*random(0.5,1);
  let targetY = y + sin(angle) * len*random(0.5,1);
  let thickness = map(len, 20, 15, 2, 0.5);
  stroke(255,5*len);
  strokeWeight(thickness);
  beginShape();
  rotate(15);
  curveVertex(x, y);
  curveVertex(x, y);
  curveVertex((targetX+x)/2+3*sin(mouseX), (targetY+y)/2);
  curveVertex(targetX, targetY);
  curveVertex(targetX, targetY);
  endShape();
  
  // EXIT CONDITION
  len *= 0.95;
  if (len > 16) {
    fur(targetX, targetY, len, deg + mouseX);
    fur(-targetX, -targetY, len, deg + mouseX);
    fur(targetX, targetY, len, -deg - mouseX);
    fur(targetX, targetY, len, -deg + mouseX);
  }
}