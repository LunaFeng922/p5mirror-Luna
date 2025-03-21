let sineOsc;
let sqOsc;

function setup() {
  createCanvas(400, 400);
  sinOsc = new p5.Oscillator("sine");
  sqOsc = new p5.Oscillator("square");
}

function draw() {
  background(220);
}

function mousePressed() {
  sinOsc.start();
  let freq = map(mouseX, 0, width, 150, 650);
  sinOsc.freq(freq);
}

function mouseReleased() {
  sinOsc.stop();
}

function keyPressed() {
  sqOsc.start();
  let freq = map(mouseY, 0, height, 150, 650);
  sqOsc.freq(freq);
}

function keyReleased() {
  sqOsc.stop();
}
