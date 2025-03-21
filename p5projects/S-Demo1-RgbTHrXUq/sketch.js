let angle=0;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  noFill(); 
translate(width/2,height/2);
   angle=angle+0.1+54;
//rotate(radians(angle));
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
scale(0.5,0.8);
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
rotate(radians(-54));
}