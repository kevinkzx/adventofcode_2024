// let me try brute force first
const fs = require("fs");
let input = fs.readFileSync("advent_day11_custom.txt").toString().split(" ");
console.log("input: ", input);

let k = 25;
let temp = [...input];
let precomputeZero = [
  1, 1, 1, 2, 4, 4, 7, 14, 16, 20, 39, 62, 81, 110, 200, 328, 418, 667, 1059,
  1546, 2377, 3572, 5602, 8268, 12343, 19778, 29165, 43726, 67724, 102131,
  156451, 234511, 357632, 549949, 819967, 1258125, 1916299, 2886408, 4414216,
  6669768, 10174278,
];
let precomputeOne = [
  1, 1, 2, 4, 4, 7, 14, 16, 20, 39, 62, 81, 110, 200, 328, 418, 667, 1059, 1546,
  2377, 3572, 5602, 8268, 12343, 19778, 29165, 43726, 67724, 102131, 156451,
  234511, 357632, 549949, 819967, 1258125, 1916299, 2886408, 4414216, 6669768,
  10174278, 15458147,
];
let precomputeTwo = [
  1, 1, 2, 4, 4, 6, 12, 16, 19, 30, 57, 92, 111, 181, 295, 414, 661, 977, 1501,
  2270, 3381, 5463, 7921, 11819, 18712, 27842,
];
let count = 0;
for (let i = 0; i < k; i++) {
  let temp2 = [];
  for (let j = 0; j < temp.length; j++) {
    // all values in temp will be stored in the string form
    if (temp[j] === "0") {
      // current iteration at i+1. we count the diff between k-i+1 means we have to blink k-i+1 more times.
      // take precomputeOne[k-i+1] and add to count. remove 0 from list
      count += precomputeZero[k - i];
      //   temp2.push("1");
    } else if (temp[j] === "1") {
      count += precomputeOne[k - i];
    } else if (temp[j].length % 2 === 0) {
      let middle = temp[j].length / 2;
      let left = temp[j].slice(0, middle);
      let right = temp[j].slice(middle);
      temp2.push(left);
      // need to trim the leading 0 of right
      while (right.charAt(0) === "0") {
        right = right.substring(1);
      }
      if (right.length === 0) {
        temp2.push("0");
      } else {
        temp2.push(right);
      }
    } else {
      let number = parseInt(temp[j]) * 2024;
      temp2.push(number.toString());
    }
  }
  temp = [...temp2];
  console.log(`if we blink ${i + 1} times`);
  console.log(`this is how many stones we have ${temp.length}`);
  //   precomputeTwo.push(temp.length);
}
// console.log("temp: ", temp);
console.log("temp length: ", temp.length);
console.log("count: ", count);
console.log("total: ", count + temp.length);
console.log("precomputetwo: ", precomputeTwo);
