const fs = require("fs");
let input = fs.readFileSync("advent_day19_custom.txt").toString().split("\n");
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

const huh = (curr) => {
  // console.log("################");
  // console.log("curr: ", curr);
  if (curr.length === 0) {
    return true;
  }
  // find something that match at index n
  for (let j = 0; j < towels.length; j++) {
    // towels[j] is each towel in towels
    // console.log("for loop get towerls: ", towels[j]);

    let lengthoftowel = towels[j].length;

    let compareTo = curr.slice(0, lengthoftowel);
    // console.log("compare to: ", compareTo);
    let result;
    if (compareTo === towels[j]) {
      let remainder = curr.slice(lengthoftowel);
      // console.log("matched with: ", towels[j]);
      // console.log("call: ", remainder);
      result = huh(remainder);
      if (result) {
        return result;
      }
    }
  }
  return false;
};

let memo = {};
const recursiveMemo = (curr) => {
  // console.log("memo: ", memo);
  if (curr.length === 0) {
    return true;
  }
  // check if results exist in memo. if it is, return results.
  if (memo[curr] !== undefined) {
    return memo[curr];
  } else {
    // we loop thru available towels and see if there is anything. we then call dp and store into temp result
    // at the end of our for loop, outside our for loop, we will store the result into our memo

    for (let j = 0; j < towels.length; j++) {
      let result;
      // towels[j] is each type of towel we have
      let lengthoftowel = towels[j].length;
      let compareTo = curr.slice(0, lengthoftowel);
      if (compareTo === towels[j]) {
        let remainder = curr.slice(lengthoftowel);
        result = recursiveMemo(remainder);
        if (result) {
          memo[curr] = result;
          return result;
        }
      }
    }
    memo[curr] = false;
    return false;
  }
};

let output = 0;
for (let i = 0; i < patterns.length; i++) {
  let curr = patterns[i];
  let something = recursiveMemo(curr);
  console.log("we checking: ", curr);
  console.log("something: ", something);
  if (something) {
    output++;
  }
}
// console.log("towels: ", JSON.stringify(towels));
console.log("first: ", patterns[0]);
console.log("last: ", patterns[patterns.length - 1]);
console.log("output: ", output);

// let output = 0;
// for (let i = 0; i < patterns.length; i++) {
//   let curr = patterns[i];
//   let something = huh(curr);
//   // console.log("curr: ", curr);
//   console.log("something: ", something);
//   if (something) {
//     output++;
//   }
// }
// console.log("output: ", output);
