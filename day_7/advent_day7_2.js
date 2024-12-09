/// IMPORTANT NOTE ///
/// the operations are done from left to right. the order of precedence for operations does not matter
/// e.g 81 + 40 * 27. we first do 81 plus 40. the result we multiply by 27
/// e.g 81 * 40 + 27. we first do 81 multiply by 40. the result we add 27

/// we can only insert 2 different kind of operation. + or *

/// BRUTE FORCE HEHE ///
/// generate all possibilities of + and * according to how many operations we can use

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
  q.push([goal, numbers, 1, parseInt(numbers[0])]);
  while (q.length !== 0) {
    // console.log("q: ", q);
    // if q[0][2] is at numbers.length. we check is q[0][3] is the same as q[0][0]
    let indextemp = q[0][2];

    if (q[0][2] === numbers.length) {
      //   console.log("checking here leh");
      if (q[0][0] === parseInt(q[0][3])) {
        console.log("this goal KE YI: ", q[0][0]);
        output += parseInt(q[0][0]);
        break;
      } else {
        q.shift();
        continue;
      }
    }

    // add operation
    let addtemp = parseInt(q[0][3]) + parseInt(numbers[indextemp]);
    q.push([goal, numbers, indextemp + 1, addtemp]);
    // multiply operation
    let multemp = parseInt(q[0][3]) * parseInt(numbers[indextemp]);
    q.push([goal, numbers, indextemp + 1, multemp]);
    // concatenation operation
    let contemp = q[0][3].toString() + numbers[indextemp];
    q.push([goal, numbers, indextemp + 1, contemp]);

    q.shift();
  }
}
console.log("output: ", output);
