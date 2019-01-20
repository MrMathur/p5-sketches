var nn;

var training_data = [
    {
        in: [
            [1],
            [1]
        ],
        out: 0 
    },
    {
        in: [
            [0],
            [1]
        ],
        out: 1 
    },
    {
        in: [
            [1],
            [0]
        ],
        out: 1 
    },
    {
        in: [
            [0],
            [0]
        ],
        out: 0 
    }
];

function setup() {

    nn = new Neuron();

    createCanvas(500,500);

}


function draw() {

    for (var i=0; i<5000; i++) {
        var data = training_data[floor(random(4))];
        nn.train(data.in,data.out);
    }
    var res = 10;
    for (var i=0; i<width/res; i++) {
        for (var j=0; j<height/res; j++) {
            fill(nn.predict([[(i*res)/(width)],[(j*res)/(height)]])*255);
            noStroke();
            rect(i*res,j*res,res,res);
        }
    }



}
