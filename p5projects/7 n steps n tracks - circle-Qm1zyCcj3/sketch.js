// INTERFACE
let playButton;
let tempoSlider;

// Sequencer
//let bpm = 60;
let timeSignature = [3, 4];
let nMeasures = 2;
function nSteps() {
  return nMeasures * timeSignature[0];
}
let currentStep;

let cells = [];

// Sound
let kit;
let drumNames = ["hho", "hh", "snare", "kick"];
let nTracks = drumNames.length;
kit = new Tone.Players({
  kick: "/samples/505/kick.mp3",
  snare: "/samples/505/snare.mp3",
  hh: "/samples/505/hh.mp3",
  hho: "/samples/505/hho.mp3",
});
kit.toDestination();
Tone.Transport.scheduleRepeat(onBeat, "3n");

// Audio playback loop
function onBeat(time) {
  let pos = Tone.Transport.position.split(":");
  let measure = int(pos[0]);
  let beat = int(pos[1]);
  currentStep = (measure * timeSignature[0] + beat) % nSteps();
  let velocity = 0.5;

  for (let track = 0; track < nTracks; track++) {
    if (cells[track][currentStep]) {
      let hh = kit.player(drumNames[track]);
      hh.start(time);
    }
  }
}

// Graphics
let w = 60;
let gray;
let colors = ["#999999", "#909090", "#707070", "#505050", "#303030"];

let lastPosition = 0;

function setup() {
  createCanvas(480, 480);

  playButton = createButton("play");
  playButton.mouseClicked(togglePlay);

  tempoSlider = createSlider(20, 240, 160);
  tempoSlider.input(updateTempo);

  cellWidth = width / nSteps();
  cellHeight = height / nTracks;
  gray = color(178, 178, 188);

  // Initialize all sequencer cells.ON: 1. OFF: 0.
  for (let track = 0; track < nTracks; track++) {
    cells[track] = [];
    for (let step = 0; step < nSteps(); step++) {
      cells[track][step] = 0;
    }
  }
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
      let f = track * c;

      stroke(0);
      if (cells[track - 1][step - 1] == 1) {
        fill(f);
      } else {
        fill(255);
      }
      arc(width / 2, height / 2, diameter, diameter, prevAngle, angle, PIE);
    }
    prevAngle = angle;
  }

  // Highlight current step
  fill(0, 200, 200, 50);
  arc(
    width / 2,
    height / 2,
    width,
    width,
    a * currentStep,
    a * (currentStep + 1)
  );
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
  if (Tone.Transport.state === "started") {
    lastPosition = Tone.Transport.position;
    Tone.Transport.stop();
    playButton.html("play");
  } else {
    Tone.start().then(() => {
      Tone.Transport.position = lastPosition;
      Tone.Transport.start();
      playButton.html("stop");
    });
  }
}

function updateTempo() {
  Tone.Transport.bpm.rampTo(tempoSlider.value());
}


Tone.loaded().then(() => {
  console.log("Loaded.");
});
