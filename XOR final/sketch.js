var nn;
var learning_rate = 0.01;
var res;

var training_data = [
    {
        in: [[1],[1]],
        out: [[0]]
    },
    {
        in: [[0],[0]],
        out: [[0]]
    },
    {
        in: [[0],[1]],
        out: [[1]]
    },
    {
        in: [[1],[0]],
        out: [[1]]
    },
];

function setup( ) {
    nn = new NeuralNetwork(2,2,1, learning_rate);
    
    createCanvas(500,500);
    res = 20;
}

function draw() {

    for (var i=0; i<1000; i++) {
        var index = floor(random(4));

        var datum = training_data[index];

        nn.train(datum.in, datum.out);
    }

    background(51);

    var rows = height/res;
    var cols = width/res;

    for (var i=0; i<cols; i++) {
        for (var j=0; j<rows; j++) {
            var input = [[i/cols],[j/rows]];
            var col = nn.predict(input);
            console.log(col[0][0]);
            fill(col[0][0] * 255);
            noStroke();
            rect(i*res,j*res,res,res);
        }
    }
}