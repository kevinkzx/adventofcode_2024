const fs = require("fs");
let input = fs.readFileSync("advent_day16.txt").toString().split("\n");

// console.log("input");
// console.log(input);

let maze = [];
for (let i = 0; i < input.length; i++) {
  maze.push(input[i].split(""));
}

const printMaze = (maze) => {
  for (let i = 0; i < maze.length; i++) {
    console.log(maze[i].join(""));
  }
};
printMaze(maze);

let start = [maze.length - 2, 1, "E"];
console.log("start position: ", start);
let goal = [1, maze[0].length - 2];
console.log("end position: ", goal);

let queue = [];
let graph = {};
let visited = new Set();
queue.push([maze.length - 2, 1, "E"]);
while (queue.length) {
  let curr = queue[0]; // curr looks something like this [13,1,"E"]
  queue.shift();
  if (visited.has(JSON.stringify(curr)) === false) {
    // check the facing direction if can move forward. if can add to dictionary.
    // and add the next positition to queue together with the facing direction.
    // else we just add the roation and the direciton to dictionary and queue
    if (graph[JSON.stringify(curr)] === undefined) {
      graph[JSON.stringify(curr)] = {};
    }
    // check the next spot that it is facing and see if it is an empty spot
    if (curr[2] === "E") {
      if (
        maze[curr[0]][curr[1] + 1] === "." ||
        maze[curr[0]][curr[1] + 1] === "E"
      ) {
        // check if next spot is in the queue. add to queue the position and direction and add to graph
        let next = [curr[0], curr[1] + 1, "E"];
        graph[JSON.stringify(curr)][JSON.stringify(next)] = 1;
        queue.push(next);
      }
      let tempn = [curr[0], curr[1], "N"];
      graph[JSON.stringify(curr)][JSON.stringify(tempn)] = 1000;
      queue.push(tempn);
      let temps = [curr[0], curr[1], "S"];
      graph[JSON.stringify(curr)][JSON.stringify(temps)] = 1000;
      queue.push(temps);
      let tempw = [curr[0], curr[1], "W"];
      graph[JSON.stringify(curr)][JSON.stringify(tempw)] = 2000;
      queue.push(tempw);
    } else if (curr[2] === "W") {
      if (
        maze[curr[0]][curr[1] - 1] === "." ||
        maze[curr[0]][curr[1] - 1] === "E"
      ) {
        let next = [curr[0], curr[1] - 1, "W"];
        graph[JSON.stringify(curr)][JSON.stringify(next)] = 1;
        queue.push(next);
      }
      let tempn = [curr[0], curr[1], "N"];
      graph[JSON.stringify(curr)][JSON.stringify(tempn)] = 1000;
      queue.push(tempn);
      let temps = [curr[0], curr[1], "S"];
      graph[JSON.stringify(curr)][JSON.stringify(temps)] = 1000;
      queue.push(temps);
      let tempe = [curr[0], curr[1], "E"];
      graph[JSON.stringify(curr)][JSON.stringify(tempe)] = 2000;
      queue.push(tempe);
    } else if (curr[2] === "N") {
      if (
        maze[curr[0] - 1][curr[1]] === "." ||
        maze[curr[0] - 1][curr[1]] === "E"
      ) {
        let next = [curr[0] - 1, curr[1], "N"];
        graph[JSON.stringify(curr)][JSON.stringify(next)] = 1;
        queue.push(next);
      }
      let tempe = [curr[0], curr[1], "E"];
      graph[JSON.stringify(curr)][JSON.stringify(tempe)] = 1000;
      queue.push(tempe);
      let tempw = [curr[0], curr[1], "W"];
      graph[JSON.stringify(curr)][JSON.stringify(tempw)] = 1000;
      queue.push(tempw);
      let temps = [curr[0], curr[1], "S"];
      graph[JSON.stringify(curr)][JSON.stringify(temps)] = 2000;
      queue.push(temps);
    } else {
      // facing S
      if (
        maze[curr[0] + 1][curr[1]] === "." ||
        maze[curr[0] + 1][curr[1]] === "E"
      ) {
        let next = [curr[0] + 1, curr[1], "S"];
        graph[JSON.stringify(curr)][JSON.stringify(next)] = 1;
        queue.push(next);
      }
      let tempe = [curr[0], curr[1], "E"];
      graph[JSON.stringify(curr)][JSON.stringify(tempe)] = 1000;
      queue.push(tempe);
      let tempw = [curr[0], curr[1], "W"];
      graph[JSON.stringify(curr)][JSON.stringify(tempw)] = 1000;
      queue.push(tempw);
      let tempn = [curr[0], curr[1], "N"];
      graph[JSON.stringify(curr)][JSON.stringify(tempn)] = 2000;
      queue.push(tempn);
    }

    // add the cost of rotation to the graph. and also add to queue

    visited.add(JSON.stringify(curr));
  } else {
    continue;
  }
}

// console.log("graph: ", graph);

const dijkstra = (graph, start) => {
  // graph would be an object
  // start would be an array [i, j] of the starting position
  //   console.log("start: ", start);
  // create an object to store the shortest distance from start node to every other node
  let distances = {};
  // set to keep track of all the visited nodes
  let visited = new Set();

  // get all the nodes of the graph
  let nodes = Object.keys(graph);
  //   console.log("nodes: ", nodes);

  // intially, set distance to all nodes to infinity
  for (let node of nodes) {
    distances[node] = Infinity;
  }
  // set distance to start node as 0
  distances[JSON.stringify(start)] = 0;

  // loop until all nodes are visited
  while (nodes.length) {
    // console.log("new while iteration");
    // sort the remaining nodes by distance and get the shortest distance to the next unvisited node
    nodes.sort((a, b) => {
      return distances[a] - distances[b];
    });
    let closestNode = nodes.shift();
    // console.log("closestNode from current: ", closestNode);

    // if the shortest distance to the closest node is still infinity, then remaining nodes are unreachable
    if (distances[closestNode] === Infinity) break;

    // mark the chosen node as visited
    visited.add(JSON.stringify(closestNode));

    // for each of the neighboring node of the current node
    for (let neighbor in graph[closestNode]) {
      // if the neighbor has not been visited yet
      if (!visited.has(neighbor)) {
        // calculate the tentative distance to the neighboring node
        let newDistance = distances[closestNode] + graph[closestNode][neighbor];

        // if the newly calculated distance is shorter, we replace it in our distances array
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
        }
      }
    }
  }
  return distances;
};
let distanceReturn = dijkstra(graph, start);
// console.log("distanceReturn: ", distanceReturn);
let goalPoint = [];
for (const [key, value] of Object.entries(distanceReturn)) {
  //   console.log("key: ", key);
  if (key === JSON.stringify([1, maze[0].length - 2, "N"])) {
    goalPoint.push(value);
  }
  if (key === JSON.stringify([1, maze[0].length - 2, "S"])) {
    goalPoint.push(value);
  }
  if (key === JSON.stringify([1, maze[0].length - 2, "E"])) {
    goalPoint.push(value);
  }
  if (key === JSON.stringify([1, maze[0].length - 2, "W"])) {
    goalPoint.push(value);
  }
}
console.log("goalPoint: ", goalPoint);
console.log("min: ", Math.min(...goalPoint));

// https://reginafurness.medium.com/dijkstras-algorithm-in-javascript-4b5db48a93d4
// https://medium.com/@adriennetjohnson/a-walkthrough-of-dijkstras-algorithm-in-javascript-e94b74192026
// https://patrickkarsh.medium.com/dijkstras-shortest-path-algorithm-in-javascript-1621556a3a15
