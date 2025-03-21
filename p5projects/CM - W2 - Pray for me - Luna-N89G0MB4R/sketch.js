//*Play with sliders first!
//**Play with reverbslider after vocal coming out;
//***Click mouse then press "b" to see what happen;
//****Pray for me & all the best；

let loaded = false;

const bible = new Tone.Player({
  url: "loops/Bible.MP3",
  loop: true,
});
bible.toDestination();

let trackNames = ["Bass", "Drum", "Melody", "Rain", "Vocal"];

let tracks = [];
let playButton;
let reverb;
let reverbSlider;

function preload() {
  girl = loadImage("Girl.PNG");
  nun = loadImage("Nun.PNG");
}

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);
  noStroke();

  reverb = new Tone.Reverb({ decay: 2, wet: 1 });
  reverb.toDestination();

  for (let i = 0; i < trackNames.length; i++) {
    tracks[i] = new Track(i, trackNames[i], "stems/" + trackNames[i] + ".mp3");

    if (trackNames[i] === "Vocal") {
      tracks[i].player.connect(reverb);
    }
  }

  playButton = select("#play");
  playButton.mousePressed(play);

  Tone.loaded().then(function () {
    loaded = true;
    select("#play").removeAttribute("disabled");
  });

  reverbSlider = createSlider(0, 1, 1, 0.01);
  reverbSlider.position(width / 2, height + 24);
  reverbSlider.input(updateReverb);
  reverbLabel = createSpan("Reverb");
  reverbLabel.style("color", "white");
  reverbLabel.position(reverbSlider.x + 40, reverbSlider.y + 85);
}

function updateReverb() {
  let sliderValue = reverbSlider.value();
  reverb.wet.rampTo(sliderValue, 0.1);
}

function draw() {
  background(0);

  let wetValue = reverb.wet.value;

  //class track
  for (let i = 0; i < tracks.length; i++) {
    tracks[i].draw(wetValue);
  }

  //girl
  let gS = map(wetValue, 1, 0, 200, 350);
  let gA = map(wetValue, 1, 0, 0, 255);

  push();
  translate(width / 2 - gS / 2, height / 2.5);
  tint(255, gA);
  image(
    girl,
    random(-2, 2),
    random(-(1 - wetValue) * 5, (1 - wetValue) * 5),
    gS,
    gS
  );
  pop();

  //nun
  push();
  translate(500, height / 3);
  if (bible.state === "started") {
    tint(255, random(-1, 2));
  } else {
    tint(255, 0);
  }
  image(nun, 0, 0, 230, 250);
  pop();

  push();
  translate(320, height / 3.5);
  scale(-1, 1);
  if (bible.state === "started") {
    tint(255, random(-1, 2));
  } else {
    tint(255, 0);
  }
  image(nun, 0, 0, 300, 350);
  pop();
}

function play() {
  Tone.start();
  for (let i = 0; i < tracks.length; i++) {
    tracks[i].player.start();
  }
}

//trigger bible sound
function keyTyped() {
  if (loaded) {
    if (key == "b") {
      if (bible.state == "stopped") {
        bible.start();
      } else {
        bible.stop();
      }
    }
  }
}
