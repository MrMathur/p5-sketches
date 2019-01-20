function Neuron() {
    this.weights_hi = [
        [
            random(-1,1),
            random(-1,1),
            random(-1,1)
        ],[
            random(-1,1),
            random(-1,1),
            random(-1,1)
        ]
    ];
    this.weights_oh = [
        [
            random(-1,1),
            random(-1,1),
            random(-1,1)
        ]
    ];

    this.predict = function(input) {
        var input_M = input;
        input_M.push([1]);

        var hidden_temp = Multiply_M(this.weights_hi,input_M);
        var hidden_M = Sigmoid_M(hidden_temp);
        hidden_M.push([1]);

        var output_temp = Multiply_M(this.weights_oh, hidden_M);
        var output_M = Sigmoid_M(output_temp);
        return output_M[0][0];
    }

    this.train = function(input, value) {

        var input_M = input;
        input_M.push([1]);

        var hidden_temp = Multiply_M(this.weights_hi,input_M);
        var hidden_M = Sigmoid_M(hidden_temp);
        var hidden_L = hidden_M.slice();
        hidden_M.push([1]);

        var output_temp = Multiply_M(this.weights_oh, hidden_M);
        var output_M = Sigmoid_M(output_temp);
        var o = output_M[0][0];

        var error = value - o;
        var alpha = 0.1;

        var temp = alpha * error * (o * (1 - o));
        var delta_oh = Transpose_M(Multiply_S(hidden_M,temp));
        
        var error_h = Multiply_S(Transpose_M(this.weights_oh), error);
        error_h.pop();

        var deriv_temp = Multiply_S((Add_S(hidden_L,-1)),-1);
        var deriv = Multiply_E(deriv_temp, hidden_L);
        var err = Multiply_E(error_h,deriv);
        var almost_error_i = Multiply_M(err,Transpose_M(input_M));
        var delta_hi = Multiply_S(almost_error_i,alpha);

        Add_M(this.weights_hi,delta_hi);
        Add_M(this.weights_oh,delta_oh);
        
    }

}

