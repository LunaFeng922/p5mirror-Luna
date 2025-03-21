// Add a snare drum sound
// Play a kick/snare/snare/snare pattern

// INTERFACE
let playButton;
let tempoSlider;

// PATTERN
let totalBeats = 0;

// SOUNDS

// Create a Players object and load the "kick.mp3" and "snare.mp3" files
const kit = new Tone.Players({
  "kick": "samples/505/kick.mp3", 
  "snare": "samples/snare.mp3"
});

// Connect the player output to the computer's audio output
kit.toDestination();

// Create a loop: call playBeat every half a second
// Tone.Transport.scheduleRepeat(playBeat, 0.5);

// Create a loop: call playBeat every beat / quarter note
Tone.Transport.bpm.value = 120;
const repeatEvent = new Tone.Loop(playBeat, "4n");
repeatEvent.start(0);

// Audio playback loop
function playBeat(time) {
    kit.player("kick").start(time);
    
    // 让 Snare 在 2, 3, 4 拍播放（kick/snare/snare/snare）
    if (totalBeats % 4 !== 0) { 
        kit.player("snare").start(time);
    }
    totalBeats++;
}

// INTERFACE
function setup(){
  playButton = createButton('play');
  playButton.mouseClicked(togglePlay);
  
  tempoSlider = createSlider(20, 240, 120);
  tempoSlider.input(updateTempo);
  
}

function togglePlay(){
  if(Tone.Transport.state == "started"){
  	Tone.Transport.stop();
    playButton.html('play');
  }
  else{
    if(kit.loaded){
    	Tone.Transport.start();
    	playButton.html('stop');
    }
  }	
}

function updateTempo(){
  Tone.Transport.bpm.rampTo(tempoSlider.value());
  console.log("Current Tempo: " + Tone.Transport.bpm.value);
}