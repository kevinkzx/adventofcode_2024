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
let possiblePerms = [
  ["M", "S", "A", "M", "S"],
  ["M", "M", "A", "S", "S"],
  ["S", "M", "A", "S", "M"],
  ["S", "S", "A", "M", "M"],
];

let output = 0;

for (let i = 0; i < temp.length; i++) {
  for (let j = 0; j < temp[i].length; j++) {
    let cross = [];
    if (temp[i][j] === "A") {
      // we make temp list and check if its one of the allowed perms
      if (i - 1 >= 0 && j - 1 >= 0) {
        //top left
        cross.push(temp[i - 1][j - 1]);
      }
      if (i - 1 >= 0 && j + 1 < temp[0].length) {
        cross.push(temp[i - 1][j + 1]);
      }
      cross.push(temp[i][j]);
      if (i + 1 < temp.length && j - 1 >= 0) {
        cross.push(temp[i + 1][j - 1]);
      }
      if (i + 1 < temp.length && j + 1 < temp[0].length) {
        cross.push(temp[i + 1][j + 1]);
      }
    }

    if (cross.length === 5) {
      //   console.log("at index: ", i, j);
      //   console.log(JSON.stringify(cross));

      for (let lai = 0; lai < possiblePerms.length; lai++) {
        if (JSON.stringify(possiblePerms[lai]) === JSON.stringify(cross)) {
          output++;
          break;
        }
      }
    }
    // console.log("cross: ", cross);
  }
}
console.log("output: ", output);
console.log("temp last: ", temp[temp.length - 1]);
