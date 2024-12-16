// each button cannot be pressed more than 100 times.

const fs = require("fs");
let input = fs.readFileSync("advent_day13.txt").toString().split("\n");
input.push("");
// console.log("input");
// console.log(input);

let inputArr = [];
let temp = [];
for (let i = 0; i < input.length; i++) {
  if (input[i] !== "") {
    temp.push(input[i]);
  } else {
    inputArr.push(temp);
    temp = [];
  }
}
// console.log("inputArr");
// console.log(inputArr);
let output = 0;
for (let i = 0; i < inputArr.length; i++) {
  // button a inputArr[i][0]
  // button b inputArr[i][1]
  // prize inputArr[i][2]

  // each button cannot be pressed more than 100 times.
  // cost 3 to push button A
  // cost 1 to push button B

  //   console.log("for this input: ", inputArr[i]);
  let buttonA = inputArr[i][0].split(":");
  let xaxisA = parseInt(buttonA[1].split(",")[0].split("+")[1]);
  let yaxisA = parseInt(buttonA[1].split(",")[1].split("+")[1]);
  //   console.log("xaxisA: ", xaxisA);
  //   console.log("yaxisA: ", yaxisA);

  let buttonB = inputArr[i][1].split(":");
  let xaxisB = parseInt(buttonB[1].split(",")[0].split("+")[1]);
  let yaxisB = parseInt(buttonB[1].split(",")[1].split("+")[1]);
  //   console.log("xaxisB: ", xaxisB);
  //   console.log("yaxisB: ", yaxisB);

  //   console.log("--- target ---");

  let xtarget =
    parseInt(inputArr[i][2].split(":")[1].split(",")[0].split("=")[1]) +
    10000000000000;
  let ytarget =
    parseInt(inputArr[i][2].split(":")[1].split(",")[1].split("=")[1]) +
    10000000000000;
  // console.log("target x, y: ", xtarget, ytarget);

  console.log("for this input: ", inputArr[i]);

  console.log("xaxisA: ", xaxisA);
  console.log("yaxisA: ", yaxisA);

  console.log("xaxisB: ", xaxisB);
  console.log("yaxisB: ", yaxisB);

  console.log("--- target ---");
  console.log("target x, y: ", xtarget, ytarget);

  // we can use MATH. to find a formula that gives us the value of number of times we press A and B.
  // technically, there is only one answer if it is possible. the 'lowest' cost is somewhat of a red herring.
  // MATHTEMATICAL PROOF
  /*
    for button A. we can say that each press of button A, moves a_x in the horizontal direction and a_y in the vertical direction
    for button B. we can say that each press of button B, moves b_x in the horizontal direction and b_y in the vertical direction
    let our target location be p_x and p_y.
    so for any given value, we want the following equation to be true.
    let A be the number of times we press button A. and B be the number of times we press button B.
    (1) Aa_x + Bb_x = p_x
    (2) Aa_y + Bb_y = p_y

    by using simple math, we can solve for A and B.
    e.g solving for A.
    from equation (2)
    Bb_y = p_y - Aa_y
    B = (p_y - Aa_y) / b_y
    sub b into equation (1)
    Aa_x + ( (b_x*p_y - Ab_x*a_y) / b_y ) = p_x
    Aa_x*b_y + b_x*p_y - Ab_x*a_y = p_x*b_y
    Aa_x*b_y - Ab_x*a_y = p_x*b_y - p_y*b_x
    A(a_x*b_y - b_x*a_y) = p_x*b_y - p_y*b_x
    A = ( p_x*b_y - p_y*b_x ) / ( a_x*b_y - b_x*a_y )

    Taking one of the example where
    A x+94 y+34
    B x+22 y+67
    Target x=8400 y=5400
    a_x = 94
    a_y = 34
    b_x = 22
    b_y = 67
    p_x = 8400
    p_y = 5400

    subbing in the values, we can see that A = 80

    If it is not possible for the claw machine to get the toy, A and B will not return whole numbers
    A = ( p_x*b_y - p_y*b_x ) / ( a_x*b_y - b_x*a_y )
    B = ( p_x*a_y - p_y*a_x ) / ( b_x*a_y - b_y*a_x )
  */

  let a_x = xaxisA;
  let a_y = yaxisA;
  let b_x = xaxisB;
  let b_y = yaxisB;
  let p_x = xtarget;
  let p_y = ytarget;

  let A = (p_x * b_y - p_y * b_x) / (a_x * b_y - b_x * a_y);
  let B = (p_x * a_y - p_y * a_x) / (b_x * a_y - b_y * a_x);
  if (Number.isInteger(A) && Number.isInteger(B)) {
    output += A * 3 + B;
  }
}

console.log("output: ", output);
