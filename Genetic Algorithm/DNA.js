function Word(wordLen, targetWord) {
    this.wordLen = wordLen;
    this.word = [];   
    this.fitness = 0;
    for (var i=0; i<this.wordLen; i++) {
        this.word[i] = allChar[floor(random(allChar.length))];
    }

    this.mutate = function(rate) {
        for (var i=0; i<this.wordLen; i++) {
            if (random(1) < rate) {
                this.word[i] = allChar[floor(random(allChar.length))];
            }        
        }
    }

    this.calcFitness = function(targetWord) {
        for (var i=0; i<this.wordLen; i++) {
            if (targetWord[i] == this.word[i]) {
                this.fitness++;
            }
        }
        this.fitness = pow(2,this.fitness);
    }
}