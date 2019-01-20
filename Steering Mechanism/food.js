function Food() {
    this.pos = createVector(random(width),random(height));
    this.r = 6;

    if (random(1) < 0.25) {
        this.poison = true;
    } else {
        this.poison = false;
    }
    this.disp = function() {
        if (this.poison) {
            fill(255,0,0);
        } else {
            fill(0,255,0);
        }
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.r,this.r);
    }
}