let faceMesh, handPose;
let video;
let options = { maxFaces: 1, refineLandmarks: false, flipped: false };

let faces = [];
let FacePresent = false;
let preFacePresent = false;

let handInX = 0;
let handInY = 0;
let leftHandPresent = false;
let rightHandPresent = false;
let prevLeftHandPresent = false;
let prevRightHandPresent = false;
let bothHandsLost = false;

let midiOut;
let handPresenceThreshold = 400; // For face detection, adjust if necessary

// Enable WebMIDI
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
  // Load faceMesh and handPose models
  faceMesh = ml5.faceMesh(options);
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(1280, 960);

  // Capture video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Start face and hand detection
  faceMesh.detectStart(video, gotFaces);
  handPose.detectStart(video, gotHands);

  textAlign(CENTER);
  textSize(100);
}

function draw() {
  // Flip the camera for correct orientation
  translate(width, 0);
  scale(-1.0, 1.0);
  image(video, 0, 0, width, height);

  // Face detection
  if (faces.length > 0) {
    let face = faces[0];
    let Face = face.keypoints[9]; // Adjust the landmark index as needed

    if (Face) {
      let FaceDist = dist(Face.x, Face.y, width / 2, height / 2);
      FacePresent = FaceDist < handPresenceThreshold; // Face presence check based on distance

      push();
      resetMatrix();
      noStroke();
      fill(
        50 - 50 * abs(sin(frameCount * 0.05)),
        50 - 50 * sin(frameCount * 0.05)
      );
      rect(0, 0, width, height);
      pop();

      push();
      resetMatrix();
      stroke(255, 50 - 50 * sin(frameCount * 0.05));
      fill(0, 255, 0, 50 - 50 * sin(frameCount * 0.05));
      //textFont("Alike");
      text("Welcome to Elephonet", width / 2, 100);
      text("Dial to make a call", width / 2, 860);
      pop();

      push();
      noStroke();
      fill(0, 255, 0);
      ellipse(Face.x, Face.y, 20, 20);
      pop();
    } else {
      FacePresent = false;
    }

    // Detect face presence change
    if (FacePresent == true && preFacePresent == false) {
      sendMidiCC(1, 67, 127); // Face detected, send MIDI CC to open
      console.log("Face detected");
    } else if (FacePresent == false && preFacePresent == true) {
      sendMidiCC(1, 67, 0); // Face lost, send MIDI CC to close
      console.log("Face lost");
    }
    preFacePresent = FacePresent; // Update previous state
  }

  // Hand detection
  push();
  noStroke();
  fill(0, 255, 0);
  circle(handInX, handInY, 50);
  pop();

  // Left hand presence check
  if (handInX > 100 && handInX < 640 && handInY > 100 && handInY < 900) {
    leftHandPresent = true;
  } else {
    leftHandPresent = false;
  }

  // Right hand presence check
  if (handInX > 640 && handInX < 1180 && handInY > 100 && handInY < 900) {
    rightHandPresent = true;
  } else {
    rightHandPresent = false;
  }

  // Left hand state change
  if (leftHandPresent !== prevLeftHandPresent) {
    if (leftHandPresent) {
      console.log("leftHandDetected");
      sendMidiCC(1, 64, 127); // Left hand detected
    } else {
      console.log("leftHandLost");
      sendMidiCC(1, 64, 0); // Left hand lost
    }
    prevLeftHandPresent = leftHandPresent;
  }

  // Right hand state change
  if (rightHandPresent !== prevRightHandPresent) {
    if (rightHandPresent) {
      console.log("rightHandDetected");
      sendMidiCC(1, 65, 127); // Right hand detected
    } else {
      console.log("rightHandLost");
      sendMidiCC(1, 65, 0); // Right hand lost
    }
    prevRightHandPresent = rightHandPresent;
  }

  // Detect if both hands are lost
  if (!leftHandPresent && !rightHandPresent && !bothHandsLost) {
    console.log("bothHandsLost - opening audio track");
    sendMidiCC(1, 66, 127); // Both hands lost, send MIDI CC to open track
    bothHandsLost = true;
  }

  // Detect if any hand is detected again after being lost
  if ((leftHandPresent || rightHandPresent) && bothHandsLost) {
    console.log("Hand detected again - closing audio track");
    sendMidiCC(1, 66, 0); // Hand detected again, close track
    bothHandsLost = false;
  }
}

// Callback for face detection
function gotFaces(results) {
  faces = results;
}

// Callback for hand detection
function gotHands(results) {
  if (results.length > 1) {
    handInX = results[0].index_finger_tip.x;
    handInY = results[0].index_finger_tip.y;
  }
}

// Function to send MIDI Control Change message
function sendMidiCC(channel, control, value) {
  if (midiOut) {
    midiOut.channels[channel].sendControlChange(control, value);
  }
}
