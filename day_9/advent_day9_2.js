const fs = require("fs");

let input = fs.readFileSync("advent_day9_custom.txt").toString();
console.log("input: ", input);

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
console.log("temp: ", temp);
let last = 0;
for (let i = temp.length - 1; i >= 0; i--) {
  if (temp[i] !== ".") {
    last = i;
    break;
  }
}
console.log("last: ", last);
// last would be the stopping point for our outer while loop

let update = true;
while (update) {
  console.log("temp: ", temp.toString());
  let start = 0;
  while (start < last) {
    if (temp[start] !== ".") {
      start++;
    } else {
      // first time we spot a space, at temp[start]

      // 1) check size of space
      let tempstart = start;
      let spaceSize = 0;
      while (temp[tempstart] === ".") {
        tempstart++;
        spaceSize++;
      }
      console.log("at index: ", start);
      console.log("we have space of size: ", spaceSize);

      // 2) from "last" index, find data that fits
      // move our last pointer up until we find a data that fits
      let found = false;
      while (last > start && found === false) {
        if (temp[last] === ".") {
          last--;
        } else {
          let curr = temp[last];
          let dataSize = 0;
          // count how big this data is
          while (temp[last] === curr) {
            dataSize++;
            last--;
          }
          last++;
          if (dataSize <= spaceSize) {
            // if data found is smaller than or equal to size of space
            console.log("can fit data: ", curr);
            console.log("datasize: ", dataSize);
            console.log("index of data: ", last);
            for (let l = 0; l < dataSize; l++) {
              [temp[start + l], temp[last + l]] = [
                temp[last + l],
                temp[start + l],
              ];
            }
            last -= dataSize;
            found = true;
            break;
          } else {
            // else we find next possible data
            last--;
          }
        }
      }

      // if found. swap.
      // else not found. move "last" index down till we find
    }
  }
}
