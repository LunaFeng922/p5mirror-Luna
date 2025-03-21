let handPose;
let video;

let handInX = 0;
let handInY = 0;
let leftHandPresent = false;
let rightHandPresent = false;

// Variables to store previous hand states
let prevLeftHandPresent = false;
let prevRightHandPresent = false;

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
      sendMidiCC(1, 65, 127);
    } else {
      console.log("rightHandLost");
      sendMidiCC(1, 65, 0);
    }
    prevRightHandPresent = rightHandPresent; // Update previous state
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  if (results.length > 1) {
    handInX = results[0].index_finger_tip.x;
    handInY = results[0].index_finger_tip.y;
  }
}

