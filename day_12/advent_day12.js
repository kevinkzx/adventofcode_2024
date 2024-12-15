const fs = require("fs");
let input = fs.readFileSync("advent_day12.txt").toString().split("\n");
// console.log("input");
// console.log(input);

let garden = [];
for (let i = 0; i < input.length; i++) {
  garden.push(input[i].split(""));
}
console.log("garden");
// console.log(garden);
garden.pop();
console.log("last line of garden: ", garden[garden.length - 1]);

////////////////////// PART 1 APPROACH //////////////////////
/*
we iterate thru each spot in the garden and do a BFS.
for BFS logic, we BFS the flower that is on the current spot. we check that the spot we are going to next is of the same type.
if it is for the same type, we add to our queue and increase the flower count. we also add the spots we are currently on in the queue
to check if it has been previously visited.

for the fence logic, we check that for the current spot, the UP DOWN LEFT RIGHT is not touching any of the flowers of its type and it is not at the edge of the garden
*/

let output = 0;
let myset = new Set();
for (let i = 0; i < garden.length; i++) {
  for (let j = 0; j < garden[i].length; j++) {
    console.log("on i j now: ", i, j);

    // we have a flower here. do bfs and check for all the other surrounding flower of the same type
    let curr = garden[i][j];
    // garden[i][j] = ".";
    let queue = [[i, j]];
    let flowerCount = 0;
    let fenceCount = 0;

    // console.log("in new forfor lloop");
    while (queue.length) {
      if (myset.has(JSON.stringify(queue[0])) === false) {
        // console.log("queue: ", queue);
        // console.log("myset: ", myset);
        let standing = queue[0];

        queue.shift();

        // check for up
        if (
          standing[0] - 1 >= 0 &&
          garden[standing[0] - 1][standing[1]] === curr
        ) {
          // check before pushing. check we have not visited that place first
          if (
            myset.has(JSON.stringify([standing[0] - 1, standing[1]])) === false
          ) {
            queue.push([standing[0] - 1, standing[1]]);
          }
        }
        // check for down
        if (
          standing[0] + 1 < garden.length &&
          garden[standing[0] + 1][standing[1]] === curr
        ) {
          if (
            myset.has(JSON.stringify([standing[0] + 1, standing[1]])) === false
          ) {
            queue.push([standing[0] + 1, standing[1]]);
          }
        }
        // check for left
        if (
          standing[1] - 1 >= 0 &&
          garden[standing[0]][standing[1] - 1] === curr
        ) {
          if (
            myset.has(JSON.stringify([standing[0], standing[1] - 1])) === false
          ) {
            queue.push([standing[0], standing[1] - 1]);
          }
        }
        // check for right
        if (
          standing[1] + 1 < garden[0].length &&
          garden[standing[0]][standing[1] + 1] === curr
        ) {
          if (
            myset.has(JSON.stringify([standing[0], standing[1] + 1])) === false
          ) {
            queue.push([standing[0], standing[1] + 1]);
          }
        }
        // fenceLOGIC. check UP DOWN LEFT RIGHT. if it is outofbounds, we add fence. if it is not out of bounds, we check whether the next spot is same as curr. if it is not, we add fence
        // UP
        if (myset.has(JSON.stringify([standing[0], standing[1]])) === false) {
          if (standing[0] - 1 < 0) {
            fenceCount++;
          } else {
            if (garden[standing[0] - 1][standing[1]] !== curr) {
              fenceCount++;
            }
          }
          // DOWN
          if (standing[0] + 1 >= garden.length) {
            fenceCount++;
          } else {
            if (garden[standing[0] + 1][standing[1]] !== curr) {
              fenceCount++;
            }
          }
          // LEFT
          if (standing[1] - 1 < 0) {
            fenceCount++;
          } else {
            if (garden[standing[0]][standing[1] - 1] !== curr) {
              fenceCount++;
            }
          }
          // RIGHT
          if (standing[1] + 1 >= garden[0].length) {
            fenceCount++;
          } else {
            if (garden[standing[0]][standing[1] + 1] !== curr) {
              fenceCount++;
            }
          }
        }
        if (
          myset.has(JSON.stringify(standing)) === false &&
          garden[standing[0]][standing[1]] === curr
        ) {
          flowerCount++;
          myset.add(JSON.stringify(standing));
        }
      } else {
        queue.shift();
      }
    }

    // console.log("my garden looks like that now");
    // console.log(garden);
    // console.log("for the curr flower: ", curr);
    // console.log("this is how many there are: ", flowerCount);
    // console.log("and we need this amount of fenceing: ", fenceCount);
    output += flowerCount * fenceCount;
  }
}
console.log("output: ", output);
