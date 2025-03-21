// Sequencer
let bpm = 80;
let timeSignature = [4, 4];
let nMeasures = 4;
function nSteps() {
  return nMeasures * timeSignature[0];
}
let currentStep;

let cells = [];

let playButton;

var tempoSlider;

// Sound
let player;
let baseOctave = 1;
let numberOfOctaves = 4;
let nTracks = 7 * numberOfOctaves; // a total of 28 rows
var noteNames = ["C", "D", "E", "F", "G", "A", "B", "C"];
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
updateTempo(bpm);

// Audio playback loop
function onBeat(time) {
  let pos = Tone.Transport.position.split(":");
  let measure = int(pos[0]);
  let beat = int(pos[1]);
  currentStep = (measure * timeSignature[0] + beat) % nSteps();
  let velocity = 0.5;

  for (let track = 0; track < nTracks; track++) {
    if (cells[track][currentStep]) {
      // flip 'track': the bottom track should have the lowest note
      // notePos gives is the 'row' number in the grid - from 0 to 27
      let notePos = nTracks - 1 - track;
      // the first 7 notes are in octave 0 (i.e. 6/7 = 0);
      // the second 7 notes are in octave 1 (i.e. 13/7 = 1;
      let octave = baseOctave + floor(notePos / 7);
      // Modullo gives us the position within the 7-note scale,
      // which we can use to retrieve the name of the note (the A in A2)
      let noteName = noteNames[notePos % 7];
      // construct the pitch name in scientific notation
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
  createCanvas(240 * nMeasures, 480);

  colorMode(HSB);
  gray = color(0, 0, 0);

  w = width / nSteps();
  h = height / nTracks;

  // Load color array
  for (let i = 1; i < nSteps(); i++) {
    colors[i] = colors[i - 1] + 360 / (nSteps() - 1);
  }

  // Initialize all sequencer cells.ON: 1. OFF: 0.
  for (let track = 0; track < nTracks; track++) {
    cells[track] = [];
    for (let step = 0; step < nSteps(); step++) {
      cells[track][step] = 0;
    }
  }

  playButton = createButton("play");
  playButton.position(240 * nMeasures + 50, 10);
  playButton.mouseClicked(togglePlay);

  tempoLabel = createSpan("Reverb");
  tempoLabel.style("color", "white");
  tempoLabel.position(tempo.x - 40, tempoSlider.y);
  tempoSlider = createSlider(20, 240, 60);
  tempoSlider.position(240 * nMeasures + 50, 50);
  tempoSlider.input(updateTempo);
}

function draw() {
  background(0);

  // Draw cells that are on
  for (let step = 0; step < nSteps(); step++) {
    for (let track = 0; track < nTracks; track++) {
      if (cells[track][step] == 1) {
        let notePos = nTracks - 1 - track;
        let col = colors[notePos % 7];
        fill(col, 80, 90);
        rect(step * w, track * h, w, h);
      }
    }
  }

  // // Draw horizontal lines
  // stroke(gray);
  // for (let i = 0; i <= nTracks; i++) {
  //   let y = i * h;
  //   line(0, y, width, y);
  // }

  // Draw vertical lines
  for (let i = 0; i <= nSteps(); i++) {
    //     // Thicker line for first beat (which marks the start of the measure)
    //     if (i % timeSignature[0] == 0) {
    //       strokeWeight(1);
    //       stroke(234, 30, 83, 60);
    //     } else {
    //       stroke(gray);
    //       strokeWeight(0.5);
    //     }

    //     line(i * w, 0, i * w, height);

    // Highlight the step that is playing
    if (i == currentStep && Tone.Transport.state == "started") {
      stroke(255);
      line((i + 0.5) * w, 0, (i + 0.5) * w, height);
    }
  }
}

function mousePressed() {
  // Determine which cell the mouse is on
  let i = floor(mouseX / w);
  let j = floor(mouseY / h);
  // Toggle cell on/off
  if (i >= 0 && i < nSteps() && j >= 0 && j < nTracks) {
    cells[j][i] = !cells[j][i];
  }
}

// // Once all audio files have been loaded, start the Tone playhead
// Tone.loaded().then(function () {
//   console.log("loaded");
//   Tone.Transport.start();
// });

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

function updateTempo() {
  if (tempoSlider) {
    Tone.Transport.bpm.rampTo(tempoSlider.value(), 0.1);
  }
}
