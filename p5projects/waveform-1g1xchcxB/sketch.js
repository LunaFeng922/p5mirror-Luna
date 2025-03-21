const sound = new Tone.UserMedia();
sound.open();
let analyzer = new Tone.Waveform(256);

sound.toDestination();
sound.connect(analyzer);

let loaded = false;
let face;

function preload(){
   face = loadImage("assets/myImage.jpg");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (loaded) {
    background(0,50);
    let waveform = analyzer.getValue();
    stroke(255,50);
    noFill();
    strokeWeight(5);
    beginShape();
    for (let i = 0; i < waveform.length; i++) {
      let index = i;
      let value = waveform[i];
      x = map(index, 0, waveform.length, 0, width);
      y = map(value, -1, 1, height, 0);
      vertex(x, y);
    }
    endShape();
  } else {
    background(220);
    text("loading...", 20, 20);
  }
  //console.log(analyzer.getValue());
}

function mouseClicked() {
  if (loaded) {
    sound.start();
  }
}

Tone.loaded().then(function () {
  loaded = true;
});
