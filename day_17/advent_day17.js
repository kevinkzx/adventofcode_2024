const fs = require("fs");
let input = fs.readFileSync("advent_day17_custom.txt").toString().split("\n");

console.log("input");
console.log(input);

let instruction = input[input.length - 1].split(":")[1].trimStart().split(",");
console.log("instruction:", instruction);
let A = parseInt(input[0].split(":")[1].trimStart());
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
console.log("output: ", output.join(","));
