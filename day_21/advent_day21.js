// use BFS to get shortest path from current to to target
const fs = require("fs");
let input = fs.readFileSync("advent_day21.txt").toString().split("\n");
let instructions = [];
for (let i = 0; i < input.length; i++) {
  instructions.push(input[i]);
}
console.log(instructions);

// in hindsight, maybe we can jsut take the distance instead of the acutal moves
// prettier-ignore
let numPad = {
  '0': [['0', ['']], ['1', ['^<']], ['2', ['^']], ['3', ['^>', '>^']], ['4', ['^^<']], ['5', ['^^']], ['6', ['^^>', '>^^']], ['7', ['^^^<']], ['8', ['^^^']], ['9', ['^^^>', '>^^^']], ['A', ['>']]],
  '1': [['0', ['>v']], ['1', ['']], ['2', ['>']], ['3', ['>>']], ['4', ['^']], ['5', ['^>', '>^']], ['6', ['^>>', '>>^']], ['7', ['^^']], ['8', ['^^>', '>^^']], ['9', ['^^>>', '>>^^']], ['A', ['>>v']]],
  '2': [['0', ['v']], ['1', ['<']], ['2', ['']], ['3', ['>']], ['4', ['^<', '<^']], ['5', ['^']], ['6', ['^>', '>^']], ['7', ['^^<', '<^^']], ['8', ['^^']], ['9', ['^^>', '>^^']], ['A', ['v>', '>v']]],
  '3': [['0', ['v<', '<v']], ['1', ['<<']], ['2', ['<']], ['3', ['']], ['4', ['^<<', '<<^']], ['5', ['^<', '<^']], ['6', ['^']], ['7', ['^^<<', '<<^^']], ['8', ['^^<', '<^^']], ['9', ['^^']], ['A', ['v']]],
  '4': [['0', ['>vv']], ['1', ['v']], ['2', ['v>', '>v']], ['3', ['v>>', '>>v']], ['4', ['']], ['5', ['>']], ['6', ['>>']], ['7', ['^']], ['8', ['^>', '>^']], ['9', ['^>>', '>>^']], ['A', ['>>vv']]],
  '5': [['0', ['vv']], ['1', ['v<', '<v']], ['2', ['v']], ['3', ['v>', '>v']], ['4', ['<']], ['5', ['']], ['6', ['>']], ['7', ['^<', '<^']], ['8', ['^']], ['9', ['^>', '>^']], ['A', ['vv>', '>vv']]],
  '6': [['0', ['vv<', '<vv']], ['1', ['v<<', '<<v']], ['2', ['v<', '<v']], ['3', ['v']], ['4', ['<<']], ['5', ['<']], ['6', ['']], ['7', ['^<<', '<<^']], ['8', ['^<', '<^']], ['9', ['^']], ['A', ['vv']]],
  '7': [['0', ['>vvv']], ['1', ['vv']], ['2', ['>vv', 'vv>']], ['3', ['vv>>', '>>vv']], ['4', ['v']], ['5', ['v>', '>v']], ['6', ['v>>', '>>v']], ['7', ['']], ['8', ['>']], ['9', ['>>']], ['A', ['>>vvv']]],
  '8': [['0', ['vvv']], ['1', ['vv<', '<vv']], ['2', ['vv']], ['3', ['vv>', '>vv']], ['4', ['v<', '<v']], ['5', ['v']], ['6', ['v>', '>v']], ['7', ['<']], ['8', ['']], ['9', ['>']], ['A', ['vvv>', '>vvv']]],
  '9': [['0', ['vvv<', '<vvv']], ['1', ['vv<<', '<<vv']], ['2', ['vv<', '<vv']], ['3', ['vv']], ['4', ['v<<', '<<v']], ['5', ['v<', '<v']], ['6', ['v']], ['7', ['<<']], ['8', ['<']], ['9', ['']], ['A', ['vvv']]],
  'A': [['0', ['<']], ['1', ['^<<']], ['2', ['^<', '<^']], ['3', ['^']], ['4', ['^^<<']], ['5', ['^^<', '<^^']], ['6', ['^^']], ['7', ['^^^<<']], ['8', ['^^^<', '<^^^']], ['9', ['^^^']], ['A', ['']]]
}

