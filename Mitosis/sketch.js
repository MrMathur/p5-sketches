var cells = [];

function setup() {
  createCanvas(800,600);
  cells.push(new Cell());
  cells.push(new Cell());
  cells.push(new Cell());
  cells.push(new Cell());
}

function draw() {
  background(181);
  for (var i=0; i<cells.length; i++) {
    cells[i].show();
    cells[i].update();
  }
}

var Cell = function(pos,r,c) {
  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = createVector(random(0,width), random(0,height));
  }

  this.r = r || 120;
  this.c = c || color(random(150,255), 0, random(150,255));

  this.update = function() {
    this.pos.add(p5.Vector.random2D());
  }

  this.check = function(x,y) {
    var d = dist(this.pos.x,this.pos.y,x,y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  this.mitosis = function() {
    return new Cell(this.pos, this.r/1.414, this.c);
  }

  this.show = function() {
    noStroke();
    fill(this.c);
    ellipse(this.pos.x,this.pos.y,this.r,this.r);
  };
}

function mousePressed() {
  for (var i=cells.length-1; i>=0; i--) {
    if (cells[i].check(mouseX,mouseY)) {
      cells.push(cells[i].mitosis());
      cells.push(cells[i].mitosis());
      cells.splice(i,1);
    }
  }
}