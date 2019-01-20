var ship;
var aliens = [];
var scl = 20;
var missiles = [];

function setup() {
  createCanvas(800,400);
  ship = new Ship();
  for (var i=0; i<7; i++) {
    aliens[i] = new Alien(40+(100*i));
  }
}

function draw() {
  background(51);
  ship.moveShip();
  ship.show();
  var edge = false;
  for (var i=0; i<aliens.length; i++) {
    aliens[i].show();
    aliens[i].update();
    if (aliens[i].x > (width-40) || aliens[i].x < 40) {
      edge = true;
    }
  }
  if (edge) {
    for (var i=0; i<aliens.length; i++) {
      aliens[i].shiftDown();
    }
  }
  for (var i=0; i<missiles.length; i++) {
    missiles[i].show();
    missiles[i].update();
    for (var j=0; j<aliens.length; j++) {
      if (missiles[i].check(aliens[j])) {
        missiles[i].kill();
        aliens[j].kill();
      }
    }
  }
}

// --------- Ship Constructor ----------------------------------
var Ship = function() {
  this.x = width/2 - 10;
  this.y = height - 60;

  this.moveShip = function() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
  }

  this.show = function () {
    fill(255);
    rect(this.x,this.y,20,60);
  }

  this.update = function(speed) {
    this.x += speed;
  }
}
// ---------- Alien Constructor ------------------------------
var Alien = function(x) {
  this.x = x;
  this.y = 40;
  this.xspeed = 1;
  this.showAlien = true;

  this.kill = function() {
    this.showAlien = false;
  }

  this.shiftDown = function() {
    this.y += 40;
    this.xspeed *= -1;
  }

  this.show = function() {
    if (this.showAlien) {
      fill(250,150,150);
      noStroke();
      ellipse(this.x,this.y,80,80);
    }  
  }

  this.update = function() {
    this.x += this.xspeed;
  }
}

// --------- Missile Constructor ----------------------------------
var Missile = function(x) {
  this.y = height;
  this.x = x;
  this.showMissile = true;

  this.kill = function() {
    this.showMissile = false;
  }

  this.check = function(alien) {
    var d = dist(alien.x,alien.y,this.x,this.y);
    if (d < 20) {
      return true;
    } else {
      return false;
    }
  }

  this.update = function() {
    this.y -= 5;
  }

  this.show = function() {
    if (this.showMissile) {
      fill(200,200,155);
      ellipse(this.x,this.y,20,40);
    }    
  }
}

// ----------------------- Key press -----------------------------
function keyPressed() {
  if (keyCode === UP_ARROW) {
    var missile = new Missile(ship.x);
    missiles.push(missile);
  }
}