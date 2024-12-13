// instead of storing the newly generated stones into a list, we store in a dictionary
// dictionary key: value. key is the number on the stones. value is the count

// rules of the stones are
// if number on stone is 0, we replace this stone with number 1
// if length of number on stone is even, we split the numbers up
// else we just take number on stone and replace it with number*2024

const fs = require("fs");
let input = fs.readFileSync("advent_day11.txt").toString().split(" ");
console.log("input: ", input);

let mydict = {};
for (let i = 0; i < input.length; i++) {
  if (mydict[input[i]] === undefined) {
    mydict[input[i]] = 1;
  } else {
    mydict[input[i]] += 1;
  }
}

let k = 75;
for (let i = 0; i < k; i++) {
  let tempdict = {};
  for (const [key, value] of Object.entries(mydict)) {
    // console.log("key: ", key);
    // console.log("value: ", value);
    // for each stone, there exist "value" amount of them.
    if (key === "0") {
      // we need to add "value" amount of stones with number 1 into our new tempdict
      if (tempdict["1"] === undefined) {
        tempdict["1"] = value;
      } else {
        tempdict["1"] += value;
      }
    } else if (key.length % 2 === 0) {
      // length of number is even
      // get the left and right. need to trim trailing 0 from the right
      let middle = key.length / 2;
      let left = key.slice(0, middle);
      let right = key.slice(middle);

      // mini logic to trim trailing 0 for right half
      while (right.charAt(0) === "0") {
        right = right.substring(1);
      }
      if (right.length === 0) {
        right = "0";
      }

      if (tempdict[left] === undefined) {
        tempdict[left] = value;
      } else {
        tempdict[left] += value;
      }
      if (tempdict[right] === undefined) {
        tempdict[right] = value;
      } else {
        tempdict[right] += value;
      }
    } else {
      // we take the value of the number on the stone and multiply by 2024
      let newNumber = parseInt(key) * 2024;
      if (tempdict[newNumber] === undefined) {
        tempdict[newNumber] = value;
      } else {
        tempdict[newNumber] += value;
      }
    }
    mydict = tempdict;
    /// at the end mydict = tempdict
  }
}
let output = 0;
for (const [key, value] of Object.entries(mydict)) {
  output += value;
}
// console.log("///////////////////");
// console.log("dict: ", mydict);
console.log("output: ", output);
