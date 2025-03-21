let x=[];
let y=[]; // pos
let xSpd=[];
let ySpd=[] // speed
let dia=[]; // size

function setup() {
  createCanvas(500, 400);
  
  // setup!
  x[i] = width/2;
  y[i]= height/2;
  xSpd[i] = random(-1, 1);
  ySpd[i] = random(-1, 1);
  dia [i]= random(30, 80);
  
  x1 = width/2;
  y1 = height/2;
  xSpd1 = random(-1, 1);
  ySpd1 = random(-1, 1);
  dia1 = random(30, 80);
  
  x2 = width/2;
  y2 = height/2;
  xSpd2 = random(-1, 1);
  ySpd2 = random(-1, 1);
  dia2 = random(30, 80);
}

function draw() {
  background(220);
  
  // move
  x = x + xSpd;
  y = y + ySpd;
  
  // display
  circle(x, y, dia);
  
  // move
  x1 = x1 + xSpd1;
  y1 = y1 + ySpd1;
  
  // display
  circle(x1, y1, dia1);
  
  // move
  x2 = x2 + xSpd2;
  y2 = y2 + ySpd2;
  
  // display
  circle(x2, y2, dia2);
}