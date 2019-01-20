var vehicles = [];
var vehNum = 10;
var food = [];
var foodNum = 100;

function setup() {
  createCanvas(1024,640);
  for (var i=0; i<vehNum; i++) {
    vehicles[i] = new Vehicle(random(width),random(height));
  }
  for (var i=0; i<foodNum; i++) {
    food[i] = new Food();
  }
}

function draw() {
  if (vehicles.length == 0) {
    noLoop();
    console.log("STOPPED");
  } 
  background(51);
  if (random(1) < 0.1) {
    food.push(new Food());
  }

  /*
  var mouse = createVector(mouseX,mouseY);
  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(mouse.x,mouse.y,48,48);
  */

  //vehicle.seek(mouse);
  
  for (var i=vehicles.length-1; i>=0; i--) {
    if (random(1) < 0.005 && vehicles[i].health > 100) {
        vehicles.push(vehicles[i].clone());
    }
    if (vehicles[i].health < 0) {
      vehicles.splice(i,1);
    } else {
      vehicles[i].eat(food);
      vehicles[i].update();
      vehicles[i].disp();
    }    
  }
  
  for (var i=0; i<food.length; i++) {
    food[i].disp();
  }
}