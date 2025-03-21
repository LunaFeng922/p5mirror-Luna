// Interface
let playButton;
let tempoButtons = [];
let randomPatternButton;
let clearButton;
let bpmValues = [40, 80, 120, 160, 240];

// Sequencer
let timeSignature = [8, 4];
let nMeasures = 2;
function nSteps() {
  return nMeasures * timeSignature[0];
}
let currentStep;

let cells = [];

// Sound
let kit;
let breathTracks = [
  "嘘 - XU",
  "呵 - HE",
  "呼 - HU",
  "嘶 - SI",
  "吹 - CHUI",
  "嘻 - XI",
];
let movementTracks = [
  "拍手 - CLAP",
  "微蹲 - SQUAT",
  "踢腿 - KICK",
  "跺脚 - STAMP",
];
let drumNames = [...breathTracks, ...movementTracks];
let nTracks = drumNames.length;
kit = new Tone.Players({
  "嘘 - XU": "/samples/505/XU.MP3",
  "呵 - HE": "/samples/505/HE.MP3",
  "呼 - HU": "/samples/505/HU.MP3",
  "嘶 - SI": "/samples/505/SI.MP3",
  "吹 - CHUI": "/samples/505/CHUI.MP3",
  "嘻 - XI": "/samples/505/XI.MP3",
  "拍手 - CLAP": "/samples/505/hho.mp3",
  "微蹲 - SQUAT": "/samples/505/hh.mp3",
  "踢腿 - KICK": "/samples/505/snare.mp3",
  "跺脚 - STAMP": "/samples/505/kick.mp3",
});
kit.toDestination();
Tone.Transport.scheduleRepeat(onBeat, "8n");

function preload() {
  clap = loadImage("Clap.PNG");
  squat = loadImage("Squat.PNG");
  kick = loadImage("Kick.PNG");
  stamp = loadImage("Stamp.PNG");
  xu = loadImage("Xu.PNG");
  he = loadImage("He.PNG");
  hu = loadImage("Hu.PNG");
  si = loadImage("Si.PNG");
  chui = loadImage("Chui.PNG");
  xi = loadImage("Xi.PNG");
}

// Audio playback loop
function onBeat(time) {
  let pos = Tone.Transport.position.split(":");
  let measure = int(pos[0]);
  let beat = int(pos[1]);
  let sixteenth = int(pos[2]);
  currentStep =
    (measure * timeSignature[0] + beat * 2 + sixteenth / 2) % nSteps();
  let velocity = 0.5;

  for (let track = 0; track < nTracks; track++) {
    if (cells[track][currentStep]) {
      let hh = kit.player(drumNames[track]);
      hh.start(time);
    }
  }
}

// Graphics
let cellWidth, cellHeight;
let yellow;
let orange;
let labelWidth = 200; // Space for track names

// stay unmoved when stop
let lastPosition = 0;

function setup() {
  createCanvas(1400, 700);

  playButton = createButton("开始 - PLAY");
  playButton.mouseClicked(togglePlay);

  bpmValues.forEach((bpm) => {
    let button = createButton(bpm + " BPM - 节拍");
    button.mouseClicked(() => setTempo(bpm));
    tempoButtons.push(button);
  });

  randomPatternButton = createButton("随机 - Random");
  randomPatternButton.mouseClicked(randomPattern);

  clearButton = createButton("清空 - Clear All");
  clearButton.mouseClicked(clearPattern);

  cellWidth = (width - labelWidth) / nSteps();
  cellHeight = height / nTracks;
  yellow = color(255, 200, 0);
  orange = color(255, 100, 0);

  for (let track = 0; track < nTracks; track++) {
    cells[track] = [];
    for (let step = 0; step < nSteps(); step++) {
      cells[track][step] = 0;
    }
  }
}

