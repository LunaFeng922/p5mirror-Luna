// INTERFACE
let playButton;
let tempoSlider;

// Sequencer
//let bpm = 60;
let timeSignature = [8, 4];
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
Tone.Transport.scheduleRepeat(onBeat, "8n");

// Audio playback loop
function onBeat(time) {
  let pos = Tone.Transport.position.split(":");
  let measure = int(pos[0]);
  let beat = int(pos[1]);
  let sixteenth = int(pos[2]);
  currentStep = (measure * timeSignature[0] + beat * 2 + sixteenth / 2) % nSteps();
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

//stay unmoved when stop
let lastPosition = 0;

function setup() {
  createCanvas(480, 240);

  playButton = createButton("play");
  playButton.mouseClicked(togglePlay);

  tempoSlider = createSlider(20, 240, 130);
  tempoSlider.input(updateTempo);

  cellWidth = width / nSteps();
  cellHeight = height / nTracks;
  gray = color(178, 178, 188);

  for (let track = 0; track < nTracks; track++) {
    cells[track] = [];
    for (let step = 0; step < nSteps(); step++) {
      cells[track][step] = 0;
    }
  }
}

function draw() {
  background(255);

  stroke(gray);
  for (let i = 0; i <= nTracks; i++) {
    let y = i * cellHeight;
    line(0, y, width, y);
  }
  for (let i = 0; i <= nSteps(); i++) {
    if (i % timeSignature[0] == 0) {
      strokeWeight(1);
      stroke(234, 30, 83, 60);
    } else {
      stroke(gray);
      strokeWeight(0.5);
    }
    let x = i * cellWidth;
    line(x, 0, x, height);
  }

  for (let track = 0; track < nTracks; track++) {
    for (let step = 0; step < nSteps(); step++) {
      if (cells[track][step]) {
        fill(100);
      } else {
        fill(255);
      }
      rect(step * cellWidth, track * cellHeight, cellWidth, cellHeight);
    }
  }

  fill(234, 30, 83, 60);
  rect(currentStep * cellWidth, 0, cellWidth, height);
}

function mousePressed() {
  let i = floor(mouseX / cellWidth);
  let j = floor(mouseY / cellHeight);

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
