/* 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates hand tracking on live video through ml5.handPose.
 
Handpose + Tone.js example
NIME ITP - 2024 Sept. 
David Rios

*/

//4,8,12,16,20 are digit tips 4 is thumb
let noteplaying1 = false;
let noteplaying2 = false;

WebMidi.enable(function (err) {
  if (err) {
    console.log("WebMidi not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");
  }

  console.log(WebMidi.outputs);
  output = WebMidi.getOutputByName("IAC驱动程序总线1");
  console.log(output);
});


let handPose;
let video;
let hands = [];
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
let now = Tone.now();
function preload() {
  // Load the handPose model
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw all the tracked hand points
  if (hands.length <= 0 && noteplaying1 == true) {
    for (let i = 0; i < 128; i++) {
      output.sendNoteOff(60);
       output.sendNoteOff(65);

      //play a middle 'C' for the duration of an 8th note
    //  synth.triggerRelease(["D2", "F2", "A2", "C3", "E3"], now + 4);
      noteplaying1 = false;
      noteplaying2 = false;
    }
  }
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    // console.log(
    //   dist(
    //     hand.thumb_tip.x,
    //     hand.thumb_tip.y,
    //     hand.index_finger_tip.x,
    //     hand.index_finger_tip.y
    //   )
    // );

    if (
      dist(
        hand.thumb_tip.x,
        hand.thumb_tip.y,
        hand.index_finger_tip.x,
        hand.index_finger_tip.y
      ) > 50
    ) {
      if (noteplaying1 == false) {
        output.sendNoteOn(60, { channel: 1 });
        // synth.triggerAttack("D2", now);
        // synth.triggerAttack("F2", now );
        // synth.triggerAttack("A2", now);


        noteplaying1 = true;
      }
    } else {
      if (noteplaying1 == true) {
        output.sendNoteOff(60, { channel: 1 });
       // synth.triggerRelease(["D2", "F2", "A2"], now );
        noteplaying1 = false;
      }
    }
    
    if (
      dist(
        hand.thumb_tip.x,
        hand.thumb_tip.y,
        hand.middle_finger_tip.x,
        hand.middle_finger_tip.y
      ) > 50
    ) {
      if (noteplaying2 == false) {
        output.sendNoteOn(65, { channel: 1 });
        // synth.triggerAttack("A3", now);
        // synth.triggerAttack("C4", now );
        // synth.triggerAttack("E4", now);

        noteplaying2 = true;
      }
    } else {
      if (noteplaying2 == true) {
       output.sendNoteOff(65, { channel: 1 });
       // synth.triggerRelease(["A3", "C4", "E4"], now );
        noteplaying2 = false;
      }
    }
    
    
    
    
    
    //     for (let j = 0; j < hand.keypoints.length; j++) {
    //       let keypoint = hand.keypoints[j];
    //       fill(0, 255, 0);
    //       noStroke();
    //       circle(keypoint.x, keypoint.y, 10);

    //     }
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}

// function setup() {
//   createCanvas(640, 480);
//   video = createCapture(VIDEO);
//   video.size(width, height);

//   for (let i = 0; i < 4; i += 1) {
//     playingNotes[i] = false;
//   }

//   handpose = ml5.handpose(video, modelReady);

//   // This sets up an event that fills the global variable "predictions"
//   // with an array every time new hand poses are detected
//   handpose.on("predict", (results) => {
//     predictions = results;
//   });
//   flippedvideo = ml5.flipImage(video);
//   // Hide the video element, and just show the canvas
//   video.hide();
//   textSize(18);
// }

// function modelReady() {
//   console.log("Model ready!");
// }

// function draw() {
//   flippedvideo = ml5.flipImage(video);
//   image(flippedvideo, 0, 0, width, height);
//   //push()
//   // We can call both functions to draw all keypoints and the skeletons
//   // scale(-1,1);
//   drawKeypoints();
//   // pop()
// }

// // A function to draw ellipses over the detected keypoints
// function drawKeypoints() {
//   if (predictions.length <= 0) {
//     for (let i = 0; i < 128; i += 1) {
//       if (output) {
//         output.stopNote(i, { channel: 1 });
//       }
//     }

//     for (let i = 0; i < 4; i += 1) {
//       playingNotes[i] = false;
//     }
//   }

//   for (let i = 0; i < predictions.length; i += 1) {
//     const prediction = predictions[i];
//     for (let j = 0; j < prediction.landmarks.length; j += 1) {
//       const keypoint = prediction.landmarks[j];
//       let thumb = prediction.landmarks[4];
//       let index = prediction.landmarks[8];
//       let mid = prediction.landmarks[12];
//       let ring = prediction.landmarks[16];
//       let pinky = prediction.landmarks[20];

//       let flipx = map(keypoint[0], 0, width, width, 0);
//       fill(0, 255, 0);
//       noStroke();
//       ellipse(flipx, keypoint[1], 10, 10);
//       fill(255, 0, 0);
//       text(j, flipx, keypoint[1]);

//       note = int(map(index[0], 0, width, 21, 96));
//       dur = int(map(index[1], 0, height, 100, 1000));

//       if (
//         dist(index[0], index[1], thumb[0], thumb[1]) > 100 &&
//         note != pnote &&
//         playingNotes == false
//       ) {
//         output.playNote(note, { channel: 1, duration: 400 });

//         pnote = note;
//         playingNotes = true;
//         console.log(
//           " note: " + note + " pnote " + pnote + " playing " + playingNotes
//         );
//       }
//       if (
//         dist(index[0], index[1], thumb[0], thumb[1]) <= 100 &&
//         note != pnote &&
//         playingNotes == true
//       ) {
//         output.stopNote(note, { channel: 1 });
//         playingNotes = false;
//         pnote = note;
//                console.log(
//           " note: " + note + " pnote " + pnote + " playing " + playingNotes
//         );
//       }
//        console.log(dist(index[0], index[1], thumb[0], thumb[1]));

//     }
//   }
// }
