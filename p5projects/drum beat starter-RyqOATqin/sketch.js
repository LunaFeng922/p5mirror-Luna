// Create a 120BPM beat

// Create a Players object and load the drum kit files
const kit = new Tone.Players({
  kick: "samples/505/kick.mp3",
  snare: "samples/505/snare.mp3",
  hh: "samples/505/hh.mp3",
  hho: "samples/505/hho.mp3",
});
kit.toDestination();

function setup() {
  createCanvas(200, 200);
  background(0);
}

function draw() {}

function keyPressed() {
  //sound.start();
  if (key == "k") {
    kit.player("kick").start(); //当有多个sound
  } else if (key == "s") {
    kit.player("snare").start();
  } else if (key == "h") {
    kit.player("hh").start();
  } else if (key == "o") {
    kit.player("hho").start();
  }
}
