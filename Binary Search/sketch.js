function Node(val,x,y,level) {
  this.value = val;
  this.left = null;
  this.right = null;
  this.x = x;
  this.y = y;
  this.level = level;
}

Node.prototype.addNode = function(val,parentLevel) {
  if (val < this.value) {
    if (this.left == null) {
      this.left = new Node(val, this.x - (300/parentLevel), this.y + (10*parentLevel),parentLevel + 1);
    } else {
      this.left.addNode(val, parentLevel + 1);
    }
  } else if (val > this.value){
    if (this.right == null) {
      this.right = new Node(val, this.x + (300/parentLevel), this.y + (10*parentLevel), parentLevel + 1);
    } else {
      this.right.addNode(val, parentLevel + 1);
    }
  }
}

Node.prototype.visit = function(parent) {
  if (this.left != null) {
    this.left.visit(this);
  }  
  console.log(this.value);
  fill(255);
  noStroke();
  textAlign(CENTER);
  text(this.value,this.x,this.y);
  fill(255);
  stroke(2);
  line(parent.x, parent.y, this.x, this.y);
  if (this.right != null) {
    this.right.visit(this);
  }
}

Node.prototype.search = function(val) {
  if (this.value == val) {
    return this.value;
  } else if (this.left != null && val < this.value) {
    return this.left.search(val);
  } else if (this.right != null && val > this.value) {
    return this.right.search(val);
  } else {
    return "Not Found";
  }
}

function Tree() {
  this.root = null;
}

Tree.prototype.add = function(num) {
  if (this.root == null) {
    this.root = new Node(num,width/2,16,1);
  } else {
    this.root.addNode(num,1);
  }
}

Tree.prototype.traverse = function() {
  this.root.visit(this.root);
}

Tree.prototype.search = function(val) {
  console.log(this.root.search(val));
}

var tree;

function setup() {
  createCanvas(1400,600);
  tree = new Tree();
}

function draw() {
  background(51);
  tree.add(Math.floor(Math.random() * 100));
  tree.traverse();
  tree.search(101);
  frameRate(60);
}