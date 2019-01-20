function calcFitness(pop,fitness,cities) {
    var sum = 0;
    for (var i=0; i<pop.length; i++) {
        var d = calcDist(pop[i],cities);
        fitness[i] = 1/(d+1);
        sum += fitness[i];
    }
    for (var i=0; i<pop.length; i++) {
        fitness[i] = fitness[i]/sum;
    }    
}

function nextGen(pop,fitness) {
    var newPopItem;

    var a = random(1);
    var index = 0;
    var prob = fitness[index];
    while (prob < a) {
        index++;
        prob += fitness[index];
    }
    
    var b = floor(random(pop[index].length));
    var c = floor(random(pop[index].length));
    if (random(1) < 0.1) {
        Swap(pop[index],b,c);
    }
    return pop[index];
}