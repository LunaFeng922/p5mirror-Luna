function setup() {
  createCanvas(400, 400);
  
  //textFont('Courier New');
  
  //textFont('Long Cang');
  
  textAlign(CENTER);
  textSize(30);
}

function draw() {
  background(220);
  push();
  textFont('Noto Serif SC');
  text("但眼泪不能当饭", width/2, height/1.5);
  pop();
  
  push();
  textFont('Alike')
  text("Why You Cry?", width/2, height/2);
  pop();
}