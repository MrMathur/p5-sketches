var snake;
var food;
var scl = 20;
var framerate = 5;

function setup() {
  createCanvas(600,460);
  snake = new Snake();
  pickLocation();
}

function pickLocation() {
  var condition = false;
  var col = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(col)), floor(random(rows)));
  food.mult(scl); 
  for (var i = 0; i<snake.tail.length; i++) {
    var pos = snake.tail[i];
    var d = dist(food.x,food.y,pos.x,pos.y);
    if (d < 1) {
      condition = true;
    }
  }
  if (condition) {
    pickLocation();
  }
}

function draw() {
  frameRate(framerate);
  background(51);
  snake.death();
  snake.update();
  snake.show();

  if (snake.eat(food)) {
    pickLocation();
  }

  fill(255,0,125);
  rect(food.x,food.y,scl,scl);
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.death = function() {
    for (var i = 0; i<this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x,this.y,pos.x,pos.y);
      if (d < 1) {
        this.total = 0;
        this.tail = [];
        framerate = 5;
      }
    }    
  }

  this.update = function() {
    if (this.total === this.tail.length) {
      for (var i=0; i<this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i+1];
      }
    }    
    this.tail[this.total - 1] = createVector(this.x,this.y);

    this.x += this.xspeed*scl;
    if (this.x >= width) {
      this.x = this.x%width;
    } else if (this.x < 0) {
      this.x += width;
    }

    this.y += this.yspeed*scl;
    if (this.y >= height) {
      this.y = this.y%height;
    } else if (this.y < 0) {
      this.y += height;
    }
    //this.x = constrain(this.x, 0, width - scl);
    //this.y = constrain(this.y, 0, width - scl);
  }

  this.show = function() {
    for (var i =0; i<this.tail.length; i++) {
      fill(200);
      rect(this.tail[i].x,this.tail[i].y,scl,scl);
    }
    fill(255);
    rect(this.x,this.y,scl,scl);
  }

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    
    if (d < 1) {
      this.total++;
      framerate++;    
      return true;
    } else {
      return false;
    }
  }

  this.dir = function(y,x) {
    if (y === 0 && this.xspeed === 0) {
        this.xspeed = x;
        this.yspeed = y;   
    } else if (x === 0 && this.yspeed === 0) {
        this.xspeed = x;
        this.yspeed = y;   
    }
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.dir(-1,0);
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(1,0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir(0,1);
  } else if (keyCode === LEFT_ARROW) {
    snake.dir(0,-1);
  }
}