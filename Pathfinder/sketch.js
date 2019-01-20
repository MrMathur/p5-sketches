var rows = 25;
var cols = 25;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var w,h;
var path = [];

function heuristic(a,b) {
    return dist(a.i,a.j,b.i,b.j);
}

function removeFromArray(a,b) {
    for (var i = a.length-1; i>=0; i--) {
        if (a[i] == b) {
            a.splice(i,1);
        }
    }
}

function Spot(i,j) {
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.i = i;
    this.j = j;
    this.wall = false;
    if (random(1) < 0.3) {
        this.wall = true;
    }
    this.prev = undefined;
    this.neighbours = [];
    this.show = function(color) {
        fill(color);
        if (this.wall) {
            fill(0);
        }
        noStroke();
        rect(this.i*w-1,this.j*h-1,w,h);
    }
    this.addNeighbours = function(grid) {
        var i = this.i;
        var j = this.j;
        if (i<cols-1) {
            this.neighbours.push(grid[i+1][j]);
        }
        if (i>0) {
            this.neighbours.push(grid[i-1][j]);
        }
        if (j<rows-1) {
            this.neighbours.push(grid[i][j+1]);
        }
        if (j>0) {
            this.neighbours.push(grid[i][j-1]);
        }
    }
}

function setup() {
    createCanvas(400,600);
    w = width/cols;
    h = height/rows;
    for (var i =0; i< cols; i++) {
        grid[i] = new Array(rows);
    }
    for (var i =0; i< cols; i++) {
        for (var j=0; j<rows; j++) {
            grid[i][j] = new Spot(i,j);
        }
    }
    for (var i =0; i< cols; i++) {
        for (var j=0; j<rows; j++) {
            grid[i][j].addNeighbours(grid);
        }
    }
    start = grid[0][0];
    end = grid[cols-1][rows-1];
    start.wall = false;
    end.wall = false;
    openSet.push(start);
}

function draw() {
    if (openSet.length > 0) {
        var winner = 0;
        for (var i=0; i<openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        var current = openSet[winner];
        var temp = current;
        path = [];
        path.push(temp);
        while(temp.prev) {
            path.push(temp.prev);
            temp = temp.prev;
        }
        if (current == end) {
            console.log("FOUND IT");
            noLoop();
        } else {
            removeFromArray(openSet, current);
            closedSet.push(current);

            var neighbours = current.neighbours;
            for (var i=0; i<neighbours.length; i++) {
                var neighbour = neighbours[i];
                if (!closedSet.includes(neighbour) && !neighbour.wall) {
                    var tempG = current.g + 1;
                    if (openSet.includes(neighbour)) {
                        if (tempG < neighbour.g) {
                            neighbour.g = tempG;
                        }
                    } else {
                        neighbour.g = tempG;
                        openSet.push(neighbour);
                        neighbour.h = heuristic(neighbour, end);
                    }
                    neighbour.f = neighbour.h + neighbour.g;
                    neighbour.prev = current;
                }
            }
        }
    } else {
        noLoop();
        console.log("NO PATH");
    }
    background(51);
    for (var i =0; i< cols; i++) {
        for (var j=0; j<rows; j++) {
            grid[i][j].show(color(255,255,255));
        }
    }
    for (var i=0; i < openSet.length; i++) {
        openSet[i].show(color(255,0,0));
    }
    for (var i=0; i < closedSet.length; i++) {
        closedSet[i].show(color(0,255,0));
    }
    for (var i=0; i<path.length; i++) {
        path[i].show(color(0,0,255));
    }
}