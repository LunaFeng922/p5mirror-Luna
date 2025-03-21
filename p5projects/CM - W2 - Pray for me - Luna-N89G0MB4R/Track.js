class Track {
  constructor(i, name, url) {
    this.i = i;

    this.player = new Tone.Player(url);
    this.player.toDestination();

    //meter
    this.meter = new Tone.Meter();
    this.meter.normalRange = true;
    this.player.connect(this.meter);

    //waveform
    this.analyser = new Tone.Analyser("waveform", 256);
    this.player.connect(this.analyser);

    //slider
    this.slider = createSlider(-60, 0);
    this.slider.input(this.setVolume.bind(this));
    this.label = createSpan(name);
    this.label.style("color", "white");
  }

  setVolume() {
    this.player.volume.rampTo(this.slider.value());
  }

  draw(wetValue) {
    let x = this.i * 80 + 80;
    let y = 200 * sin(this.i * 0.02 * PI) + 50;
    let angle = atan2(y - 0, x - width / 2);
    let a = this.meter.getValue() * 100;

    //lights
    noStroke();
    fill(255, a);

    push();
    translate(x, y);
    rotate(angle);
    scale(1.8);
    ellipse(0, 0, 40, 5);
    pop();

    push();
    translate(width - x, y);
    rotate(-angle);
    ellipse(0, 0, 40, 5);
    pop();

    //rains
    let h = this.meter.getValue() * height;

    push();
    fill(100, tracks[3].meter.getValue() * 200);
    translate(x - 0.5, y + 80 + random(-5.5));
    rect(0, 0, 1, h);
    pop();

    push();
    fill(100, tracks[3].meter.getValue() * 200);
    translate(width - x + 0.5, y + 80 + random(-5.5));
    rect(0, 0, 1, h * 0.8);
    pop();

    //vortex
    let waveform = this.analyser.getValue();
    let points = floor(waveform.length / 36);

    push();
    translate(width / 2, height - wetValue * 150);
    scale(2 - wetValue);
    noFill();
    stroke(255, 50 - 50 * wetValue);
    beginShape();
    for (let i = 0; i < waveform.length; i += points) {
      let phi = radians(map(i, 0, waveform.length, 0, 360));

      let rX = map(waveform[i], -1, 1, 8, width / 10) + 10 + this.i * 30;
      let rY = map(waveform[i], -1, 1, 8, height / 15) + 10 + this.i * 30;

      let rx = rX * cos(phi) * 1.5;
      let ry = rY * sin(phi) * 0.36;

      curveVertex(rx, ry);
    }
    endShape(CLOSE);
    pop();
  }
}
