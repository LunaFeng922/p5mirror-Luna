// INTERFACE
let playButton;
let tempoSlider;

// Use these two lines to change your pattern.
// 1 is ON; 0 is OFF
let cells = [
  [0, 1, 0, 1], //cells[0] holds the snare pattern
  [1, 0, 1, 0], //cells[1] holds the kick pattern
];

// SOUNDS
const kit = new Tone.Players({
  kick: "samples/505/kick.mp3",
  snare: "samples/snare.mp3",
}).toDestination();

Tone.Transport.bpm.value = 160;
const repeatEvent = new Tone.Loop(playBeat, "4n");

function playBeat(time) {
  let beat = Math.floor(Tone.Transport.position.split(":")[1]);

  if (cells[0][beat] == 1 && Math.random() < 0.4) {
    let vol = Math.random() * 2 - 10;
    kit.player("snare").volume.rampTo(vol);
    kit.player("snare").start(time);
  }
  if (cells[1][beat] == 1) {
    let vol = Math.random() * 5 - 10;
    kit.player("kick").volume.rampTo(vol);
    kit.player("kick").start(time);
  }
}

function setup() {
  playButton = createButton("play");
  playButton.mouseClicked(togglePlay);

  tempoSlider = createSlider(20, 240, 160);
  tempoSlider.input(updateTempo);

  createCanvas(400, 400);
  noStroke();
  let nTracks = 2;
  let nSteps = 4;

  let d = width / nTracks; // diameter unit
  let a = TWO_PI / nSteps; // angle unit
  let c = 50; // color unit

  let prevAngle = 0;
  let angle;
  for (let step = 1; step <= nSteps; step++) {
    for (let track = nTracks; track > 0; track--) {
      let diameter = d * track;
      angle = a * step;
      let f = track * c;

      stroke(0);
      fill(f);
      arc(width / 2, height / 2, diameter, diameter, prevAngle, angle, PIE);
    }
    prevAngle = angle;
  }
}

function draw() {
  background(255);
  let w = 60;

  // Draw grid
  let nTracks = 2;
  let nSteps = 4;

  let d = width / nTracks; // diameter unit
  let a = TWO_PI / nSteps; // angle unit
  let c = 50; // color unit

  let prevAngle = 0;
  let angle;
  for (let step = 1; step <= nSteps; step++) {
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
  let beat = int(Tone.Transport.position.split(":")[1]);
  arc(width / 2, height / 2, width, width, a * beat, a * (beat + 1));
}

function togglePlay() {
  if (Tone.Transport.state === "started") {
    Tone.Transport.stop();
    playButton.html("play");
  } else {
    Tone.start().then(() => {
      Tone.Transport.start();
      repeatEvent.start(0);
      playButton.html("stop");
    });
  }
}

function updateTempo() {
  Tone.Transport.bpm.rampTo(tempoSlider.value());
  console.log("Current Tempo: " + Tone.Transport.bpm.value);
}

Tone.loaded().then(() => {
  console.log("All samples loaded.");
});
