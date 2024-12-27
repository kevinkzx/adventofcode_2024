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

let xString = "";
let yString = "";
for (const [key, value] of Object.entries(mydict)) {
  if (key[0] === "x") {
    xString = mydict[key].toString() + xString;
  } else {
    yString = mydict[key].toString() + yString;
  }
}
console.log("xString: ", xString);
console.log("yString: ", yString);

let BRUTEFORCE = ["rpv", "z11", "rpb", "ctg", "dmh", "z31", "dvq", "z38"];
let sortedBRUTEFORCE = BRUTEFORCE.sort((a, b) => {
  return a.localeCompare(b);
});
console.log("sorted: ", sortedBRUTEFORCE.join(","));
