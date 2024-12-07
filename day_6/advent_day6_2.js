const fs = require("fs");

let input = fs.readFileSync("advent_day6.txt");
input = input.toString().split("\n");

// console.log("input: ", input);

let maze = [];
for (let i = 0; i < input.length; i++) {
  maze.push(input[i].split(""));
}
// console.log("maze: ", maze);

// get position of guard
let guardPosition = [];
for (let i = 0; i < maze.length; i++) {
  for (let j = 0; j < maze[0].length; j++) {
    if (maze[i][j] === "^") {
      guardPosition = [i, j];
    }
  }
}
// console.log("guardposition: ", guardPosition);
// maze.pop();
let facing = "U";
let gpcopy = [...guardPosition];
let mcopy = structuredClone(maze);
// guardPosition[0] is the row index
// guardPosition[1] is the col index

// while the guard is within bounds
// according to facing (U, R, D, L). check the next spot to see what it is.
// if next spot is #. change facing to 90*. at current spot, change to X. update guard position

let count = 0;
let steps = 0;
while (
  guardPosition[0] >= 0 &&
  guardPosition[0] < maze.length &&
  guardPosition[1] >= 0 &&
  guardPosition[1] < maze[0].length
) {
  if (facing === "U") {
    // change current to X
    if (maze[guardPosition[0]][guardPosition[1]] !== "X") {
      count++;
    }
    maze[guardPosition[0]][guardPosition[1]] = "X";
    guardPosition[0] -= 1;
    steps++;
    if (
      guardPosition[0] >= 0 &&
      maze[guardPosition[0]][guardPosition[1]] === "#"
    ) {
      facing = "R";
      // go back where we came from and turn right
      guardPosition[0] += 1;
      guardPosition[1] += 1;
    }
  } else if (facing === "R") {
    if (maze[guardPosition[0]][guardPosition[1]] !== "X") {
      count++;
    }
    maze[guardPosition[0]][guardPosition[1]] = "X";
    guardPosition[1] += 1;
    steps++;
    if (
      guardPosition[1] < maze[0].length &&
      maze[guardPosition[0]][guardPosition[1]] === "#"
    ) {
      facing = "D";
      guardPosition[1] -= 1;
      guardPosition[0] += 1;
    }
  } else if (facing === "D") {
    if (maze[guardPosition[0]][guardPosition[1]] !== "X") {
      count++;
    }
    maze[guardPosition[0]][guardPosition[1]] = "X";
    guardPosition[0] += 1;
    steps++;
    if (
      guardPosition[0] < maze.length &&
      maze[guardPosition[0]][guardPosition[1]] === "#"
    ) {
      facing = "L";
      guardPosition[0] -= 1;
      guardPosition[1] -= 1;
    }
  } else {
    // facing === "L"
    if (maze[guardPosition[0]][guardPosition[1]] !== "X") {
      count++;
    }
    maze[guardPosition[0]][guardPosition[1]] = "X";
    guardPosition[1] -= 1;
    steps++;
    if (
      guardPosition[1] >= 0 &&
      maze[guardPosition[0]][guardPosition[1]] === "#"
    ) {
      facing = "U";
      guardPosition[1] += 1;
      guardPosition[0] -= 1;
    }
  }
  //   console.log(JSON.stringify(maze));
}
console.log("last: ", maze[maze.length - 1]);
console.log("first: ", maze[0]);
console.log("count: ", count);

//// part 2 ////
/// brute force.
/// we track at the current position, which direction we are facing.
/// use a dictionary to check key:value key is the current position. value is the direction we are facing
/// if we land on the same position and facing the same direcition, we are in a loop
console.log("steps: ", steps);
let gothow = 0;
let please = 0;
for (let i = 0; i < maze.length; i++) {
  for (let j = 0; j < maze[0].length; j++) {
    // console.log("gpcopy:", gpcopy);
    let mazeCopy = structuredClone(mcopy);
    if (i === gpcopy[0] && j === gpcopy[1]) {
      //   mazeCopy[i][j] = "#";
      console.log("not placing it here: ", i, j);
      continue;
    } else if (maze[i][j] === "#") {
      continue;
    } else {
      mazeCopy[i][j] = "#";
      gothow++;
    }

    let gPosition = [...gpcopy];
    facing = "U";
    let currentStep = 0;
    // current maze is mazeCopy

    let tempCorner = [];

    let tracker = {};
    let found = false;
    while (
      gPosition[0] >= 0 &&
      gPosition[0] < maze.length &&
      gPosition[1] >= 0 &&
      gPosition[1] < maze[0].length &&
      !found
    ) {
      // console.log("tracker: ", tracker);
      if (facing === "U") {
        // we are going to go up
        let imhere = [gPosition[0], gPosition[1]];
        // console.log("gpostion: ", gPosition);
        if (tracker[imhere] === undefined) {
          tracker[imhere] = ["U"];
        } else {
          if (tracker[imhere].includes("U")) {
            please++;
            found = true;
          }
        }
        currentStep++;
        gPosition[0] -= 1;
        // check if it is still within bounds first before checking if next step is #
        if (gPosition[0] >= 0 && mazeCopy[gPosition[0]][gPosition[1]] === "#") {
          // next step up is a #. we are move right now
          facing = "R";
          tempCorner.push([gPosition[0] + 1, gPosition[1]]);
          // we go the right
          gPosition[0] += 1;
          // gPosition[1] += 1;
        }
      } else if (facing === "R") {
        let imhere = [gPosition[0], gPosition[1]];
        if (tracker[imhere] === undefined) {
          tracker[imhere] = ["R"];
        } else {
          if (tracker[imhere].includes("R")) {
            please++;
            found = true;
          }
        }
        currentStep++;
        gPosition[1] += 1;
        if (
          gPosition[1] < mazeCopy[0].length &&
          mazeCopy[gPosition[0]][gPosition[1]] === "#"
        ) {
          facing = "D";
          tempCorner.push([gPosition[0], gPosition[1] - 1]);
          gPosition[1] -= 1;
        }
      } else if (facing === "D") {
        let imhere = [gPosition[0], gPosition[1]];
        if (tracker[imhere] === undefined) {
          tracker[imhere] = ["D"];
        } else {
          if (tracker[imhere].includes("D")) {
            please++;
            found = true;
          }
        }
        currentStep++;
        gPosition[0] += 1;
        if (
          gPosition[0] < mazeCopy.length &&
          mazeCopy[gPosition[0]][gPosition[1]] === "#"
        ) {
          facing = "L";
          tempCorner.push([gPosition[0] - 1, gPosition[1]]);
          gPosition[0] -= 1;
        }
      } else if (facing === "L") {
        let imhere = [gPosition[0], gPosition[1]];
        if (tracker[imhere] === undefined) {
          tracker[imhere] = ["L"];
        } else {
          if (tracker[imhere].includes("L")) {
            please++;
            found = true;
          }
        }
        currentStep++;
        gPosition[1] -= 1;
        if (gPosition[1] >= 0 && mazeCopy[gPosition[0]][gPosition[1]] === "#") {
          facing = "U";
          tempCorner.push([gPosition[0], gPosition[1] + 1]);
          gPosition[1] += 1;
        }
      }
    }
  }
}
console.log("gothow: ", gothow);

console.log("PEALSE:DFASFDSAFDSFA: ", please);
