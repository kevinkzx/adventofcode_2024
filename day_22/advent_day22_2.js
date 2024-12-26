const fs = require("fs");
let input = fs.readFileSync("advent_day22.txt").toString().split("\n");
console.log(input);

let mydict = {};
for (let i = 0; i < input.length; i++) {
  let num = parseInt(input[i]);
  //   console.log("num: ", num);
  let curr = num;
  mydict[input[i]] = [];
  for (let j = 0; j < 2000; j++) {
    let step1 = Number(BigInt(curr * 64) ^ BigInt(curr)) % 16777216;
    let step2 = Number(BigInt(parseInt(step1 / 32)) ^ BigInt(step1)) % 16777216;
    let step3 = Number(BigInt(step2 * 2048) ^ BigInt(step2)) % 16777216;
    // console.log("step3: ", step3);
    curr = step3;
    mydict[input[i]].push(parseInt(step3.toString().slice(-1)));
  }
}
console.log("mydict: ", mydict);

let diffdict = {};
for (const [key, value] of Object.entries(mydict)) {
  diffdict[key] = [];
  let start = parseInt(key.slice(-1));
  for (let i = 0; i < value.length; i++) {
    if (i === 0) {
      diffdict[key].push(value[i] - start);
    } else {
      diffdict[key].push(value[i] - value[i - 1]);
    }
  }
}
console.log("diffdict: ", diffdict);

let countdict = {};
for (const [key, value] of Object.entries(diffdict)) {
  let visited = new Set();
  for (let i = 3; i < value.length; i++) {
    // we check if this current set of window has been visited. if yes, we skip. else we add to countdict
    let window = value.slice(i - 3, i + 1);
    if (visited.has(JSON.stringify(window)) === false) {
      if (countdict[window] === undefined) {
        countdict[window] = mydict[key][i];
      } else {
        countdict[window] += mydict[key][i];
      }
      visited.add(JSON.stringify(window));
    } else {
      continue;
    }
  }
}
console.log("countdict: ", countdict);
let max = 0;
let maxArr;
for (const [key, value] of Object.entries(countdict)) {
  if (value > max) {
    max = value;
    maxArr = key;
  }
}
console.log("max: ", max);
console.log("maxArr: ", maxArr);