// prettier-ignore
// let arrowPad = {
//   '^': [['^', ['']], ['>', ['v>', '>v']], ['v', ['v']], ['<', ['v<']], ['A', ['>']]],
//   '>': [['^', ['^<', '<^']], ['>', ['']], ['v', ['<']], ['<', ['<<']], ['A', ['^']]],
//   'v': [['^', ['^']], ['>', ['>']], ['v', ['']], ['<', ['<']], ['A', ['^>', '>^']]],
//   '<': [['^', ['>^']], ['>', ['>>']], ['v', ['>']], ['<', ['']], ['A', ['>>^']]],
//   'A': [['^', ['<']], ['>', ['v']], ['v', ['v<', '<v']], ['<', ['v<<']], ['A', ['']]]
// }
// prettier-ignore
let arrowPad = {
  '^': [['^', ''], ['>', 'v>'], ['v', 'v'], ['<', 'v<'], ['A', '>']],
  '>': [['^', '^<'], ['>', ''], ['v', '<'], ['<', '<<'], ['A', '^']],
  'v': [['^', '^'], ['>', '>'], ['v', ''], ['<', '<'], ['A', '^>']],
  '<': [['^', '>^'], ['>', '>>'], ['v', '>'], ['<', ''], ['A', '>>^']],
  'A': [['^', '<'], ['>', 'v'], ['v', 'v<'], ['<', 'v<<'], ['A', '']]
}

//third attemp lmao
// we just try 10000 times ah then get the min. try all the possibilities of the initial number, then we get the minimum.
let output = 0;
for (let i = 0; i < instructions.length; i++) {
  let ins = instructions[i];
  console.log("ins: ", ins);

  let min = Infinity;
  for (let j = 0; j < 100001; j++) {
    // we go to the end and get the min for each time
    let firstarr = [];
    let firstpos = "A";
    for (let k = 0; k < ins.length; k++) {
      let target = ins[k];
      let temp = numPad[firstpos];
      for (let l = 0; l < temp.length; l++) {
        if (temp[l][0] === target) {
          let choicelength = temp[l][1].length;
          let chosen = temp[l][1][Math.floor(Math.random() * choicelength)];
          firstarr.push(chosen);
          break;
        }
      }
      firstarr.push("A");
      firstpos = target;
    }
    let firstarrstring = firstarr.join("");

    let secondarr = [];
    let secondpos = "A";
    for (let k = 0; k < firstarrstring.length; k++) {
      let target = firstarrstring[k];
      let temp = arrowPad[secondpos];
      for (let l = 0; l < temp.length; l++) {
        if (temp[l][0] === target) {
          // let choicelength = temp[l][1].length;
          // let chosen = temp[l][1][Math.floor(Math.random() * choicelength)];
          // secondarr.push(chosen);
          secondarr.push(temp[l][1]);
          break;
        }
      }
      secondarr.push("A");
      secondpos = target;
    }
    let secondarrstring = secondarr.join("");

    let thirdarr = [];
    let thirdpos = "A";
    for (let k = 0; k < secondarrstring.length; k++) {
      let target = secondarrstring[k];
      let temp = arrowPad[thirdpos];
      for (let l = 0; l < temp.length; l++) {
        if (temp[l][0] === target) {
          // let choicelength = temp[l][1].length;
          // let chosen = temp[l][1][Math.floor(Math.random() * choicelength)];
          // thirdarr.push(chosen);
          thirdarr.push(temp[l][1]);
          break;
        }
      }
      thirdarr.push("A");
      thirdpos = target;
    }
    let thirdarrstring = thirdarr.join("");
    min = Math.min(min, thirdarrstring.length);
  }
  console.log("min: ", min);
  let numeralInstruction = ins.slice(0, -1);
  output += parseInt(numeralInstruction) * min;
}
console.log("output: ", output);

