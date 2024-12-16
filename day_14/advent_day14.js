const fs = require("fs");
let input = fs.readFileSync("advent_day14.txt").toString().split("\n");

// console.log("input: ");
// console.log(input);

// initialise our grid
// for example input, our grid is 11 tiles wide and 7 tiles tall
let gridHeight = 103;
let gridWidth = 101;
let grid = [];
for (let i = 0; i < gridHeight; i++) {
  grid[i] = [];
  for (let j = 0; j < gridWidth; j++) {
    grid[i].push(".");
  }
}
// console.log("grid: ");
// console.log(grid);

let seconds = 100;

for (let i = 0; i < input.length; i++) {
  let temp = input[i].split(" ");
  let startI = parseInt(temp[0].split("=")[1].split(",")[1]);
  let startJ = parseInt(temp[0].split("=")[1].split(",")[0]);
  let velocityX = parseInt(temp[1].split("=")[1].split(",")[0]);
  let velocityY = parseInt(temp[1].split("=")[1].split(",")[1]);

  velocityX *= seconds;
  velocityY *= seconds;
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
  if (grid[startI][startJ] === ".") {
    grid[startI][startJ] = 1;
  } else {
    grid[startI][startJ]++;
  }
}
// console.log("grid at the end");
// console.log(grid);

// iterate our grid and get the number of robots in each quadrant
let topleft = 0;
let topright = 0;
let bottomleft = 0;
let bottomright = 0;
let middleWidth = Math.floor(gridWidth / 2);
let middleHeight = Math.floor(gridHeight / 2);
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] !== ".") {
      // if either the i or j lies in the middle 'cross' we dont consider it
      if (i === middleHeight || j === middleWidth) {
        continue;
      } else {
        // check which quadrant it belongs to and increment
        if (i < middleHeight && j < middleWidth) {
          topleft += grid[i][j];
        } else if (i < middleHeight && j > middleWidth) {
          topright += grid[i][j];
        } else if (i > middleHeight && j < middleWidth) {
          bottomleft += grid[i][j];
        } else {
          bottomright += grid[i][j];
        }
      }
    }
  }
}
console.log("topleft: ", topleft);
console.log("topright: ", topright);
console.log("bottomleft: ", bottomleft);
console.log("bottomright: ", bottomright);
console.log("safety facetor: ", topleft * topright * bottomleft * bottomright);
