const fs = require("fs");
let input = fs.readFileSync("advent_day12_custom.txt").toString().split("\n");
// console.log("input");
console.log(input);

let garden = [];
for (let i = 0; i < input.length; i++) {
  garden.push(input[i].split(""));
}
console.log("garden");
console.log(garden);

for (let i = 0; i < garden.length; i++) {
  for (let j = 0; j < garden[i].length; j++) {
    if (garden[i][j] !== ".") {
      // we have a flower here. do bfs and check for all the other surrounding flower of the same type
      let curr = garden[i][j];
      garden[i][j] = ".";
      let queue = [[i, j]];
      let flowerCount = 1;
      let fenceCount = 0;
      let visited = [];
      while (queue.length) {
        console.log("VISITED: ", visited);
        console.log("QUEUE: ", queue);
        // check UP DOWN LEFT RIGHT
        let currSpot = queue[0];
        console.log("currSpot: ", currSpot);
        garden[currSpot[0]][currSpot[1]] = ".";
        queue.shift();
        if (visited.includes(JSON.stringify(currSpot)) === false) {
          if (currSpot[0] - 1 >= 0) {
            // if UP exist, check that it is equal to curr
            if (garden[currSpot[0] - 1][currSpot[1]] === curr) {
              // only add if next spot not in visited
              if (
                visited.includes(
                  JSON.stringify([currSpot[0] - 1, currSpot[1]])
                ) === false
              ) {
                flowerCount++;
              }
              //   flowerCount++;
              queue.push([currSpot[0] - 1, currSpot[1]]);
            } else {
              fenceCount++;
            }
          }
          if (currSpot[0] + 1 < garden.length) {
            // if DOWN exist, check that it is equal to curr
            if (garden[currSpot[0] + 1][currSpot[1]] === curr) {
              if (
                visited.includes(
                  JSON.stringify([currSpot[0] + 1, currSpot[1]])
                ) === false
              ) {
                flowerCount++;
              }
              queue.push([currSpot[0] + 1, currSpot[1]]);
            } else {
              fenceCount++;
            }
          }
          if (currSpot[1] - 1 >= 0) {
            // if LEFT exist, check that it is equal to curr
            if (garden[currSpot[0]][currSpot[1] - 1] === curr) {
              if (
                visited.includes(
                  JSON.stringify([currSpot[0], currSpot[1] - 1])
                ) === false
              ) {
                flowerCount++;
              }
              queue.push([currSpot[0], currSpot[1] - 1]);
            } else {
              fenceCount++;
            }
          }
          if (currSpot[1] + 1 < garden[0].length) {
            // if RIGHT exist, check that it is equal to curr
            if (garden[currSpot[0]][currSpot[1] + 1] === curr) {
              if (
                visited.includes(
                  JSON.stringify([currSpot[0], currSpot[1] + 1])
                ) === false
              ) {
                flowerCount++;
              }
              queue.push([currSpot[0], currSpot[1] + 1]);
            } else {
              fenceCount++;
            }
          }
          visited.push(JSON.stringify(currSpot));
        } else {
          console.log("already visited so i go next");
          continue;
        }
      }
      console.log("my garden looks like that now");
      console.log(garden);
      console.log("for the curr flower: ", curr);
      console.log("this is how many there are: ", flowerCount);
      console.log("and we need this amount of fenceing: ", fenceCount);
    }
  }
}
