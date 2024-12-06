const fs = require("fs");

let input = fs.readFileSync("advent_day6_custom.txt");
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
/// we count number of steps in part 1.
/// brute force to add positions. if number of steps more than part 1, this is a valid obstacle place
console.log("steps: ", steps);

let please = 0;
for (let i = 0; i < maze.length; i++) {
  for (let j = 0; j < maze[0].length; j++) {
    // console.log("gpcopy:", gpcopy);
    let diu = [...gpcopy];
    facing = "U";
    let mazeCopy = structuredClone(maze);
    let corner = [];
    if (i === gpcopy[0] && j === gpcopy[1]) {
      //   mazeCopy[i][j] = "#";
      console.log("not placing it here: ", i, j);
      break;
    } else {
      mazeCopy[i][j] = "#";
    }
    // if (i === 6 && j === 3) {
    //   console.log("maze NOW:");
    // console.log(JSON.stringify(mazeCopy));
    // }
    // console.log(JSON.stringify(mazeCopy));
    let currentStep = 0;
    let count = 0;
    while (
      diu[0] >= 0 &&
      diu[0] < maze.length &&
      diu[1] >= 0 &&
      diu[1] < maze[0].length &&
      currentStep <= steps * 2
    ) {
      //   console.log("curentstep: ", currentStep);
      if (facing === "U") {
        // change current to X
        if (mazeCopy[diu[0]][diu[1]] !== "X") {
          count++;
        }
        mazeCopy[diu[0]][diu[1]] = "X";
        diu[0] -= 1;
        currentStep++;
        if (diu[0] >= 0 && mazeCopy[diu[0]][diu[1]] === "#") {
          facing = "R";
          // go back where we came from and turn right
          diu[0] += 1;
          diu[1] += 1;
          corner.push(diu);
        }
      } else if (facing === "R") {
        if (mazeCopy[diu[0]][diu[1]] !== "X") {
          count++;
        }
        mazeCopy[diu[0]][diu[1]] = "X";
        diu[1] += 1;
        currentStep++;
        if (diu[1] < maze[0].length && mazeCopy[diu[0]][diu[1]] === "#") {
          facing = "D";
          diu[1] -= 1;
          diu[0] += 1;
          corner.push(diu);
        }
      } else if (facing === "D") {
        if (mazeCopy[diu[0]][diu[1]] !== "X") {
          count++;
        }
        mazeCopy[diu[0]][diu[1]] = "X";
        diu[0] += 1;
        currentStep++;
        if (diu[0] < maze.length && mazeCopy[diu[0]][diu[1]] === "#") {
          facing = "L";
          diu[0] -= 1;
          diu[1] -= 1;
          corner.push(diu);
        }
      } else if (facing === "L") {
        // facing === "L"
        if (mazeCopy[diu[0]][diu[1]] !== "X") {
          count++;
        }
        mazeCopy[diu[0]][diu[1]] = "X";
        diu[1] -= 1;
        currentStep++;
        if (diu[1] >= 0 && mazeCopy[diu[0]][diu[1]] === "#") {
          facing = "U";
          diu[1] += 1;
          diu[0] -= 1;
          corner.push(diu);
        }
      }
      //   console.log(currentStep);
      if (currentStep > steps) {
        // console.log("currentstep: ", currentStep);
        please++;
        console.log(corner);
        break;
      }
    }
    // if (flag) {
    //   please++;
    //   //   console.log(JSON.stringify(mazeCopy));
    //   console.log("AT HERE STONE: ", i, j);
    // }
  }
}
console.log("PEALSE:DFASFDSAFDSFA: ", please);
