let rec = new p5.SpeechRec();
let result = "Click on the canvas to start speech recognition.";

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  text(result, 10, 50);
}

function mousePressed() {
  rec.start();
  rec.onResult = checkResult;
  rec.onEnd = function restart() {
    rec.start();
  };
}
function checkResult() {
  result = rec.resultString.toLowerCase();
  print (result);
}
