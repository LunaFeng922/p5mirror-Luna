let handPose;
let video;

let handInX = 0;
let handInY = 0;
let leftHandPresent = false;
let rightHandPresent = false;

// Variables to store previous hand states
let prevLeftHandPresent = false;
let prevRightHandPresent = false;
let bothHandsLost = false; // Track if both hands are lost

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
  // Load the handPose model
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(1280, 960);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video
  translate(width, 0); // move to top right corner
  scale(-1.0, 1.0); // flip x-axis backwards
  image(video, 0, 0, width, height);
  circle(handInX, handInY, 50);
  
  // Detect left hand presence
  if (handInX > 200 && handInX < 640 && handInY > 100 && handInY < 800) {
    leftHandPresent = true;
  } else {
    leftHandPresent = false;
  }

  // Detect right hand presence
  if (handInX > 640 && handInX <1080 && handInY > 100 && handInY < 800) {
    rightHandPresent = true;
  } else {
    rightHandPresent = false;
  }

  // Check if left hand state changed
  if (leftHandPresent !== prevLeftHandPresent) {
    if (leftHandPresent) {
      console.log("leftHandDetected");
      sendMidiCC(1, 64, 127);
    } else {
      console.log("leftHandLost");
      sendMidiCC(1, 64, 0);
    }
    prevLeftHandPresent = leftHandPresent; // Update previous state
  }

  // Check if right hand state changed
  if (rightHandPresent !== prevRightHandPresent) {
    if (rightHandPresent) {
      console.log("rightHandDetected");
      //sendMidiCC(1, 65, 127);
    } else {
      console.log("rightHandLost");
      //sendMidiCC(1, 65, 0);
    }
    prevRightHandPresent = rightHandPresent; // Update previous state
  }

  // Detect if both hands are lost
  if (!leftHandPresent && !rightHandPresent && !bothHandsLost) {
    console.log("bothHandsLost - opening audio track");
    //sendMidiCC(1, 66, 127); // Send MIDI CC to open audio track
    bothHandsLost = true; // Set both hands lost flag
  }

  // Detect if any hand is detected again after being lost
  if ((leftHandPresent || rightHandPresent) && bothHandsLost) {
    console.log("Hand detected again - closing audio track");
    //sendMidiCC(1, 66, 0); // Send MIDI CC to close audio track
    bothHandsLost = false; // Reset both hands lost flag
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  if (results.length > 1) {
    handInX = results[0].index_finger_tip.x;
    handInY = results[0].index_finger_tip.y;
  }
}

// send MIDI Control Change message
function sendMidiCC(channel, control, value) {
  if (midiOut) {
    midiOut.channels[channel].sendControlChange(control, value);
  }
}
