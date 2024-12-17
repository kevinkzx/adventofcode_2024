const fs = require("fs");
let input = fs.readFileSync("advent_day15_custom.txt").toString().split("\n");

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

///////////////////////////////////////////////////////////////////////////
// consolidated instructions
// let tempinstruction = "";
// for (let i = 0; i < instructions.length; i++) {
//   tempinstruction += instructions[i];
// }
// // console.log("tempinstruction: ", tempinstruction);
// instructions = [tempinstruction];
///////////////////////////////////////////////////////////////////////////

let tempmapArr = [];
for (let i = 0; i < tempmap.length; i++) {
  tempmapArr.push(tempmap[i].split(""));
}

console.log("tempmap");
for (let i = 0; i < tempmapArr.length; i++) {
  console.log(JSON.stringify(tempmapArr[i]));
}

// we need to make our new map with the following rules
// If the tile is #, the new map contains ## instead.
// If the tile is O, the new map contains [] instead.
// If the tile is ., the new map contains .. instead.
// If the tile is @, the new map contains @. instead.

let map = [];
for (let i = 0; i < tempmapArr.length; i++) {
  let temp = [];
  for (let j = 0; j < tempmapArr[i].length; j++) {
    if (tempmapArr[i][j] === "#") {
      temp.push("#", "#");
    } else if (tempmapArr[i][j] === "O") {
      temp.push("[", "]");
    } else if (tempmapArr[i][j] === ".") {
      temp.push(".", ".");
    } else {
      temp.push("@", ".");
    }
  }
  map.push(temp);
}

console.log("updated map");
for (let i = 0; i < map.length; i++) {
  console.log(JSON.stringify(map[i]));
}
instructions = instructions[0];
console.log("instructions");
console.log(instructions);

// find position of robot
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

for (let i = 0; i < instructions.length; i++) {
  // logic for when the robot move left and right is the same as p1
  console.log("doing this: ", instructions[i]);
  if (instructions[i] === "<") {
    let next = [robotPos[0], robotPos[1] - 1];
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
        map[nextCopy[0]][nextCopy[1] - temp] !== "." &&
        map[nextCopy[0]][nextCopy[1] - temp] !== "#"
      ) {
        temp++;
      }
      if (map[nextCopy[0]][nextCopy[1] - temp] === "#") {
        continue;
      } else {
        for (let i = temp; i > 0; i--) {
          map[nextCopy[0]][nextCopy[1] - i] =
            map[nextCopy[0]][nextCopy[1] - i + 1];
        }
        map[robotPos[0]][robotPos[1]] = ".";
        map[next[0]][next[1]] = "@";
        robotPos = [next[0], next[1]];
      }
    }
    for (let i = 0; i < map.length; i++) {
      console.log(JSON.stringify(map[i]));
    }
  }

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
    for (let i = 0; i < map.length; i++) {
      console.log(JSON.stringify(map[i]));
    }
  }

  // prettier-ignore
  if (instructions[i] === "^") {
    let next = [robotPos[0] - 1, robotPos[1]];
    if (map[next[0]][next[1]] === "#") {
      continue;
    } else if (map[next[0]][next[1]] === ".") {
      map[next[0]][next[1]] = "@";
      map[robotPos[0]][robotPos[1]] = ".";
      robotPos = [next[0], next[1]];
    } else {
      // we have to deal with THICCCCC boxes here
      
      // we keep iterating until our queue is empty.
      // we keep track of a 'front' queue. this represent all the spaces ahead of boxes that we can push
      queue = [];
      let front = [];
      if (map[next[0]][next[1]] === "]") {
        queue.push([[next[0], next[1]-1, "["], [next[0], next[1], "]"]]);
      } else {
        queue.push([[next[0], next[1], "["], [next[0], next[1]+1, "]"]]);
      }
      // each array in queue is a box. we need to check if both side of the box is empty
      // if either side of the box is a #, we can just continue and not move any box
      // if either side of the box is another box, we need to add to the queue
      console.log('this is queue: ', queue)

      // an idea is. while q not empty, loop thru queue and check what is infront of it
      // if its a box or part of box, we add to the queue
      //    if we are checking the left side of box [ and the value in front is
      //    ]. we need to add both sides and increase our front
      //    if we are checking the left side of the box [ and the value in front is
      //    [, we know the boxes line up
      //    also need to take note of 'overhang' as denoted by X. we need to add this
      //    value to our 'front' array as well
      //    []X
      //     []
      
      // if its empty spot, we add to 'front' array
      // at the end we check for all values of 'front' array and make sure its "."
      // as long as there is one "#" from the values of 'front' array we dont do anything
    }
  }

  // WIP down. just doing some part of down so i can test some stuff
  if (instructions[i] === "v") {
    let next = [robotPos[0] + 1, robotPos[1]];
    if (map[next[0]][next[1]] === "#") {
      continue;
    } else if (map[next[0]][next[1]] === ".") {
      map[next[0]][next[1]] = "@";
      map[robotPos[0]][robotPos[1]] = ".";
      robotPos = [next[0], next[1]];
    } else {
      console.log("oops still WIP");
    }
  }
}
