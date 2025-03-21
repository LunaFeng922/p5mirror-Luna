let faceMesh;
let video;
let options = { maxFaces: 1, refineLandmarks: false, flipped: false };

let faces = [];
let leftEyeOpenThreshold = 20;
//let mouthOpenThreshold = 30;

let midiOut;
let preEyeOpen = true;
let eyeOpen = false;
//let mouthOpen = false;

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
  translate(width/2, 0);
  scale(-1.0, 1.0);
  image(video, 0, 0, width/2, height/2);

  if (faces.length > 0) {
    let face = faces[0];

    // lefteye
    let leftEyeTop = face.keypoints[159];
    let leftEyeBottom = face.keypoints[145];

    // mouth (上下唇的关键点)
    let upperLip = face.keypoints[13];
    let lowerLip = face.keypoints[14];

    // calculate distance for left eye
    let leftEyeOpenDistance = dist(
      leftEyeTop.x,
      leftEyeTop.y,
      leftEyeBottom.x,
      leftEyeBottom.y
    );

    // // calculate distance for mouth open
    // let mouthOpenDistance = dist(
    //   upperLip.x,
    //   upperLip.y,
    //   lowerLip.x,
    //   lowerLip.y
    // );

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

    // // mouth & MIDI CC
    // if (mouthOpenDistance > mouthOpenThreshold) {
    //   sendMidiCC(2, 64, 127); // 嘴巴张开发送控制信号2
    // } else {
    //   sendMidiCC(2, 64, 0); // 嘴巴闭合发送关闭信号
    // }
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

// function mousePressed() {
//   test = !test;
//   console.log(test);
//   if (test == true) {
//     sendMidiCC(1, 64, 127);
//     sendMidiCC(2, 64, 0);
//   } else if (test == false) {
//     sendMidiCC(2, 64, 127);
//     sendMidiCC(1, 64, 0);
//   }
// }
