function Population(setLength,wordLen) {
    this.set = [];
    this.setLength = setLength;
    this.nextPool = [];
    this.highestFitness = 0;

    for (var i=0; i<this.setLength; i++) {
        var word = new Word(wordLen);
        this.set.push(word);
    }    

    this.calcSetFitness = function(targetWord) {
        for (var i=0; i<this.setLength; i++) {
            this.set[i].calcFitness(targetWord);
            if (this.set[i].fitness > this.set[this.highestFitness].fitness) {
                this.highestFitness = i;
            }
        }
        if (this.set[this.highestFitness].fitness == pow(2,wordLen)) {
            console.log("Word found: ", this.set[this.highestFitness].word);
            console.log("At generation: ", generations);
            noLoop();
        } else  {
            console.log(this.set[this.highestFitness].word);
        }
    }

    this.mutateSet = function(rate) {
        for (var i=0; i<this.setLength; i++) {
            this.set[i].mutate(rate);
        }
    }

    this.calcNextPool = function() {
        for (var i=0; i<this.setLength; i++) {
            for (var j=0; j<this.set[i].fitness; j++) {
                this.nextPool.push(this.set[i]);
            }
        }
    }

    this.updatePop = function() {
        for (var i=0; i<this.setLength; i++) {
            var a = floor(random(this.nextPool.length));
            var b = floor(random(this.nextPool.length));
            this.set[i] = crossOver(this.nextPool[a],this.nextPool[b]);
        }        
    }
}