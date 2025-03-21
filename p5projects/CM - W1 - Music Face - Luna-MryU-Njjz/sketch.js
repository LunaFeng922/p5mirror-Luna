//click to start!
//imagine there'sa face hidden in your keyboard~
//play with 5/8;6/7;f/j;b to see what happens ^-^;
//try pressing multiple keys at the same time!
//might want to refine to add more sounds later;

//images
let face;
let lip1;

//sounds
const toyKeyboard = new SimplePlayer("Sounds/Toy keyboard.MP3").toDestination();
const trian = new SimplePlayer("Sounds/Triangle.WAV").toDestination();
const spring1 = new SimplePlayer("Sounds/Spring1.wav").toDestination();
const drum1 = new SimplePlayer("Sounds/Drum1.wav").toDestination();
const bungo = new SimplePlayer("Sounds/Bungo.WAV").toDestination();

let loaded = false;

//toykeyboard/eyes
let analyzer1 = new Tone.Waveform(512);
toyKeyboard.connect(analyzer1);

//toykeyboard/nose
let meter1 = new Tone.Meter();
meter1.normalRange = true;
meter1.channels = 1;
toyKeyboard.connect(meter1);

//triangle/eyebrow
let analyzer2 = new Tone.FFT(256);
trian.connect(analyzer2);

//spring/wrinkle
let analyzer3 = new Tone.FFT(256);
spring1.connect(analyzer3);

//bungo/lips
let meter2 = new Tone.Meter();
meter2.normalRange = true;
meter2.channels = 1;
bungo.connect(meter2);

//drum/cheek
let analyzer4 = new Tone.FFT(256);
drum1.connect(analyzer4);

let meter3 = new Tone.Meter();
meter3.normalRange = true;
meter3.channels = 1;
drum1.connect(meter3);

function preload() {
  face = loadImage("Face.png");
  nose = loadImage("nose.png");
  lip1 = loadImage("lip.png");
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  if (loaded) {
    background(0, 50, 0);

    //trianglenose
    push();
    translate(400, 700);
    strokeWeight(8);
    stroke(200, 0, 0);
    fill(255, 165, 0);
    scale(meter1.getValue() * 100 + 1);
    triangle(0, -60, -30, 0, 30, 0);
    pop();

    //Bs
    push();
    let x = map(bungo.progress(), 0, 1, 0, 400);
    translate(-200, 500);
    textSize(200);
    fill(255);
    stroke(255);
    strokeWeight(10);
    text("B", x, 0);
    pop();

    push();
    let x2 = map(bungo.progress(), 0, 1, 0, 400);
    translate(800, 500);
    scale(-1, 1);
    textSize(200);
    fill(255);
    stroke(255);
    strokeWeight(10);
    text("B", x2 - 200, 0);
    pop();

    image(face, 0, 0, 800, 800);

    //eyes
    let waveform = analyzer1.getValue();
    push();
    let points = floor(analyzer1.getValue().length / 36);
    beginShape();
    translate(300, 400);
    for (let i = 0; i < waveform.length; i += points) {
      let phi = radians(map(i, 0, waveform.length, 0, 360));
      let radius = map(waveform[i], -1, 1, 8, width / 16);
      let x = radius * cos(phi);
      let y = radius * sin(phi);
      noStroke();
      fill(0);
      curveVertex(x, y);
    }
    endShape();

    beginShape();
    translate(200, 0);
    for (let i = 0; i < waveform.length; i += points) {
      let phi = radians(map(i, 0, waveform.length, 0, 360));
      let radius = map(waveform[i], -1, 1, 8, width / 16);
      let x = radius * cos(phi);
      let y = radius * sin(phi);
      noStroke();
      fill(0);
      curveVertex(x, y);
    }
    endShape();
    pop();

    //nose;
    push();
    translate(400, 500);
    strokeWeight(8);
    stroke(200, 0, 0);
    fill(255, 165, 0);
    scale(meter1.getValue() * 4 + 1);
    triangle(0, -60, -30, 0, 30, 0);
    pop();

    //eyebrow
    let trianfrq = map(
      constrain(analyzer2.getValue()[0], -127, 0),
      -127,
      0,
      0,
      100
    );
    //console.log(analyzer2.getValue());
    push();
    translate(300, 300);
    noStroke();
    fill(0);
    triangle(
      -60 - trianfrq * 0.5,
      5 * sin(-trianfrq),
      60 - trianfrq * 0.5,
      20 + 5 * sin(-trianfrq),
      10 * sin(-trianfrq),
      -20 - trianfrq
    );
    translate(200, 0);
    triangle(
      -60 + trianfrq * 0.5,
      20 + 5 * sin(-trianfrq),
      60 + trianfrq * 0.5,
      5 * sin(-trianfrq),
      10 * sin(trianfrq),
      -20 - trianfrq
    );
    pop();

    //wrinkle
    push();
    let springfrq = analyzer3.getValue();
    translate(380, 320);
    strokeWeight(5);
    stroke(0);
    noFill();
    beginShape();
    for (let i = 0; i < springfrq.length; i++) {
      let x1 = constrain(map(springfrq[i], -127, 0, -50, 50), 0, 10);
      let y1 = map(log(i), 0, log(springfrq.length), -50, 0);
      curveVertex(x1, y1);
    }
    endShape();
    translate(40, 0);
    beginShape();
    for (let i = 0; i < springfrq.length; i++) {
      let x2 = constrain(map(springfrq[i], -127, 0, -50, 50), 0, 10);
      let y2 = map(log(i), 0, log(springfrq.length), -50, 0);
      curveVertex(-x2, y2);
    }
    endShape();
    pop();

    //mouth
    push();
    let y = map(bungo.progress(), 0, 1, 0, 10);
    let angle = map(bungo.progress(), 0, 1, 0, -TWO_PI);
    translate(400, 600);
    rotate(angle);
    //console.log(meter2.getValue() * 100);
    image(
      lip1,
      -50 - meter2.getValue() * 50,
      y,
      100 + meter2.getValue() * 100,
      100 + meter2.getValue() * 100
    );
    rotate(-PI);
    image(
      lip1,
      -50 - meter2.getValue() * 50,
      y,
      100 + meter2.getValue() * 100,
      100 + meter2.getValue() * 100
    );
    pop();

    //cheek
    push();
    let drumfrq = map(
      constrain(analyzer4.getValue()[0], -127, 0),
      -127,
      0,
      0,
      100
    );
    strokeWeight(8);
    stroke(150, 0, 0);
    fill(255, 0, 0);
    translate(280, 520);
    ellipse(0, -drumfrq, meter3.getValue() * 100 + 50);
    translate(240, 0);
    ellipse(0, drumfrq, meter3.getValue() * 100 + 50);
    pop();

    push();
    strokeWeight(8);
    stroke(150, 0, 0);
    fill(255, 0, 0);
    translate(180, 700);
    ellipse(0, drumfrq, meter3.getValue() * 100 + 50);
    translate(440, 0);
    ellipse(0, -drumfrq, meter3.getValue() * 100 + 50);
    pop();
  } else {
    background(220);
    text("loading...", 20, 20);
  }
}

function mouseClicked() {
  if (loaded) {
    toyKeyboard.start();
  }
}

function keyTyped() {
  if (loaded) {
    if (key == "5" || key == "8") {
      trian.start();
    } else if (key == "6" || key == "7") {
      spring1.start();
    } else if (key == "f" || key == "j") {
      drum1.start();
    } else if (key == "b") {
      bungo.start();
    }
  }
}

Tone.loaded().then(function () {
  loaded = true;
});
