/// IMPORTANT NOTE ///
/// the operations are done from left to right. the order of precedence for operations does not matter
/// e.g 81 + 40 * 27. we first do 81 plus 40. the result we multiply by 27
/// e.g 81 * 40 + 27. we first do 81 multiply by 40. the result we add 27

/// we can only insert 2 different kind of operation. + or *

/// BRUTE FORCE HEHE ///
/// generate all possibilities of + and * according to how many operations we can use

/// maybe not brute force, we can use some greedy algo? ///
// use our final sum.
// go from the back of the operation.
// if we divide and get whole number, we divide.
// if not whole number, we minus
// final result must be 0

// IMPORTANT: need to take note of the case where both operations are possible

// we have a QUEUE. while the QUEUE not empty we just keep doing it.
// we add to queue the current goal and the index
// at the index, we check wehther can divid or minus. if can do both, we push [goal after operation, index]
// if can only do one, we push [goal after operation, idnex]
// for each item in the queue, we check the index. if index is 0, we check whether goal is 0 or 1. then we add to OUTPUT and pop from QUEUE

const fs = require("fs");
let input = fs.readFileSync("advent_day7.txt").toString().split("\n");

// console.log("input: ", input);

let temp = [];
for (let i = 0; i < input.length; i++) {
  if (input[i].length !== 0) {
    let split = input[i].split(":");
    //   console.log("split: ", split);
    split[1] = split[1].trim().split(" ");
    temp.push(split);
  }
}
// console.log("temp: ", temp);
console.log("temp first: ", temp[0]);
console.log("temp last: ", temp[temp.length - 1]);

let output = 0;
for (let i = 0; i < temp.length; i++) {
  let goal = parseInt(temp[i][0]);
  let numbers = temp[i][1];
  //   console.log("this is the goal: ", goal);
  //   console.log("numbers we are working with: ", numbers);

  let q = [];
  q.push([goal, numbers, numbers.length - 1]);
  while (q.length !== 0) {
    // console.log("q: ", q);
    // q[m][0] is goal
    // q[m][1] is numbers
    // q[m][2] is the index
    let goaltemp = parseInt(q[0][0]);
    let numberstemp = q[0][1];
    let indextemp = q[0][2];
    // q.shift();

    if (indextemp <= 0) {
      // console.log("im in here liu");
      // console.log("goal temp: ", goaltemp);
      // console.log("numbers: ", numberstemp);
      // console.log("indextemp: ", indextemp);
      let currNum = parseInt(numberstemp[indextemp]);
      if (goaltemp % currNum === 0) {
        goaltemp /= currNum;
        if (goaltemp === 0 || goaltemp === 1) {
          // console.log("this goal KE YI: ", temp[i][0]);
          output += parseInt(temp[i][0]);
          break;
        }
      } else {
        goaltemp -= currNum;
        if (goaltemp === 0 || goaltemp === 1) {
          // console.log("this goal KE YI: ", temp[i][0]);
          output += parseInt(temp[i][0]);
          break;
        }
      }
      if (indextemp < 0) {
        break;
      }
      q.shift();
      continue;
    }

    // if (flag) {
    //   q.shift();
    // }
    // q.shift();

    let currNum = parseInt(numberstemp[indextemp]);
    if (goaltemp % currNum === 0) {
      q.push([goaltemp / currNum, numberstemp, indextemp - 1]);
      q.push([goaltemp - currNum, numberstemp, indextemp - 1]);
      // console.log("q:", q);
      q.shift();
    } else {
      q.push([goaltemp - currNum, numberstemp, indextemp - 1]);
      q.shift();
    }
  }

  // for (let j = numbers.length - 1; j >= 0; j--) {
  //   let currNum = parseInt(numbers[j]);
  //   // console.log("goal: ", goal);
  //   // console.log("currNum: ", currNum);
  //   if (goal % currNum === 0) {
  //     goal /= currNum;
  //   } else {
  //     goal -= currNum;
  //   }
  // }
  // //   console.log("goal: ", goal);
  // if (goal === 0 || goal === 1) {
  //   console.log("this GOAL KE YI:", temp[i][0]);
  //   output += parseInt(temp[i][0]);
  // }
}
console.log("output: ", output);
