let angle=0;
let s= 0.1;
function setup() {
  createCanvas(400, 400);
    background(255,0,0);
}

function draw() {
s=s+0.1;
angle=angle+36;

  noFill(); 
translate(width/2,height/2);
rotate(radians(angle));
beginShape();
curveVertex(0,-100); 
curveVertex(0,-100); 
curveVertex(-30,-15); 
curveVertex(-20,20); 
curveVertex(20,20); 
curveVertex(30,-15); 
curveVertex(0,-100); 
curveVertex(0,-100); 
endShape();
scale(s,0.8)
beginShape();
curveVertex(0,-100); 
curveVertex(0,-100); 
curveVertex(-30,-15); 
curveVertex(-20,20); 
curveVertex(20,20); 
curveVertex(30,-15); 
curveVertex(0,-100); 
curveVertex(0,-100); 
endShape();
}