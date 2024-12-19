const fs = require("fs");
let input = fs.readFileSync("advent_day17.txt").toString().split("\n");

console.log("input");
console.log(input);

let instruction = input[input.length - 1].split(":")[1].trimStart().split(",");
console.log("instruction:", instruction);
let A = parseInt(input[0].split(":")[1].trimStart());
A = 202990000000000;
A_copy = 202990000000000;
// 281474976710656
// 35184381299544
// 35184388214534

// lowerbound  35184372088832
// upperbound 281474976710656
// found something here but not the lowest 202991746427437
// found something here maybe?             202991746427434

// 135184372088832 [6, 2, 0, 5, 4, 6, 3, 6, 5, 3, 7, 5, 4, 7, 3, 6]
// 135384372088832 [7, 1, 4, 5, 5, 5, 4, 4, 5, 0, 2, 5, 1, 2, 3, 6]
// 135384362088832

// 204984372088832
// 204984372088832

// 2029|99855555555 [0, 3, 6, 5, 0, 0, 5, 1, 2, 5, 7, 5, 6,| 5, 3, 0]

// 2031550|55555555 [2, 7, 1, 0, 0, 5, 0, 5, 1, 0, 5,| 3, 5, 5, 3, 0]

console.log("A: ", A);
let B = parseInt(input[1].split(":")[1].trimStart());
console.log("B: ", B);
let C = parseInt(input[2].split(":")[1].trimStart());
console.log("C: ", C);

const comboOperand = (operand) => {
  if (operand === "4") {
    return A;
  } else if (operand === "5") {
    return B;
  } else if (operand === "6") {
    return C;
  } else {
    return parseInt(operand);
  }
};
let output = [];
while (
  JSON.stringify(instruction) !== JSON.stringify(output) &&
  output.length < 17
) {
  // console.log("instruction: ", output);
  // console.log("A: ", A);
  output = [];
  let pointer = 0;
  while (pointer < instruction.length) {
    let opcode = instruction[pointer]; // string
    let operand = instruction[pointer + 1]; // string

    if (opcode === "0") {
      // opcode 0, adv,  division. numerator is value in A. denominator is 2 to the power of combo operand
      let numerator = A;
      let denominator = 2 ** comboOperand(operand);
      let result = parseInt(numerator / denominator);
      A = result;
      pointer += 2;
    } else if (opcode === "1") {
      // opcode 1, bxl, bitwise XOR
      let literal = parseInt(operand);
      let result = Number(BigInt(B) ^ BigInt(literal));
      B = result;
      pointer += 2;
    } else if (opcode === "2") {
      // opcode 2, bst, calculate value of combo operand modulo 8. keep lowest3 bits and write to B
      let temp = comboOperand(operand);
      let result = temp % 8;
      B = result;
      pointer += 2;
    } else if (opcode === "3") {
      // opcode 3, jnz, if value at A is 0, do nothing else set pointer to where we jumping to
      if (A === 0) {
        pointer += 2;
      } else {
        let temp = parseInt(operand);
        pointer = temp;
      }
    } else if (opcode === "4") {
      // opcode 4, bxc, ignore operand. bitwise XOR B and C then store in B
      let temp = Number(BigInt(B) ^ BigInt(C));
      B = temp;
      pointer += 2;
    } else if (opcode === "5") {
      // opcode 5, out, calculate value of combo operand mod 8 and push to output array
      let temp = comboOperand(operand);
      output.push(temp % 8);
      pointer += 2;
    } else if (opcode === "6") {
      // opcode 6, bdv, same as adv (opcode 0) but store in B
      let numerator = A;
      let denominator = 2 ** comboOperand(operand);
      let result = parseInt(numerator / denominator);
      B = result;
      pointer += 2;
    } else if (opcode === "7") {
      // opcode 7, cdv, same as adv (opcode 0) but store in C
      let numerator = A;
      let denominator = 2 ** comboOperand(operand);
      let result = parseInt(numerator / denominator);
      C = result;
      pointer += 2;
    }
  }
  // check how many of the output matches. we add to A according to how many output matches
  let count = 0;
  for (let i = output.length - 1; i >= 0; i--) {
    if (output[i].toString() === instruction[i]) {
      count++;
    } else {
      break;
    }
  }
  if (count === instruction.length) {
    break;
  }
  // console.log("matches: ", count);
  // console.log("adding: ", parseInt(2.5 ** (16 - count)));
  A_copy += parseInt(2 ** (16 - count));

  // A_copy++;
  A = A_copy;
}
console.log("A:aaa ", A_copy);

console.log("output: ", output.join(","));
