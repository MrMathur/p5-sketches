const w = 40;
var cols,rows;
var grid;
var lost = false;

function setup() {
    createCanvas(801,401);
    cols = floor(width/w);
    rows = floor(height/w);
    grid = makeArray(rows,cols);
    for (var i=0; i<cols; i++) {
        for (var j=0; j<rows; j++) {
            grid[i][j] = new Cell(i,j);
            if (random(1) < 0.1) {
                grid[i][j].bomb = true;
            }
        }
    }
}

function draw() {
    background(255);
    for (var i=0; i<cols; i++) {
        for (var j=0; j<rows; j++) {
            grid[i][j].show();
        }
    }
    check();
}

var Cell = function(i,j) {
    this.i = i;
    this.j = j;
    this.revealed = false;
    this.bomb = false;
    this.totalNeighbours = 0;

    this.show = function() {
        stroke(0);
        noFill();
        rect(this.i * w, this.j * w, w, w);
        if (this.revealed) {
            if (this.bomb) {
                noStroke();
                fill(127);
                if (!lost) {
                    fill(255,0,0);
                } 
                ellipse(this.i*w + w/2, this.j*w + w/2,w/2,w/2);
                noFill();
            } else {
                fill(200);
                rect(this.i * w, this.j * w, w, w);
                if (this.totalNeighbours) {
                    textAlign(CENTER);
                    textSize(32);
                    fill(0);
                    text(this.totalNeighbours, this.i*w+w/2, this.j*w+30);
                }
            }
        }
    }

    this.reveal = function() {
        this.revealed = true;
        if (!this.bomb) {
            this.calcNeighbours();
            if (this.totalNeighbours === 0) {
                this.surround();
            }
        }
    }

    this.surround = function() {
        for (var i=-1; i<=1; i++) {
            for (var j=-1; j<=1; j++) {
                var x = this.i+i;
                var y = this.j+j;
                if (x>=0 && y>=0 && x<cols && y<rows) {
                    if (!grid[x][y].revealed) {
                        grid[x][y].reveal();
                    }
                }
            }
        }     
    }

    this.calcNeighbours = function() {
        this.totalNeighbours = 0;
        for (var i=-1; i<=1; i++) {
            for (var j=-1; j<=1; j++) {
                var x = this.i+i;
                var y = this.j+j;
                if (x>=0 && y>=0 && x<cols && y<rows) {
                    if (grid[this.i+i][this.j+j].bomb) {
                        this.totalNeighbours++;
                    }
                }
            }
        }
    }
}

function makeArray(rows,cols) {
    var array = [];
    for (var k=0; k<cols; k++) {
        array.push([]);
    }
    return array;
}

function mousePressed() {
    for (var i=0; i<cols; i++) {
        for (var j=0; j<rows; j++) {
            if ((mouseX > i*w && mouseX < i*w+w) && (mouseY > j*w && mouseY < j*w+w)) {
                if (grid[i][j].bomb) {
                    lost = true;
                    gameOver();
                } else {
                    grid[i][j].reveal();
                }
            }
        }
    }
}

function gameOver() {
    for (var i=0; i<cols; i++) {
        for (var j=0; j<rows; j++) {
            grid[i][j].reveal();
        }
    } 
}

function check() {
    var total = 0;
    for (var i=0; i<cols; i++) {
        for (var j=0; j<rows; j++) {
            if (!grid[i][j].bomb) {
                if (!grid[i][j].revealed) {
                    total++;
                }
            }
        }
    }
    if (total === 0) {
        gameOver();
    }
}