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

for (let i = 0; i < patterns.length; i++) {
  let curr = patterns[i];
  let myarr = [];
  const huh = (n, myarr) => {
    console.log("n: ", n);
    console.log("myarr: ", myarr);
    if (n === curr.length - 1) {
      return myarr;
    }
    // find something that match at index n
    for (let j = 0; j < towels.length; j++) {
      console.log("for loop get towerls: ", towels[j]);
      console.log("compare to: ", curr);
      let lengthoftowel = towels[j].length;
      let found = true;
      for (let k = 0; k < lengthoftowel; k++) {
        if (towels[j][k] !== curr[n + k]) {
          console.log("comparing these two: ", towels[j][k], curr[n + k]);
          found = false;
          break;
        }
      }
      if (found) {
        console.log("found something????");
        console.log(
          "caling this huh next with params: ",
          n + lengthoftowel,
          myarr
        );
        myarr.push(towels[j]);
        huh(n + lengthoftowel, myarr);
      }
    }
  };
  let something = huh(0, myarr);
  console.log("something: ", something);
}