function draw() {
  background(255);

  stroke(255, 0, 0, 60);
  strokeWeight(0.5);
  for (let i = 0; i <= nTracks; i++) {
    let y = i * cellHeight;
    line(0, y, width, y);
  }
  for (let i = 0; i <= nSteps(); i++) {
    let x = labelWidth + i * cellWidth;
    line(x, 0, x, height);
  }

  fill(0);
  textFont("Long Cang");
  textAlign(CENTER, CENTER);
  textSize(30);
  for (let track = 0; track < nTracks; track++) {
    text(drumNames[track], labelWidth / 2, track * cellHeight + cellHeight / 2);
  }

  for (let track = 0; track < nTracks; track++) {
    for (let step = 0; step < nSteps(); step++) {
      if (cells[track][step]) {
      if (track < breathTracks.length) {
        fill(yellow); 
      } else {
        fill(orange); 
      }
    } else {
      fill(255);
    }
    rect(
      labelWidth + step * cellWidth,
      track * cellHeight,
      cellWidth,
      cellHeight
    );

      if (
        drumNames[track] === "拍手 - CLAP" &&
        cells[track][step] &&
        step === currentStep
      ) {
        image(
          clap,
          labelWidth + step * cellWidth,
          track * cellHeight,
          cellWidth,
          cellHeight
        );
      }

      if (
        drumNames[track] === "微蹲 - SQUAT" &&
        cells[track][step] &&
        step === currentStep
      ) {
        image(
          squat,
          labelWidth + step * cellWidth,
          track * cellHeight,
          cellWidth,
          cellHeight
        );
      }

      if (
        drumNames[track] === "踢腿 - KICK" &&
        cells[track][step] &&
        step === currentStep
      ) {
        image(
          kick,
          labelWidth + step * cellWidth,
          track * cellHeight,
          cellWidth,
          cellHeight
        );
      }

      if (
        drumNames[track] === "跺脚 - STAMP" &&
        cells[track][step] &&
        step === currentStep
      ) {
        image(
          stamp,
          labelWidth + step * cellWidth,
          track * cellHeight,
          cellWidth,
          cellHeight
        );
      }

      if (
        drumNames[track] === "嘘 - XU" &&
        cells[track][step] &&
        step === currentStep
      ) {
        image(
          xu,
          labelWidth + step * cellWidth,
          track * cellHeight,
          cellWidth,
          cellHeight
        );
      }

      if (
        drumNames[track] === "呵 - HE" &&
        cells[track][step] &&
        step === currentStep
      ) {
        image(
          he,
          labelWidth + step * cellWidth,
          track * cellHeight,
          cellWidth,
          cellHeight
        );
      }

      if (
        drumNames[track] === "呼 - HU" &&
        cells[track][step] &&
        step === currentStep
      ) {
        image(
          hu,
          labelWidth + step * cellWidth,
          track * cellHeight,
          cellWidth,
          cellHeight
        );
      }

      if (
        drumNames[track] === "嘶 - SI" &&
        cells[track][step] &&
        step === currentStep
      ) {
        image(
          si,
          labelWidth + step * cellWidth,
          track * cellHeight,
          cellWidth,
          cellHeight
        );
      }

      if (
        drumNames[track] === "吹 - CHUI" &&
        cells[track][step] &&
        step === currentStep
      ) {
        image(
          chui,
          labelWidth + step * cellWidth,
          track * cellHeight,
          cellWidth,
          cellHeight
        );
      }

      if (
        drumNames[track] === "嘻 - XI" &&
        cells[track][step] &&
        step === currentStep
      ) {
        image(
          xi,
          labelWidth + step * cellWidth,
          track * cellHeight,
          cellWidth,
          cellHeight
        );
      }
    }
  }

  fill(234, 30, 83, 60);
  rect(labelWidth + currentStep * cellWidth, 0, cellWidth, height);
}

function mousePressed() {
  let i = floor((mouseX - labelWidth) / cellWidth);
  let j = floor(mouseY / cellHeight);

  if (i >= 0 && i < nSteps() && j >= 0 && j < nTracks) {
    if (breathTracks.includes(drumNames[j])) {
      if (cells[j][i]) {
        cells[j][i] = 0;
      } else {
        // 在 breathTracks 内部互斥
        for (let track = 0; track < breathTracks.length; track++) {
          cells[track][i] = 0;
        }
        cells[j][i] = 1;
      }
    } else if (movementTracks.includes(drumNames[j])) {
      if (cells[j][i]) {
        cells[j][i] = 0;
      } else {
        // 在 movementTracks 内部互斥
        for (let track = 0; track < movementTracks.length; track++) {
          cells[track + breathTracks.length][i] = 0;
        }
        cells[j][i] = 1;
      }
    } else {
      cells[j][i] = !cells[j][i];
    }
  }
}

function togglePlay() {
  if (Tone.Transport.state === "started") {
    lastPosition = Tone.Transport.position;
    Tone.Transport.stop();
    playButton.html("开始 - PLAY");
  } else {
    Tone.start().then(() => {
      Tone.Transport.position = lastPosition;
      Tone.Transport.start();
      playButton.html("停止 - STOP");
    });
  }
}

function setTempo(bpm) {
  Tone.Transport.bpm.rampTo(bpm);
}

function randomPattern() {
  for (let step = 0; step < nSteps(); step++) {
    let activeBreathTrack = random(breathTracks);
    let activeMovementTrack = random(movementTracks);
    for (let track = 0; track < nTracks; track++) {
      if (breathTracks.includes(drumNames[track])) {
        cells[track][step] =
          drumNames[track] === activeBreathTrack ? int(random(2)) : 0;
      }
      if (movementTracks.includes(drumNames[track])) {
        cells[track][step] =
          drumNames[track] === activeMovementTrack ? int(random(2)) : 0;
      }
    }
  }
}

function clearPattern() {
  for (let track = 0; track < nTracks; track++) {
    for (let step = 0; step < nSteps(); step++) {
      cells[track][step] = 0;
    }
  }
}
