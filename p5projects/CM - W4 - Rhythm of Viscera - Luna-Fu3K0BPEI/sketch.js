// Interface
let playButton;
let tempoButtons = [];
let randomPatternButton;
let clearButton;
let bpmValues = [20, 40, 80, 120, 160, 240];

// Sequencer
let timeSignature = [3, 4]; //My original problem was: [4,4]is fine, [3,4] doesn't work
let nMeasures = 3;
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
Tone.Transport.scheduleRepeat(onBeat, "4n");

// Graphics
let cellWidth, cellHeight;
let red;
let orange;
let labelWidth = 200;
let bodyScale = 1.0;

// Stay unmoved when stop
let lastPosition = 0;

function preload() {
  clap = loadImage("Clap.PNG");
  squat = loadImage("Squat.PNG");
  kick = loadImage("Kick.PNG");
  stamp = loadImage("Stamp.PNG");
  body = loadImage("Body.png");
}

// Audio playback loop
function onBeat(time) {
  let pos = Tone.Transport.position.split(":");
  let measure = int(pos[0]);
  //OK I think I find the problem, it's hereee:int.pos[1] is not from [0-2] it's still goes from [0-3] when I change the time signature into [3,4], which is wired. What should I change as for this??? - Then, I consult chatgpt.
  let beat = int(pos[1]);
  currentStep = (measure * timeSignature[0] + beat) % nSteps();
  //console.log(measure);
  for (let track = 0; track < nTracks; track++) {
    if (cells[track][currentStep]) {
      let hh = kit.player(drumNames[track]);
      hh.start(time);
    }
  }
}

function setup() {
  createCanvas(1400, 700);

  //chatgpt told me to add this line to prevent the system from taking [4,4] as default (ignoring my [3,4]). And it works!!!
  Tone.Transport.timeSignature = timeSignature;

  //Button

  let buttonY = 20;

  playButton = createButton("开始 - PLAY");
  playButton.position(1250, buttonY);
  playButton.mouseClicked(togglePlay);
  buttonY += 40;

  bpmValues.forEach((bpm) => {
    let button = createButton(bpm + " BPM - 拍/分");
    button.position(1250, buttonY);
    button.mouseClicked(() => setTempo(bpm));
    tempoButtons.push(button);
    buttonY += 40;
  });

  randomPatternButton = createButton("随机 - Random");
  randomPatternButton.position(1250, buttonY);
  randomPatternButton.mouseClicked(randomPattern);
  buttonY += 40;

  clearButton = createButton("清空 - Clear All");
  clearButton.position(1250, buttonY);
  clearButton.mouseClicked(clearPattern);

  cellWidth = (width - 600 - labelWidth) / nSteps();
  cellHeight = height / nTracks;

  red = color(255, 0, 0, 60);
  orange = color(255, 100, 0, 60);

  for (let track = 0; track < nTracks; track++) {
    cells[track] = [];
    for (let step = 0; step < nSteps(); step++) {
      cells[track][step] = 0;
    }
  }
}

