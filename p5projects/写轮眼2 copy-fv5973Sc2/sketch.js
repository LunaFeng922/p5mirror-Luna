let angle1=0;
let angle2=0;
let s= 0.1;
function setup() {
  createCanvas(400, 400);
    background(255,0,0);
}

function draw() {
translate(width/2,height/2);
  push();
angle1=angle1+0.1+36;
fill(255,0,255); 
rotate(radians(angle1))
strokeWeight(1);
point(0,50);
pop();

push();
angle1=angle1+0.1+36;
fill(255,0,255); 
rotate(radians(angle1))
strokeWeight(100);
point(0,250);
pop();

push();
s=s+0.1;
angle2=angle2+36;
noFill(); 
rotate(radians(angle2));
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
pop();
}