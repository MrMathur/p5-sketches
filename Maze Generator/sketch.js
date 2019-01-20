var rows, cols;
const scl = 40;
var grid = [];
var current, player;
var stack = [];
var food;

function setup() {
  frameRate(120);
  var w = scl*floor(window.innerWidth/scl);
  var h = scl*floor(window.innerHeight/scl);
  createCanvas(w,h);
  rows = height/scl;
  cols = width/scl;
  for (var j=0; j<rows; j++) {
    for (var i=0; i<cols; i++) {
      grid.push(new Cell(i,j));
    }
  }
  current = grid[0];
  player = grid[0];
  player.player = true;
  var cont = 1;
  /*while (cont) {
    current.occupy();
    var next = current.next();
    if (next != undefined) {
      stack.push(next);
      removeWalls(current,next);
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    } else if (stack.length === 0) {
      cont = 0;
    }
  }*/
  food = new Food(floor(random(0,cols)), floor(random(0,rows)));
}

function draw() {
  current.occupy();
    var next = current.next();
    if (next != undefined) {
      stack.push(next);
      removeWalls(current,next);
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    } else if (stack.length === 0) {
      cont = 0;
    }
  if (keyIsPressed) {
    var move = [];
    if (keyCode  === UP_ARROW) {
      move = [true, false, false, false];
    } else if (keyCode === RIGHT_ARROW) {
      move = [false, true, false, false];
    } else if (keyCode === DOWN_ARROW) {
      move = [false, false, true, false];
    } else if (keyCode === LEFT_ARROW) {
      move = [false, false, false, true];
    }
    update(move);
  }
  background(51);
  for (var k=0; k<rows*cols; k++) {
    grid[k].show();
  }
  food.show();
  if (check(player,food)) {
    food = new Food(floor(random(0,cols)), floor(random(0,rows)));
  }
}

var Cell = function(i,j) {
  this.i = i;
  this.j = j;
  this.status = [true,true,true,true];
  this.visited = false;
  this.player = false;

  this.next = function() {
    var nbd = [];
    var top = grid[index(this.i,this.j - 1)];
    var right = grid[index(this.i + 1, this.j)];
    var bottom = grid[index(this.i,this.j + 1)];
    var left = grid[index(this.i - 1, this.j)];
    if (top && !top.visited) {
      nbd.push(top);
    } if (right && !right.visited) {
      nbd.push(right);
    } if (bottom && !bottom.visited) {
      nbd.push(bottom);
    } if (left && !left.visited) {
      nbd.push(left);
    }

    if (nbd.length > 0) {
      var r = floor(random(0,nbd.length));
      return nbd[r];
    }

  }

  this.show = function() {
    var x = this.i*scl;
    var y = this.j*scl;
    if (this.visited) {
      noStroke();
      fill(250,150,150);
      rect(x,y,scl,scl);
      strokeWeight(2);
      stroke(255);
    }
    strokeWeight(2);
    stroke(255);
    if (this.status[0]) {
      line(x,y,x+scl,y);
    }
    if (this.status[1]) {
      line(x+scl,y,x+scl,y+scl);
    } 
    if (this.status[2]) {
      line(x+scl,y+scl,x,y+scl);
    }
    if (this.status[3]) {
      line(x,y+scl,x,y);
    }
    if (this.player) {
      noStroke();
      fill(155);
      rect(x+1,y+1,scl-2,scl-2);
      strokeWeight(2);
      stroke(255);
    }
  }

  this.occupy = function() {
    this.visited = true;
  }
}

function index(i,j) {
  if (i<0 || j<0 || i>cols-1 || j>rows-1) {
    return -1;
  }
  return i + j*cols;
}

function removeWalls(current,next) {
  var x = next.i - current.i;
  if (x === -1) {
    current.status[3] = false;
    next.status[1] = false;
  } else if (x === 1) {
    current.status[1] = false;
    next.status[3] = false;
  }

  var y = current.j - next.j;
  if (y === -1) {
    current.status[2] = false;
    next.status[0] = false;
  } else if (y === 1) {
    current.status[0] = false;
    next.status[2] = false;
  }
}

function update(move) {
  for (var k=0; k<move.length; k++) {
    if (move[k] && !player.status[k]) {
      player.player = false;
      if (k===0) {
        var prev = player;
        player = grid[index(prev.i,prev.j-1)];
        player.player = true;
        break;
      } 
      if (k===1) {
        var prev = player;
        player = grid[index(prev.i+1,prev.j)];
        player.player = true;
        break;
      }
      if (k===2) {
        var prev = player;
        player = grid[index(prev.i,prev.j+1)];
        player.player = true;
        break;
      }
      if (k===3) {
        var prev = player;
        player = grid[index(prev.i-1,prev.j)];
        player.player = true;
        break;
      }
    }
  }
}

var Food = function(i,j) {
  this.i = i;
  this.j = j;

  this.show = function() {
    var x = this.i*scl;
    var y = this.j*scl;
    noStroke();
    fill(155,105,255);
    rect(x+1,y+1,scl-2,scl-2);
    strokeWeight(2);
    stroke(255);
  }
}

function check(a,b) {
  if (a.i === b.i && a.j === b.j) {
    return true;
  } else {
    return false;
  }
}