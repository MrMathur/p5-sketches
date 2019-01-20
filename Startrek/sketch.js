var stars = [];
var speed = 0;

function setup() {
  createCanvas(600,400);
  for (var i=0; i<3200; i++) {
    stars[i] = new Star();
  }
}

function draw() {
  speed = map(mouseX, 0, width, 0 , 20);
  background(0);
  translate(width/2,height/2);
  for (var i=0; i<100; i++) {
    stars[i].update();
    stars[i].show();
  }
}

function Star() {
  this.x = random(-width, width);
  this.y = random(-height,height);
  this.z = random(width);

  this.update = function() {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.x = random(-width, width);
      this.y = random(-height,height);
      this.z = random(width);
    }
  }

  this.show = function() {
    fill(255);
    noStroke();

    var sx = map(this.x/this.z,0,1,0,width);
    var sy = map(this.y/this.z,0,1,0,height);
    var r = map(this.z,0,width,8,0);
    ellipse(sx,sy,r,r);
  }
}