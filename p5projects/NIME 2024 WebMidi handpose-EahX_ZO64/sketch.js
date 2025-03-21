let noteplaying1 = false;
let noteplaying2 = false;
let output;

// 确保 WebMidi 正常启用，并连接到正确的输出设备
WebMidi.enable(function (err) {
  if (err) {
    console.log("WebMidi 未能启用.", err);
  } else {
    console.log("WebMidi 启用成功!");
    output = WebMidi.getOutputByName("IAC驱动程序总线1");
    
    // 确保输出设备存在
    if (!output) {
      console.log("MIDI 输出设备未找到，检查设备是否正确连接。");
    } else {
      console.log("连接到 MIDI 输出设备：", output);
    }
  }
});

let handPose;
let video;
let hands = [];
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
let now = Tone.now();

function preload() {
  // 确保模型加载完成后开始使用
  handPose = ml5.handPose(modelReady);
}

function modelReady() {
  console.log("HandPose 模型已加载！");
}

function setup() {
  createCanvas(640, 480);
  // 创建摄像头并隐藏视频
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // 开始手势检测
  handPose.detectStart(video, gotHands);
}

function draw() {
  // 绘制摄像头视频
  image(video, 0, 0, width, height);

  // 当没有检测到手时停止所有音符（避免每帧发送 NoteOff）
  if (hands.length === 0) {
    if (noteplaying1) {
      stopNoteSafe(60);
      noteplaying1 = false;
    }
    if (noteplaying2) {
      stopNoteSafe(65);
      noteplaying2 = false;
    }
  }

  // 遍历所有检测到的手并计算手指之间的距离
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    // 大拇指和食指的距离用于控制音符 60
    if (dist(hand.thumb_tip.x, hand.thumb_tip.y, hand.index_finger_tip.x, hand.index_finger_tip.y) > 50) {
      if (!noteplaying1) {
        playNoteSafe(60);
        noteplaying1 = true;
      }
    } else {
      if (noteplaying1) {
        stopNoteSafe(60);
        noteplaying1 = false;
      }
    }

    // 大拇指和中指的距离用于控制音符 65
    if (dist(hand.thumb_tip.x, hand.thumb_tip.y, hand.middle_finger_tip.x, hand.middle_finger_tip.y) > 50) {
      if (!noteplaying2) {
        playNoteSafe(65);
        noteplaying2 = true;
      }
    } else {
      if (noteplaying2) {
        stopNoteSafe(65);
        noteplaying2 = false;
      }
    }
  }
}

// 回调函数，获取检测到的手并保存到 hands 数组中
function gotHands(results) {
  hands = results;
}

// 封装播放音符的方法，确保 output 已定义
function playNoteSafe(note) {
  if (output) {
    output.sendNoteOn(note, { channel: 1 });
    console.log("正在播放音符: ", note);
  } else {
    console.log("MIDI 输出设备未定义，无法播放音符: ", note);
  }
}

// 封装停止音符的方法，确保 output 已定义
function stopNoteSafe(note) {
  if (output) {
    output.sendNoteOff(note, { channel: 1 });
    console.log("停止音符: ", note);
  } else {
    console.log("MIDI 输出设备未定义，无法停止音符: ", note);
  }
}


