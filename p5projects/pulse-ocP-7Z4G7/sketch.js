// Create a Player object and load the "footstep.wav" file
const kick = new Tone.Player("samples/505/kick.mp3").toDestination();

// Create a loop that calls playDrum every second
let bpm = 150;
let interval = 60/bpm;
const repeatEvent = new Tone.Loop(playDrum, interval);
repeatEvent.start(0);

function playDrum(time){
    kick.start(time);  
}

// Interface: p5 functions
let toggleState = "start";
function setup(){
  createCanvas(300, 300);
}

function draw(){
  background(255);
  text("hit any key to " + toggleState, 20, 20);
}
function keyPressed(){
  if(Tone.loaded && Tone.Transport.state == "stopped"){
    Tone.Transport.start();
    toggleState = "stop";
  }
  else{
    Tone.Transport.stop();
    toggleState = "start"
  }
}
