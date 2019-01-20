function Dot(x,y,r,col) {
    this.pos = createVector(x,y);
    this.r = r;
    this.col = col;
    this.display = function() {
        if (this.col == "red") {
            fill(255,0,0);
        } else if (this.col == "green") {
            fill(0,255,0);
        } else if (this.col == "blue") {
            fill(0,0,255);
        }
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.r,this.r);
    }
}

var dots = [];
var numDots = 150;
var k = 3;

function knn(mouse,dots,k) {
    var newDots = new Array(dots.length);
    for (var i=0; i<dots.length; i++) {
        var newDotsItem = [];
        var d = mouse.dist(dots[i].pos);
        newDotsItem[0] = d;
        newDotsItem[1] = dots[i].col;
        newDots[i] = newDotsItem;
    }
    newDots.sort(function(a,b) {
        return a[0] - b[0];
    });
    console.log(newDots);
    var greenScore = 0;
    var redScore = 0;
    for (var i=0; i<k; i++) {
        if (newDots[i][1] == "red") {
            redScore++;
        } else {
            greenScore++;
        }
    }
    if (redScore > greenScore) {
        return "red";
    } else {
        return "green";
    }
} 

function setup() {
    createCanvas(windowWidth,windowHeight);
    for (var i=0; i<numDots; i++) {
        if (random(1) < 0.5) {
            dots[i] = new Dot(random(width),random(height),20,"red");
        } else {
            dots[i] = new Dot(random(width),random(height),20,"green");
        }
        dots[i].display();
    }
}
function draw() {
    background(51);
    for (var i=0 ;i<dots.length; i++) {
        dots[i].display();
    }
    var mouse = new Dot(mouseX,mouseY,50,"blue");
    mouse.col = knn(mouse.pos,dots,k);
    mouse.display();
}
