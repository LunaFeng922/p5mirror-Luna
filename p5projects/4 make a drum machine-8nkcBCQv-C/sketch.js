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
  let beat = Tone.Transport.position.split(":")[1];

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
