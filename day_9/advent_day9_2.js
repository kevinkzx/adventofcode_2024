const fs = require("fs");

let input = fs.readFileSync("advent_day9.txt").toString();
// console.log("input: ", input);

let temp = [];
for (let i = 0; i < input.length; i += 2) {
  let fileSize = parseInt(input[i]);
  for (let j = 0; j < fileSize; j++) {
    temp.push((i / 2).toString());
  }
  if (input[i + 1] !== undefined) {
    let spaceSize = parseInt(input[i + 1]);
    for (let k = 0; k < spaceSize; k++) {
      temp.push(".");
    }
  }
}
// console.log("temp: ", temp);
let last = 0;
for (let i = temp.length - 1; i >= 0; i--) {
  if (temp[i] !== ".") {
    last = i;
    break;
  }
}

// our outer while loop will be from last until 0 or more
// within the loop, we want to get the size of the file.
// we then start from index 0 and go up the file until our last index and find for a space
// if there is a space, we perform the swap and decrement last. if there is no space,
// we decrement last and find the next set of file
while (last >= 0) {
  if (temp[last] === ".") {
    // decrement our last until we find a file
    last--;
  } else {
    // get the size of this file
    let curr = temp[last];
    let dataSize = 0;
    let templast = last;
    while (temp[templast] === curr) {
      dataSize++;
      templast--;
    }
    templast += 1;
    last = templast;
    // console.log("data, size: ", curr, dataSize);
    // console.log("at index start: ", templast);
    // left pointer always start from 0, move left pointer up and find space and count.
    // left pointer should not exceed templast
    let left = 0;
    let flag = false;
    while (left < last) {
      if (temp[left] !== ".") {
        left++;
      } else {
        // find size of space.
        let tempstart = left;
        let spaceSize = 0;
        while (temp[tempstart] === ".") {
          tempstart++;
          spaceSize++;
        }
        // console.log("space size: ", spaceSize);
        // console.log("at index start: ", left);

        // if spaceSize >= dataSize, we perform the swap
        // else we move up left pointer and check
        // move left pointer to after the end of this current space. set left = tempStart
        if (spaceSize >= dataSize) {
          for (let l = 0; l < dataSize; l++) {
            [temp[left + l], temp[templast + l]] = [
              temp[templast + l],
              temp[left + l],
            ];
            // console.log("temp now: ", temp);
            flag = true;
          }
          break;
        } else {
          left = tempstart;
          continue;
        }
      }
    }
    if (flag === false) {
      // console.log("cannot move this item: ", curr, dataSize);
      last = templast - 1;
    }
  }
}
// console.log("final tmep: ", temp);
let output = 0;
for (let i = 0; i < temp.length; i++) {
  if (temp[i] !== ".") {
    output += i * parseInt(temp[i]);
  }
}
console.log("output: ", output);
