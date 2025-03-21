let faceMesh;
let video;
let options = { maxFaces: 1, refineLandmarks: false, flipped: false };

let myOsc;
let faces = [];

let mouthOpenThreshold = 5;
let f = 200;

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

function draw() {
  // Draw the webcam video
  translate(width, 0); // move to top right corner
  scale(-1.0, 1.0); // flip x-axis backwards
  image(video, 0, 0, width, height);
  
  if (faces.length > 0) {
    let face = faces[0];
    let topLip = face.keypoints[13];
    let bottomLip = face.keypoints[14];
    
    //calculate distance
    let mouthOpenDistance = dist(topLip.x, topLip.y, bottomLip.x, bottomLip.y);
    
    // distance to freq
    f = map(mouthOpenDistance, 5, 50, 150, 650);
    
    // play note when >Treshold
    if (mouthOpenDistance > mouthOpenThreshold) {
      if (!myOsc.started) {
        myOsc.start();
      }
      myOsc.freq(f);
    } else {
      if (myOsc.started) {
        myOsc.stop();
      }
    }
    
    console.log(mouthOpenDistance);
  }
  
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

function gotFaces(results) {
  faces = results;
}

