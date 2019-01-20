function Multiply_M(a,b) {
    var rows = a.length;
    var cols = b[0].length;
    var seq = a[0].length;
    var output = [];

    for (var i=0; i<rows; i++) {
        output[i] = [];
        for (var j=0; j<cols; j++) {
            output[i][j] = 0;
            for (var k=0; k<seq; k++) {
                output[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    return output;

}

function Add_M(a,b) {
    for (var i=0; i<a.length; i++) {
        for (var j=0; j<a[0].length; j++) {
            a[i][j] += b[i][j];
        }
    }
}

function Add_S(a,k) {
    var output = [];
    for (var i=0; i<a.length; i++) {
        output[i] = [];
        for (var j=0; j<a[0].length; j++) {
            output[i][j] = a[i][j] + k;
        }
    }
    return output;
}

function Multiply_S(a,k) {
    var output = [];
    for (var i=0; i<a.length; i++) {
        output[i] = [];
        for (var j=0; j<a[0].length; j++) {
            output[i][j] = a[i][j] * k;
        }
    }
    return output;
}

function Multiply_E(a,b) {
    var output = [];
    for (var i=0; i<a.length; i++) {
        output[i] = [];
        for (var j=0; j<a[i].length; j++) {
            output[i][j] = a[i][j] * b[i][j];
        }
    }
    return output;
}

function Transpose_M(a) {
    var output = [];
    for (var i=0; i<a[0].length; i++) {
        output[i] = [];
        for (var j=0;j<a.length;j++) {
            output[i][j] = a[j][i];
        }
    }
    return output;
}

function Sigmoid_M(a) {
    var output = [];
    for (var i=0; i<a.length; i++) {
        output[i] = [];
        for (var j=0; j<a[0].length; j++) {
            output[i][j] = sigmoid(a[i][j]);
        }
    }
    return output;
}

function sigmoid(x) {
    return (1/(1+Math.exp(-x)));
}