const fs = require("fs");

let input = fs.readFileSync("advent_day3.txt");

input = input.toString();
console.log(input);

let regex = /(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don't\(\))/g;

// for (let i = 0; i < input.length; i++) {

// }
let result = input.match(regex);
console.log("result: ", result);

let output = 0;
let index = 0;
let goodtogo = true;

while (index < result.length) {
  // if index[i] is don't() we dont add anything until we get do()
  // else we just do normally
  if (result[index] === "don't()") {
    goodtogo = false;
    index++;
  } else if (result[index] === "do()") {
    goodtogo = true;
    index++;
  } else {
    if (goodtogo) {
      let editedString = result[index].slice(4, result[index].length - 1);
      let temp = editedString.split(",");
      output += parseInt(temp[0]) * parseInt(temp[1]);
      index++;
    } else {
      index++;
    }
  }
}

console.log("output: ", output);
