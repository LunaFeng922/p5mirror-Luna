function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);



}

function mousePressed() {
  console.log("vertex(" + mouseX + "," + mouseY + ");");
}

function keyPressed() {
  if (key == "s" || key == "S") {
    save("sketch.png");
  }
}
