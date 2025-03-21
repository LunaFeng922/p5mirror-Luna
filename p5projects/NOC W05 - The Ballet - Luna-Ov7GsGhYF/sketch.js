//finding references in NOC W05 example code by Prof. Moon
//press key"1" so that you come to a theatre, then press "u" to pull up the curtain;
//press key "3" and key "2" to have a preview of what is going on behind stage!
//press key "4" so that the ballet dancing show is going to begin! Welcome the dancers one by one by pressing key "m","l","r", press"s" to add some lighting! You can interact with the dancer with your mouse pos.Don't forget to press "f" when the show is finished!
//Finally, go back to press "1" again and press "d" to pull down the curtain, then you can leave the show!
//enjoy the show;)

let b1Visible = false;
let b2Visible = false;
let b3Visible = false;
let b4Visible = false;
let b4mVisible = false;
let b4lVisible = false;
let b4rVisible = false;
let b4sVisible = false;
let b4finish = false;
let b1s = [];
let b2s = [];
let b2f = [];
let b2d = [];
let b3s = [];
let b3f = [];
let b3d = [];
let b3q = [];
let w = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0 - w * 1.5);
  if (keyIsPressed && key === "1") {
    b1Visible = true;
    b2Visible = false;
    b3Visible = false;
    b4Visible = false;
    for (let i = 0; i < 100; i++) {
      b1s.push(new B1(60 * cos((PI * i) / 200), i * 3));
    }
  }
  if (b1Visible == true) {
    if (keyIsPressed && key === "u") {
      w -= 1;
    } else if (keyIsPressed && key === "d") {
      w += 1;
    }
    for (let i = 0; i < b1s.length; i++) {
      b1s[i].display();
    }
  }
  if (keyIsPressed && key === "2") {
    b1Visible = false;
    b2Visible = true;
    b3Visible = false;
    b4Visible = false;
    w = 0;
    startFrameCount = frameCount;
    for (let i = 0; i < 100; i++) {
      b2s.push(new B2S((18 - i / 8) * cos((PI * i) / 20), i * 3 - 5));
    }
    for (let j = 0; j < 20; j++) {
      b2f.push(new B2F(j * 3, 8 * sin((j / 20) * PI)));
    }
    for (let g = 0; g < 80; g++) {
      b2d.push(new B2D(100 * sin(PI * (g / 200 + 0.1)), g * 1.5));
    }
  }
  if (b2Visible == true) {
    for (let i = 0; i < b2s.length; i++) {
      if (frameCount > startFrameCount + i * 2) {
        b2s[i].display();
      }
    }
    for (let j = 0; j < b2f.length; j++) {
      if (frameCount > startFrameCount + 200 + j * 2) {
        b2f[j].display();
      }
    }
    for (let g = 0; g < b2d.length; g++) {
      if (frameCount > startFrameCount + g * 2) {
        b2d[g].display();
      }
    }
  }
  if (keyIsPressed && key === "3") {
    b1Visible = false;
    b2Visible = false;
    b3Visible = true;
    b4Visible = false;
    w = 0;
    startFrameCount = frameCount;
    for (let i = 0; i < 90; i++) {
      b3s.push(new B3S(-180 + 60 * sin((PI * i) / 100), i * 4));
    }
    for (let j = 0; j < 400; j++) {
      b3f.push(new B3F(80 * cos((j / 50) * PI), j));
    }
    for (let g = 0; g < 120; g++) {
      b3d.push(new B3D(g * 1.5, 40 * sin((g / 160) * PI - 0.5)));
    }
    for (let q = 0; q < 80; q++) {
      b3q.push(new B3Q(20 * sin((PI * q) / 160), q * 1.1));
    }
  }
  if (b3Visible == true) {
    for (let i = 0; i < b3s.length; i++) {
      if (frameCount > startFrameCount + i * 2) {
        b3s[i].display();
      }
    }
    for (let j = 0; j < b3f.length; j++) {
      if (frameCount > startFrameCount + j * 0.8) {
        b3f[j].display();
      }
    }
    for (let g = 0; g < b3d.length; g++) {
      if (frameCount > startFrameCount + g * 0.8) {
        b3d[g].display();
      }
    }
    for (let q = 0; q < b3q.length; q++) {
      if (frameCount > startFrameCount + 180 + q * 0.8) {
        b3q[q].display();
      }
    }
  }
  if (keyIsPressed && key === "4") {
    b1Visible = false;
    b2Visible = false;
    b3Visible = false;
    b4Visible = true;
    w = -255;
    b4mVisible = false;
    b4lVisible = false;
    b4rVisible = false;
    b4sVisible = false;
    b4finish = false;
  }
  if (b4Visible == true) {
    if (keyIsPressed && key === "f") {
      b4finish = true;
    } else {
      if (w <= 0) {
        w++;
      } else if (w > 0) {
        w = 0;
      }
    }
    if (b4finish === true) {
      if (w >= -255) {
        w--;
      } else if (w < -255) {
        w = -255;
      }
    }
    if (keyIsPressed && key === "s") {
      b4sVisible = true;
    }
    if (b4sVisible === true) {
      for (let x = -20; x < width + 10; x++) {
        let freq = x * 0.03 + frameCount * 0.02; // position + time
        let amp1 = map(mouseY, 200, height, 15, 20);
        let sinValue = sin(freq) * amp1;
        let dis = -dist(x, 0, 300, 0) * 0.15;
        push();
        noStroke();
        fill(255);
        circle(
          x + (mouseX - 300) * 0.06,
          dis + 0.1 * mouseY + 280 - sinValue + random(1, 10),
          random(0.5, 1)
        );
        circle(
          x + (mouseX - 300) * 0.06,
          dis + 0.1 * mouseY + 280 + sinValue - random(1, 10),
          random(0.5, 1)
        );
        scale(1.2, 1);
        circle(
          x + (mouseX - 300) * 0.06,
          dis + 0.1 * mouseY + 280 - sinValue + random(1, 5),
          random(0.5, 1)
        );
        circle(
          x + (mouseX - 300) * 0.06,
          dis + 0.1 * mouseY + 280 + sinValue - random(1, 5),
          random(0.5, 1)
        );
        pop();
      }
      for (let x = -20; x < width + 10; x = x + 5) {
        let freq = x * 0.03 + frameCount * 0.02; // position + time
        let amp1 = map(mouseY, 250, height, 15, 20);
        let sinValue = sin(freq) * amp1;
        let dis = -dist(x, 0, 300, 0) * 0.2;
        push();
        noStroke();
        fill(255);
        circle(
          x + (mouseX - 300) * 0.06,
          dis + 0.1 * mouseY + 120 - sinValue + random(1, 10),
          random(0.5, 1)
        );
        circle(
          x + (mouseX - 300) * 0.06,
          dis + 0.1 * mouseY + 120 + sinValue - random(1, 10),
          random(0.5, 1)
        );
        scale(1.2, 1);
        circle(
          x + (mouseX - 300) * 0.06,
          dis + 0.1 * mouseY + 120 - sinValue + random(1, 5),
          random(0.5, 1)
        );
        circle(
          x + (mouseX - 300) * 0.06,
          dis + 0.1 * mouseY + 120 + sinValue - random(1, 5),
          random(0.5, 1)
        );
        pop();
      }
      for (let x = -20; x < width + 10; x = x + 5) {
        let freq = x * 0.03 + frameCount * 0.02; // position + time
        let amp1 = map(mouseY, 250, height, 15, 20);
        let sinValue = sin(freq) * amp1;
        let dis = -dist(x, 0, 300, 0) * 0.2;
        push();
        noStroke();
        fill(255);
        circle(
          x + (mouseX - 300) * 0.06,
          dis + 0.1 * mouseY + 150 - sinValue + random(10, 100),
          random(0.5, 1)
        );
        circle(
          x + (mouseX - 300) * 0.06,
          dis + 0.1 * mouseY + 150 + sinValue - random(10, 100),
          random(0.5, 1)
        );
        scale(1.2, 1);
        circle(
          x + (mouseX - 300) * 0.06,
          dis + 0.1 * mouseY + 150 - sinValue + random(10, 50),
          random(0.5, 1)
        );
        circle(
          x + (mouseX - 300) * 0.06,
          dis + 0.1 * mouseY + 150 + sinValue - random(10, 50),
          random(0.5, 1)
        );
        pop();
      }
    }
    if (keyIsPressed && key === "l") {
      b4lVisible = true;
    }
    if (b4lVisible === true) {
      for (let x = 60; x < 140; x++) {
        let freq = x * 0.03 + frameCount * 0.02; // position + time
        let amp1 = map(mouseY, 250, 300, 10, 12);
        let sinValue = sin(freq) * amp1;
        let dis = dist(x, 0, 100, 0) * 0.03;

        push();
        noStroke();
        fill(255);
        circle(
          x + (mouseX - 300) * 0.06,
          0.1 * mouseY + 130 - 2 * sinValue + random(1, 3),
          random(1, 3) - dis
        );
        circle(
          x + (mouseX - 300) * 0.06,
          0.1 * mouseY + 180 - sinValue + random(1, 3),
          random(1, 5) - dis
        );
        circle(
          x + (mouseX - 300) * 0.06,
          0.1 * mouseY + 180 + sinValue - random(1, 3),
          random(1, 5) - dis
        );
        circle(
          x + (mouseX - 300) * 0.06,
          0.1 * mouseY + 180,
          random(1, 5) - dis
        );
        if (x === 100) {
          for (
            let y = 0.1 * mouseY + 110 - sinValue + random(1, 3);
            y < 270;
            y++
          ) {
            circle(
              100 - 3 * sin((y / 100) * PI) + (mouseX - 300) * 0.06,
              y,
              random(1, 1.5)
            );
            circle(
              100 + 3 * sin((y / 100) * PI) + (mouseX - 300) * 0.06,
              y + random(-10, 10),
              random(1, 1.5)
            );
          }
        }
        pop();
      }
    }
    if (keyIsPressed && key === "m") {
      b4mVisible = true;
    }
    if (b4mVisible === true) {
      for (let x = 250; x < 350; x++) {
        let freq = x * 0.03 + frameCount * 0.02; // position + time
        let amp1 = map(mouseY, 250, 300, 10, 12);
        let sinValue = sin(freq) * amp1;
        let dis = dist(x, 0, 300, 0) * 0.03;

        push();
        noStroke();
        fill(255);
        circle(
          x + (mouseX - 300) * 0.06,
          0.1 * mouseY + 150 + 2 * sinValue + random(1, 3),
          random(1, 3) - dis
        );
        circle(
          x + (mouseX - 300) * 0.06,
          0.1 * mouseY + 200 - sinValue + random(1, 3),
          random(1, 5) - dis
        );
        circle(
          x + (mouseX - 300) * 0.06,
          0.1 * mouseY + 200 + sinValue - random(1, 3),
          random(1, 5) - dis
        );
        circle(
          x + (mouseX - 300) * 0.06,
          0.1 * mouseY + 200,
          random(1, 5) - dis
        );
        if (x === 300) {
          for (
            let y = 0.1 * mouseY + 100 - sinValue + random(1, 3);
            y < 290;
            y++
          ) {
            circle(
              300 + 3 * sin((y / 100) * PI) + (mouseX - 300) * 0.06,
              y + random(-10, 10),
              random(1, 1.5)
            );
            circle(
              300 - 3 * sin((y / 100) * PI) + (mouseX - 300) * 0.06,
              y + random(-10, 10),
              random(1, 1.5)
            );
          }
        }
        pop();
      }
    }
    if (keyIsPressed && key === "r") {
      b4rVisible = true;
    }
    if (b4rVisible === true) {
      for (let x = 460; x < 540; x++) {
        let freq = x * 0.03 + frameCount * 0.02; // position + time
        let amp1 = map(mouseY, 250, 300, 10, 12);
        let sinValue = sin(freq) * amp1;
        let dis = dist(x, 0, 500, 0) * 0.03;
        push();
        noStroke();
        fill(255);
        circle(
          x + (mouseX - 300) * 0.06,
          0.1 * mouseY + 130 - 2 * sinValue + random(1, 3),
          random(1, 3) - dis
        );
        circle(
          x + (mouseX - 300) * 0.06,
          0.1 * mouseY + 180 - sinValue + random(1, 3),
          random(1, 5) - dis
        );
        circle(
          x + (mouseX - 300) * 0.06,
          0.1 * mouseY + 180 + sinValue - random(1, 3),
          random(1, 5) - dis
        );
        circle(
          x + (mouseX - 300) * 0.06,
          0.1 * mouseY + 180,
          random(1, 5) - dis
        );
        if (x === 500) {
          for (
            let y = 0.1 * mouseY + 110 - sinValue + random(1, 3);
            y < 270;
            y++
          ) {
            circle(
              500 + 3 * sin((y / 100) * PI) + (mouseX - 300) * 0.06,
              y,
              random(1, 1.5)
            );
            circle(
              500 - 3 * sin((y / 100) * PI) + (mouseX - 300) * 0.06,
              y + random(-10, 10),
              random(1, 1.5)
            );
          }
        }
        pop();
      }
    }
  }
}

