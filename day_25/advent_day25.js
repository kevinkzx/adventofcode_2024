const fs = require("fs");
let input = fs.readFileSync("advent_day25.txt").toString().split("\n");
console.log("input: ", input);

let temp = [];
let locksandkeys = [];
for (let i = 0; i < input.length; i++) {
  if (input[i] !== "") {
    temp.push(input[i]);
  } else {
    locksandkeys.push(temp);
    temp = [];
  }
}
// console.log("locksandkeys: ", locksandkeys);

let upper = [];
let lower = [];
for (let i = 0; i < locksandkeys.length; i++) {
  let curr = locksandkeys[i];
  if (curr[0][0] === "#") {
    upper.push(curr);
  } else {
    lower.push(curr);
  }
}

console.log("upper: ", upper);
console.log("lower: ", lower);

let upperCount = [];
for (let i = 0; i < upper.length; i++) {
  let curr = upper[i];
  let count = Array(5).fill(0);
  for (let j = 1; j < curr.length; j++) {
    for (let k = 0; k < curr[0].length; k++) {
      if (curr[j][k] === "#") {
        count[k] += 1;
      }
    }
  }
  upperCount.push(count);
}
console.log("uppercount: ", upperCount);

let lowerCount = [];
for (let i = 0; i < lower.length; i++) {
  let curr = lower[i];
  let count = Array(5).fill(0);
  for (let j = 0; j < curr.length - 1; j++) {
    for (let k = 0; k < curr[0].length; k++) {
      if (curr[j][k] === "#") {
        count[k] += 1;
      }
    }
  }
  lowerCount.push(count);
}
console.log("lowercount: ", lowerCount);

// for each of the uppercount, check against each of the lowercount. for each individual slots, if their sum add to more than 5, overlap
let output = 0;
for (let i = 0; i < upperCount.length; i++) {
  for (let j = 0; j < lowerCount.length; j++) {
    let lock = upperCount[i];
    let key = lowerCount[j];
    let flag = true;
    for (let k = 0; k < lock.length; k++) {
      if (lock[k] + key[k] > 5) {
        flag = false;
        break;
      }
    }
    if (flag) {
      output++;
    }
  }
}
console.log("output: ", output);
