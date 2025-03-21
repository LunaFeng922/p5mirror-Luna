// INTERFACE
let playButton;
let tempoSlider;

let nTracks = 2;
let nSteps = 4;

let w = 60;

let cells = [
  [0, 0, 0, 1], //cells[0] holds the snare pattern
  [1, 1, 1, 0] //cells[1] holds the kick pattern
];

let beat;

// SOUNDS

// Create a Players object and load the "kick.mp3" and "snare.mp3" files
const kit = new Tone.Players({
  "kick": "samples/505/kick.mp3", 
  "snare": "samples/snare.mp3"
});

// Connect the player output to the computer's audio output
kit.toDestination();

// Create a loop: call playBeat every quarter note
Tone.Transport.scheduleRepeat(playBeat, "4n");

// Audio playback loop
function playBeat(time) {
  // Make sure the sound files have been completely loaded
  if (kit.loaded) {
    beat = int(Tone.Transport.position.split(":")[1]);

    if (cells[0][beat] == 1) {
      kit.player("snare").start(time);
    }
    if (cells[1][beat] == 1) {
      kit.player("kick").start(time);
    }
  }
}

// GRAPHICS

function setup() {
  createCanvas(500, 500);
  playButton = createButton("play");
  playButton.mouseClicked(togglePlay);

  tempoSlider = createSlider(20, 240, 160);
  tempoSlider.input(updateTempo);
}

function draw() {
  background(255);
  let w = 60;

  let d = width / nTracks; // diameter unit
  let a = TWO_PI / nSteps; // angle unit
  let c = 50; // color unit

  let prevAngle = 0;
  let angle;
  for (let step = 1; step <= nSteps; step++) { 
    for (let track = nTracks; track > 0; track--) { 
        let diameter = d * track;
        angle = a * step;
        let f = track*c;

        stroke(0);
        if(cells[track-1][step-1] == 1){
          fill(f);
        }
        else{
          fill(255);
        }
        arc(width/2, height/2, diameter, diameter, prevAngle, angle, PIE); 
      
    }
    prevAngle = angle;
  }

  // Highlight current step
  fill(0, 200, 200, 50);
  arc(width/2, height/2, width, width, a*beat, a*(beat+1));

}

function mousePressed(){
  // 1. mouseX, mouseY (relative to top-left corner) => x, y (relative to center of canvas)
  let x = mouseX - width/2;
  let y = mouseY - height/2;
  
  // 2. x, y => polar coordinates
  let d = sqrt(pow(x, 2) + pow(y,2)); //pithagoras
  // atan2 gives us an angle in the right quadrant, between -PI and +PI
  let a = atan2(y, x);
  // transform negative counterclockwise angles into positive clockwise angles
  if(a < 0){
    a = TWO_PI + a;
  }
  
  // Determine which cell the mouse is on
  let radioUnit = (width / 2) / nTracks; // diameter unit
  let angleUnit = TWO_PI / nSteps; // angle unit
  
  let i = floor(a / angleUnit);
  let j = floor(d / radioUnit);
  

  // Toggle cell on/off
  if (i >= 0 && i < 4 && j >= 0 && j < 2){
  cells[j][i] = !cells[j][i];

}

function togglePlay() {
  if (Tone.Transport.state === "started") {
    Tone.Transport.stop();
    playButton.html("play");
  } else {
    Tone.start().then(() => {
      Tone.Transport.start();
      //scheduleRepeat.start(0);
      playButton.html("stop");
    });
  }
}

function updateTempo() {
  Tone.Transport.bpm.rampTo(tempoSlider.value());
  console.log("Current Tempo: " + Tone.Transport.bpm.value);
}

Tone.loaded().then(() => {
  console.log("All samples loaded.");
});

