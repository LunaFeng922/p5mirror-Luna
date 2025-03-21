let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let lowNotes = ['B2', 'A#2', 'E1', 'A2', 'B1', 'F2', 'G1', 'F1', 'D#2', 'C#1', 'A#1', 'D1', 'G2', 'F#2', 
                'C2', 'G#1', 'F#1', 'C#2', 'D2', 'E2', 'C1', 'G#2', 'A#0', 'D#1', 'A1', 'B0'];
let highNotes = ['D4', 'D#3', 'B3', 'A#3', 'C4', 'F#3', 'G3', 'F3', 'C#4', 'A4', 'G#3', 'G4', 'C#3', 'A3', 
                 'D3', 'E3', 'F4', 'G#4', 'F#4', 'E4', 'C#5', 'B4', 'C5', 'A#4', 'D#4', 'C3'];

let specialCharacters = { '!': 'D4', '?': 'E4', '/': 'C4' , '.':'F4'};
let synth = new p5.PolySynth();
let displayedLetters = [];
let currentX = 100;  // 当前字母的X位置
let currentStaffGroup = 0;  // 当前五线谱组索引
let currentPage = 0;  // 当前页数

let midiAccess;  // MIDI 访问对象
let output;      // MIDI 输出对象

let currentNoteIndex = 0; // 添加一个索引来跟踪当前音符
let playbackSpeed = 1000; // 默认播放速度，单位为毫秒

function setup() {
  createCanvas(1600, 1400);  // 修改画布大小为1600x1400，适应左右两页
  textSize(32);
  textAlign(CENTER, CENTER);

  // 请求 MIDI 访问
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  } else {
    console.log("Web MIDI API not supported.");
  }
}

function onMIDISuccess(midi) {
  midiAccess = midi;
  const outputs = midiAccess.outputs;
  output = outputs.values().next().value;  // 获取第一个输出设备
  console.log("MIDI output device:", output);
}

function onMIDIFailure() {
  console.log("Failed to access MIDI devices.");
}

function draw() {
  background(255);
  
  // 绘制左侧页面的五线谱
  drawPage(0, 0);
  
  // 绘制右侧页面的五线谱
  drawPage(800, 1);
  
  // 显示所有已输入的字母
  for (let i = 0; i < displayedLetters.length; i++) {
    let letterData = displayedLetters[i];
    fill(0);
    textSize(30);
    text(letterData.letter, letterData.x + (letterData.page * 800), letterData.y);  // 处理每页的X位置偏移
  }
}

function drawPage(xOffset, page) {
  for (let i = 0; i < 4; i++) {  // 每页绘制4组五线谱
    let yBase = 100 + i * 320;  // 每组之间的间距
    drawStaffGroup(yBase, xOffset, page);
  }
}

function drawStaffGroup(yBase, xOffset, page) {
  // 高音谱表
  drawStaff(yBase, xOffset);
  textSize(130);
  text('𝄞', xOffset + 50, yBase + 35);

  // 低音谱表
  drawStaff(yBase + 140, xOffset);
  textSize(90);
  text('𝄢', xOffset + 55, yBase + 185);
}

function drawStaff(y, xOffset) {
  stroke(0);
  strokeWeight(2);
  for (let i = 0; i < 5; i++) {
    line(xOffset + 100, y + i * 20, xOffset + 700, y + i * 20);
  }
}

function mapNoteToY(note, staffGroup) {
  let noteToY = {
    'A#0': 375, 'B0': 370, 'C1': 360, 'C#1': 355, 'D1': 350, 'D#1': 345, 'E1': 340,
    'F1': 330, 'F#1': 325, 'G1': 320, 'G#1': 315, 'A1': 310, 'A#1': 305, 'B2': 300,
    'C2': 290, 'C#2': 285, 'D2': 280, 'D#2': 275, 'E2': 270, 'F2': 260, 'F#2': 255, 'G2': 250,
    'G#2': 245, 'A2': 240, 'A#2': 235, 'B2': 230,

    // 高音谱表映射
    'C3': 200, 'C#3': 195, 'D3': 190, 'D#3': 185, 'E3': 180, 'F3': 170, 'F#3': 165, 'G3': 160, 
    'G#3': 155, 'A3': 150, 'A#3': 145, 'B3': 140, 'C4': 130, 'C#4': 125, 'D4': 120, 'D#4': 115, 
    'E4': 110, 'F4': 100, 'F#4': 95, 'G4': 90, 'G#4': 85, 'A4': 80, 'A#4': 75, 'B4': 70, 'C5': 60, 
    'C#5': 55
  };
  
  // 基于当前五线谱组的位置进行偏移
  return (noteToY[note] || 220) + staffGroup * 320;  // 每组的偏移调整为320
}

