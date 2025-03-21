let cpVoice = new p5.Speech();

function setup() {
  createCanvas(400, 400);
  cpVoice.listVoices();
  cpVoice.setVoice("Good News");
}

function draw() {
  background(220);
}

function mousePressed(){
  cpVoice.setPitch(map(mouseX,0,width,0,2));
  cpVoice.speak("The class is over.");
}