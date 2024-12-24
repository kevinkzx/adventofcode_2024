const fs = require("fs");
let input = fs.readFileSync("advent_day23.txt").toString().split("\n");
// console.log(input);

let graph = {};
for (let i = 0; i < input.length; i++) {
  let temp = input[i].split("-");
  //   console.log("temp: ", temp);
  if (graph[temp[0]] === undefined) {
    graph[temp[0]] = [temp[1]];
  } else {
    graph[temp[0]].push(temp[1]);
  }

  if (graph[temp[1]] === undefined) {
    graph[temp[1]] = [temp[0]];
  } else {
    graph[temp[1]].push(temp[0]);
  }
}

console.log("graph");
console.log(graph);

let visited = new Set();
let multiplayer = [];
// prettier-ignore
for (const [key, value] of Object.entries(graph)) {
  // console.log("key: ", key);
  // console.log("value: ", value);
  let valarr = value;
  for (let i = 0; i < valarr.length - 1; i++) {
    for (let l = i+1; l < valarr.length; l++) {
      let temp = [key];
      temp.push(valarr[i]);
      temp.push(valarr[l]);
      let sortedtemp = temp.sort((a, b) => {return a.localeCompare(b)});
      // console.log("sortedtemp: ", sortedtemp);
      // check if sortedtemp is in visited. if it is, we skip
      if (visited.has(JSON.stringify(sortedtemp)) === false) {
        // for each of the item in sortedtemp, we need to check if the other 2 item is a connection from our graph
        let flag = true;
        for (let j = 0; j < sortedtemp.length; j++) {
          for (let k = 0; k < sortedtemp.length; k++) {
            if (k !== j) {
              if (graph[sortedtemp[j]].includes(sortedtemp[k]) === false) {
                flag = false;
              }
            }
          }
        }
        if (flag) {
          multiplayer.push(sortedtemp);
        }
        visited.add(JSON.stringify(sortedtemp))
      }
    } 
  }
}
console.log("multiplayer: ", multiplayer);
let outputarr = [];
// for each of the multiplayer sets, if any of the computer starts with t, we add to output. return count
for (let i = 0; i < multiplayer.length; i++) {
  for (let j = 0; j < multiplayer[i].length; j++) {
    if (multiplayer[i][j][0] === "t") {
      outputarr.push(multiplayer[i]);
      break;
    }
  }
}
console.log("length: ", outputarr.length);

// sorting string. we use a.localCompare(b)
