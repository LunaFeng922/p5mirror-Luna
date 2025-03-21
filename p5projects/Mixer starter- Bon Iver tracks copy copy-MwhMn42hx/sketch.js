let players = [];
let sliders = [];

let trackNames = [
  "stems/blobtower.mp3",
  "stems/brazen_mo.mp3",
  "stems/breezy_point_rd.mp3",
  "stems/lower_long_lake.mp3",
];

for (let i = 0; i < 4; i++) {
  players[i] = new Tone.Player({
    url: trackNames[i],
    autostart: true,
  }).toDestination();
}

function setup() {
  noCanvas();

  //for each player
  for (let i in players) {
    sliders[i] = createSlider(-60, 0);
    sliders[i].id = i;
    sliders[i].input(volumeInput);
  }

  // create a slider
  // 0: neutral
  // -6db: half of the volume
  // - 12db: quarter of the volume
}

function volumeInput() {
  // connect the value of the slider to the volume of the track
  // player.volume.value = this.value();
  console.log(this.id);
  players[this.id].volume.rampTo(this.value());

  // console.log(this.value());
}

function draw() {
  background(220);
}

function keyTyped() {
  if (key == "s") {
    players[0].volume.rampTo(0);
  } else if (key == "a") {
    players[0].volume.rampTo(-15);
  }
}
