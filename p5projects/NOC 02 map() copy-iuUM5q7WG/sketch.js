function setup() {
  createCanvas(400, 400);
  //let out = map(in, inRange1, inRange2, outRange1, outRange2);
  
  let out = map(2, 0, 5, 0, 10);
  console.log(out);
}

function draw() {
  background(220);
  let r = map (mouseX, 0, width, 0,255);
  let b = map (mouseY, 0, width, 0,255);
  fill(r,b,0);
  circle(width/2, height/2,300)
  
  
  
  
}





