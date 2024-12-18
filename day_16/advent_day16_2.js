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

//////// MANY MANY ASSUMPTIONS GOING ON ////////
// assume that every path goes into the final spot the same direction. this just happens to work for my input
// hate to admit but upgraded dijkstra is from chatgpt.
// the difference between upgraded and normal is that, for each node, it is adding the shortest predecessor
// we then have a backtrack function that goes back from target to start and 'form' the path
// at the end we need to add 1 cos it didnt push the S node into it

const dijkstraUpgraded = (graph, start, target) => {
  const distances = {};
  const predecessors = {};
  const visited = new Set();
  const priorityQueue = [];

  // initialise distances and predecessors
  for (const node in graph) {
    distances[node] = Infinity;
    predecessors[node] = [];
  }
  distances[start] = 0;
  priorityQueue.push({ node: start, cost: 0 });

  while (priorityQueue.length > 0) {
    // sort the prio queue by cost and remove the smallest

    // console.log("visited: ", visited);
    priorityQueue.sort((a, b) => {
      return a.cost - b.cost;
    });
    const { node: currentNode, cost: currentCost } = priorityQueue.shift();

    if (visited.has(JSON.stringify(currentNode))) {
      continue; // skip this node if it has been visited
    }
    visited.add(JSON.stringify(currentNode));
    // console.log("prio q after adding: ", priorityQueue);
    for (const [neighbor, weight] of Object.entries(graph[currentNode])) {
      // console.log("object entries: neightbor: ", neighbor);
      // console.log("object entries: weight: ", weight);
      if (visited.has(JSON.stringify(neighbor))) {
        continue; // skip visited neighbors
      }
      const newCost = currentCost + weight;

      // if a new minium cost is found
      if (newCost < distances[neighbor]) {
        distances[neighbor] = newCost;
        predecessors[neighbor] = [currentNode];
        priorityQueue.push({ node: neighbor, cost: newCost });
      } else if (newCost === distances[neighbor]) {
        predecessors[neighbor].push(currentNode);
      }
    }
  }
  return { distances, predecessors };
};

const { distances, predecessors } = dijkstraUpgraded(
  graph,
  JSON.stringify(start)
  // JSON.stringify([[1, maze[0].length - 2, "N"]])
);

// console.log("minimum distances: ", distances);
// console.log("predecessors: ", predecessors);
let goalPoint = [];
let targetArr = [];
targetArr.push(JSON.stringify([1, maze[0].length - 2, "N"]));
targetArr.push(JSON.stringify([1, maze[0].length - 2, "S"]));
targetArr.push(JSON.stringify([1, maze[0].length - 2, "E"]));
targetArr.push(JSON.stringify([1, maze[0].length - 2, "W"]));
for (const [key, value] of Object.entries(distances)) {
  if (targetArr.includes(key)) {
    goalPoint.push([value]);
  }
}
console.log("goalPoint: ", goalPoint);
console.log("min: ", Math.min(...goalPoint));
let minDistance = Math.min(...goalPoint);

function findAllPaths(predecessors, start, target) {
  const paths = [];
  // console.log("backtrack: ", target);
  function backtrack(path, node) {
    if (node === start) {
      paths.push([start, ...path.reverse()]);
      return;
    }
    for (const pred of predecessors[node]) {
      backtrack([pred, ...path], pred);
    }
  }

  backtrack([], target);
  return paths;
}
const allPaths = findAllPaths(
  predecessors,
  JSON.stringify(start),
  JSON.stringify([1, maze[0].length - 2, "E"])
);

console.log("all paths with min cost: ", allPaths);
let countSet = new Set();
for (let i = 0; i < allPaths.length; i++) {
  for (let j = 0; j < allPaths[i].length; j++) {
    countSet.add(allPaths[i][j].split('"')[0]);
  }
}
console.log(countSet.size);
console.log(countSet);