class B1 {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = 1 - this.pos.y / 300;
  }
  display() {
    push();
    noStroke();
    fill(255);
    circle(this.pos.x + 0.5 * w, this.pos.y + w - 20, this.rad);
    circle(2 * this.pos.x + 0.6 * w, 1.4 * this.pos.y + w, this.rad * 1.2);
    circle(3 * this.pos.x + 0.7 * w, 1.8 * this.pos.y + w, this.rad * 1.3);
    circle(4 * this.pos.x + 0.8 * w, 2.1 * this.pos.y + w, this.rad * 1.4);
    circle(5 * this.pos.x + 0.9 * w, 2.4 * this.pos.y + w, this.rad * 1.5);
    circle(5 * this.pos.x + w, 4 * this.pos.y + w, this.rad * 1.5);

    circle(600 - (this.pos.x + 0.5 * w), this.pos.y + w - 20, this.rad);
    circle(
      600 - (2 * this.pos.x + 0.6 * w),
      1.4 * this.pos.y + w,
      this.rad * 1.2
    );
    circle(
      600 - (3 * this.pos.x + 0.7 * w),
      1.8 * this.pos.y + w,
      this.rad * 1.3
    );
    circle(
      600 - (4 * this.pos.x + 0.8 * w),
      2.1 * this.pos.y + w,
      this.rad * 1.4
    );
    circle(
      600 - (5 * this.pos.x + 0.9 * w),
      2.4 * this.pos.y + w,
      this.rad * 1.5
    );
    circle(600 - (5 * this.pos.x + w), 4 * this.pos.y + w - 10, this.rad * 1.5);
    pop();
  }
}

