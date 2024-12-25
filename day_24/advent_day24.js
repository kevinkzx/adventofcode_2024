const fs = require("fs");
let input = fs.readFileSync("advent_day24.txt").toString().split("\n");
// console.log("input");
// console.log(input);
let datatemp = [];
let instructiontemp = [];
let tempflag = true;
for (let i = 0; i < input.length; i++) {
  if (input[i] === "") {
    tempflag = false;
    continue;
  }
  if (tempflag) {
    datatemp.push(input[i]);
  } else {
    instructiontemp.push(input[i]);
  }
}
// console.log("datatemp");
// console.log(datatemp);
console.log("instructiontemp");
console.log(instructiontemp);

let mydict = {};
for (let i = 0; i < datatemp.length; i++) {
  let address = datatemp[i].split(":")[0];
  let value = datatemp[i].split(":")[1].trim();
  // console.log("address: ", address);
  // console.log("value: ", value);
  mydict[address] = parseInt(value);
}
console.log("mydict: ", mydict);

// .splice(index, number of item(s) to remove)
while (instructiontemp.length) {
  for (let i = 0; i < instructiontemp.length; i++) {
    let curr = instructiontemp[i];
    console.log(curr.split("->"));
    let targetAddress = curr.split("->")[1].trim();
    // addresses are always 3 length long. with this information, we can get our incoming address
    let temp = curr.split("->")[0].trim();
    let gate = temp.slice(3, -3).trim();
    let leftadd = temp.slice(0, 3);
    let rightadd = temp.slice(-3);

    // need to check that both leftadd and rightadd is a value in our dict before we can compute the value to place in our target address
    // if we can calculate, we can remove this insturction from our instructiontemp list
    if (mydict[leftadd] !== undefined && mydict[rightadd] !== undefined) {
      if (gate === "OR") {
        mydict[targetAddress] = mydict[leftadd] || mydict[rightadd];
      }
      if (gate === "AND") {
        mydict[targetAddress] = mydict[leftadd] && mydict[rightadd];
      }
      if (gate === "XOR") {
        mydict[targetAddress] = mydict[leftadd] ^ mydict[rightadd];
      }
      instructiontemp.splice(i, 1);
    }
  }
}
console.log("mydict: ", mydict);
let zAddArray = [];
for (const [key, value] of Object.entries(mydict)) {
  if (key[0] === "z") {
    zAddArray.push([key, value]);
  }
}
let sortedZAddArray = zAddArray.sort((a, b) => {
  return b[0].localeCompare(a[0]);
});
console.log("sortedZAddArray: ", sortedZAddArray);
let outputBinary = "";
for (let i = 0; i < sortedZAddArray.length; i++) {
  outputBinary += sortedZAddArray[i][1].toString();
}
console.log("outputbinary: ", outputBinary);
console.log("number: ", parseInt(outputBinary, 2));
