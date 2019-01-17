let bird;
let radius = 20;
let pipes = [];
let speed = 5;
let debug = 255;
let difficulty = 5;

function setup() {
	createCanvas(windowWidth, windowHeight);

	bird = new Bird(80, height / 2, radius);

	let condition = true;
	while (condition) {
		let upper = random(0, height / 2);
		let lower = random(height / 2, height);
		if ((lower - upper) > radius * difficulty) {
			pipes[0] = new Pipe(random(0, height / 2), random(height / 2, height));
			condition = false;
		}
	}
}

function draw() {
	background(51);
	bird.show();
	bird.update();

	for (let i = pipes.length - 1; i >= 0; i--) {
		if (pipes[i].x + pipes[i].width < 0) {
			pipes.splice(i, 1);
		} else {
			pipes[i].show();
			pipes[i].update();
		}
	}

	for (let i = pipes.length - 1; i >= 0; i--) {
		if (bird.check(pipes[i])) {
			noLoop();
		}
	}

	if (frameCount % 50 == 0) {
		let condition = true;
		while (condition) {
			let upper = random(0, height / 2);
			let lower = random(height / 2, height);
			if ((lower - upper) > radius * difficulty) {
				pipes.push(new Pipe(random(0, height / 2), random(height / 2, height)));
				condition = false;
			}
		}
		speed += 0.1;
	}
}

class Pipe {
	constructor(_upper, _lower) {
		this.x = width;
		this.upper = _upper;
		this.lower = _lower;

		this.width = 50;
		this.speed = 5;
	}

	show() {
		fill(255);
		rect(this.x, this.upper, this.width, -1 * this.upper);
		rect(this.x, this.lower, this.width, this.lower);
	}

	update() {
		this.x -= speed;
	}
}

function keyPressed() {
	if (key == ' ') {
		bird.speed = -20;
	}
}

class Bird {
	constructor(_x, _y, _r) {
		this.x = _x;
		this.y = _y;
		this.r = _r;

		this.speed = 0;
		this.accelerate = 1;
	}

	show() {
		fill(debug);
		ellipse(this.x, this.y, this.r);
	}

	update() {
		if (this.y < height) {
			this.speed += this.accelerate;
			this.y += this.speed;
		} else {
			noLoop();
		}
	}

	check(pipe) {
		if (pipe.x < this.x && (pipe.x + pipe.width) > this.x) {
			if (this.y < pipe.upper) {
				return true;
			} else if (this.y > pipe.lower) {

			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}