class B2S {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = 3 - this.pos.y / 100;
  }
  display() {
    push();
    translate(400, 0);
    noStroke();
    fill(255);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(-this.pos.x, this.pos.y, this.rad);
    scale(1.15);
    rotate(PI / 7.1);
    circle(this.pos.x - 6, this.pos.y, this.rad);
    circle(-this.pos.x - 6, this.pos.y, this.rad);
    pop();
    push();
    translate(400, 0);
    noStroke();
    fill(255);
    scale(1.1);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(-this.pos.x, this.pos.y, this.rad);
    scale(1.15);
    rotate(PI / 7.1);
    circle(this.pos.x - 6, this.pos.y, this.rad);
    circle(-this.pos.x - 6, this.pos.y, this.rad);
    pop();
  }
}

class B2F {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = 0.7;
  }
  display() {
    push();
    translate(400, 280);
    noStroke();
    fill(255);
    rotate(PI / 5);
    circle(this.pos.x - 5, this.pos.y, this.rad);
    circle(this.pos.x - 5, -this.pos.y, this.rad);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(this.pos.x, -this.pos.y, this.rad);
    scale(0.7);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(this.pos.x, -this.pos.y, this.rad);
    scale(1.4);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(this.pos.x, -this.pos.y, this.rad);

    pop();
    push();
    translate(400, 280);
    scale(1.1);
    noStroke();
    fill(255);
    rotate(PI / 5);
    circle(this.pos.x - 5, this.pos.y, this.rad);
    circle(this.pos.x - 5, -this.pos.y, this.rad);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(this.pos.x, -this.pos.y, this.rad);
    scale(0.7);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(this.pos.x, -this.pos.y, this.rad);
    scale(1.4);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(this.pos.x, -this.pos.y, this.rad);
    pop();

    push();
    translate(270, 260);
    noStroke();
    fill(255);
    rotate((2 * PI) / 3);
    scale(1.15);
    circle(this.pos.x - 5, this.pos.y, this.rad);
    circle(this.pos.x - 5, -this.pos.y, this.rad);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(this.pos.x, -this.pos.y, this.rad);
    scale(0.7);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(this.pos.x, -this.pos.y, this.rad);
    scale(1.4);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(this.pos.x, -this.pos.y, this.rad);
    pop();

    push();
    translate(270, 260);
    scale(1.1);
    noStroke();
    fill(255);
    rotate((2 * PI) / 3);
    scale(1.15);
    circle(this.pos.x - 5, this.pos.y, this.rad);
    circle(this.pos.x - 5, -this.pos.y, this.rad);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(this.pos.x, -this.pos.y, this.rad);
    scale(0.7);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(this.pos.x, -this.pos.y, this.rad);
    scale(1.4);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(this.pos.x, -this.pos.y, this.rad);
    pop();
  }
}

