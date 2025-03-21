// Press keys 1 - 8 on the keyboard to play a scale
// Uncomment below to play each example

let synth = new Tone.Synth();
synth.toDestination();

let scale = [];
let f = 100; // in Hertz
let n = 12; // number of scale steps (for equal-tempered scale)

function setup() {
  createCanvas(620, 200);

  // 0. Pentatonic scale, by hand (play keys 1 - 5)
  //scale = [200, 225, 266.7, 300, 337.5, 400];

  // 1. Derive pentatonic scale
  // scale[0] = f;
  // scale[3] = f * 3 / 2;
  // scale[5] = f * 2;
  // scale[2] = scale[5] * 2 / 3;
  // scale[1] = scale[3] * 3 / 4;
  // scale[4] = scale[1] * 3 / 2;
  // console.log("pentatonic scale: ", scale);

  // 2. Derive the equal-tempered chromatic scale's frequencies, in Hz
  let f = 100;
  scale[0] = f;
  let twelfthRootOfTwo = pow(2, 1/n);
  for (let i = 0; i < n; i++) {
    scale[i + 1] = scale[i] * twelfthRootOfTwo;
  }
  console.log("chromatic scale: ", scale);
  // each step is called a 'semitone'

  // 3. Try dividing the pitch circle into 3, 4, 5 steps by changing the value of n (line 9)

  // The frequencies in the equal-tempered scales were given names.
  //In 'scientific notation', pitches range from C0 to B8 (C0, C#0/Db0, D0, ...C8, C#8/Db8, D1, and so on).
  // The letter is the name of the pitch class or chroma.
  // The number denotes the octave.

  // 4. Play the equal-tempered chromatic scale, starting at C3
  // scale = ["C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4"];

  //5. Play the equal-tempered pitches, using MIDI numbers instead of note names, starting from C3 (C3 = 60)
  // scale = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 72];
  // note: this example requires that you comment line 65 and uncomment line 68

  //4. Play an A minor scale, with note names (approximates the Aeolian mode)
  //scale = ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"];

  //5. Play a C major scale, with note names (approximates the Ionian mode)
  // scale = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"];

  // The pentatonic scale and greek modes can be approximated in the equal-tempered system.
  // See next example for using MIDI arithmetics to calculate different scales and (approximated) modes.
}

function keyPressed() {
  let pos = (parseInt(key) % n) - 1;

  let pitch = scale[pos];

  // if using midi numbers, use this line instead:
  //let pitch = Tone.Frequency(scale[pos], "midi");

  console.log("current pitch: ", pitch);
  // for midi, see _val and _units

  synth.triggerAttack(pitch);
}

function keyReleased() {
  synth.triggerRelease();
}
