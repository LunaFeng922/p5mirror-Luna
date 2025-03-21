let faceMesh;
let video;
let options = { maxFaces: 1, refineLandmarks: false, flipped: false };

let faces = [];
let FacePresent = false;

let preFacePresent = false;

let midiOut;

let handPresenceThreshold = 400; // 调整以匹配实际情况

WebMidi.enable()
  .then(onEnabled)
  .catch((err) => alert(err));

function onEnabled() {
  if (WebMidi.outputs.length < 1) {
    document.body.innerHTML += "No MIDI output device detected.";
  } else {
    WebMidi.outputs.forEach((device, index) => {
      console.log(device.name);
    });
    midiOut = WebMidi.outputs[0];
  }
}

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(1280, 960);

  // 视频捕获
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 开始人脸和手的检测
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  // 翻转摄像头图像
  translate(width, 0);
  scale(-1.0, 1.0);
  image(video, 0, 0, width, height);

  if (faces.length > 0) {
    let face = faces[0];

    // 左手检测
    let Face = face.keypoints[9]; // 使用合适的关键点索引
    if (Face) {
      let FaceDist = dist(Face.x, Face.y, width / 2, height / 2); // 调整距离计算方式
      FacePresent = FaceDist < handPresenceThreshold; // 如果距离小于阈值，则认为左手出现

      // 画出左手检测点
      fill(0, 255, 0); // 绿色
      ellipse(Face.x, Face.y, 20, 20);
    } else {
      FacePresent = false;
    }
    
    if (FacePresent == true && preFacePresent == false) {
      sendMidiCC(1, 64, 127); // 左手出现，发送MIDI CC打开
      preFacePresent = FacePresent;
      console.log("Face detected");
    } else if (FacePresent == false && preFacePresent == true) {
      sendMidiCC(1, 64, 0); // 左手消失，发送MIDI CC关闭
      preFacePresent = FacePresent;
      console.log("Face lost");
    }
  }
}

// 发送MIDI控制信号
function sendMidiCC(channel, control, value) {
  if (midiOut) {
    midiOut.channels[channel].sendControlChange(control, value);
  }
}

function gotFaces(results) {
  faces = results;
}