class B2D {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = 0.5 + this.pos.y / 100;
  }
  display() {
    push();
    translate(400, -20);
    noStroke();
    fill(255);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(-this.pos.x, this.pos.y, this.rad);
    scale(1.15);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(-this.pos.x, this.pos.y, this.rad);
    circle(this.pos.x - 6, this.pos.y, this.rad);
    circle(-this.pos.x - 6, this.pos.y, this.rad);
    rotate(PI / 7.2);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(-this.pos.x, this.pos.y, this.rad);
    circle(this.pos.x - 6, this.pos.y, this.rad);
    circle(-this.pos.x - 6, this.pos.y, this.rad);
    scale(1.2);
    circle(this.pos.x - 6, this.pos.y, this.rad);
    circle(-this.pos.x - 6, this.pos.y, this.rad);
    scale(1.3);
    circle(-this.pos.x - 6, this.pos.y, this.rad);
    pop();
  }
}

class B3S {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = 3;
  }
  display() {
    push();
    translate(200, 70);
    noStroke();
    fill(255);
    scale(0.5);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(-this.pos.x, this.pos.y, this.rad);
    scale(1.15);
    circle(this.pos.x, this.pos.y - 10, this.rad);
    circle(-this.pos.x, this.pos.y - 10, this.rad);
    pop();
  }
}

