const fs = require("fs");
let input = fs.readFileSync("advent_day19.txt").toString().split("\n");
// console.log(input);

let towels = input[0].split(",");
let patterns = [];

for (let i = 2; i < input.length; i++) {
  patterns.push(input[i]);
}
for (let i = 0; i < towels.length; i++) {
  towels[i] = towels[i].trim();
}

console.log("towels: ", towels);
console.log("patterns: ", patterns);

// let memo = {};
// const recursiveMemo = (curr) => {
//   // console.log("memo: ", memo);
//   if (curr.length === 0) {
//     return true;
//   }
//   // check if results exist in memo. if it is, return results.
//   if (memo[curr] !== undefined) {
//     return memo[curr];
//   } else {
//     // we loop thru available towels and see if there is anything. we then call dp and store into temp result
//     // at the end of our for loop, outside our for loop, we will store the result into our memo

//     for (let j = 0; j < towels.length; j++) {
//       let result;
//       // towels[j] is each type of towel we have
//       let lengthoftowel = towels[j].length;
//       let compareTo = curr.slice(0, lengthoftowel);
//       if (compareTo === towels[j]) {
//         let remainder = curr.slice(lengthoftowel);
//         result = recursiveMemo(remainder);
//         if (result) {
//           memo[curr] = result;
//           return result;
//         }
//       }
//     }
//     memo[curr] = false;
//     return false;
//   }
// };

let memo = new Map();

const dp = (curr, start) => {
  if (curr.length === 0) return 1;

  const key = `${curr}-${start}`;
  if (memo.has(key)) return memo.get(key);

  let count = 0;
  for (let i = 0; i < towels.length; i++) {
    // if can match
    let lengthoftowel = towels[i].length;
    let compareTo = curr.slice(0, lengthoftowel);
    if (compareTo === towels[i]) {
      let remainder = curr.slice(lengthoftowel);
      count += dp(remainder, i);
    }
  }
  memo.set(key, count);
  return count;
};

let output = 0;
for (let i = 0; i < patterns.length; i++) {
  let curr = patterns[i];
  let something = dp(curr, 0);
  console.log("something: ", something);
  output += something;
}
// console.log("memo: ", memo);
console.log("output: ", output);
