let faceMesh;
let video;
let options = { maxFaces: 1, refineLandmarks: false, flipped: false };

let leftEyeOsc, rightEyeOsc;
let faces = [];
let leftEyeOpenThreshold = 25;
let rightEyeOpenThreshold = 22;

let leftEyePitch = 69;
let rightEyePitch = 69;

let midiOut;
let serial;
let latestData = "waiting for data";

// track if sound is activated
let leftEyePlaying = false;
let rightEyePlaying = false;

WebMidi.enable()
  .then(onEnabled)
  .catch((err) => alert(err));

function onEnabled() {
  if (WebMidi.outputs.length < 1) {
    document.body.innerHTML += "do not detect midi out.";
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

  // serials
  serial = new p5.SerialPort();
  serial.list();
  serial.open("/dev/tty.usbmodem103"); // 确认这个端口
  serial.on("connected", serverConnected);
  serial.on("list", gotList);
  serial.on("data", getData); 
  serial.on("error", gotError);
  serial.on("open", gotOpen);
  serial.on("close", gotClose);

  // video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // face detecting
  faceMesh.detectStart(video, gotFaces);

  // initialize oscillator
  leftEyeOsc = new p5.Oscillator('sine');
  rightEyeOsc = new p5.Oscillator('sine');
}

function draw() {
  background(255);

  // flip camera
  translate(width, 0);
  scale(-1.0, 1.0);
  image(video, 0, 0, width, height);

  if (faces.length > 0) {
    let face = faces[0];

    let leftEyeTop = face.keypoints[159];
    let leftEyeBottom = face.keypoints[145];
    let rightEyeTop = face.keypoints[386];
    let rightEyeBottom = face.keypoints[374];

    let leftEyeOpenDistance = dist(leftEyeTop.x, leftEyeTop.y, leftEyeBottom.x, leftEyeBottom.y);
    let rightEyeOpenDistance = dist(rightEyeTop.x, rightEyeTop.y, rightEyeBottom.x, rightEyeBottom.y);

    // lefteye & send MIDI
    if (leftEyeOpenDistance > leftEyeOpenThreshold) {
      if (!leftEyePlaying) {
        leftEyeOsc.start();
        leftEyePlaying = true;
      }
      leftEyeOsc.freq(leftEyePitch);
      sendMidi(1, leftEyePitch, 127);
    } else {
      if (leftEyePlaying) {
        leftEyeOsc.stop();
        leftEyePlaying = false;
      }
      sendMidi(1, leftEyePitch, 0);
    }

    // right eye & send MIDI
    if (rightEyeOpenDistance > rightEyeOpenThreshold) {
      if (!rightEyePlaying) {
        rightEyeOsc.start();
        rightEyePlaying = true;
      }
      rightEyeOsc.freq(rightEyePitch);
      sendMidi(2, rightEyePitch, 127);
    } else {
      if (rightEyePlaying) {
        rightEyeOsc.stop();
        rightEyePlaying = false;
      }
      sendMidi(2, rightEyePitch, 0);
    }
  }
}

// read serial data
function getData() {
  let data = serial.readLine();
  if (data.length > 0) {
    let pitches = data.split(',');
    if (pitches.length >= 2) {
      leftEyePitch = parseInt(pitches[0]);
      rightEyePitch = parseInt(pitches[1]);
    }
  }
}

// send midi
function sendMidi(channel, note, attack) {
  if (midiOut) {
    midiOut.channels[channel].playNote(note, { attack: attack / 127 });
    if (attack === 0) {
      midiOut.channels[channel].stopNote(note);
    }
  }
}

function gotFaces(results) {
  faces = results;
}

function serverConnected() {
  print("Connected to Server");
}

function gotList(thelist) {
  print("List of Serial Ports:");
  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose() {
  print("Serial Port is Closed");
}

function gotError(theerror) {
  print(theerror);
}