class B3F {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = 3;
    this.dis = dist(200, this.pos.y, 200, 250);
  }
  display() {
    push();
    translate(200, 125);
    noStroke();
    fill(255);
    scale(0.3);
    scale(0.8 + this.dis / 200, 1);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(-this.pos.x, this.pos.y, this.rad);
    scale(1.1, 1);
    circle(this.pos.x, this.pos.y, this.rad);
    circle(-this.pos.x, this.pos.y, this.rad);
    pop();
  }
}

class B3D {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = 1;
    this.dis = dist(200, this.pos.y, 200, 150);
  }
  display() {
    push();
    translate(200, 60);
    noStroke();
    fill(255);
    scale(0.4, 1);
    circle(this.pos.x - 50, this.pos.y, this.rad);
    circle(-this.pos.x + 50, this.pos.y, this.rad);
    scale(1.1, 1.1);
    circle(this.pos.x - 50, this.pos.y, this.rad);
    circle(-this.pos.x + 50, this.pos.y, this.rad);
    pop();

    push();
    translate(200, 300);
    noStroke();
    fill(255);
    scale(0.4, 0.5);
    circle(this.pos.x, -this.pos.y, this.rad);
    circle(-this.pos.x, -this.pos.y, this.rad);
    scale(1.1, 1.5);
    circle(this.pos.x, -this.pos.y, this.rad);
    circle(-this.pos.x, -this.pos.y, this.rad);
    pop();
  }
}

class B3Q {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = 0.3 + this.pos.y * 0.02;
  }
  display() {
    push();
    translate(190, 280);
    noStroke();
    fill(255);
    scale(1, 1.2);
    circle(this.pos.x, this.pos.y, this.rad);
    scale(1.2, 0.9);
    circle(this.pos.x + 2, this.pos.y - 12, this.rad);
    scale(1.2, 0.9);
    circle(this.pos.x + 4, this.pos.y - 14, this.rad);
    scale(1.2, 0.9);
    circle(this.pos.x + 6, this.pos.y - 16, this.rad);
    scale(1.2, 0.9);
    circle(this.pos.x + 8, this.pos.y - 18, this.rad);
    scale(1.2, 0.9);
    circle(this.pos.x + 10, this.pos.y - 20, this.rad);
    scale(1.2, 0.9);
    circle(this.pos.x + 12, this.pos.y - 22, this.rad);
    scale(1.2, 0.9);
    circle(this.pos.x + 14, this.pos.y - 24, this.rad);
    scale(1.2, 0.9);
    circle(this.pos.x + 16, this.pos.y - 26, this.rad);
    pop();

    push();
    translate(210, 280);
    noStroke();
    fill(255);
    scale(-1, 1.2);
    circle(this.pos.x, this.pos.y, this.rad);
    scale(1.2, 0.9);
    circle(this.pos.x + 2, this.pos.y - 12, this.rad);
    scale(1.2, 0.9);
    circle(this.pos.x + 4, this.pos.y - 14, this.rad);
    scale(1.2, 0.9);
    circle(this.pos.x + 6, this.pos.y - 16, this.rad);
    scale(1.2, 0.9);
    circle(this.pos.x + 8, this.pos.y - 18, this.rad);
    scale(1.2, 0.9);
    circle(this.pos.x + 10, this.pos.y - 20, this.rad);
    scale(1.2, 0.9);
    circle(this.pos.x + 12, this.pos.y - 22, this.rad);
    scale(1.2, 0.9);
    circle(this.pos.x + 14, this.pos.y - 24, this.rad);
    scale(1.2, 0.9);
    circle(this.pos.x + 16, this.pos.y - 26, this.rad);
    pop();
  }
}
