var mr = 0.5;
var variation = [-0.1,0.1];

function Vehicle(x,y,dna) {
    this.pos = createVector(x,y);
    this.vel = createVector(0,-2);
    this.acceleration = createVector(0,0);
    this.r = 20;
    this.maxSpeed = 8;
    this.maxForce = 0.05;
    this.health = 255;

    this.dna = [];
    if (dna == undefined) {
        this.dna[0] = random(-10,10);
        this.dna[1] = random(-10,10);
        this.dna[2] = random(this.r*2, height);
        this.dna[3] = random(this.r*2, height);
    } else {
        this.dna[0] = dna[0];
        if (random(1) < mr) {
            this.dna[0] += variation[floor(random(2))];
        }
        this.dna[1] = dna[1];
        if (random(1) < mr) {
            this.dna[1] += variation[floor(random(2))];
        }
        this.dna[2] = dna[2];
        if (random(1) < mr) {
            this.dna[2] += variation[floor(random(2))] * 100;
        }
        this.dna[3] = dna[3];
        if (random(1) < mr) {
            this.dna[3] += variation[floor(random(2))] * 100;
        }
    }

    this.update = function() {
        this.health -= 1;
        this.vel.add(this.acceleration);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.pos.x = constrain(this.pos.x,this.r/2,width-this.r/2);
        this.pos.y = constrain(this.pos.y,this.r/2,height-this.r/2);
        this.acceleration.mult(0);
    }

    this.behaviour = function() {

    }

    this.applyForce = function(force) {
        this.acceleration.add(force);
    }

    this.seek = function(target, index) {
        var desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSpeed);

        var steer = p5.Vector.sub(desired,this.vel);
        steer.limit(this.maxForce * this.dna[index]);

        this.applyForce(steer);
    }

    this.disp = function() {
        fill(255,255,255,this.health);
        
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.r,this.r);

        noFill();
        stroke(255,0,0);
        ellipse(this.pos.x,this.pos.y,this.dna[3],this.dna[3]);
        stroke(0,255,0);
        ellipse(this.pos.x,this.pos.y,this.dna[2],this.dna[2]);

    }

    this.eat = function(list) {
        var recordG = Infinity;
        var recordB = Infinity;
        var recordGIndex = -1;
        var recordBIndex = -1;
        for (var i=list.length-1; i>=0; i--) {
            var distance = this.pos.dist(list[i].pos);
            if (!list[i].poison) {
                if (recordG > distance && distance < this.dna[2]) {
                    recordG = distance;
                    recordGIndex = i;
                }
            } else {
                if (recordB > distance && distance < this.dna[3]) {
                    recordB = distance;
                    recordBIndex = i;
                }
            }
        }

        console.log("recordB: ",recordB);
        console.log("recordG", recordG);
        
        if (recordGIndex != -1) {
            if (recordG < (this.r + list[recordGIndex].r)/2) {
                this.health += 40;
                list.splice(recordGIndex, 1);
            } else {
                this.seek(list[recordGIndex].pos, 0);
            }
        }
        if (recordBIndex != -1) {
                if (recordB < (this.r + list[recordBIndex].r)/2) {
                this.health -= 70;
                list.splice(recordBIndex, 1);
            } else {
                this.seek(list[recordBIndex].pos, 1);
            }
        }
    }

    this.clone = function() {
        return new Vehicle(this.pos.x,this.pos.y,this.dna);
    }

}