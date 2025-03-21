// Sequencer
let bpm = 60;
let timeSignature = [4, 4];
let nMeasures = 2;
function nSteps() {
  return nMeasures * timeSignature[0];
}
let currentStep;

let cells = [];

// Sound
let player;
var noteNames = ["A1", "B1", "C2", "D2", "E2", "F2", "G2", "A2"];
let nTracks = noteNames.length;
player = new Tone.Sampler({
  A1: "samples/casio/A1.mp3",
  // "B1" : "samples/casio/B1.mp3",
  C2: "samples/casio/C2.mp3",
  // "D2" : "samples/casio/D2.mp3",
  E2: "samples/casio/E2.mp3",
  // "F2" : "samples/casio/F2.mp3",
  G2: "samples/casio/G2.mp3",
  // "A2" : "samples/casio/A2.mp3"
});
player.toDestination();
Tone.Transport.scheduleRepeat(onBeat, "4n");

// Audio playback loop
function onBeat(time) {
  let pos = Tone.Transport.position.split(":");
  let measure = int(pos[0]);
  let beat = int(pos[1]);
  currentStep = (measure * timeSignature[0] + beat) % nSteps();
  let velocity = 0.5;

  // replace drumNames with noteNames
  for (let track = 0; track < nTracks; track++) {
    if (cells[track][currentStep]) {
      //let note = noteNames[track]; //but we want the first note in the bottom
      let note = noteNames[noteNames.length - track - 1];
      player.triggerAttack(note, time);
    }
  }
}

// Graphics
let w = 60;
let gray;
let colors = ["#999999", "#909090", "#707070", "#505050", "#303030"];

function setup() {
  createCanvas(480, 480);
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

  fill(100);
  noStroke();

  // Draw cells that are on
  for (let step = 0; step < nSteps(); step++) {
    for (let track = 0; track < nTracks; track++) {
      if (cells[track][step] == 1) {
        fill(colors[track]);
        rect(step * w, track * w, w, w);
      }
    }
  }

  // Draw horizontal lines
  stroke(gray);
  for (let i = 0; i <= nTracks; i++) {
    let y = i * w;
    line(0, y, width, y);
  }

  // Draw vertical lines
  for (let i = 0; i <= nSteps(); i++) {
    // Thicker line for first beat (which marks the start of the measure)
    if (i % timeSignature[0] == 0) {
      strokeWeight(1);
      stroke(234, 30, 83, 60);
    } else {
      stroke(gray);
      strokeWeight(0.5);
    }

    line(i * w, 0, i * w, height);

    // Highlight the step that is playing
    if (i == currentStep && Tone.Transport.state == "started") {
      fill(234, 30, 83, 60);
      noStroke();
      rect(i * w, 0, w, height);
    }
  }
}

function mousePressed() {
  // Determine which cell the mouse is on
  let i = floor(mouseX / w);
  let j = floor(mouseY / w);
  // Toggle cell on/off
  cells[j][i] = !cells[j][i];
}

// Once all audio files have been loaded, start the Tone playhead
Tone.loaded().then(function () {
  console.log("loaded");
  Tone.Transport.start();
});
