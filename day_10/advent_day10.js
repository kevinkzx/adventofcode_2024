const fs = require("fs");
let input = fs.readFileSync("advent_day10.txt").toString().split("\n");
// console.log("input: ", input);

let mymap = [];
for (let i = 0; i < input.length; i++) {
  mymap.push(input[i].split(""));
}
// console.log("mymap: ", mymap);
console.log("first line of map: ", mymap[0]);
mymap.pop();
console.log("last line of map: ", mymap[mymap.length - 1]);

const bfs = (graph, start, end) => {
  // example key:value pair in graph
  // '[0,2]': [ [ 1, 2 ], [ 0, 3 ] ]
  // key is string, value is array of next i,j position that it can go to
  //   console.log("in bfs");
  //   console.log("start: ", start);
  //   console.log("end: ", end);
  let temp;

  let visited = new Set();
  let queue = [];

  // mark current as visited and enqueue it
  visited.add(JSON.stringify(start));
  queue.push(start);

  while (queue.length !== 0) {
    // dequeu a item
    temp = queue.shift();

    if (JSON.stringify(temp) === JSON.stringify(end)) {
      return true;
    }
    for (let i = 0; i < graph[JSON.stringify(temp)].length; i++) {
      // if where are going is not in visited,
      // we push to queue and set to visited
      // next value is graph[JSON.stringify(temp)][i]
      if (
        visited.has(JSON.stringify(graph[JSON.stringify(temp)][i])) === false
      ) {
        queue.push(graph[JSON.stringify(temp)][i]);
        visited.add(JSON.stringify(graph[JSON.stringify(temp)][i]));
      }
    }
  }
  return false;
};

// UP mymap[i-1][j]
// DOWN mymap[i+1][j]
// LEFT mymap[i][j-1]
// RIGHT mymap[i][j+1]

// loop thru each position at mymap and form a graph.
// our graph is a dictionary. key is current [i][j] position. value is array of possible moves
// moves is only possible if next position is 1 higher than current at UP DOWN LEFT RIGHT
// if current position value is 9, we store into a separate array, target.
let target = [];
let start = [];
let graph = {};

for (let i = 0; i < mymap.length; i++) {
  for (let j = 0; j < mymap[i].length; j++) {
    // check to see if current position is value 9
    if (mymap[i][j] === "9") {
      target.push([i, j]);
      graph[JSON.stringify([i, j])] = [];
    } else {
      if (mymap[i][j] === "0") {
        start.push([i, j]);
      }
      // key is the current [i, j]
      // value is array of possible moves to UP DOWN LEFT RIGHT
      let currNumber = parseInt(mymap[i][j]);
      graph[JSON.stringify([i, j])] = [];
      if (i - 1 >= 0 && parseInt(mymap[i - 1][j]) - 1 === currNumber) {
        // UP has value
        graph[JSON.stringify([i, j])].push([i - 1, j]);
      }
      if (
        i + 1 < mymap.length &&
        parseInt(mymap[i + 1][j]) - 1 === currNumber
      ) {
        // DOWN has value
        graph[JSON.stringify([i, j])].push([i + 1, j]);
      }
      if (j - 1 >= 0 && parseInt(mymap[i][j - 1]) - 1 === currNumber) {
        // LEFT has value
        graph[JSON.stringify([i, j])].push([i, j - 1]);
      }
      if (
        j + 1 < mymap[0].length &&
        parseInt(mymap[i][j + 1]) - 1 === currNumber
      ) {
        graph[JSON.stringify([i, j])].push([i, j + 1]);
      }
    }
  }
}

let validStartEnd = {};
let output = 0;
for (let i = 0; i < start.length; i++) {
  for (let j = 0; j < target.length; j++) {
    let result = bfs(graph, start[i], target[j]);
    // console.log("result: ", result);
    if (result) {
      // console.log("there exist a path for the following");
      // console.log("start: ", start[i]);
      // console.log("target: ", target[j]);
      if (validStartEnd[JSON.stringify(start[i])] === undefined) {
        validStartEnd[JSON.stringify(start[i])] = [target[j]];
      } else {
        validStartEnd[JSON.stringify(start[i])].push(target[j]);
      }
      output++;
    }
  }
}

// console.log("start: ", start);
// console.log("target: ", target);
// console.log("graph: ", graph);
console.log("output: ", output);

/////////////////// PART 2 ///////////////////
// we want to find all the different unique paths from start to end point
// for each of the valid start & end point we found in part 1,
// we want to check for each start point, how many paths it can take to reach an end point
// console.log("part 2: ", graph);
// console.log("validStartEnd: ", validStartEnd);

let result = [];
const validPaths = (start, end, graph, path) => {
  if (start === JSON.stringify(end)) {
    result.push(path);
  }
  // console.log("this is key: ", start);
  // console.log("this is value: ", graph[start]);
  for (let i = 0; i < graph[start].length; i++) {
    validPaths(
      JSON.stringify(graph[start][i]),
      end,
      graph,
      path.concat([start])
    );
  }
};
for (const [key, value] of Object.entries(validStartEnd)) {
  for (let i = 0; i < value.length; i++) {
    // console.log("key: ", key);
    // console.log("value: ", value);
    validPaths(key, value[i], graph, [key]);
  }
}
// console.log("result: ", result);
console.log("result length: ", result.length);
