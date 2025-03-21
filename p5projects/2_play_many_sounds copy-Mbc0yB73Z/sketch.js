const blip = new SimplePlayer("sounds/blip.wav").toDestination();
const pink = new SimplePlayer("sounds/pink.wav").toDestination();
const tears = new SimplePlayer("sounds/tears.wav").toDestination();
const takerimba = new SimplePlayer("sounds/takerimba.wav").toDestination();

let loaded = false;

function setup() {
  createCanvas(600, 400);
  background(100, 233, 100);
}

function draw() {
  if(loaded){
   background(220); 
  }
  else{
    background(220);
    text("loading...", 20, 20);
  }
}

function keyTyped(){
  if(loaded){
    if(key == 'a'){
      blip.start();
    }
    else if(key == 's'){
      pink.start();
    }
    else if(key == 'd'){
      tears.start();
    }
    else if(key = 'f'){
      takerimba.start();
    }
  }
}



Tone.loaded().then(function(){
  loaded = true;
});
