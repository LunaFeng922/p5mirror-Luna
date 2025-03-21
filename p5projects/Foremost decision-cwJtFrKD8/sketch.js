let BRANCH_ANGLE;
let joints = [];
let branches = [];

function setup() {
  createCanvas(1000, 500);
  
  BRANCH_ANGLE = PI / 6;
  
  let start1 = createVector(width, height/2);
  joints.push(start1);
  branch(start1, 0, 180);

}

function draw() {
  background(255);
  
  let windForce = map(sin(frameCount*0.005),-1,1,-0.1,0.1)
  
  let wind = createVector(windForce, 0);

  for (let i = 0; i < branches.length; i++) {
    branches[i].update(wind);
    branches[i].display();
  }

  for (let i = 0; i < joints.length; i++) {
    noStroke();
    //noFill();
    fill(255, 0, 0);
    circle(joints[i].x, joints[i].y, 10);
  }
}

function branch(from, angle, len, gen = 0) {
  let vector = p5.Vector.fromAngle(angle - PI).setMag(len);
  let to = p5.Vector.add(from, vector);

  joints.push(to);

  let thickness = map(len, 0, 200, 0.5, 30);
  
  // you don't have to draw
  strokeWeight(thickness);
  stroke(0);
  line(from.x, from.y, to.x, to.y);
  
  // construct objects
  branches.push(new Branch(from, to, thickness, 70, 0.5, gen));
  if (gen >= 5) {
    // linear: random()
    // let chance = random() ** 3 // exponential: 
    // if (chance > 0.8) { /// }
    if (random() < 0.05) {
      //fruits.push(new Fruit(from, to, pct, size) );    
    }
  }
  
  
  // alteration
  len = len * 2 / 3 * random(0.7, 1.3);
  gen++;
  
  // recursion
  if (len > 20) {
    let angle1 = angle + BRANCH_ANGLE + random(-0.5, 0.5) ;
    branch(to, angle1, len, gen);

    let angle2 = angle - BRANCH_ANGLE + random(-0.5, 0.5);
    branch(to, angle2, len, gen);
  }
  
   else if (len > 10 && len<=20) {
    let angle1 = angle + BRANCH_ANGLE + random(-0.5, 0.5);
    branch(to, angle1, len, gen);

    let angle2 = angle - BRANCH_ANGLE + random(-0.5, 0.5);
    branch(to, angle2, len, gen);
  }
}

class Branch {
  constructor(from, to, thickness, len, stiffness, gen) {
    this.from = from;
    this.to = to;
    this.thickness = thickness;
    this.len = len;
    this.k = stiffness;
    this.bend = random(-10,10);
    this.gen = gen;
  }
  
  update(wind) {
    let vector = p5.Vector.sub(this.to, this.from);
    let distance = vector.mag();
    let stretch = distance - this.len;
    let force = vector.copy().normalize().mult(stretch * this.k);

    force.add(wind);
    this.from.add(force);
    this.to.sub(force);
  }

  display() {
    beginShape();
    strokeWeight(this.thickness);
    stroke(0);
    fill(0);
    curveVertex(this.from.x, this.from.y);
    curveVertex(this.from.x, this.from.y);
    curveVertex((this.from.x+this.to.x+this.bend)*0.5, (this.from.y+this.to.y)*0.5);
    curveVertex(this.to.x, this.to.y);
    curveVertex(this.to.x, this.to.y);
    endShape();
  }
}
