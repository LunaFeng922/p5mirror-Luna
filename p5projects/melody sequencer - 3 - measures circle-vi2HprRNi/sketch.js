// Sequencer
let bpm = 60;
let timeSignature = [4, 4];
let nMeasures = 4;
function nSteps() {
  return nMeasures * timeSignature[0];
}

let numberOfOctaves = 2;
let nTracks = 7 * numberOfOctaves;
let baseOctave = 1;

let currentStep;
let cells = [];
let playButton;

// Sound
let player;
var noteNames = ["C", "D", "E", "F", "G", "A", "B"];

player = new Tone.Sampler({
  A1: "samples/casio/A1.mp3",
  C2: "samples/casio/C2.mp3",
  E2: "samples/casio/E2.mp3",
  G2: "samples/casio/G2.mp3",
});
player.toDestination();
Tone.Transport.scheduleRepeat(onBeat, "4n");

function onBeat(time) {
  let pos = Tone.Transport.position.split(":");
  let measure = int(pos[0]);
  let beat = int(pos[1]);
  currentStep = (measure * timeSignature[0] + beat) % nSteps();
  let velocity = 0.5;

  // If the current beat is on, play it
  for (let track = 0; track < nTracks; track++) {
    if (cells[track][currentStep]) {
      // The bottom track should have the lowest note
      let notePos = nTracks - 1 - track;
      let octave = baseOctave + floor(notePos / 7);
      let noteName = noteNames[notePos % 7];
      let pitch = noteName + octave;
      player.triggerAttack(pitch, time);
    }
  }
}

// Graphics
let w, h;
let gray;
let colors = [0];

function setup() {
  createCanvas(800, 800);
  w = width / nSteps();
  h = height / nTracks;
  colorMode(HSB);
  gray = color(0, 0, 0);

  // Load color array
  for (let i = 1; i < nTracks; i++) {
    colors[i] = colors[i - 1] + 360 / nTracks;
  }

  // Initialize all sequencer cells.ON: 1. OFF: 0.
  for (let track = 0; track < nTracks; track++) {
    cells[track] = [];
    for (let step = 0; step < nSteps(); step++) {
      cells[track][step] = 0;
    }
  }

  playButton = createButton("play");
  playButton.mouseClicked(togglePlay);
}

function draw() {
  background(255);
  let w = 60;

  let d = width / nTracks; // diameter unit
  let a = TWO_PI / nSteps(); // angle unit
  let c = 50; // color unit

  let prevAngle = 0;
  let angle;
  for (let step = 1; step <= nSteps(); step++) {
    for (let track = nTracks; track > 0; track--) {
      let diameter = d * track;
      angle = a * step;
      let f = (track % noteNames.length) * c;

      stroke(0);
      if (cells[track - 1][step - 1] == 1) {
        fill(f, 90, 90);
      } else {
        fill(255, 0, 255);
      }
      arc(width / 2, height / 2, diameter, diameter, prevAngle, angle, PIE);
    }
    prevAngle = angle;
  }

  // Highlight current step
  fill(0, 0, 0, 0.2);
  arc(
    width / 2,
    height / 2,
    width,
    width,
    a * currentStep,
    a * (currentStep + 1)
  );

  //   // Draw vertical lines
  //   for(let i = 0; i <= nSteps(); i++){

  //     // If a step is on an odd bar, draw a shading rect
  //     let beatsPerBar = timeSignature[0];
  //     let bar = floor(i / beatsPerBar);
  //     if( bar % 2 == 1 & i < nSteps()){
  //       //shade
  //       noStroke();
  //       fill(20, 0, 0, 0.1);
  //       rect(i*w, 0, w, height);
  //     }

  //     // If first beat (which marks the start of the measure)
  //     if(i % timeSignature[0] == 0){
  //       // Thicker beat line
  //       strokeWeight(2);
  //       stroke(234, 30, 83, 60);

  //     }
  //     else{
  //       stroke(gray);
  //       strokeWeight(0.5);
  //     }

  //     line(i*w, 0, i*w, height);

  // }
}

function mousePressed() {
  // 1. mouseX, mouseY (relative to top-left corner) => x, y (relative to center of canvas)
  let x = mouseX - width / 2;
  let y = mouseY - height / 2;

  // 2. x, y => polar coordinates
  let d = sqrt(pow(x, 2) + pow(y, 2)); //pithagoras
  // atan2 gives us an angle in the right quadrant, between -PI and +PI
  let a = atan2(y, x);
  // transform negative counterclockwise angles into positive clockwise angles
  if (a < 0) {
    a = TWO_PI + a;
  }

  // Determine which cell the mouse is on
  let radioUnit = width / 2 / nTracks; // diameter unit
  let angleUnit = TWO_PI / nSteps(); // angle unit

  let i = floor(a / angleUnit);
  let j = floor(d / radioUnit);

  // Toggle cell on/off
  if (i >= 0 && i < nSteps() && j >= 0 && j < nTracks) {
    cells[j][i] = !cells[j][i];
  }
}

function togglePlay() {
  if (Tone.Transport.state == "started") {
    Tone.Transport.stop();
    playButton.html("play");
  } else {
    if (player.loaded) {
      Tone.Transport.start();
      playButton.html("stop");
    }
  }
}
