// i guess i need to write a recursion and memoize it for p2

// MEGA CREDITS TO: https://github.com/onlyroz/AdventOfCode2024/blob/main/day21/src/partTwo/index.ts

const fs = require("fs");
let input = fs.readFileSync("advent_day21.txt").toString().split("\n");
let instructions = [];
for (let i = 0; i < input.length; i++) {
  instructions.push(input[i]);
}
console.log(instructions);

//// dont use this. its a bait
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
//// dont use this. its a bait
// prettier-ignore
let arrowPad = {
  '^': [['^', ''], ['>', 'v>'], ['v', 'v'], ['<', 'v<'], ['A', '>']],
  '>': [['^', '^<'], ['>', ''], ['v', '<'], ['<', '<<'], ['A', '^']],
  'v': [['^', '^'], ['>', '>'], ['v', ''], ['<', '<'], ['A', '^>']],
  '<': [['^', '>^'], ['>', '>>'], ['v', '>'], ['<', ''], ['A', '>>^']],
  'A': [['^', '<'], ['>', 'v'], ['v', 'v<'], ['<', 'v<<'], ['A', '']]
}

// prettier-ignore
const stolenNumPad = {
  '0,0': '',
  '0,1': '^<',
  '0,2': '^',
  '0,3': '^>',
  '0,4': '^^<',
  '0,5': '^^',
  '0,6': '^^>',
  '0,7': '^^^<',
  '0,8': '^^^',
  '0,9': '^^^>',
  '0,A': '>',
  '1,0': '>v',
  '1,1': '',
  '1,2': '>',
  '1,3': '>>',
  '1,4': '^',
  '1,5': '^>',
  '1,6': '^>>',
  '1,7': '^^',
  '1,8': '^^>',
  '1,9': '^^>>',
  '1,A': '>>v',
  '2,0': 'v',
  '2,1': '<',
  '2,2': '',
  '2,3': '>',
  '2,4': '<^',
  '2,5': '^',
  '2,6': '^>',
  '2,7': '<^^',
  '2,8': '^^',
  '2,9': '^^>',
  '2,A': 'v>',
  '3,0': '<v',
  '3,1': '<<',
  '3,2': '<',
  '3,3': '',
  '3,4': '<<^',
  '3,5': '<^',
  '3,6': '^',
  '3,7': '<<^^',
  '3,8': '<^^',
  '3,9': '^^',
  '3,A': 'v',
  '4,0': '>vv',
  '4,1': 'v',
  '4,2': 'v>',
  '4,3': 'v>>',
  '4,4': '',
  '4,5': '>',
  '4,6': '>>',
  '4,7': '^',
  '4,8': '^>',
  '4,A': '>>vv',
  '5,0': 'vv',
  '5,1': '<v',
  '5,2': 'v',
  '5,3': 'v>',
  '5,4': '<',
  '5,5': '',
  '5,6': '>',
  '5,7': '<^',
  '5,8': '^',
  '5,9': '^>',
  '5,A': 'vv>',
  '6,0': '<vv',
  '6,1': '<<v',
  '6,2': '<v',
  '6,3': 'v',
  '6,4': '<<',
  '6,5': '<',
  '6,6': '',
  '6,7': '<<^',
  '6,8': '<^',
  '6,9': '^',
  '6,A': 'vv',
  '7,0': '>vvv',
  '7,1': 'vv',
  '7,2': 'vv>',
  '7,3': 'vv>>',
  '7,4': 'v',
  '7,5': 'v>',
  '7,6': 'v>>',
  '7,7': '',
  '7,8': '>',
  '7,9': '>>',
  '7,A': '>>vvv',
  '8,0': 'vvv',
  '8,1': '<vv',
  '8,2': 'vv',
  '8,3': 'vv>',
  '8,4': '<v',
  '8,5': 'v',
  '8,6': 'v>',
  '8,7': '<',
  '8,8': '',
  '8,9': '>',
  '8,A': 'vvv>',
  '9,0': '<vvv',
  '9,1': '<<vv',
  '9,2': '<vv',
  '9,3': 'vv',
  '9,4': '<<v',
  '9,5': '<v',
  '9,6': 'v',
  '9,7': '<<',
  '9,8': '<',
  '9,9': '',
  '9,A': 'vvv',
  'A,0': '<',
  'A,1': '^<<',
  'A,2': '<^',
  'A,3': '^',
  'A,4': '^^<<',
  'A,5': '<^^',
  'A,6': '^^',
  'A,7': '^^^<<',
  'A,8': '<^^^',
  'A,9': '^^^',
  'A,A': '',
};

// prettier-ignore
let improvedArrowPad = {
  // we use better notation so that i dont not have to for loop to check. e.g. '^,>' means we current cursor on ^ and we want to get to >
  '^,^': 'A',
  '^,>': 'v>A',
  '^,v': 'vA',
  '^,<': 'v<A',
  '^,A': '>A',
  '>,^': '<^A',
  '>,>': 'A',
  '>,v': '<A',
  '>,<': '<<A',
  '>,A': '^A',
  'v,^': '^A',
  'v,>': '>A',
  'v,v': 'A',
  'v,<': '<A',
  'v,A': '^>A',
  '<,^': '>^A',
  '<,>': '>>A',
  '<,v': '>A',
  '<,<': 'A',
  '<,A': '>>^A',
  'A,^': '<A',
  'A,>': 'vA',
  'A,v': '<vA',
  'A,<': 'v<<A',
  'A,A': 'A'
}

