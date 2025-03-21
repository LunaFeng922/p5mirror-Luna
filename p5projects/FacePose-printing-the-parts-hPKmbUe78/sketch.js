let faceMesh;
let video;
let options = { maxFaces: 1, refineLandmarks: false, flipped: false };

let myOsc;
let faces = [];

// let leftInX = 0,
//   leftInY = 0,
//   rightInX = 0,
//   rightInY = 0;
// let f = 200;
// let d = 0;

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  // start detecting face from the webcam video
  faceMesh.detectStart(video, gotFaces);
  myOsc = new p5.Oscillator("square");
}

function mousePressed() {
  myOsc.start();
}

function draw() {
  // Draw the webcam video
  translate(width, 0); // move to top right corner
  scale(-1.0, 1.0); // flip x-axis backwards
  image(video, 0, 0, width, height);
  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 5);
    }
  }
}

// // Callback function for when handPose outputs data
// function gotHands(results) {
//   if (results.length > 1) {
//     console.log(results);
//     leftInX = results[0].index_finger_tip.x;
//     leftInY = results[0].index_finger_tip.y;

//     rightInX = results[1].index_finger_tip.x;
//     rightInY = results[1].index_finger_tip.y;
//     d = dist(leftInX, leftInY, rightInX, rightInY);
//     f = map(d, 0, width, 150, 650);
//     myOsc.freq(f);
//   }
// }

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}
