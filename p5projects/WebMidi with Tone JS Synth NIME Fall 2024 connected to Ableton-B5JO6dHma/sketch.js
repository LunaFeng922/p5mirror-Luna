/*
https://webmidijs.org/
Basic setup for Identifying Ports, sending MIDI, and receiving MIDI
By David Rios Jan 2024
Adopted from Getting started page and resources at :
https://webmidijs.org/
https://webmidijs.org/docs/
*/

// tone js
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
let now = Tone.now();

let midiIn;
let midiOut;
let instr = "";
let noteIn = "";
let noteOut = "";

let prg;
let prg2;

// Enable WEBMIDI.js and trigger the onEnabled() function when ready
WebMidi.enable()
  .then(onEnabled)
  .catch((err) => alert(err));

// Function triggered when WEBMIDI.js is ready
function onEnabled() {
  //let synth;

  // Display available MIDI input devices
  if (WebMidi.inputs.length < 1) {
    document.body.innerHTML += "No device detected.";
  } else {
    WebMidi.inputs.forEach((device, index) => {
      console.log(device.name);
    });
    WebMidi.outputs.forEach((device, index) => {
      console.log(device.name);
    });
  }
  // midiIn = WebMidi.inputs[0];
  midiIn = WebMidi.inputs[0];
  midiOut = WebMidi.outputs[0];
  //console.log("Midi in: " + midiIn.name);
  //console.log("Midi out: " + midiOut.name);
  //print(midiIn.name);
  // Listen to 'note on' events on channels 1, 2 and 3 of the first input MIDI device

  midiIn.addListener(
    "noteoff",
    (e) => {
      //prg= e.type;
      // console.log(e.note.name);
      // console.log("Note Off");
     // note = e.note.name;
      noteIn = e.note.identifier
      //synth.noteAttack(noteIn, vel);
      //synth.triggerRelease(noteIn);
      
    }
    //{ channels: [1] } // only listening on channel 1
  );
  midiIn.addListener(
    "noteon",
    (e) => {
     noteIn = e.note.name;
    //   noteIn = e.note.number;
      prg= e.type;
      let octave = e.note.octave;
      let vel = e.note.velocity;
      noteIn = e.note.identifier
      //synth.triggerAttack(noteIn);
    }
    //{ channels: [1] } // only listening on channel 1
  );

  //     midiIn.addListener("controlchange", (e) => {
  //     print("event happesned");
  //     //https://webmidijs.org/api/classes/InputChannel#event:controlchange
  //     if (e.type == "controlchange") {
  //       instr = "CC";
  //       print(e.controller);
  //       print(e.value);
  //     }
  //   });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(28);
  console.log("setup");
  rectMode(CENTER);
}

function draw() {
  background(255, 255, 0);
  fill(0);
  stroke(0);
  text("Message In : " + prg, 30, 1 * height / 5 );
  text("Note In: " + noteIn, 30,  1.25* height / 5);
    text("Message Out : " + prg2, 30, 1.5* + height / 5);
  text("Note Out: " + noteOut, 30, 1.75* + height / 5);
}

function mousePressed() {
  noteOut = round(map(mouseX, 0, width, 48, 90));
  // new version of api asks for attack instead of velocity
  let noteOptions = { attack: 0.51 };
  // Channels array is MIDI standard indexed not Zero indexed
  midiOut.channels[2].playNote(noteOut, noteOptions);
  console.log(midiOut);
  prg2 = midiOut.name;
}

function mouseReleased() {
  noteOut = round(map(mouseX, 0, width, 48, 90));
  // new version of api asks for attack instead of velocity
  let noteOptions = { attack: 0.51 };
  // Channels array is MIDI standard indexed not Zero indexed
  midiOut.channels[2].stopNote(noteOut, noteOptions);
  console.log(midiOut);
  prg2 = midiOut.channels[2].number;
}
