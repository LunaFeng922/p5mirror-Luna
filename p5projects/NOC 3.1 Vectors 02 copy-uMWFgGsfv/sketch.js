let a, b;

function setup() {
  createCanvas(400, 400);
  background(220);
  
  a = createVector(100, 100);
  b = createVector(200, 250);
  
  //console.log( a.toString() );
  circle(a.x, a.y, 10);
  circle(b.x, b.y, 10);
  
  b.sub(a); // target - currPos
  b.mult(0.50);
  drawVector(b, a.x, a.y);  
}

function draw() {
  //
}

function drawVector(vector, x, y) {
  //vector.mult(10);
  
  push();
  translate(x, y);
  strokeWeight(2);
  stroke(0, 0, 255);
  line(0, 0, vector.x, vector.y);
  strokeWeight(5);
  point(vector.x, vector.y);
  pop();
}



