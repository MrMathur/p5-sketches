var order = [];
var orderNum = 7;
var cities = [];
var bestOrder;
var bestDist;

var population = [];
var popFitness = [];
var popNum = 10;

function Swap(arr,i,j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function ReverseFromHere(order, largestI) {
  var endArray = order.splice(largestI + 1);
  endArray.reverse();
  return order.concat(endArray);
}

function newOrder(order) {

  var largestI = -1;
  for (var i=0; i<order.length-1; i++) {
    if (order[i] < order[i+1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    console.log("Best Distance: ", bestDist);
    noLoop();
  }

  var largestJ = 0;
  for (var j=0; j<order.length; j++) {
    if (order[j] > order[largestI]) {
      largestJ = j;
    }
  }

  Swap(order, largestI, largestJ);

  order = ReverseFromHere(order, largestI);
  return order;
}

function calcDist(order, cities) {
  var sum = 0;
  for (var i=0; i<order.length-1; i++) {
    var d = dist(cities[order[i]].x,cities[order[i]].y,cities[order[i+1]].x,cities[order[i+1]].y);
    sum += d;
  }
  return sum;
}

function setup() {
  createCanvas(400,400);
  for (var i=0; i<orderNum; i++) {
    var v = createVector(random(width), random(height));
    cities[i] = v;
    order[i] = i;
  }
  for (var i=0; i< popNum; i++) {
    population[i] = shuffle(order).slice();
    calcFitness(population,popFitness,cities);
  }
  console.log("POPULATION: ",population);
  console.log("FITNESS: ",popFitness);
  bestDist = calcDist(order, cities);
  bestOrder = order.slice();
}

function draw() {
  background(255);
  fill(51);
  for (var i=0; i<cities.length; i++) {
    ellipse(cities[i].x,cities[i].y,20,20);
  }

  beginShape();
  stroke(255,0,255);
  strokeWeight(2);
  noFill();
  for (var i=0; i<bestOrder.length; i++) {
    vertex(cities[bestOrder[i]].x,cities[bestOrder[i]].y);
  }
  endShape();
  
  for(var i=0; i<population.length; i++) {
    var newDist = calcDist(population[i],cities)
    if (newDist < bestDist) {
      bestDist = newDist;
      bestOrder = population[i].slice();
      console.log("NEW BEST DISTANCE: ", bestDist);
    }
  }

  calcFitness(population,popFitness,cities);

  for(var i=0; i<population.length; i++) {
    population[i] = nextGen(population,popFitness);
  }
  /*
  beginShape();
  stroke(0,255,0);
  strokeWeight(1);
  noFill();
  for (var i=0; i<order.length; i++) {
    vertex(cities[order[i]].x,cities[order[i]].y);
  }
  endShape();

  order = newOrder(order);
  */

}