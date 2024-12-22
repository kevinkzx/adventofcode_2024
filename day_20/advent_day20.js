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
  return tempMaze;
};
let numberedRaceTrack = numberRaceTrack(maze);
printMaze(numberedRaceTrack);

// prettier-ignore
// go thru each spot in the maze (except for outer ring). find a # and see if we can cut thru it
let mydict = {};
for (let i = 1; i < maze.length - 1; i++) {
  for (let j = 1; j < maze[i].length - 1; j++) {
    let mazeClone = structuredClone(maze);
    mazeClone[end[0]][end[1]] = ".";
    mazeClone[start[0]][start[1]] = ".";
    if (maze[i][j] === "#") {
      // need to check whether the next spot after this is "."
      // if it is, we can possibly assign 1 to current spot and next spot to 2
      // after setting the shortcut, we need to run our graph search problem to see how much time we save

      // check above this spot

      // when doing our graph building, if the current spot is a 1, we can either go next . or go to 2.
      // if the current spot is 2, we can only go to .
      // on a . spot, we cannot go to 2. we can only either go to another . or 1

      // for each of the #, we check UDLR. and if its a ".", we add the coordinates, and tile number into a temp array.
      // if the temp array size is 2 or more, then its a valid shortcut that we can make
      let temp = [];
      if (mazeClone[i - 1][j] === ".") {
        temp.push([i - 1, j, numberedRaceTrack[i - 1][j]]);
      }
      if (mazeClone[i + 1][j] === ".") {
        temp.push([i + 1, j, numberedRaceTrack[i + 1][j]]);
      }
      if (mazeClone[i][j - 1] === ".") {
        temp.push([i, j - 1, numberedRaceTrack[i][j - 1]]);
      }
      if (mazeClone[i][j + 1] === ".") {
        temp.push([i, j + 1, numberedRaceTrack[i][j + 1]]);
      }
      if (temp.length >= 2) {
        // console.log("we can make a shortcut here: ", i, j);
        // console.log("temp: ", temp);
        for (let k = 0; k < temp.length; k++) {
          let enter = parseInt(temp[k][2]);
          for (let l = 0; l < temp.length; l++) {
            if (l !== k && parseInt(temp[l][2]) > enter) {
              let exit = parseInt(temp[l][2]);
              // console.log("enter: ", enter);
              // console.log("exit: ", exit);
              let secondsSaved = exit - enter - 2;
              if (secondsSaved > 0) {
                if (mydict[secondsSaved] === undefined) {
                  mydict[secondsSaved] = 1;
                } else {
                  mydict[secondsSaved]++;
                }
              }
            }
          }
        }
      }
    }
  }
}
console.log("mydict: ", mydict);
let output = 0;
for (const [key, value] of Object.entries(mydict)) {
  if (parseInt(key) >= 100) {
    output += mydict[key];
  }
}
console.log("output: ", output);
