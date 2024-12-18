const fs = require("fs");
let input = fs.readFileSync("advent_day15.txt").toString().split("\n");

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
// consolidated instructions
let tempinstruction = "";
for (let i = 0; i < instructions.length; i++) {
  tempinstruction += instructions[i];
}
// console.log("tempinstruction: ", tempinstruction);
instructions = [tempinstruction];
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
  // console.log("going here now goodluck: ", instructions[i]);

  // check the direction we are going. if it is a wall "#", we dont move the robot.
  // < we need to minus 1 from robotPos[1];
  // > we need to add 1 to robotPos[1];
  // ^ we need to minus 1 from robotPos[0];
  // v we need to add 1 to robotPos[0];

  // we can do math to know how many spaces there are e.g to the right from where we are. and we can count how many boxes there are to the right as well

  if (instructions[i] === "<") {
    // we going left. next spot would be robotPos[0], robotPos[1]-1. // check if next spot is a wall
    let next = [robotPos[0], robotPos[1] - 1];
    if (map[next[0]][next[1]] === "#") {
      // console.log("left of robot has a wall");
      continue;
    } else if (map[next[0]][next[1]] === ".") {
      // check and see if we need to update robot positioning.
      // if there is empty spot, we just move and update robot position
      // empty spot, we can just update robot positiong
      map[next[0]][next[1]] = "@";
      map[robotPos[0]][robotPos[1]] = ".";
      robotPos = [next[0], next[1]];
    } else {
      // we need to check for boxes and see if we can push.
      // we can keep iterating until we find a empty spot or we hit a wall #
      // console.log("current bot position: ", robotPos);
      let temp = 0;
      let nextCopy = structuredClone(robotPos);
      while (
        map[nextCopy[0]][nextCopy[1] - temp] !== "." &&
        map[nextCopy[0]][nextCopy[1] - temp] !== "#"
      ) {
        temp++;
      }
      // console.log("temp: ", temp);
      // console.log(
      //   "found something at temp: ",
      //   map[nextCopy[0]][nextCopy[1] - temp]
      // );
      // we need to check map[nextCopy[0]][nextCopy[1] - temp] if is a empty spot or a wall #
      // if it is a wall, we dont do anything to the robot, nothing changes
      if (map[nextCopy[0]][nextCopy[1] - temp] === "#") {
        continue;
      } else {
        // we need to push the boxes since there is an empty spot here
        for (let i = temp; i > 0; i--) {
          // we can swap the current item with the previous one since we are going back towards the right
          map[nextCopy[0]][nextCopy[1] - i] =
            map[nextCopy[0]][nextCopy[1] - i + 1].toString();
        }
        // original position of bot need to change to "."
        map[robotPos[0]][robotPos[1]] = ".";
        // update bot next position
        map[next[0]][next[1]] = "@";
        robotPos = [next[0], next[1]];
      }
    }
    // for (let i = 0; i < map.length; i++) {
    //   console.log(JSON.stringify(map[i]));
    // }
  }

  // do the same for up
  if (instructions[i] === "^") {
    let next = [robotPos[0] - 1, robotPos[1]];
    if (map[next[0]][next[1]] === "#") {
      // top of robot is a wall
      continue;
    } else if (map[next[0]][next[1]] === ".") {
      // empty space on top of robot
      map[next[0]][next[1]] = "@";
      map[robotPos[0]][robotPos[1]] = ".";
      robotPos = [next[0], next[1]];
    } else {
      // box on top of robot
      let temp = 0;
      let nextCopy = structuredClone(robotPos);
      while (
        map[nextCopy[0] - temp][nextCopy[1]] !== "." &&
        map[nextCopy[0] - temp][nextCopy[1]] !== "#"
      ) {
        temp++;
      }
      // check if it is empty space or a wall here
      if (map[nextCopy[0] - temp][nextCopy[1]] === "#") {
        continue;
      } else {
        for (let i = temp; i > 0; i--) {
          map[nextCopy[0] - i][nextCopy[1]] =
            map[nextCopy[0] - i + 1][nextCopy[1]];
        }
        map[robotPos[0]][robotPos[1]] = ".";
        map[next[0]][next[1]] = "@";
        robotPos = [next[0], next[1]];
      }
    }
    // for (let i = 0; i < map.length; i++) {
    //   console.log(JSON.stringify(map[i]));
    // }
  }

  // do the same for right
  if (instructions[i] === ">") {
    let next = [robotPos[0], robotPos[1] + 1];
    if (map[next[0]][next[1]] === "#") {
      continue;
    } else if (map[next[0]][next[1]] === ".") {
      map[next[0]][next[1]] = "@";
      map[robotPos[0]][robotPos[1]] = ".";
      robotPos = [next[0], next[1]];
    } else {
      let temp = 0;
      let nextCopy = structuredClone(robotPos);
      while (
        map[nextCopy[0]][nextCopy[1] + temp] !== "." &&
        map[nextCopy[0]][nextCopy[1] + temp] !== "#"
      ) {
        temp++;
      }
      if (map[nextCopy[0]][nextCopy[1] + temp] === "#") {
        continue;
      } else {
        for (let i = temp; i > 0; i--) {
          map[nextCopy[0]][nextCopy[1] + i] =
            map[nextCopy[0]][nextCopy[1] + i - 1];
        }
        map[robotPos[0]][robotPos[1]] = ".";
        map[next[0]][next[1]] = "@";
        robotPos = [next[0], next[1]];
      }
    }
    // for (let i = 0; i < map.length; i++) {
    //   console.log(JSON.stringify(map[i]));
    // }
  }

  // do the same for down
  if (instructions[i] === "v") {
    let next = [robotPos[0] + 1, robotPos[1]];
    if (map[next[0]][next[1]] === "#") {
      continue;
    } else if (map[next[0]][next[1]] === ".") {
      map[next[0]][next[1]] = "@";
      map[robotPos[0]][robotPos[1]] = ".";
      robotPos = [next[0], next[1]];
    } else {
      let temp = 0;
      let nextCopy = structuredClone(robotPos);
      while (
        map[nextCopy[0] + temp][nextCopy[1]] !== "." &&
        map[nextCopy[0] + temp][nextCopy[1]] !== "#"
      ) {
        temp++;
      }
      if (map[nextCopy[0] + temp][nextCopy[1]] === "#") {
        continue;
      } else {
        for (let i = temp; i > 0; i--) {
          map[nextCopy[0] + i][nextCopy[1]] =
            map[nextCopy[0] + i - 1][nextCopy[1]];
        }
        map[robotPos[0]][robotPos[1]] = ".";
        map[next[0]][next[1]] = "@";
        robotPos = [next[0], next[1]];
      }
    }
    // for (let i = 0; i < map.length; i++) {
    //   console.log(JSON.stringify(map[i]));
    // }
  }
}

console.log("final map: ");
for (let i = 0; i < map.length; i++) {
  console.log(JSON.stringify(map[i]));
}

// to get output, we iterate the map and find "O".
// then we take 100*i + j
let output = 0;
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === "O") {
      output += 100 * i + j;
    }
  }
}
console.log("output: ", output);
