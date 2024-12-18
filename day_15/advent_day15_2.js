const fs = require("fs");
let input = fs.readFileSync("advent_day15.txt").toString().split("\n");

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
let tempinstruction = "";
for (let i = 0; i < instructions.length; i++) {
  tempinstruction += instructions[i];
}
// console.log("tempinstruction: ", tempinstruction);
instructions = [tempinstruction];
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
    // for (let i = 0; i < map.length; i++) {
    //   console.log(JSON.stringify(map[i]));
    // }
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
    // for (let i = 0; i < map.length; i++) {
    //   console.log(JSON.stringify(map[i]));
    // }
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
      let history = [];
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
      while (queue.length) {
        let curr = queue[0];
        history.push(curr);
        queue.shift();
        // curr will look something like this [ [ 4, 6, '[' ], [ 4, 7, ']' ] ]
        // check left bracket curr[0]
        if (map[curr[0][0]-1][curr[0][1]] === "[") {
          // []
          // []
          queue.push([ [curr[0][0]-1, curr[0][1], "["], [curr[0][0]-1, curr[0][1]+1, "]"] ]); 
        } else if (map[curr[0][0]-1][curr[0][1]] === "]") {
          // []
          //  []
          queue.push([ [curr[0][0]-1, curr[0][1]-1, "["], [curr[0][0]-1, curr[0][1], "]"] ]);
        } else {
          if (front.includes(curr) === false) {
            front.push(curr);
          }
        }

        // check right bracket curr[1]
        if (map[curr[1][0]-1][curr[1][1]] === "]") {
          // []
          // []
          queue.push([ [curr[1][0]-1, curr[1][1]-1, "["], [curr[1][0]-1, curr[1][1], "]"] ]);
        } else if (map[curr[1][0]-1][curr[1][1]] === "[") {
          //  []
          // []
          queue.push([ [curr[1][0]-1, curr[1][1], "["], [curr[1][0]-1, curr[1][1]+1, "]"] ]);
        } else {
          if (front.includes(curr) === false) {
            front.push(curr);
          }
        }
      }
      console.log('this is my front: ', front);
      // check that everything in front of front is empty space. if it is empty space, then we push. else we skip
      console.log('history: ', history);
      let push = true;
      for (let i = 0; i < front.length; i++) {
        let temp = front[i]; 
        // temp will look something like this [ [ 3, 5, '[' ], [ 3, 6, ']' ] ]
        for (let j = 0; j < temp.length; j++) {
          if (map[temp[j][0]-1][temp[j][1]] === "#") {
            console.log('there is a obstacle infront of this box: ', temp[j]);
            push = false;
            break;
          }
        }
      }
      if (push) {
        console.log('safe to push all the boxes');
        for (let i = 0; i < history.length; i++) {
          let temp = history[i];
          // temp will look something like this  [ [ 4, 6, '[' ], [ 4, 7, ']' ] ]
          // this iteration will set everything to . first. the next for loop will set the new position of boxes
          for (let j = 0; j < temp.length; j++) {
            map[temp[j][0]][temp[j][1]] = "."
          }
        }
        for (let i = 0; i < history.length; i++) {
          let temp = history[i];
          for (let j = 0; j < temp.length; j++) {
            map[temp[j][0]-1][temp[j][1]] = temp[j][2];
          }
        }
        map[next[0]][next[1]] = "@";
        map[robotPos[0]][robotPos[1]] = ".";
        robotPos = [next[0], next[1]];
      } else {
        continue;
      }
      // for (let i = 0; i < map.length; i++) {
      //   console.log(JSON.stringify(map[i]));
      // }
    }
  }

  // prettier-ignore
  if (instructions[i] === "v") {
    let next = [robotPos[0] + 1, robotPos[1]];
    if (map[next[0]][next[1]] === "#") {
      continue;
    } else if (map[next[0]][next[1]] === ".") {
      map[next[0]][next[1]] = "@";
      map[robotPos[0]][robotPos[1]] = ".";
      robotPos = [next[0], next[1]];
    } else {
      console.log('afdafds')
      queue = [];
      let front = [];
      let history = [];
      if (map[next[0]][next[1]] === "]") {
        // .@
        // []
        queue.push([ [next[0], next[1]-1, "["], [next[0], next[1], "]"] ]);
      } else {
        // .@.
        // .[]
        queue.push([ [next[0], next[1], "["], [next[0], next[1]+1, "]"] ]);
      }

      while (queue.length) {
        console.log('queue: ', queue)
        let curr = queue[0];
        history.push(curr);
        queue.shift();
        // check left bracket curr[0]
        if (map[curr[0][0]+1][curr[0][1]] === "[") {
          queue.push([ [curr[0][0]+1, curr[0][1], "["], [curr[0][0]+1, curr[0][1]+1, "]"] ]);
        } else if (map[curr[0][0]+1][curr[0][1]] === "]") {
          queue.push([ [curr[0][0]+1, curr[0][1]-1, "["], [curr[0][0]+1, curr[0][1], "]"] ]);
        } else {
          if (front.includes(curr) === false) {
            front.push(curr);
          }
        }
        // check right bracket curr[1]
        if (map[curr[1][0]+1][curr[1][1]] === "]") {
          queue.push([ [curr[1][0]+1, curr[1][1]-1, "["], [curr[1][0]+1, curr[1][1], "]"] ]);
        } else if (map[curr[1][0]+1][curr[1][1]] === "[") {
          queue.push([ [curr[1][0]+1, curr[1][1], "["], [curr[1][0]+1, curr[1][1]+1, "]"] ]);
        } else {
          if (front.includes(curr) === false) {
            front.push(curr);
          }
        }
      }
      console.log('this is FRONt: ', front)
      let push = true;
      for (let i = 0; i < front.length; i++) {
        let temp = front[i];
        for (let j = 0; j < temp.length; j++) {
          if (map[temp[j][0]+1][temp[j][1]] === "#") {
            push = false;
            break;
          }
        }
      }
      if (push) {
        // console.log('safe to push');
        // console.log('history: ', history);
        for (let i = 0; i < history.length; i++) {
          let temp = history[i];
          for (let j = 0; j < temp.length; j++) {
            map[temp[j][0]][temp[j][1]] = ".";
          }
        }
        for (let i = 0; i < history.length; i++) {
          let temp = history[i];
          for (let j = 0; j < temp.length; j++) {
            map[temp[j][0]+1][temp[j][1]] = temp[j][2];
          }
        }
        map[next[0]][next[1]] = "@";
        map[robotPos[0]][robotPos[1]] = ".";
        robotPos = [next[0], next[1]]
      } else {
        continue;
      }
      // for (let i = 0; i < map.length; i++) {
      //   console.log(JSON.stringify(map[i]));
      // }
    }
  }
}
for (let i = 0; i < map.length; i++) {
  console.log(JSON.stringify(map[i]));
}

// to get output we iterate thru map and find "["
// we then take 100*i + j
let output = 0;
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === "[") {
      output += 100 * i + j;
    }
  }
}
console.log("output: ", output);
