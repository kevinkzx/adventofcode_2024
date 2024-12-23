// maybe do BFS at each tile on the racetrack. and see that for any depths that is within 20 steps, whether this new tile is higher than where we started from.
// add this start,end position into a set. and then count how many there are?

// when doing BFS, anything up till 20 steps that is a ".", we check the tile number
// also maybe in our BFS queue, we pass in the number of stesps it takes to get to this point, take the min?

const fs = require("fs");
let input = fs.readFileSync("advent_day20.txt").toString().split("\n");
// console.log(input);
let maze = [];
for (let i = 0; i < input.length; i++) {
  maze.push(input[i].split(""));
}

console.log(maze);

const printMaze = (maze) => {
  for (let i = 0; i < maze.length; i++) {
    // console.log(JSON.stringify(maze[i]));
    let temp = [];
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j].length !== 2) {
        temp.push(maze[i][j] + " ");
      } else {
        temp.push(maze[i][j]);
      }
    }
    console.log(temp.join(""));
  }
};

printMaze(maze);

let time = 0;
let start = [];
let end = [];
for (let i = 0; i < maze.length; i++) {
  for (let j = 0; j < maze[i].length; j++) {
    if (maze[i][j] === "S") {
      start = [i, j];
    }
    if (maze[i][j] === "E") {
      end = [i, j];
      time++;
    }
    if (maze[i][j] === ".") {
      time++;
    }
  }
}
console.log("start: ", start);
console.log("end: ", end);
console.log("time: ", time);
// build my graph
let graph = {};
// use BFS to build graph
let visited = new Set();
let queue = [];
queue.push(start);
while (queue.length) {
  // add current to visited
  let curr = queue.shift(); // curr is an array of [i, j]
  visited.add(JSON.stringify(curr));
  graph[curr] = [];
  // check UP DOWN LEFT RIGHT if it is either . or E, we add to the graph. add to queue if it is not in visited
  if (
    curr[0] - 1 >= 0 &&
    (maze[curr[0] - 1][curr[1]] === "." || maze[curr[0] - 1][curr[1]] === "E")
  ) {
    graph[curr].push([curr[0] - 1, curr[1]]);
    if (visited.has(JSON.stringify([curr[0] - 1, curr[1]])) === false) {
      queue.push([curr[0] - 1, curr[1]]);
    }
  }
  if (
    curr[0] + 1 < maze.length &&
    (maze[curr[0] + 1][curr[1]] === "." || maze[curr[0] + 1][curr[1]] === "E")
  ) {
    graph[curr].push([curr[0] + 1, curr[1]]);
    if (visited.has(JSON.stringify([curr[0] + 1, curr[1]])) === false) {
      queue.push([curr[0] + 1, curr[1]]);
    }
  }
  if (
    curr[1] - 1 >= 0 &&
    (maze[curr[0]][curr[1] - 1] === "." || maze[curr[0]][curr[1] - 1] === "E")
  ) {
    graph[curr].push([curr[0], curr[1] - 1]);
    if (visited.has(JSON.stringify([curr[0], curr[1] - 1])) === false) {
      queue.push([curr[0], curr[1] - 1]);
    }
  }
  if (
    curr[1] + 1 < maze[0].length &&
    (maze[curr[0]][curr[1] + 1] === "." || maze[curr[0]][curr[1] + 1] === "E")
  ) {
    graph[curr].push([curr[0], curr[1] + 1]);
    if (visited.has(JSON.stringify([curr[0], curr[1] + 1])) === false) {
      queue.push([curr[0], curr[1] + 1]);
    }
  }
}
// console.log("graph: ", graph);

// lets number our racetrack
let mydict = {};
mydict[0] = start;
let lasttile = 0;
const numberRaceTrack = (maze) => {
  tempMaze = structuredClone(maze);
  let count = 0;
  let queue = [start];
  let visited = new Set();
  while (queue.length) {
    let curr = queue.shift();
    visited.add(JSON.stringify(curr));
    // set current as visited. get the next position from graph[curr]. for each value is graph[curr] if not in visited, we add to queue
    if (count !== 0) {
      tempMaze[curr[0]][curr[1]] = count.toString();
      mydict[count] = [curr[0], curr[1]];
    }
    let temparr = graph[curr];
    for (let i = 0; i < temparr.length; i++) {
      let temp = temparr[i];
      if (visited.has(JSON.stringify(temp)) === false) {
        queue.push(temp);
      }
    }
    count++;
  }
  tempMaze[start[0]][start[1]] = "0";
  lasttile = count - 1;
  return tempMaze;
};
let numberedRaceTrack = numberRaceTrack(maze);
printMaze(numberedRaceTrack);

console.log("lasttile: ", lasttile);
console.log("mydict: ", mydict);
let output = {};
let outputCount = 0;
for (let i = 0; i <= lasttile; i++) {
  for (let j = i + 1; j <= lasttile; j++) {
    let enter = mydict[i];
    let exit = mydict[j];
    let distance = Math.abs(enter[0] - exit[0]) + Math.abs(enter[1] - exit[1]);
    // console.log("enter, exit, distance: ", enter, exit, distance);
    // let saved = exit - enter - distance;
    if (distance <= 20) {
      let saved = j - i - distance;
      if (saved >= 100) {
        outputCount++;
        if (output[saved] === undefined) {
          output[saved] = 1;
        } else {
          output[saved]++;
        }
      }
    }
  }
}
console.log("output: ", output);
console.log("output count: ", outputCount);
