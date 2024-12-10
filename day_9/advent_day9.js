const fs = require("fs");
let input = fs.readFileSync("advent_day9.txt").toString();

console.log("input");
// console.log(input);
console.log("length of input: ", input.length);

// console.log(input[4]);

/// go thru the input and generate the blocks with free spaces in between and store as array
/// start and end pointer. whlie value at start pointer is pointing at a value that is not a free space,
/// move the start pointer up until there is a free space "."
/// move the end pointer until we find the first value that is not a free space "."
/// perform swap between the values at the start and end pointer
/// repeat while start pointer is less than end pointer

let temp2 = [];
for (let i = 0; i < input.length; i += 2) {
  // input[i] if valud is the size of the file id, i
  // input[i+1] if valid is the size of the free space
  let fileSize = parseInt(input[i]);
  for (let j = 0; j < fileSize; j++) {
    temp2.push((i / 2).toString());
  }
  if (input[i + 1] !== undefined) {
    let spaceSize = parseInt(input[i + 1]);
    for (let k = 0; k < spaceSize; k++) {
      temp2.push(".");
    }
  }
}
// console.log("temp");
// console.log(temp);
console.log("temp2: ", temp2);
// pointer at the start and at the end
// shift start pointer until we find a "."
// shift right pointer until we get a value that is not "."
// swap the values between start and right pointer
// keep shift start pointer
// end when start pointer > right pointer
let start = 0;
let end = temp2.length - 1;
while (start < end) {
  //   console.log("start: ", start);
  //   console.log("end: ", end);
  if (temp2[start] !== ".") {
    start++;
  } else {
    // start position has a "."
    while (temp2[end] === ".") {
      end--;
    }
    // currently right is pointing to a file
    [temp2[start], temp2[end]] = [temp2[end], temp2[start]];
    // console.log("temp now: ", temp);
    // start++;
  }
}
// console.log("temp: ", temp.join("").toString());
console.log("temp2: ", temp2);
// temp = temp.join("").toString();
let output = BigInt(0);
for (let i = 0; i < temp2.length; i++) {
  if (temp2[i] !== ".") {
    output += BigInt(i * parseInt(temp2[i]));
  }
}
// console.log(temp[2]);
console.log("output: ", Number(output));
