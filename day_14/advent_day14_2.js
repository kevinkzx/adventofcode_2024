const fs = require("fs");
let input = fs.readFileSync("advent_day14.txt").toString().split("\n");

let gridHeight = 103;
let gridWidth = 101;
let grid = [];
for (let i = 0; i < gridHeight; i++) {
  grid[i] = [];
  for (let j = 0; j < gridWidth; j++) {
    grid[i].push(".");
  }
}

let seconds = 100;
for (let k = 0; k < seconds; k++) {
  // we make a new grid and display it
  gridCopy = structuredClone(grid);
  for (let i = 0; i < input.length; i++) {
    let temp = input[i].split(" ");
    let startI = parseInt(temp[0].split("=")[1].split(",")[1]);
    let startJ = parseInt(temp[0].split("=")[1].split(",")[0]);
    let velocityX = parseInt(temp[1].split("=")[1].split(",")[0]);
    let velocityY = parseInt(temp[1].split("=")[1].split(",")[1]);

    velocityX *= k;
    velocityY *= k;
    velocityX %= gridWidth;
    velocityY %= gridHeight;
    //   console.log("for this input: ", input[i]);
    //   console.log("start I position: ", startI);
    //   console.log("start J position: ", startJ);
    //   console.log("moving at horizonta velocity: ", velocityX);
    //   console.log("moving at vertical velocity: ", velocityY);
    //   console.log("this is remaining amount to move in x direction: ", velocityX);
    //   console.log("this is remaining amount to move in y direction: ", velocityY);

    startI += velocityY;
    startJ += velocityX;
    if (startI < 0 || startI >= gridHeight) {
      // new index is out of bounds. need to check which side of bounds we are at
      if (startI < 0) {
        startI += gridHeight;
      } else {
        startI -= gridHeight;
      }
    }
    //   console.log("final i index position of guard: ", startI);
    if (startJ < 0 || startJ >= gridWidth) {
      if (startJ < 0) {
        startJ += gridWidth;
      } else {
        startJ -= gridWidth;
      }
    }
    //   console.log("final j index position of guard: ", startJ);
    // plot the point on the grid. check that it is not ".". if it is, we change to 1. else we increment

    gridCopy[startI][startJ] = 1;
  }
  //   console.log("at k second: ", k);
  //   console.log(gridCopy);
  //   fs.writeFile("example.txt", JSON.stringify(gridCopy) + "\n", (err) => {
  //     if (err) {
  //       console.log("some err: ", err);
  //     }
  //   });
}