function keyPressed() {
  // 检测是否按下空格键
  if (keyCode === 32) {  // 空格键
    currentNoteIndex = 0;  // 重置索引以便从头播放
    playNotesInOrder();
    return;  // 不继续处理其他按键
  }

  // 检测是否按下 Delete 或 Backspace 键
  if (keyCode === DELETE || keyCode === BACKSPACE) {
    if (displayedLetters.length > 0) {
      // 移除最后一个输入的字母
      displayedLetters.pop();
      
      currentX -= 20;
      if (currentX < 100) {
        currentX = 700;  // 返回上一行的末尾
        currentStaffGroup--;  // 切换回上一组五线谱
        if (currentStaffGroup < 0) currentStaffGroup = 3;  // 如果超出范围则回到最后一组
      }
    }
    return;  // 不继续处理其他按键
  }

  let index = letters.indexOf(key);

  // 处理特殊符号 "/"
  if (key === '/') {
    handleSpecialCharacter('/', 'C4', 2);
    return; // 不继续处理其他按键
  }

  // 处理特殊符号 "!"
  if (key === '!') {
    handleSpecialCharacter('!', 'D4', 3);
    return;
  }

  // 处理特殊符号 "?"
  if (key === '?') {
    handleSpecialCharacter('?', 'E4', 4);
    return;
  }
  
  // 处理特殊符号 "."
  if (key === '.') {
    handleSpecialCharacter('.', 'F4', 5);  // F4 对应 channel 5
    return; // 不继续处理其他按键
  }

  // 处理普通字母
  if (index !== -1) {
    let noteOut;

    if (key === key.toLowerCase()) {
      noteOut = highNotes[index % highNotes.length];  // 小写字母映射到高音区
      sendMidiNote(noteOut, 3); // channel 3 对应高音区
    } else {
      noteOut = lowNotes[index % lowNotes.length];  // 大写字母映射到低音区
      sendMidiNote(noteOut, 2);  // channel 2 对应低音区
    }

    displayedLetters.push({ letter: key, x: currentX, y: mapNoteToY(noteOut, currentStaffGroup), page: currentPage });
    currentX += 20;

    // 如果达到页面边界则切换页面
    if (currentX > 800) {
      currentX = 100;  // 重置X位置
      currentPage++;  // 切换到下一页
      if (currentPage > 1) {
        currentPage = 0;  // 如果超过最后一页，则回到第一页
        currentStaffGroup++;
        if (currentStaffGroup > 3) {
          currentStaffGroup = 0;  // 如果超出范围则回到第一组
        }
      }
    }
  }
}

function handleSpecialCharacter(char, note, channel) {
  let noteOut = note;
  sendMidiNote(noteOut, channel); // 发送MIDI信号到对应通道
  let nextSpecialChar = specialCharacters[char]; // 获取下一个特殊字符

  // 根据下一个特殊字符设定播放速度
  if (nextSpecialChar === '!') {
    playbackSpeed = 500; // 加快播放速度
  } else if (nextSpecialChar === '?') {
    playbackSpeed = 1500; // 放慢播放速度
  } else if (nextSpecialChar === '/') {
    playbackSpeed = 1000; // 重置为默认速度
  }

  // 可以在这里添加其他特殊字符对应的播放速度设置
}

function sendMidiNote(note, channel) {
  if (output) {
    output.send([0x90 + channel, note, 0x7f]); // 发送 MIDI 音符开启消息
    setTimeout(() => {
      output.send([0x80 + channel, note, 0x00]); // 发送 MIDI 音符关闭消息
    }, playbackSpeed); // 使用 playbackSpeed 控制音符的持续时间
  }
}

function playNotesInOrder() {
  if (displayedLetters.length === 0) return; // 如果没有字母则不播放

  // 播放当前音符并增加索引
  let currentLetterData = displayedLetters[currentNoteIndex];
  if (currentLetterData) {
    let noteOut = currentLetterData.letter.toLowerCase() === currentLetterData.letter
      ? highNotes[currentNoteIndex % highNotes.length]
      : lowNotes[currentNoteIndex % lowNotes.length];

    sendMidiNote(noteOut, currentLetterData.letter.toLowerCase() === currentLetterData.letter ? 3 : 2);
    
    currentNoteIndex++;
    
    // 播放下一个音符
    if (currentNoteIndex < displayedLetters.length) {
      setTimeout(playNotesInOrder, playbackSpeed); // 使用播放速度控制音符间隔
    } else {
      currentNoteIndex = 0; // 播放完毕后重置索引
    }
  }
}