function draw() {
  background(255, 240, 160, 60);

  //Body & Scale
  if (Tone.Transport.state === "started") {
    let scaleSpeed = Tone.Transport.bpm.value / 120;
    bodyScale = 1.0 + sin(frameCount * 0.16 * scaleSpeed) * 0.1;
  } else {
    bodyScale = 1.0;
  }
  push();
  translate(1100, 350);
  scale(bodyScale);
  image(body, -300, -300, 600, 600);
  pop();

  //lines & frame
  stroke(255, 0, 0, 60);
  strokeWeight(0.5);
  for (let i = 0; i <= nTracks; i++) {
    let y = i * cellHeight;
    line(0, y, width - 600, y);
  }
  for (let i = 0; i <= nSteps(); i++) {
    let x = labelWidth + i * cellWidth;
    line(x, 0, x, height);
  }

  //Labels of tracknames
  fill(0);
  textFont("Long Cang");
  textAlign(CENTER, CENTER);
  textSize(30);
  push();
  stroke(255);
  strokeWeight(2);
  for (let track = 0; track < nTracks; track++) {
    text(drumNames[track], labelWidth / 2, track * cellHeight + cellHeight / 2);
  }
  pop();

  //Color of blocks
  for (let track = 0; track < nTracks; track++) {
    for (let step = 0; step < nSteps(); step++) {
      if (cells[track][step]) {
        if (track < breathTracks.length) {
          fill(red);
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

      //Images in movement blocks

      if (drumNames[track] === "拍手 - CLAP" && cells[track][step]) {
        image(
          clap,
          labelWidth + step * cellWidth,
          track * cellHeight,
          cellWidth,
          cellHeight
        );
        if (step === currentStep) {
          image(clap, 900, 400, cellWidth, cellHeight);
          image(clap, 1250, 400, cellWidth, cellHeight);
        }
      }

      if (drumNames[track] === "微蹲 - SQUAT" && cells[track][step]) {
        image(
          squat,
          labelWidth + step * cellWidth,
          track * cellHeight,
          cellWidth,
          cellHeight
        );
        if (step === currentStep) {
          image(squat, 900, 500, cellWidth, cellHeight);
          image(squat, 1250, 500, cellWidth, cellHeight);
        }
      }

      if (drumNames[track] === "踢腿 - KICK" && cells[track][step]) {
        image(
          kick,
          labelWidth + step * cellWidth,
          track * cellHeight,
          cellWidth,
          cellHeight
        );
        if (step === currentStep) {
          image(kick, 900, 500, cellWidth, cellHeight);
          image(kick, 1250, 500, cellWidth, cellHeight);
        }
      }

      if (drumNames[track] === "跺脚 - STAMP" && cells[track][step]) {
        image(
          stamp,
          labelWidth + step * cellWidth,
          track * cellHeight,
          cellWidth,
          cellHeight
        );
        if (step === currentStep) {
          image(stamp, 900, 600, cellWidth, cellHeight);
          image(stamp, 1250, 600, cellWidth, cellHeight);
        }
      }

      //Text & Image in breath blocks
      fill(0);

      if (drumNames[track] === "嘘 - XU" && cells[track][step]) {
        text(
          "XU",
          labelWidth + (step + 0.5) * cellWidth,
          (track + 0.5) * cellHeight
        );
        if (step === currentStep) {
          push();
          fill(255, 0, 0, 60);
          ellipse(1080, 250, 30, 30);
          textSize(150);
          text("嘘", 930, 150);
          pop();
        }
      }

      if (drumNames[track] === "呵 - HE" && cells[track][step]) {
        text(
          "HE",
          labelWidth + (step + 0.5) * cellWidth,
          (track + 0.5) * cellHeight
        );
        if (step === currentStep) {
          push();
          fill(255, 0, 0, 60);
          ellipse(1130, 220, 30, 30);
          textSize(150);
          text("呵", 930, 150);
          pop();
        }
      }

      if (drumNames[track] === "呼 - HU" && cells[track][step]) {
        text(
          "HU",
          labelWidth + (step + 0.5) * cellWidth,
          (track + 0.5) * cellHeight
        );

        if (step === currentStep) {
          push();
          fill(255, 0, 0, 60);
          ellipse(1070, 300, 30, 30);
          textSize(150);
          text("呼", 930, 150);
          pop();
        }
      }

      if (drumNames[track] === "嘶 - SI" && cells[track][step]) {
        text(
          "SI",
          labelWidth + (step + 0.5) * cellWidth,
          (track + 0.5) * cellHeight
        );

        if (step === currentStep) {
          push();
          fill(255, 0, 0, 60);
          ellipse(1080, 210, 60, 80);
          ellipse(1140, 210, 60, 80);

          textSize(150);
          text("嘶", 930, 150);
          pop();
        }
      }

      if (drumNames[track] === "吹 - CHUI" && cells[track][step]) {
        text(
          "CHUI",
          labelWidth + (step + 0.5) * cellWidth,
          (track + 0.5) * cellHeight
        );
        if (step === currentStep) {
          push();
          fill(255, 0, 0, 60);
          ellipse(1150, 270, 30, 30);
          textSize(150);
          text("吹", 930, 150);
          pop();
        }
      }

      if (drumNames[track] === "嘻 - XI" && cells[track][step]) {
        text(
          "XI",
          labelWidth + (step + 0.5) * cellWidth,
          (track + 0.5) * cellHeight
        );
        if (step === currentStep) {
          push();
          fill(255, 0, 0, 60);
          ellipse(1105, 280, 120, 230);
          textSize(150);
          text("嘻", 930, 150);
          pop();
        }
      }
    }
  }

  //Highlight beat
  fill(234, 30, 83, 60);
  rect(labelWidth + currentStep * cellWidth, 0, cellWidth, height);
}

function mousePressed() {
  let i = floor((mouseX - labelWidth) / cellWidth);
  let j = floor(mouseY / cellHeight);
  //Blocks within same track groups are exclusive to each other under the same column
  if (i >= 0 && i < nSteps() && j >= 0 && j < nTracks) {
    if (breathTracks.includes(drumNames[j])) {
      if (cells[j][i]) {
        cells[j][i] = 0;
      } else {
        for (let track = 0; track < breathTracks.length; track++) {
          cells[track][i] = 0;
        }
        cells[j][i] = 1;
      }
    } else if (movementTracks.includes(drumNames[j])) {
      if (cells[j][i]) {
        cells[j][i] = 0;
      } else {
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
    let randomBreathTrack = random(breathTracks);
    let randomMovementTrack = random(movementTracks);
    for (let track = 0; track < nTracks; track++) {
      if (breathTracks.includes(drumNames[track])) {
        cells[track][step] =
          drumNames[track] === randomBreathTrack ? int(random(2)) : 0;
      }
      if (movementTracks.includes(drumNames[track])) {
        cells[track][step] =
          drumNames[track] === randomMovementTrack ? int(random(2)) : 0;
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
