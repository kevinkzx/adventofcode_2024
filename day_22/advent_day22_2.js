const fs = require("fs");
let input = fs.readFileSync("advent_day22_custom.txt").toString().split("\n");
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

let maxCount = 0;
let maxWindow = [];
let visited = new Set();
for (const [key, value] of Object.entries(diffdict)) {
  // for current key val of diffdict, we get the window. with this window,
  // we iterate thru all the other key value of diffdict that is not this key.
  // if there is this window, we check the responding amount of banana by taking the index and the key

  let temparr = value;
  for (let i = 3; i < temparr.length; i++) {
    let window = temparr.slice(i - 3, i + 1);
    if (visited.has(JSON.stringify(window)) === true) {
      continue;
    }
    // console.log("this is window: ", window);
    // we need to use this window and check against all the other value array in diffdict to see if it matches
    let output = 0;
    output += mydict[key][i];
    for (const [key2, value2] of Object.entries(diffdict)) {
      if (key === key2) {
        continue;
      }
      //   console.log("key: ", key);
      //   console.log("key2: ", key2);
      //   console.log("window: ", window);
      let temparr2 = value2;
      for (let j = 3; j < temparr2.length; j++) {
        let tempwindow = temparr2.slice(j - 3, j + 1);
        // console.log("tempwindow: ", tempwindow);
        if (JSON.stringify(tempwindow) === JSON.stringify(window)) {
          // the number of bananas we want to get is at j
          output += mydict[key][j];
          break;
        }
      }
    }
    if (output > maxCount) {
      //   console.log("this is the output: ", output);
      //   console.log("this window: ", window);
      maxCount = output;
      maxWindow = window;
    }
    visited.add(JSON.stringify(window));
  }
}
console.log("maxCount: ", maxCount);
console.log("maxWindow: ", maxWindow);

// let testing = diffdict["2024"];
// for (let i = 3; i < testing.length; i++) {
//   let temparr = testing.slice(i - 3, i + 1);
//   if (JSON.stringify(temparr) === JSON.stringify([-2, 1, -1, 3])) {
//     console.log("in 2024, this index: ", i);
//     console.log(mydict["2024"][i]);
//   }
// }