let ogArrowPad = {
  // we use better notation so that i dont not have to for loop to check. e.g. '^,>' means we current cursor on ^ and we want to get to >
  "^,^": "",
  "^,>": "v>",
  "^,v": "v",
  "^,<": "v<",
  "^,A": ">",
  ">,^": "^<",
  ">,>": "",
  ">,v": "<",
  ">,<": "<<",
  ">,A": "^",
  "v,^": "^",
  "v,>": ">",
  "v,v": "",
  "v,<": "<",
  "v,A": "^>",
  "<,^": ">^",
  "<,>": ">>",
  "<,v": ">",
  "<,<": "",
  "<,A": ">>^",
  "A,^": "<",
  "A,>": "v",
  "A,v": "v<",
  "A,<": "v<<",
  "A,A": "",
};

// from part 1, we know the the most efficient path for the numpad to take is
// 540A <^^A<A>vvA>A
// 582A <^^A^AvvAv>A
// 169A ^<<A>>^A^AvvvA
// 593A <^^A>^AvvAvA
// 579A <^^A<^A>>AvvvA

//////// cheat ////////
// 805A <^^^AvvvA^^Avv>A
// 170A ^<<A^^A>vvvA>A
// 129A ^<<A>A^^>AvvvA
// 283A <^A^^Avv>AvA
// 540A <^^A<A>vvA>A

let mylist = [
  "<^^A<A>vvA>A",
  "<^^A^AvvAv>A",
  "^<<A>>^A^AvvvA",
  "<^^A>^AvvAvA",
  "<^^A<^A>>AvvvA",
];
let mylist2 = [540, 582, 169, 593, 579];

let cheat = [
  "<^^^AvvvA^^Avv>A",
  "^<<A^^A>vvvA>A",
  "^<<A>A^^>AvvvA",
  "<^A^^Avv>AvA",
  "<^^A<A>vvA>A",
];
let cheat2 = [805, 170, 129, 283, 540];

let stolenList = [];
let inputlist = ["540A", "582A", "169A", "593A", "579A"];
for (let i = 0; i < inputlist.length; i++) {
  let temp = "";
  let curr = inputlist[i];
  let start = "A";
  for (let j = 0; j < curr.length; j++) {
    let key = `${start},${curr[j]}`;
    temp += stolenNumPad[key];
    start = curr[j];
    temp += "A";
  }
  console.log("for this number: ", inputlist[i]);
  console.log("this is the stolen numpad path: ", temp);
  stolenList.push(temp);
}

for (let i = 0; i < mylist.length; i++) {
  let curr = mylist[i];
  for (let j = 0; j < 2; j++) {
    let temp = "";
    let start = "A";
    for (let k = 0; k < curr.length; k++) {
      let target = curr[k];
      let search = start + "," + target;
      temp += ogArrowPad[search];
      start = target;
      temp += "A";
    }
    // console.log("temp: ", temp);
    curr = temp;
  }
  console.log(curr.length);
}

// let mydict = {};
// const count = (command, depth) => {
//   if (depth === 0) {
//     return command.length;
//   }
//   let key = `${command},${depth}`;
//   if (mydict[key] !== undefined) {
//     return mydict[key];
//   }
//   let countVar = 0;
//   for (let i = 0; i < command.length; i++) {
//     let tempkey = `${command},${depth - 1}`;
//     if (i === 0) {
//       let result = count(improvedArrowPad["A" + "," + command[i]], depth - 1);
//       countVar += result;
//       mydict[tempkey] = result;
//       continue;
//     }
//     let result = count(
//       improvedArrowPad[command[i - 1] + "," + command[i]],
//       depth - 1
//     );
//     countVar += result;
//     mydict[tempkey] = result;
//   }
//   return countVar;
// };
// let hehe = count("<^^A<A>vvA>A", 25);
// console.log("hehe: ", hehe);

let mydict = {};
const count = (command, depth) => {
  if (depth === 0) {
    return command.length;
  }
  let key = `${command},${depth}`;
  if (mydict[key] !== undefined) {
    return mydict[key];
  }
  let countVar = 0;
  for (let i = 0; i < command.length; i++) {
    if (i === 0) {
      let result = count(improvedArrowPad["A" + "," + command[i]], depth - 1);
      countVar += result;

      continue;
    }
    let result = count(
      improvedArrowPad[command[i - 1] + "," + command[i]],
      depth - 1
    );
    countVar += result;
  }
  let tempkey = `${command},${depth}`;
  mydict[tempkey] = countVar;
  return countVar;
};

let output = BigInt(0);
for (let i = 0; i < stolenList.length; i++) {
  let hehe = count(stolenList[i], 25);
  console.log("this value: ", stolenList[i]);
  console.log("hehe: ", hehe);
  console.log("this multiply: ", mylist2[i]);
  output += BigInt(hehe) * BigInt(mylist2[i]);
}
console.log("output: ", Number(output));

// let output2 = BigInt(0);
// for (let i = 0; i < cheat.length; i++) {
//   let hehe = count(cheat[i], 25);
//   console.log("this value: ", cheat[i]);
//   console.log("hehe: ", hehe);
//   console.log("this multiply: ", cheat2[i]);
//   output2 += BigInt(hehe) * BigInt(cheat2[i]);
// }
// console.log("output2: ", Number(output2));
