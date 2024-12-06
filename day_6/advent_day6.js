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
maze.pop();
let facing = "U";

// guardPosition[0] is the row index
// guardPosition[1] is the col index

// while the guard is within bounds
// according to facing (U, R, D, L). check the next spot to see what it is.
// if next spot is #. change facing to 90*. at current spot, change to X. update guard position

let count = 0;
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
