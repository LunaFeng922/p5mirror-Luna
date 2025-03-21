let x =0;
let y =0;
function setup() {
  createCanvas(400, 400);


}

function draw() {
    background(0);
  x = lerp(x,mouseX,0.2);
   y = lerp(y,mouseY,0.2);
  circle(x,y,30);
}