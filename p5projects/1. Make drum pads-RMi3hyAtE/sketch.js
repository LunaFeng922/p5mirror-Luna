// Click the mouse to play kick drum

// Create a Players object and load the drum kit files
const kit = new Tone.Players({
  "kick": "samples/505/kick.mp3", 
  "snare": "samples/505/snare.mp3",
  "hh": "samples/505/hh.mp3",
  "hho": "samples/505/hho.mp3"
});
kit.toDestination();

function mousePressed(){
  
  // Make sure the sound file has been completely loaded
  if(kit.loaded){
    if( mouseX < width / 2 &&
        mouseY < height /2 ){
      kit.player("kick").start();  
    }
    else if( mouseX < width / 2 &&
             mouseY > width / 2){
      kit.player("snare").start();
    }
    else if( mouseX > width / 2 &&
             mouseY < height / 2){
      kit.player("hh").start();
    }
    else if( mouseX > width / 2 &&
             mouseY > height / 2){
      kit.player("hho").start();
    }
  }
}

function setup(){
  createCanvas(200, 200); 
  background(0);
}

function draw(){
  
}

