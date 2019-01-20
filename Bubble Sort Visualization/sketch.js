var values = [];
var k = 0;
var j = 0;

function setup() {
  createCanvas(800,500);
  for (var i=0; i<width; i++) {
    values.push(random(height));
  }
  stroke(255);
}

function draw() {
  background(51);
  for (var i=0; i<width; i++) {
    line(i, height, i ,height - values[i]);
  }
  for (z=0; z<1000; z++) {
    if (j < values.length-k-1) {
      if (values[j] > values[j+1]) {
        var temp = values[j];
        values[j] = values[j+1];
        values[j+1] = temp;
      }
      j++;
    } else {
      j=0;
      if (k<values.length-1) {
        k++;
      } else {
        stroke(255,255,0);
      }
    }
  }
    
}