let faceMesh;
let video;
let options = { maxFaces: 1, refineLandmarks: false, flipped: false };

let leftEyeOsc, rightEyeOsc;
let faces = [];
let leftEyeOpenThreshold = 25;
let rightEyeOpenThreshold = 22;

//fixed pitch
let leftEyePitch = 69;
let rightEyePitch = 69;

let midiOut;

WebMidi.enable()
  .then(onEnabled)
  .catch((err) => alert(err));

function onEnabled() {
  if (WebMidi.outputs.length < 1) {
    document.body.innerHTML += "No MIDI output device detected.";
  } else {
    WebMidi.outputs.forEach((device, index) => {
      console.log(device.name);
    });
    midiOut = WebMidi.outputs[0];
  }
}

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // face detecting
  faceMesh.detectStart(video, gotFaces);

  // initialze oscilaator
  leftEyeOsc = new p5.Oscillator('sine');
  rightEyeOsc = new p5.Oscillator('sine');
}

function draw() {
  // camera
  translate(width, 0);
  scale(-1.0, 1.0);
  image(video, 0, 0, width, height);

  if (faces.length > 0) {
    let face = faces[0];

    // lefteye&righteye
    let leftEyeTop = face.keypoints[159];
    let leftEyeBottom = face.keypoints[145];
    let rightEyeTop = face.keypoints[386];
    let rightEyeBottom = face.keypoints[374];

    // calculate distance
    let leftEyeOpenDistance = dist(leftEyeTop.x, leftEyeTop.y, leftEyeBottom.x, leftEyeBottom.y);
    let rightEyeOpenDistance = dist(rightEyeTop.x, rightEyeTop.y, rightEyeBottom.x, rightEyeBottom.y);

    // lefteye&midi
    if (leftEyeOpenDistance > leftEyeOpenThreshold) {
      if (!leftEyeOsc.started) {
        leftEyeOsc.start();
      }
      leftEyeOsc.freq(leftEyePitch);
      sendMidi(1, leftEyePitch, 127);
    } else {
      if (leftEyeOsc.started) {
        leftEyeOsc.stop();
      }
      sendMidi(1, leftEyePitch, 0);
    }

    // righteye&midi
    if (rightEyeOpenDistance > rightEyeOpenThreshold) {
      if (!rightEyeOsc.started) {
        rightEyeOsc.start();
      }
      rightEyeOsc.freq(rightEyePitch);
      sendMidi(2, rightEyePitch, 127); 
    } else {
      if (rightEyeOsc.started) {
        rightEyeOsc.stop();
      }
      sendMidi(2, rightEyePitch, 0); 
    }
  }
}

// send midi
function sendMidi(channel, note, attack) {
  if (midiOut) {
    midiOut.channels[channel].playNote(note, { attack: attack / 127 }); // 使用attack替代velocity
    if (attack === 0) {
      midiOut.channels[channel].stopNote(note);
    }
  }
}

function gotFaces(results) {
  faces = results;
}