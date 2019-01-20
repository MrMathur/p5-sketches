var d = [];

function setup() {
  createCanvas(600,400);
  for (var i=0; i<1500; i++) {
    d[i] = new Drop();
  }
}

function draw() {
  background(230,230,250);
  for (var i=0; i<100; i++) {
    d[i].fall();
    d[i].show();
  }
  
}

function Drop() {
  this.x = random(0,width);
  this.y = random(-200,-100);
  this.z = random(0,20);
  this.yspeed = map(this.z,0,20,4,10);
  this.len = map(this.z,0,20,10,20);

  this.fall = function() {
    this.y += this.yspeed;
    var grav = map(this.z,0,20,0,0.2);
    this.yspeed += grav;
    if (this.y > height) {
      this.y = random(-200,-100);
      this.yspeed = map(this.z,0,20,4,10);
    }
  }

  this.show = function() {
    var thick = map(this.z,0,20,1,3);
    strokeWeight(thick);
    stroke(138,43,226);
    line(this.x,this.y,this.x,this.y+this.len);
  }
}