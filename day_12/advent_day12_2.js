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
let secondOuput = 0;
let myset = new Set();
for (let i = 0; i < garden.length; i++) {
  for (let j = 0; j < garden[i].length; j++) {
    // console.log("on i j now: ", i, j);

    // we have a flower here. do bfs and check for all the other surrounding flower of the same type
    let curr = garden[i][j];
    // garden[i][j] = ".";
    let queue = [[i, j]];
    let flowerCount = 0;
    let fenceCount = 0;
    let fenceDict = {};
    fenceDict["horizontal"] = [];
    fenceDict["vertical"] = [];
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
        // UP. horizontal fence
        if (myset.has(JSON.stringify([standing[0], standing[1]])) === false) {
          if (standing[0] - 1 < 0) {
            fenceCount++;
            fenceDict["horizontal"].push([standing[0], standing[1], "U"]);
          } else {
            if (garden[standing[0] - 1][standing[1]] !== curr) {
              fenceCount++;
              fenceDict["horizontal"].push([standing[0], standing[1], "U"]);
            }
          }
          // DOWN. horizontal fence
          if (standing[0] + 1 >= garden.length) {
            fenceCount++;
            fenceDict["horizontal"].push([standing[0], standing[1], "D"]);
          } else {
            if (garden[standing[0] + 1][standing[1]] !== curr) {
              fenceCount++;
              fenceDict["horizontal"].push([standing[0], standing[1], "D"]);
            }
          }
          // LEFT. vertical fence
          if (standing[1] - 1 < 0) {
            fenceCount++;
            fenceDict["vertical"].push([standing[0], standing[1], "L"]);
          } else {
            if (garden[standing[0]][standing[1] - 1] !== curr) {
              fenceCount++;
              fenceDict["vertical"].push([standing[0], standing[1], "L"]);
            }
          }
          // RIGHT. vertical fence
          if (standing[1] + 1 >= garden[0].length) {
            fenceCount++;
            fenceDict["vertical"].push([standing[0], standing[1], "R"]);
          } else {
            if (garden[standing[0]][standing[1] + 1] !== curr) {
              fenceCount++;
              fenceDict["vertical"].push([standing[0], standing[1], "R"]);
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
    if (fenceDict["horizontal"].length) {
      // console.log("for this flower and count: ", curr, flowerCount);
      // console.log("fences: ", fenceDict);

      // just taking horizontal into account, we can sort by first index, then second index.
      // after sorting, we need to find the fences that are 'in-line' we can do this by checking the second index to make sure they are in increment order.
      // to check that they are in line, we need to make sure that they are on the same 'level' and also for each fence, the next second index is 1 higher than the pervious

      let horizontal = fenceDict["horizontal"];
      let sortedHorizontal = horizontal.sort((a, b) => {
        // sort increasing first index. then increasing second index
        if (a[0] === b[0]) {
          return a[1] - b[1];
        } else {
          return a[0] - b[0];
        }
      });
      // console.log("sortedHorizontal: ", sortedHorizontal);
      let horizontalU = [];
      let horizontalD = [];
      for (let i = 0; i < sortedHorizontal.length; i++) {
        if (sortedHorizontal[i][2] === "U") {
          horizontalU.push(sortedHorizontal[i]);
        } else {
          horizontalD.push(sortedHorizontal[i]);
        }
      }
      // console.log("horizontal: ", horizontal);
      // console.log("horizontalU: ", horizontalU);
      // console.log("horizontalD: ", horizontalD);
      // for each U, D. we count how many levels there are according to their first index
      let horizontalCount = 1;
      let horizontalULevelTemp = horizontalU[0][0];
      let horizontalUtemp = horizontalU[0][1];
      for (let i = 0; i < horizontalU.length; i++) {
        if (
          horizontalU[i][0] !== horizontalULevelTemp ||
          horizontalU[i][1] - horizontalUtemp > 1
        ) {
          horizontalCount++;
          horizontalULevelTemp = horizontalU[i][0];
          horizontalUtemp = horizontalU[i][1];
        } else {
          horizontalULevelTemp = horizontalU[i][0];
          horizontalUtemp = horizontalU[i][1];
        }
      }
      horizontalCount++;
      let horizontalDLevelTemp = horizontalD[0][0];
      let horizontalDtemp = horizontalD[0][1];
      for (let i = 0; i < horizontalD.length; i++) {
        if (
          horizontalD[i][0] !== horizontalDLevelTemp ||
          horizontalD[i][1] - horizontalDtemp > 1
        ) {
          horizontalCount++;
          horizontalDLevelTemp = horizontalD[i][0];
          horizontalDtemp = horizontalD[i][1];
        } else {
          horizontalDLevelTemp = horizontalD[i][0];
          horizontalDtemp = horizontalD[i][1];
        }
      }
      // console.log("####### horizontalCount: ", horizontalCount);

      // do the same for the vertical fences
      let vertical = fenceDict["vertical"];
      let sortedVertical = vertical.sort((a, b) => {
        if (a[1] === b[1]) {
          return a[0] - b[0];
        } else {
          return a[1] - b[1];
        }
      });
      let verticalL = [];
      let verticalR = [];
      for (let i = 0; i < sortedVertical.length; i++) {
        if (sortedVertical[i][2] === "L") {
          verticalL.push(sortedVertical[i]);
        } else {
          verticalR.push(sortedVertical[i]);
        }
      }
      // console.log("vertical dict: ", vertical);
      // console.log("vertical L: ", verticalL);
      // console.log("vertical R: ", verticalR);
      let verticalCount = 1;
      let verticalLLevelTemp = verticalL[0][1];
      let verticalLtemp = verticalL[0][0];
      for (let i = 1; i < verticalL.length; i++) {
        if (
          verticalL[i][1] !== verticalLLevelTemp ||
          verticalL[i][0] - verticalLtemp > 1
        ) {
          verticalCount++;
          verticalLLevelTemp = verticalL[i][1];
          verticalLtemp = verticalL[i][0];
        } else {
          verticalLLevelTemp = verticalL[i][1];
          verticalLtemp = verticalL[i][0];
        }
      }
      verticalCount++;
      let verticalRLevelTemp = verticalR[0][1];
      let verticalRtemp = verticalR[0][0];
      for (let i = 1; i < verticalR.length; i++) {
        if (
          verticalR[i][1] !== verticalRLevelTemp ||
          verticalR[i][0] - verticalRtemp > 1
        ) {
          verticalCount++;
          verticalRLevelTemp = verticalR[i][1];
          verticalRtemp = verticalR[i][0];
        } else {
          verticalRLevelTemp = verticalR[i][1];
          verticalRtemp = verticalR[i][0];
        }
      }
      // console.log("############# vertical count: ", verticalCount);

      secondOuput += flowerCount * (verticalCount + horizontalCount);
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
console.log("second output: ", secondOuput);
