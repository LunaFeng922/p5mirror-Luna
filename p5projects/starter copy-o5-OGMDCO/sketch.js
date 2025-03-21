const sound = new SimplePlayer("sounds/blip.wav");
sound.toDestination();//sound to the speaker

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
}

function mouseClicked(){
  sound.start();
}