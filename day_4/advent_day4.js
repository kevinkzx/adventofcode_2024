const fs = require("fs");

let input = fs.readFileSync("advent_day4.txt");

input = input.toString().split("\n");
console.log("input: ", input);

let temp = [];
for (let i = 0; i < input.length; i++) {
  temp.push(input[i].split(""));
}
console.log("temp: ", temp);
temp.pop();
let string = ["X", "M", "A", "S"];

let output = 0;
for (let i = 0; i < temp.length; i++) {
  for (let j = 0; j < temp[i].length; j++) {
    let index = 0;
    if (temp[i][j] === "X") {
      index = 1;
      let right = true;
      let left = true;
      let up = true;
      let down = true;
      let upright = true;
      let downright = true;
      let upleft = true;
      let downleft = true;
      //   console.log("do serach here at index: ", i, j);
      for (let k = 1; k <= 3; k++) {
        if (j + k < temp[0].length) {
          if (temp[i][j + k] !== string[index]) {
            right = false;
          }
        } else {
          right = false;
        }
        if (j - k >= 0) {
          if (temp[i][j - k] !== string[index]) {
            left = false;
          }
        } else {
          left = false;
        }
        if (i - k >= 0) {
          if (temp[i - k][j] !== string[index]) {
            up = false;
          }
        } else {
          up = false;
        }
        if (i + k < temp.length) {
          if (temp[i + k][j] !== string[index]) {
            down = false;
          }
        } else {
          down = false;
        }
        if (i - k >= 0) {
          if (temp[i - k][j + k] !== string[index]) {
            upright = false;
          }
        } else {
          upright = false;
        }
        if (i + k < temp.length && j + k < temp[0].length) {
          if (temp[i + k][j + k] !== string[index]) {
            downright = false;
          }
        } else {
          downright = false;
        }
        if (i - k >= 0 && j - k >= 0) {
          if (temp[i - k][j - k] !== string[index]) {
            upleft = false;
          }
        } else {
          upleft = false;
        }
        if (i + k < temp.length && j - k >= 0) {
          if (temp[i + k][j - k] !== string[index]) {
            downleft = false;
          }
        } else {
          downleft = false;
        }
        index++;
      }
      if (right) {
        output++;
      }
      if (left) {
        output++;
      }
      if (up) {
        output++;
      }
      if (down) {
        output++;
      }
      if (upleft) {
        output++;
      }
      if (downleft) {
        output++;
      }
      if (upright) {
        output++;
      }
      if (downright) {
        output++;
      }
    }
  }
}
console.log("temp last: ", temp[temp.length - 1]);
console.log("output: ", output);
