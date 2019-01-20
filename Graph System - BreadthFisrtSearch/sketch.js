function Node(value) {
  this.value = value;
  this.edges = [];
  this.searched = false;
  this.parent = null;
}
Node.prototype.addEdge = function(neighbour) {
  this.edges.push(neighbour);
  neighbour.edges.push(this);
}
function Graph() {
  this.nodes = [];
  this.graph = {};
  this.end = null;
  this.start = null;
}
Graph.prototype.addNode = function(node) {
  this.nodes.push(node);
  var value = node.value;
  this.graph[value] = node;
}
Graph.prototype.getNode = function(actor) {
  return (this.graph[actor]);
}
Graph.prototype.setStart = function(actor) {
  this.start = this.graph[actor];
  this.start.parent = null;
  return this.start;
}
Graph.prototype.setEnd = function(actor) {
  this.end = this.graph[actor];  
  return this.end;
}
var data = {
  movies: [
    {
        title: "Kal Ho Na Ho",
        cast: [
          "Jaya Bachchan",
          "Shah Rukh Khan",
          "Saif Ali Khan",
          "Preity Zinta",
          "Sushma Seth",
          "Reema Lagoo",
          "Lilette Dubey",
          "Delnaaz Irani",
          "Shoma Anand",
          "Kamini Khanna",
          "Ketaki Dave",
          "Sulbha Arya",
          "Athit Naik",
          "Jhanak Shukla",
          "Simone Singh",
          "Satish Shah",
          "Rajpal Yadav",
          "Dara Singh",
          "Sanjay Kapoor",
          "Kajol",
          "Rani Mukerji",
          "Sonali Bendre",
          "Dheepesh Bhatt",
          "Anaita Shroff Adajania",
          "Farah Khan",
          "Uday Chopra"
        ]
    },
    {
        title: "Sacred Games",
        cast: [
          "Saif Ali Khan",
          "Nawazuddin Siddiqui",
          "Radhika Apte",
          "Neeraj Kabi",
          "Jatin Sarna",
          "Kubra Sait",
          "Jitendra Joshi",
          "Rajshri Deshpande",
          "Luke Kenny",
          "Elnaaz Norouzi",
          "Pankaj Tripathi",
          "Aamir Bashir",
          "Geetanjali Thapa",
          "Shalini Vatsa",
          "Surveen Chawla",
          "Girish Kulkarni",
          "Anupriya Goenka",
          "Danish Pandor",
          "Anil Charanjeet",
          "Vikram Kochar",
          "Samir Kochhar",
          "Chittaranjan Tripathy",
          "Rajendra Shisatkar",
          "Sukhmani Sadana",
          "Muni Jha",
          "Karan Wahi",
          "Promita Banik",
          "Nawab Shah",
          "Jaipreet Singh",
          "Raj Kashyap",
          "Affan Khan",
          "Sunny Pawar",
          "Saurabh Sachdeva",
          "Sandesh Kulkarni",
          "Vibhavari Deshpande",
          "Neha Shitole"
        ]
    },
    {
        title: "Andhadhun",
        cast: [
          "Tabu",
          "Ayushmann Khurrana",
          "Radhika Apte",
          "Anil Dhawan",
          "Zakir Hussain",
          "Ashwini Kalsekar",
          "Manav Vij",
          "Chaya Kadam",
          "Gopal K Singh",
          "Rashmi Agdekar",
          "Kabir Sajid Sheikh",
          "Rudrangshu Chakrabarti",
          "Pratik Nandkumar More",
          "Mahesh Rale",
          "Abhishek Shukla",
          "Jaydutt Vyas"
        ]
    },
    {
        title: "Cheeni Kam",
        cast: [
          "Amitabh Bachchan",
          "Tabu",
          "Paresh Rawal",
          "Zohra Sehgal",
          "Swini Khara",
          "Alexx O'Nell"
        ]
    },
    {
        title: "Ready",
        cast: [
          "Salman Khan",
          "Asin Thottumkal",
          "Mahesh Manjrekar",
          "Anuradha Patel",
          "Manoj Joshi",
          "Prachi Pathak",
          "Manoj Pahwa",
          "Puneet Issar",
          "Sharat Saxena",
          "Akhilendra Mishra",
          "Gargi Patel",
          "Nikitin Dheer",
          "Arya Babbar",
          "Eva Grover",
          "Mohit Baghel",
          "Paresh Rawal",
          "Jaswinder Gardner",
          "Sudesh Lehri",
          "Arun Bali",
          "Hemant Pandey",
          "Mithilesh Chaturvedi",
          "Kiran Ahuja",
          "Shalini Sahuta",
          "Kubra Sait",
          "Kangana Ranaut",
          "Zareen Khan",
          "Arbaaz Khan",
          "Ajay Devgn",
          "Sanjay Dutt",
          "Chunky Pandey"
        ]
    },
    {
      title: "Kabhi Khushi Kabhi Gham",
      cast: [
        "Amitabh Bachchan",
        "Jaya Bachchan",
        "Shah Rukh Khan",
        "Kajol",
        "Hrithik Roshan",
        "Kareena Kapoor",
        "Farida Jalal",
        "Jibraan Khan",
        "Rani Mukerji",
        "Alok Nath",
        "Johnny Lever",
        "Achala Sachdev",
        "Himani Shivpuri",
        "Aryan Khan",
        "Sushma Seth",
        "Shashikala",
        "Tamzin Griffin",
        "Ramona Sunavala",
        "Jeroo Writer",
        "Vikas Sethi",
        "Simone Singh",
        "Malvika Raaj",
        "Holly Holdsworth",
        "Kavesh Majmudar",
        "Jessey Lever"
      ]
    }
  ]
}

// ______________________________________

function setup() {
  noCanvas();
  var graphit = new Graph();
  for (var i=0; i<data.movies.length; i++) {
    var movie = new Node(data.movies[i].title);
    graphit.addNode(movie);
    for (var j=0; j<data.movies[i].cast.length; j++) {
      var actor = graphit.getNode(data.movies[i].cast[j]);
      if (actor == undefined) {
        actor = new Node(data.movies[i].cast[j]);
      }
      graphit.addNode(actor);
      movie.addEdge(actor);
    }
  }
  var start = graphit.setStart("Alexx O'Nell");
  var end = graphit.setEnd("Kajol");

  var queue = [];
  start.searched = true;
  queue.push(start);
  while (queue.length > 0) {
    var current = queue.shift();
    if (current == end) {
      break;
    } else {
      var edges = current.edges;
      for (var i=0; i<edges.length; i++) {
        var newNeighbour = edges[i];
        if (!newNeighbour.searched) {
          newNeighbour.searched = true;
          newNeighbour.parent = current;
          queue.push(newNeighbour);
        }
      }
    }
  }

  var path = [];
  path.push(end);
  var next = end.parent;
  while (next != null) {
    path.push(next);
    next = next.parent;
  }
  var txt = '';
  for (var i=0; i<path.length; i++) {
    var n = path[i];
    txt += n.value + ' --> ';
  }
  txt += 'END';
  createP(txt);
}