// let numPad = {
//   '0': [['0', ''], ['1', '^<'], ['2', '^'], ['3', '^>'], ['4', '^^<'], ['5', '^^'], ['6', '^^>'], ['7', '^^^<'], ['8', '^^^'], ['9', '^^^>'], ['A', '>']],
//   '1': [['0', '>v'], ['1', ''], ['2', '>'], ['3', '>>'], ['4', '^'], ['5', '^>'], ['6', '^>>'], ['7', '^^'], ['8', '^^>'], ['9', '^^>>'], ['A', '>>v']],
//   '2': [['0', 'v'], ['1', '<'], ['2', ''], ['3', '>'], ['4', '^<'], ['5', '^'], ['6', '^>'], ['7', '^^<'], ['8', '^^'], ['9', '^^>'], ['A', 'v>']],
//   '3': [['0', 'v<'], ['1', '<<'], ['2', '<'], ['3', ''], ['4', '^<<'], ['5', '^<'], ['6', '^'], ['7', '^^<<'], ['8', '^^<'], ['9', '^^'], ['A', 'v']],
//   '4': [['0', '>vv'], ['1', 'v'], ['2', 'v>'], ['3', 'v>>'], ['4', ''], ['5', '>'], ['6', '>>'], ['7', '^'], ['8', '^>'], ['9', '^>>'], ['A', '>>vv']],
//   '5': [['0', 'vv'], ['1', 'v<'], ['2', 'v'], ['3', 'v>'], ['4', '<'], ['5', ''], ['6', '>'], ['7', '^<'], ['8', '^'], ['9', '^>'], ['A', 'vv>']],
//   '6': [['0', 'vv<'], ['1', 'v<<'], ['2', 'v<'], ['3', 'v'], ['4', '<<'], ['5', '<'], ['6', ''], ['7', '^<<'], ['8', '^<'], ['9', '^'], ['A', 'vv']],
//   '7': [['0', '>vvv'], ['1', 'vv'], ['2', '>vv'], ['3', 'vv>>'], ['4', 'v'], ['5', 'v>'], ['6', 'v>>'], ['7', ''], ['8', '>'], ['9', '>>'], ['A', '>>vvv']],
//   '8': [['0', 'vvv'], ['1', 'vv<'], ['2', 'vv'], ['3', 'vv>'], ['4', 'v<'], ['5', 'v'], ['6', 'v>'], ['7', '<'], ['8', ''], ['9', '>'], ['A', 'vvv>']],
//   '9': [['0', 'vvv<'], ['1', 'vv<<'], ['2', 'vv<'], ['3', 'vv'], ['4', 'v<<'], ['5', 'v<'], ['6', 'v'], ['7', '<<'], ['8', '<'], ['9', ''], ['A', 'vvv']],
//   'A': [['0', '<'], ['1', '^<<'], ['2', '^<'], ['3', '^'], ['4', '^^<<'], ['5', '^^<'], ['6', '^^'], ['7', '^^^<<'], ['8', '^^^<'], ['9', '^^^'], ['A', '']]
// }

/*
second attemp kekw
let output = 0;
for (let i = 0; i < instructions.length; i++) {
  let ins = instructions[i];
  console.log("ins: ", ins);

  let firstTemp = [];
  let firstPos = "A";
  for (let j = 0; j < ins.length; j++) {
    let target = ins[j];
    let temp = numPad[firstPos];
    for (let k = 0; k < temp.length; k++) {
      if (temp[k][0] === target) {
        firstTemp.push(temp[k][1]);
        break;
      }
    }
    firstTemp.push("A");
    firstPos = target;
  }
  console.log("firsttempstring: ", firstTemp.join(""));
  console.log("length: ", firstTemp.join("").length);
  let firstTempString = firstTemp.join("");

  let secondTemp = [];
  let secondPos = "A";
  for (let j = 0; j < firstTempString.length; j++) {
    let target = firstTempString[j];
    let temp = arrowPad[secondPos];
    for (let k = 0; k < temp.length; k++) {
      if (temp[k][0] === target) {
        secondTemp.push(temp[k][1]);
        break;
      }
    }
    secondTemp.push("A");
    secondPos = target;
  }
  console.log("secondtempstring: ", secondTemp.join(""));
  console.log("length: ", secondTemp.join("").length);
  let secondTempString = secondTemp.join("");

  let thirdTemp = [];
  let thirdPos = "A";
  for (let j = 0; j < secondTempString.length; j++) {
    let target = secondTempString[j];
    let temp = arrowPad[thirdPos];
    for (let k = 0; k < temp.length; k++) {
      if (temp[k][0] === target) {
        thirdTemp.push(temp[k][1]);
        break;
      }
    }
    thirdTemp.push("A");
    thirdPos = target;
  }
  console.log("thirdtempstring: ", thirdTemp.join(""));
  console.log("length: ", thirdTemp.join("").length);
  let thirdTempString = thirdTemp.join("");

  let numeralInstruction = ins.slice(0, -1);
  console.log(
    "multiply these two: ",
    thirdTempString.length,
    parseInt(numeralInstruction)
  );
  output += parseInt(numeralInstruction) * thirdTempString.length;

  // before next set of instructions after A, i need to check if any of the arrow key is the same as the previous set of arrow keys. we should then sort them so we save time
}
console.log("output: ", output);
*/

/*
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
*/
