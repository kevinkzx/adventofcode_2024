const fs = require("fs");
let input = fs.readFileSync("advent_day22.txt").toString().split("\n");
let numbers = [];
for (let i = 0; i < input.length; i++) {
  numbers.push(input[i]);
}
console.log("numbers: ", numbers);

let output = 0;
for (let i = 0; i < numbers.length; i++) {
  let num = numbers[i];
  let curr = num;
  for (let i = 0; i < 2000; i++) {
    let step1 = Number(BigInt(curr * 64) ^ BigInt(curr)) % 16777216;
    let step2 = Number(BigInt(parseInt(step1 / 32)) ^ BigInt(step1)) % 16777216;
    let step3 = Number(BigInt(step2 * 2048) ^ BigInt(step2)) % 16777216;
    // console.log("step3: ", step3);
    curr = step3;
  }
  //   console.log("curr: ", curr);
  output += curr;
}
console.log("output: ", output);
