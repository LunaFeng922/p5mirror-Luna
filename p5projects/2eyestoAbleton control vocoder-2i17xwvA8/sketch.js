let faceMesh;
let video;
let options = { maxFaces: 1, refineLandmarks: false, flipped: false };

let faces = [];
let leftEyeOpenThreshold = 22;
let rightEyeOpenThreshold = 22;

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
}

function draw() {
  // camera
  translate(width, 0);
  scale(-1.0, 1.0);
  image(video, 0, 0, width, height);

  if (faces.length > 0) {
    let face = faces[0];

    // lefteye & righteye
    let leftEyeTop = face.keypoints[159];
    let leftEyeBottom = face.keypoints[145];
    let rightEyeTop = face.keypoints[386];
    let rightEyeBottom = face.keypoints[374];

    // calculate distance
    let leftEyeOpenDistance = dist(leftEyeTop.x, leftEyeTop.y, leftEyeBottom.x, leftEyeBottom.y);
    let rightEyeOpenDistance = dist(rightEyeTop.x, rightEyeTop.y, rightEyeBottom.x, rightEyeBottom.y);

    // left eye & MIDI CC
    if (leftEyeOpenDistance > leftEyeOpenThreshold) {
      sendMidiCC(1, 64, 127);  // 左眼睁开发送控制信号1
    } else {
      sendMidiCC(1, 64, 0);    // 左眼闭合发送关闭信号
    }

    // right eye & MIDI CC
    if (rightEyeOpenDistance > rightEyeOpenThreshold) {
      sendMidiCC(2, 64, 127);  // 右眼睁开发送控制信号2
    } else {
      sendMidiCC(2, 64, 0);    // 右眼闭合发送关闭信号
    }
  }
}

// send MIDI Control Change message
function sendMidiCC(channel, control, value) {
  if (midiOut) {
    midiOut.channels[channel].sendControlChange(control, value);
  }
}

function gotFaces(results) {
  faces = results;
}
