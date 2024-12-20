// note that in the input
// byte position X,Y
// X is distance from the left edge
// Y is distance from the top edge

const fs = require("fs");
let input = fs.readFileSync("advent_day18.txt").toString().split("\n");
////////////////// PART 2 //////////////////
// we for loop to increase k by adding more blockers and check if we have a path
// if no path, we return instruction at k
let height = 71;
let width = 71;
let maze = [];
for (let i = 0; i < height; i++) {
  let temp = Array(width).fill(".");
  //   console.log("temp: ", temp);
  maze.push(temp);
}
for (let i = 0; i < 1024; i++) {
  //   console.log("current instruction: ", input[i]);
  let positionX = parseInt(input[i].split(",")[0]);
  let positionY = parseInt(input[i].split(",")[1]);
  //   console.log("X: ", positionX);
  //   console.log("Y: ", positionY);
  maze[positionY][positionX] = "#";
}
for (let k = 1024; k < input.length; k++) {
  console.log("k now: ", k);

  let positionX = parseInt(input[k].split(",")[0]);
  let positionY = parseInt(input[k].split(",")[1]);
  //   console.log("X: ", positionX);
  //   console.log("Y: ", positionY);
  maze[positionY][positionX] = "#";
  let start = [0, 0];
  let goal = [height - 1, width - 1];
  let graph = {};
  // we need to form our graph using BFS
  let queue = [];
  let visited = new Set();
  queue.push(start);

  while (queue.length) {
    // mark the curren as visited
    // add to graph the current position as key. the value would be spaces that it can move to.
    // add to queue if the next spot is not visited
    let curr = queue[0];
    //   console.log("queue: ", queue);
    queue.shift();
    if (visited.has(JSON.stringify(curr)) === false) {
      // console.log("at this spot now: ", curr);
      visited.add(JSON.stringify(curr));
      if (graph[JSON.stringify(curr)] === undefined) {
        graph[JSON.stringify(curr)] = [];
      }
      // check up down left right. if it is within bounds and is a free space, add to visited if not inside visited.
      // add to the value in graph

      // check up
      if (curr[0] - 1 >= 0 && maze[curr[0] - 1][curr[1]] === ".") {
        // can go up. add up to the value of the key. add to visited if not in
        graph[JSON.stringify(curr)].push([curr[0] - 1, curr[1]]);
        if (visited.has(JSON.stringify([curr[0] - 1, curr[1]])) === false) {
          queue.push([curr[0] - 1, curr[1]]);
        }
      }
      // check down
      if (curr[0] + 1 < height && maze[curr[0] + 1][curr[1]] === ".") {
        graph[JSON.stringify(curr)].push([curr[0] + 1, curr[1]]);
        if (visited.has(JSON.stringify([curr[0] + 1, curr[1]])) === false) {
          queue.push([curr[0] + 1, curr[1]]);
        }
      }
      // check left
      if (curr[1] - 1 >= 0 && maze[curr[0]][curr[1] - 1] === ".") {
        graph[JSON.stringify(curr)].push([curr[0], curr[1] - 1]);
        if (visited.has(JSON.stringify([curr[0], curr[1] - 1])) === false) {
          queue.push([curr[0], curr[1] - 1]);
        }
      }
      // check right
      if (curr[1] + 1 < width && maze[curr[0]][curr[1] + 1] === ".") {
        graph[JSON.stringify(curr)].push([curr[0], curr[1] + 1]);
        if (visited.has(JSON.stringify([curr[0], curr[1] + 1])) === false) {
          queue.push([curr[0], curr[1] + 1]);
        }
      }
    }
  }
  // console.log("graph: ", graph);

  const dijkstra = (start, graph) => {
    // in disjkstra, we will visit a unvisited node. to pick which node we visit, we look at
    // our priorityQueue that is the next shortest node to visit.
    // we then upgrade the distances array with the shortest distance to reach this current node
    //   console.log("start: ", JSON.stringify(start));
    let distances = {};
    let visited = new Set();
    let nodes = Object.keys(graph);
    // set all distances to infinite
    for (let node of nodes) {
      distances[node] = Infinity;
    }
    // set distance of start node to 0;
    distances[JSON.stringify(start)] = 0;

    while (nodes.length) {
      // sort nodes based on distance in the distances array to know which nodes to visit
      nodes.sort((a, b) => {
        return distances[a] - distances[b];
      });
      let closestNode = nodes.shift();
      // console.log("closest node: ", closestNode);
      if (distances[closestNode] === Infinity) break;

      visited.add(JSON.stringify(closestNode));
      // update minimum
      // for each neighboring node, of this current node, check if its visited. if it is not visited,
      // calculate the shortest distance to to this neighboring node from our current node and update the shortest distance
      // for (let neighbor in graph[closestNode]) {
      //   console.log("neighbor: ", neighbor);
      //   if (!visited.has(JSON.stringify(neighbor))) {
      //     let newDistance = distances[closestNode] + 1;
      //     if (newDistance < distances[JSON.stringify(neighbor)]) {
      //       distances[JSON.stringify(neighbor)] = newDistance;
      //     }
      //   }
      // }
      for (let i = 0; i < graph[closestNode].length; i++) {
        if (!visited.has(JSON.stringify(graph[closestNode][i]))) {
          let newDistance = distances[closestNode] + 1;
          if (newDistance < distances[JSON.stringify(graph[closestNode][i])]) {
            distances[JSON.stringify(graph[closestNode][i])] = newDistance;
          }
        }
      }
    }
    return distances;
  };

  let distances = dijkstra(start, graph);
  //   console.log("distances: ", distances);
  let found = false;
  for (const [key, value] of Object.entries(distances)) {
    if (key === JSON.stringify(goal)) {
      found = true;
    }
  }
  if (!found) {
    console.log("blocked at this instruciton: ", input[k]);
    break;
  }
}
