let handPose;
let video;

let leftInX = 0;
let leftInY = 0;
let rightInX = 0;
let rightInY = 0;
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
  circle(leftInX, leftInY, 50);
  circle(rightInX, rightInY, 50);
  
  // Detect left hand presence
  if (leftInX > 200 && leftInX < 640 && leftInY > 100 && leftInY < 800) {
    leftHandPresent = true;
  } else {
    leftHandPresent = false;
  }

  // Detect right hand presence
  if (rightInX > 640 && rightInX <1080 && rightInY > 100 && rightInY < 800) {
    rightHandPresent = true;
  } else {
    rightHandPresent = false;
  }

  // Check if left hand state changed
  if (leftHandPresent !== prevLeftHandPresent) {
    if (leftHandPresent) {
      console.log("leftHandDetected");
    } else {
      console.log("leftHandLost");
    }
    prevLeftHandPresent = leftHandPresent; // Update previous state
  }

  // Check if right hand state changed
  if (rightHandPresent !== prevRightHandPresent) {
    if (rightHandPresent) {
      console.log("rightHandDetected");
    } else {
      console.log("rightHandLost");
    }
    prevRightHandPresent = rightHandPresent; // Update previous state
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  if (results.length > 1) {
    leftInX = results[0].index_finger_tip.x;
    leftInY = results[0].index_finger_tip.y;

    rightInX = results[1].index_finger_tip.x;
    rightInY = results[1].index_finger_tip.y;
  }
}

