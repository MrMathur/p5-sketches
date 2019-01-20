var allChar = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' '];
var targetWord = ['r','a','d','h','i','k','a',' ','l','a','m','p','u','s','e']; 
var wordLen = targetWord.length;
var mutationRate = 0.15;
var setLength = 200;
var generations = 0;
var population;

function crossOver(char1,char2) {
  var midPoint = floor(random(char1.wordLen));
  var child = new Word(wordLen);
  for (var i=0; i<char1.wordLen; i++) {
    if (i < midPoint) {
      child.word[i] = char1.word[i];  
    } else {
      child.word[i] = char2.word[i];
    }
  }
  return child;
}

function setup() {
  population = new Population(setLength,wordLen);
}

function draw() {
  generations ++;
  console.log("Working");
  population.calcSetFitness(targetWord);
  population.calcNextPool();
  population.updatePop();
  population.mutateSet(mutationRate);
}