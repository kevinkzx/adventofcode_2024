const fs = require("fs");

let input = fs.readFileSync("advent_day3.txt");

input = input.toString();
console.log(input);

let regex = /mul\(\d{1,3},\d{1,3}\)/g;

// for (let i = 0; i < input.length; i++) {

// }
let result = input.match(regex);
console.log("result: ", result);
let output = 0;
for (let i = 0; i < result.length; i++) {
  let editedString = result[i].slice(4, result[i].length - 1);
  //   console.log("editedString: ", editedString);
  let temp = editedString.split(",");
  console.log("temp: ", temp);
  output += parseInt(temp[0]) * parseInt(temp[1]);
}
console.log("output: ", output);
