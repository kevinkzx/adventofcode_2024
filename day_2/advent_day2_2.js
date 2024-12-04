const fs = require("fs");

let input = fs.readFileSync("advent_day2_2.txt");

const checker = (inputArr) => {
  console.log("checker: ");
  console.log(inputArr);
  let tempcount = 0;
  if (parseInt(inputArr[0]) < parseInt(inputArr[inputArr.length - 1])) {
    //increasing
    for (let j = 0; j < inputArr.length - 1; j++) {
      let difference = parseInt(inputArr[j + 1]) - parseInt(inputArr[j]);
      if (difference >= 1 && difference <= 3) {
        tempcount++;
      }
    }
    if (tempcount === inputArr.length - 1) {
      return true;
    } else {
      return false;
    }
  } else if (parseInt(inputArr[0]) > parseInt(inputArr[inputArr.length - 1])) {
    for (let j = 0; j < inputArr.length - 1; j++) {
      let difference = parseInt(inputArr[j]) - parseInt(inputArr[j + 1]);
      if (difference >= 1 && difference <= 3) {
        tempcount++;
      }
    }
    if (tempcount === inputArr.length - 1) {
      return true;
    } else {
      return false;
    }
  }
};

console.log("input: ", input.toString().split("\n"));
input = input.toString().split("\n");
let temp = [];
for (let i = 0; i < input.length; i++) {
  temp.push(input[i].split(" "));
}
console.log("temp: ", temp);
temp.pop();
let output = 0;
for (let i = 0; i < temp.length; i++) {
  let result = checker(temp[i]);
  if (result) {
    output++;
  } else {
    // fail from previous. now we generate the perms and see if it passes
    // temp[i]
    console.log("getting perms");
    for (let j = 0; j < temp[i].length; j++) {
      let copy = [...temp[i]];
      copy.splice(j, 1);
      console.log(copy);
      let resulttemp = checker(copy);
      if (resulttemp) {
        output++;
        break;
      }
    }
  }
}
console.log("test cases: ", temp.length);
console.log("first: ", temp[0]);
console.log("last: ", temp[temp.length - 1]);
console.log("output: ", output);
