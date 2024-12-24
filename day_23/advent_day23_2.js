const fs = require("fs");
let input = fs.readFileSync("advent_day23_custom.txt").toString().split("\n");
// console.log(input);

let graph = {};
for (let i = 0; i < input.length; i++) {
  let temp = input[i].split("-");
  //   console.log("temp: ", temp);
  if (graph[temp[0]] === undefined) {
    graph[temp[0]] = [temp[1]];
  } else {
    graph[temp[0]].push(temp[1]);
  }

  if (graph[temp[1]] === undefined) {
    graph[temp[1]] = [temp[0]];
  } else {
    graph[temp[1]].push(temp[0]);
  }
}

console.log("graph");
console.log(graph);

let possible = [];
let visited = new Set();
for (const [key, value] of Object.entries(graph)) {
  // left pointer. right pointer (left+1).
  // move right pointer and check if there is connection with left pointer. graph[left] array has to have right.
  // if there is, move right pointer up until we cannot move anymore
  // if move at least one, we need to check that for every item between left and right, they all have connections
  // if there is not, move left pointer up.

  for (let i = 0; i < value.length; i++) {
    let temp = [];
    temp.push(key);
    temp.push(value[i]);
    for (let j = 0; j < value.length; j++) {
      if (i !== j) {
        if (graph[value[i]].includes(value[j]) === true) {
          temp.push(value[j]);
        }
      }
    }
    // console.log("temp:", temp);
    let sortedTemp = temp.sort((a, b) => {
      return a.localeCompare(b);
    });
    if (visited.has(JSON.stringify(sortedTemp)) === false) {
      possible.push(sortedTemp);
      visited.add(JSON.stringify(sortedTemp));
    }
  }
}
console.log("possible: ", possible);

let max = 0;
let passwordarr = [];
// for each possible arr in possible, we need to check if they are all interconnected
for (let i = 0; i < possible.length; i++) {
  let arr = possible[i];
  let flag = true;
  for (let j = 0; j < arr.length; j++) {
    for (let k = 0; k < arr.length; k++) {
      if (j !== k) {
        if (graph[arr[j]].includes(arr[k]) === false) {
          flag = false;
          break;
        }
      }
    }
  }
  if (flag) {
    console.log("this arr can: ", arr);
    if (arr.length > max) {
      max = arr.length;
      passwordarr = arr;
    }
  }
}
console.log(passwordarr.join(","));

//https://www.reddit.com/r/adventofcode/comments/1hkujsl/2024_day_23_learned_something_new_today/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
