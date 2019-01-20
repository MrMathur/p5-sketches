var nn;
var learning_rate = 0.1;

var bg_color = 255;

var inp = [[],[]];
var out = [[],[]];
var ball = [[],[]];

function setup( ) {
    nn = new NeuralNetwork(2,64,2, learning_rate);
    
    createCanvas(500,500);

    inp[0][0] = random(0,width)/width;
    inp[1][0] = random(0,height)/height;
}

function draw() {
    background(bg_color);

    if (bg_color === 255) {
        out[0][0] = mouseX/width;
        out[1][0] = mouseY/height;

        fill(0);
        noStroke();
        ellipse(out[0][0]*width, out[1][0]*height, 16, 16);

        nn.train(inp,out);

        inp[0][0] = out[0][0];
        inp[1][0] = out[1][0];
    } else {

        fill(255);
        noStroke();
        ellipse(ball[0][0] * width, ball[1][0] * height, 10, 10);

        ball = nn.predict(ball);        
    }
}

function mousePressed() {
    if (bg_color === 255) {
        bg_color = 0;
    } else {
        bg_color = 255;
    }

    ball[0][0] = mouseX;
    ball[1][0] = mouseY;
}