const fs = require("fs");
let input = fs.readFileSync("advent_day23_custom.txt").toString().split("\n");
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
// prettier-ignore
for (const [key, value] of Object.entries(graph)) {
  console.log("key: ", key);
  console.log("value: ", value);
  let valarr = value;
  for (let i = 0; i < valarr.length - 1; i++) {
    let temp = [key];
    temp.push(valarr[i]);
    temp.push(valarr[i + 1]);
    let sortedtemp = temp.sort((a, b) => {return a - b});
    console.log("temp: ", sortedtemp);

  }
}
