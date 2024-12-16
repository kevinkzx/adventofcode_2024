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

  let xtarget = parseInt(
    inputArr[i][2].split(":")[1].split(",")[0].split("=")[1]
  );
  let ytarget = parseInt(
    inputArr[i][2].split(":")[1].split(",")[1].split("=")[1]
  );
  //   console.log("target x, y: ", xtarget, ytarget);

  let maxX = xaxisA * 100 + xaxisB * 100;
  let maxY = yaxisA * 100 + yaxisB * 100;
  if (maxX * 100 < xtarget || maxY * 100 < ytarget) {
    // console.log("for this input: ", inputArr[i]);
    // console.log("this set is impossible");
    continue;
  }
  // console.log("for this input: ", inputArr[i]);

  // console.log("xaxisA: ", xaxisA);
  // console.log("yaxisA: ", yaxisA);

  // console.log("xaxisB: ", xaxisB);
  // console.log("yaxisB: ", yaxisB);

  // console.log("--- target ---");
  // console.log("target x, y: ", xtarget, ytarget);

  // we can set min to this number because total cost to press both buttons 100 times each would be
  // 100*1 + 100*3. we know that it would not exceed this amount
  let min = 600;
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      let sumX = i * xaxisA + j * xaxisB;
      let sumY = i * yaxisA + j * yaxisB;
      if (sumX === xtarget && sumY === ytarget) {
        let cost = i * 3 + j * 1;
        min = Math.min(min, cost);
      }
    }
  }

  // console.log("cost: ", min);
  if (min !== 600) {
    output += min;
  }
  // let initialX = xaxisB * 100;
  // let initialY = yaxisB * 100;
  // let removed = 0;
  // console.log("starting wit this: ", initialX, initialY);
  // while (removed < 100) {
  //   if (initialX === xtarget && initialY === ytarget) {
  //     break;
  //   } else {
  //     // we remove and add if it is not enough
  //     removed++;
  //     initialX -= xaxisB;
  //     initialY -= yaxisB;
  //     //   console.log("removed and initialxy: ", removed, initialX, initialY);
  //     // add if either is not enough
  //     //   if (initialX < xtarget || initialY < ytarget) {
  //     //     for (let i = 0; i < removed; i++) {
  //     //       for (let j = 1; j <= removed - i; j++) {
  //     //         let tempx = initialX + j * xaxisA + i * xaxisB;
  //     //         let tempy = initialY + j * yaxisA + i * yaxisB;
  //     //         if (removed === 61 && j === removed - i) {
  //     //           console.log("tempxy at 60: ", tempx, tempy);
  //     //           console.log("adding a times: ", j);
  //     //           console.log("adding b times: ", i);
  //     //         }
  //     //         if (tempx === xtarget && tempy === ytarget) {
  //     //           console.log("found something here");
  //     //           break;
  //     //         }
  //     //       }
  //     //     }
  //     //   }
  //   }
  // }

  /// ITS NOT TOTAL WE CAN PUSH 100 TIMES FOR BOTH BUTTON.
  /// ITS EACH, FOR INDIVIDUAL, BUTTON WE CAN PUSH 100 TIMES MAX
}

console.log("output: ", output);
