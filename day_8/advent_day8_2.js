const fs = require("fs");

let input = fs.readFileSync("advent_day8.txt").toString().split("\n");

// console.log("input: ", input);

// antennas are denoted by single lower case letter, upper case letter, or digits

let minimap = [];
for (let i = 0; i < input.length; i++) {
  minimap.push(input[i].split(""));
}
// console.log("minimap");
// console.log(minimap);
minimap.pop();
console.log("firstline: ", minimap[0]);
console.log("last line: ", minimap[minimap.length - 1]);

let mydict = {};
for (let i = 0; i < minimap.length; i++) {
  for (let j = 0; j < minimap[0].length; j++) {
    if (minimap[i][j] !== ".") {
      let tempAntenna = minimap[i][j];
      if (mydict[tempAntenna] === undefined) {
        mydict[tempAntenna] = [[i, j]];
      } else {
        mydict[tempAntenna].push([i, j]);
      }
    }
  }
}
// console.log("mydict: ", mydict);

let numOfRows = minimap.length;
let numOfCols = minimap[0].length;

// for each antenna type
//     for each antenna, check against the other antenna of the same type
//     find the projected distance and check if it is within the boundary of the minimap
let output = 0;
let antinodeList = [];
for (const [key, value] of Object.entries(mydict)) {
  //   console.log("key: ", key);
  //   console.log("value: ", value);

  for (let i = 0; i < value.length; i++) {
    // check this antenna against all the other antenna but itself
    for (let j = 0; j < value.length; j++) {
      if (j !== i) {
        // console.log("checking my current antenna: ", value[i]);
        // console.log("against this target antenna: ", value[j]);

        // for part 2, instead of multiplying by 2, we need to multiply by 3,4,5,.... until new position is out of minimap

        let colsdiff = value[j][1] - value[i][1];
        let rowsdiff = value[j][0] - value[i][0];
        let newCol = value[i][1] + colsdiff;
        let newRow = value[i][0] + rowsdiff;
        if (
          newCol >= 0 &&
          newCol < numOfCols &&
          newRow >= 0 &&
          newRow < numOfRows
        ) {
          // antinode has to be unique
          if (
            antinodeList.includes(JSON.stringify([newRow, newCol])) === false
          ) {
            // console.log("over here: ", newRow, newCol);
            output++;
            antinodeList.push(JSON.stringify([newRow, newCol]));
          }
          //   output++;
          //   console.log("antinode at this index: ", newRow, newCol);
          while (
            newCol >= 0 &&
            newCol < numOfCols &&
            newRow >= 0 &&
            newRow < numOfRows
          ) {
            newCol += colsdiff;
            newRow += rowsdiff;
            if (
              newCol >= 0 &&
              newCol < numOfCols &&
              newRow >= 0 &&
              newRow < numOfRows
            ) {
              // antinode has to be unique
              if (
                antinodeList.includes(JSON.stringify([newRow, newCol])) ===
                false
              ) {
                // console.log("over here: ", newRow, newCol);
                output++;
                antinodeList.push(JSON.stringify([newRow, newCol]));
              }
            }
          }
        }
      }
    }
  }
}
console.log("output: ", output);
