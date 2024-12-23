// use BFS to get shortest path from current to to target
const fs = require("fs");
let input = fs.readFileSync("advent_day21_custom.txt").toString().split("\n");
let instructions = [];
for (let i = 0; i < input.length; i++) {
  instructions.push(input[i]);
}
console.log(instructions);

// prettier-ignore
let numPad = {
    '7': [['8', '>'], ['4', 'v']],
    '8': [['7', '<'], ['5', 'v'], ['9', '>']],
    '9': [['8', '<'], ['6', 'v']],
    '4': [['7', '^'], ['5', '>'], ['1', 'v']],
    '5': [['4', '<'], ['8', '^'], ['6', '>'], ['2', 'v']],
    '6': [['9', '^'], ['5', '<'], ['3', 'v']],
    '1': [['4', '^'], ['2', '>']],
    '2': [['1', '<'], ['5', '^'], ['3', '>'], ['0', 'v']],
    '3': [['2', '<'], ['6', '^'], ['A', 'v']],
    '0': [['2', '^'], ['A', '>']],
    'A': [['0', '<'], ['3', '^']]
}

// prettier-ignore
let arrowPad = {
    '^': [['v', 'v'], ['A', '>']],
    'A': [['^', '<'], ['>', 'v']],
    '<': [['v', '>']],
    'v': [['<', '<'], ['^', '^'], ['>', '>']],
    '>': [['v', '<'], ['A', '^']]
}

const BFSpath = (start, end, graph) => {
  // start would be something like "0", end would be something like "A"
  let queue = [[start]];
  let visited = new Set();
  //   console.log("queue: ", queue);
  //   console.log("visited");
  while (queue.length > 0) {
    let path = queue.shift();
    let curr = path[path.length - 1];
    // console.log("curr: ", curr);
    if (curr[0] === end[0]) {
      return path;
    } else if (!visited.has(curr[0])) {
      let neighbours = graph[curr[0]];
      //   console.log("neighbours: ", neighbours);

      for (let j = 0; j < neighbours.length; j++) {
        if (!visited.has(neighbours[j][0])) {
          queue.push([...path, neighbours[j]]);
        }
      }
      visited.add(curr[0]);
    }
  }
  // function call let path = BFSpath("9", "A", numPad);
  // will return something like [ '9', [ '6', 'v' ], [ '3', 'v' ], [ 'A', 'v' ] ]
};
// let something = BFSpath("9", "A", numPad);
// console.log("something: ", something);

let output = 0;
for (let i = 0; i < instructions.length; i++) {
  let instruction = instructions[i]; // '029A';
  console.log("instruction: ", instruction);
  let firstRobotStart = "A";
  let firstTemp = [];
  for (let j = 0; j < instruction.length; j++) {
    let pathReturn = BFSpath(firstRobotStart, instruction[j], numPad);
    firstRobotStart = instruction[j];
    // console.log("pathReturn with button press: ", pathReturn);
    pathReturn = pathReturn.slice(1);
    for (let k = 0; k < pathReturn.length; k++) {
      firstTemp.push(pathReturn[k][1]);
    }
    firstTemp.push("A");
  }
  console.log("firstTemp: ", firstTemp.join(""));
  let firstTempString = firstTemp.join("");

  let secondTemp = [];
  let secondRobotStart = "A";
  for (let j = 0; j < firstTempString.length; j++) {
    let pathReturn = BFSpath(secondRobotStart, firstTempString[j], arrowPad);
    secondRobotStart = firstTempString[j];
    // console.log("pathReturn for second robot: ", pathReturn);
    pathReturn = pathReturn.slice(1);
    for (let k = 0; k < pathReturn.length; k++) {
      secondTemp.push(pathReturn[k][1]);
    }
    secondTemp.push("A");
  }
  console.log("secondTemp: ", secondTemp.join(""));
  let secondTempString = secondTemp.join("");

  let thirdTemp = [];
  let thirdRobotStart = "A";
  for (let j = 0; j < secondTempString.length; j++) {
    let pathReturn = BFSpath(thirdRobotStart, secondTempString[j], arrowPad);
    thirdRobotStart = secondTempString[j];
    pathReturn = pathReturn.slice(1);
    for (let k = 0; k < pathReturn.length; k++) {
      thirdTemp.push(pathReturn[k][1]);
    }
    thirdTemp.push("A");
  }
  console.log("thirdTemp: ", thirdTemp.join(""));
  console.log("thirdtemp length: ", thirdTemp.length);
  // get length of third temp multiply by the numeral values of string
  let numeralInstruction = instruction.slice(0, -1);
  output += parseInt(numeralInstruction) * thirdTemp.length;
}
console.log("output: ", output);
