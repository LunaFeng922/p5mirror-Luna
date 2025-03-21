function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  stroke(0, 0, 0);
  fill(255, 255, 255);
  beginShape();
  vertex(125, 136);
  vertex(93, 99);
  vertex(33, 169);
  vertex(73, 242);
  vertex(106, 214);
  vertex(119, 311);
  vertex(322, 306);
  vertex(293, 215);
  vertex(334, 238);
  vertex(373, 175);
  vertex(317, 100);
  vertex(238, 124);
  vertex(125, 136);
  // add vertices here!
  endShape(CLOSE);

  beginShape();

  vertex(140, 206);
  vertex(150, 233);
  vertex(189, 226);
  vertex(182, 195);
  endShape(CLOSE);

  beginShape();

  vertex(225, 191);
  vertex(225, 223);
  vertex(269, 215);
  vertex(264, 183);
  endShape(CLOSE);
  
  beginShape();
  vertex(200, 249);
  vertex(200, 258);
  vertex(220, 257);
  vertex(217, 248);
  endShape(CLOSE);

}

function mousePressed() {
  console.log("vertex(" + mouseX + "," + mouseY + ");");
}

function keyPressed() {
  if (key == "s" || key == "S") {
    save("sketch.png");
  }
}
