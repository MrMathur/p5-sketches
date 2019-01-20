var numberOfDots = 150;
var learning_rate = 0.003;

var allDots = [];

var brain;

function setup() {
  createCanvas(500,500);
  for (var i=0; i<numberOfDots; i++) {
    var x = random(-1,1);
    var y = random(-1,1);
    var label;
    if (y < x) {
      label = 1;
    } else {
      label = 0;
    }
    allDots[i] = new Dot(x,y,label);
  }
  brain = new Perceptron();
}

function draw() {
  frameRate(10);
  background(51);
  for (var i=0; i<allDots.length; i++) {
    allDots[i].show();
  }
  brain.drawLine();
  for (var i=0; i<allDots.length; i++) {
    brain.train(allDots[i]);
  }
}

var pixelX = function(x) {
  return map(x,-1,1,0,width);
}

var pixelY = function(y) {
  return map(y,-1,1,height,0);
}

function Dot(x,y,label) {
  this.x = x;
  this.y = y;
  this.label = label;


  this.show = function() {
    noStroke();
    if (this.label === 1) {
      fill(255,0,0);
    } else {
      fill(0,255,0);
    }
    ellipse(pixelX(this.x),pixelY(this.y),8,8);
  }

}

function Perceptron() {
  this.weights = [random(-1,1),random(-1,1),random(-1,1)];

  this.output = function(a) {
    //y = mx + c 
    //w0y + w1x + w2 = 0
    var m = -(this.weights[1]/this.weights[0]);
    var c = -(this.weights[2]/this.weights[0]);
    return ((m*a) + c);
  }

  this.drawLine = function() {
    stroke(255);
    var x1 = pixelX(-1);
    var x2 = pixelX(1);
    var y1 = pixelY(this.output(-1));
    var y2 = pixelY(this.output(1));
    line(x1,y1,x2,y2);
  }
  
  this.guess = function(dot) {
    var guess = this.output(dot.x);
    if (dot.y < guess) {
      return 1;
    } else {
      return 0;
    }
  }

  this.train = function(dot) {
    var guessL = this.guess(dot);
    var error = dot.label - guessL;
    var inputs = [dot.y,dot.x,1];
    for (var i=0; i<this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * learning_rate;
    }
  }

}