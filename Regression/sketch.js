var dots = [];
var regLine = {
    m: 0,
    c: 0
};
var gradDescLine = {
    m: 1,
    c: 0
}

function setup() {
    createCanvas(500,500);
}

function draw() {
    background(51);
    if (dots.length > 1) {
        regression(regLine, dots);
        gradDesc(gradDescLine, dots);
        drawLine(regLine,0);
        drawLine(gradDescLine,255);
    }
    displayDots(dots);
}

function mousePressed() {
    newDot(mouseX,mouseY,dots);
}

function gradDesc(regLine, dots) {
    var lr = 0.1;
    for (var i=0; i<dots.length; i++) {
        var x = dots[i].x;
        var y = dots[i].y;
        var guess = (regLine.m * x) + regLine.c;
        var error = y - guess;

        regLine.m += error * x * lr;
        regLine.c += error * lr;
    }
}

function newDot(x,y,dots) {
    var a = map(x,0,width,0,1);
    var b = map(y,0,height,1,0);
    var vector = createVector(a,b);
    dots.push(vector);
}

function displayDots(dots) {
    fill(255);
    noStroke();
    for (var i=0; i<dots.length; i++) {
        var a = map(dots[i].x,0,1,0,width);
        var b = map(dots[i].y,1,0,0,height);
        ellipse(a,b,5,5);
    }
}

function regression(regLine, dots) {
    var meanX = 0;
    var meanY = 0;
    for (var i=0; i<dots.length; i++) {
        meanX += dots[i].x;
        meanY += dots[i].y;
    }
    meanX = meanX / dots.length;
    console.log(meanX);
    meanY = meanY / dots.length;
    console.log(meanY);

    var num = 0;
    var den = 0;
    for (var i=0; i<dots.length; i++) {
        num += (dots[i].x - meanX)*(dots[i].y - meanY);
        den += (dots[i].x - meanX)*(dots[i].x - meanX);
    }
    var m = num/den;
    regLine.m = m;
    var c = meanY - (m * meanX);
    regLine.c = c;
}

function drawLine(regLine,bval) {
    var x1 = 0;
    var a = map(x1,0,1,0,width);
    var y1 = regLine.c;
    var b = map(y1,1,0,0,height);
    var x2 = 1;
    var c = map(x2,0,1,0,width);
    var y2 = regLine.m + regLine.c;
    var d = map(y2,1,0,0,height);
    stroke(240,bval,200);
    line(a,b,c,d);
}