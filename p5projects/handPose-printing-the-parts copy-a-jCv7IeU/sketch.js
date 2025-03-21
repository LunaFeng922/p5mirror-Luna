let handpose;
let video;
let hands = [];

let leftHandPresent = false;
let rightHandPresent = false;

let preLeftHandPresent = false;
let preRightHandPresent = false;

let midiOut;

function preload() {
  // Initialize handpose model
  handpose = ml5.handpose(video, modelReady);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Setup video capture
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Initialize handpose and start detecting hands
  handpose.on('predict', gotHands);

  // Initialize MIDI
  WebMidi.enable()
    .then(onMidiEnabled)
    .catch((err) => console.error(err));
}

function modelReady() {
  console.log('Model ready!');
}

function onMidiEnabled() {
  if (WebMidi.outputs.length < 1) {
    console.log("No MIDI output device detected.");
  } else {
    midiOut = WebMidi.outputs[0];
  }
}

function draw() {
  // Draw video (flipped horizontally)
  translate(width, 0);
  scale(-1.0, 1.0);
  image(video, 0, 0, width, height);

  // Detect left and right hands
  detectHands();
}

function gotHands(results) {
  hands = results;
}

function detectHands() {
  leftHandPresent = false;
  rightHandPresent = false;

  // Loop through detected hands
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    
    // Check if it's a left or right hand
    if (hand.landmarks[0][0] < width / 2) {
      leftHandPresent = true;
    } else {
      rightHandPresent = true;
    }
  }

  // Send MIDI signals based on hand presence
  if (leftHandPresent && !preLeftHandPresent) {
    sendMidiCC(1, 64, 127); // Left hand appears
    console.log("Left hand detected");
  } else if (!leftHandPresent && preLeftHandPresent) {
    sendMidiCC(1, 64, 0); // Left hand disappears
    console.log("Left hand lost");
  }

  if (rightHandPresent && !preRightHandPresent) {
    sendMidiCC(2, 64, 127); // Right hand appears
    console.log("Right hand detected");
  } else if (!rightHandPresent && preRightHandPresent) {
    sendMidiCC(2, 64, 0); // Right hand disappears
    console.log("Right hand lost");
  }

  // Update previous hand states
  preLeftHandPresent = leftHandPresent;
  preRightHandPresent = rightHandPresent;
}

// Function to send MIDI control change signals
function sendMidiCC(channel, control, value) {
  if (midiOut) {
    midiOut.channels[channel].sendControlChange(control, value);
  }
}

