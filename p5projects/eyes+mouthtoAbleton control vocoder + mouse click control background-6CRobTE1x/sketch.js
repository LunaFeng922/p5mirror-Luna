let faceMesh;
let video;
let options = { maxFaces: 1, refineLandmarks: false, flipped: false };

let faces = [];
let leftEyeOpenThreshold = 20;

let midiOut;
let preEyeOpen = true;
let eyeOpen = false;

let test = false;

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
  createCanvas(1280, 960);

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

    // lefteye
    let leftEyeTop = face.keypoints[159];
    let leftEyeBottom = face.keypoints[145];

    // calculate distance for left eye
    let leftEyeOpenDistance = dist(
      leftEyeTop.x,
      leftEyeTop.y,
      leftEyeBottom.x,
      leftEyeBottom.y
    );

    //left eye & MIDI CC
    if (leftEyeOpenDistance > leftEyeOpenThreshold) {
      eyeOpen = true;
    } 
    else {
      //preEyeOpen = true;
      eyeOpen = false;
    }
    //console.log(eyeOpen);
    if (eyeOpen == true && preEyeOpen == false) {
      sendMidiCC(1, 64, 127);
      sendMidiCC(2, 64, 0);
      preEyeOpen = eyeOpen;
      console.log("eyeopen");
    } else if (eyeOpen == false && preEyeOpen == true) {
      sendMidiCC(2, 64, 127);
      sendMidiCC(1, 64, 0);
      preEyeOpen = eyeOpen;
      console.log("eyeclose");
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

function mousePressed() {
  test = !test;
  console.log(test);
  if (test == true) {
    sendMidiCC(1, 65, 127);
  } else if (test == false) {
    sendMidiCC(1, 65, 0);
  }
}
