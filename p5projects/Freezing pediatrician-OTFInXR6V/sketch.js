
let BRANCH_ANGLE;

let joints = [];

let branches = [];

function setup() {
  createCanvas(800, 600);
  background(255);

  // 设置 BRANCH_ANGLE 的值为 PI / 6，即分支角度为 30 度
  BRANCH_ANGLE = PI / 6;

  // 创建起始点对象并添加到 joints 数组中
  let start1 = createVector(width / 2, height)
  joints.push(start1);

  // 创建初始分支并展示
  branch(start1, 0, 150);
}

// 渲染函数，用于展示分支和关节
function draw() {
  // 设置背景色为黑色
  background(255);

  // 展示所有分支
  for (let i = 0; i < branches.length; i++) {
    branches[i].display();
  }

  // 展示所有关节并标记序号
  for (let i = 0; i < joints.length; i++) {
    fill(255, 0, 0); // 红色填充色
    noStroke(); // 无边框
    text(i, joints[i].x, joints[i].y); // 在关节位置展示序号
  }

  noLoop(); // 停止 draw 函数的循环调用
}

// 分支函数，用于创建分支
function branch(from, angle, len) {
  // 根据角度和长度计算分支终点位置
  let vector = p5.Vector.fromAngle(angle - PI / 2).setMag(len);
  let to = p5.Vector.add(from, vector);

  // 将终点添加到 joints 数组中
  joints.push(to);

  // 根据长度计算线条粗细
  let thickness = map(len, 0, 200, 1, 30);

  // 绘制分支线条
  strokeWeight(thickness); // 设置线条粗细
  stroke(0); // 设置线条颜色为黑色
  line(from.x, from.y, to.x, to.y); // 绘制线条

  // 添加分支对象到 branches 数组中
  branches.push(new Branch(from, to, thickness));

  // 计算新分支的长度
  len = len * 2 / 3 * random(0.7, 1.3);

  // 如果长度大于 10，则创建新的分支
  if (len > 10) {
    let angle1 = BRANCH_ANGLE + angle + random(-0.5, 0.5);
    branch(to, angle1, len);

    let angle2 = -BRANCH_ANGLE + angle + random(-0.5, 0.5);
    branch(to, angle2, len);
  }
}

// Branch 类，用于表示分支对象
class Branch {
  constructor(from, to, thickness) {
    this.from = from; // 起始点
    this.to = to; // 终点
    this.thickness = thickness; // 线条粗细
  }

  // 显示分支的方法
  display() {
    strokeWeight(this.thickness); // 设置线条粗细
    stroke(0); // 设置线条颜色为黑色
    line(this.from.x, this.from.y, this.to.x, this.to.y); // 绘制线条
  }
}
