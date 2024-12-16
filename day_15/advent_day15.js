const fs = require("fs");
let input = fs.readFileSync("advent_day15_custom.txt").toString().split("\n");

console.log(input);
let tempmap = [];
let instructions = [];

let flag = true;
for (let i = 0; i < input.length; i++) {
  if (input[i] === "") {
    flag = false;
    continue;
  }
  if (flag) {
    tempmap.push(input[i]);
  } else {
    instructions.push(input[i]);
  }
}
// console.log("tempmap");
// console.log(tempmap);
// console.log("instructions");
// console.log(instructions);

///////////////////////////////////////////////////////////////////////////
// // consolidated instructions
// let tempinstruction = "";
// for (let i = 0; i < instructions.length; i++) {
//   tempinstruction += instructions[i];
// }
// // console.log("tempinstruction: ", tempinstruction);
// instructions = [tempinstruction];
///////////////////////////////////////////////////////////////////////////

let map = [];
for (let i = 0; i < tempmap.length; i++) {
  map.push(tempmap[i].split(""));
}

console.log("map");
console.log(map);
for (let i = 0; i < map.length; i++) {
  console.log(JSON.stringify(map[i]));
}
console.log("instructions");
console.log(instructions[0]);

// find current position of the robot
let robotPos;
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === "@") {
      robotPos = [i, j];
      break;
    }
  }
}
console.log("robotPos: ", robotPos);

instructions = instructions[0];
for (let i = 0; i < instructions.length; i++) {
  console.log("going here now goodluck: ", instructions[i]);

  // check the direction we are going. if it is a wall "#", we dont move the robot.
  // < we need to minus 1 from robotPos[1];
  // > we need to add 1 to robotPos[1];
  // ^ we need to minus 1 from robotPos[0];
  // v we need to add 1 to robotPos[0];

  // we can do math to know how many spaces there are e.g to the right from where we are. and we can count how many boxes there are to the right as well
}
