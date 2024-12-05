const fs = require("fs");

let input = fs.readFileSync("advent_day5.txt");
input = input.toString().split("\n");
// console.log("input: ", input);
let pagesArr = [];
let testCases = [];

let flag = true;
for (let i = 0; i < input.length; i++) {
  if (input[i].length === 0) {
    flag = false;
    continue;
  }
  if (flag) {
    pagesArr.push(input[i]);
  } else {
    testCases.push(input[i]);
  }
}

// console.log("pagesArr: ", pagesArr);
// console.log("testCases: ", testCases);

// create dictionary key:value. key is the preceeding page. value is the pages that go after this page

// go thru each test case. for the current I, find the corresponding key:value from dict.
// check that all values after I is included in value. if not, then this test case is not valid
let mydict = {};
for (let i = 0; i < pagesArr.length; i++) {
  let temp = pagesArr[i].split("|");
  //   console.log("temp: ", temp);
  if (mydict[temp[0]] === undefined) {
    mydict[temp[0]] = [temp[1]];
  } else {
    mydict[temp[0]].push(temp[1]);
  }
}

const checker = (inputArr) => {
  // checker function checks that for the remaining pages after this,
  // all of the pages are included in the 'dependencies'
  let flag = true;
  for (let j = 0; j < inputArr.length; j++) {
    for (let k = j + 1; k < inputArr.length; k++) {
      let temparr = mydict[inputArr[j]];
      if (temparr !== undefined) {
        if (temparr.includes(inputArr[k]) === false) {
          flag = false;
          break;
        }
      } else {
        flag = false;
        break;
      }
    }
  }
  if (!flag) {
    return false;
  } else {
    return true;
  }
};

console.log("mydict: ", mydict);
let output = 0;
let incorrect = [];
for (let i = 0; i < testCases.length; i++) {
  // current test case is testCases[i]
  let temptestcase = testCases[i].split(",");
  let functionresult = checker(temptestcase);

  if (functionresult) {
    // console.log("this one can: ", temptestcase);
    let middle = Math.floor(temptestcase.length / 2);
    output += parseInt(temptestcase[middle]);
  } else {
    incorrect.push(temptestcase);
  }
}
console.log("output: ", output);

///////////////////// part two below /////////////////////

console.log("failed test cases: ", incorrect);

////////////// we do be building. just build the list.
//// we get each individual page and add to 'build' array.
/// for each incoming indvidual page, we check against the pages in
/// 'build' array and find the correct slot to place it in
/// the correct spot is the earliest index where there is 'dependencies'
let please = 0;
for (let i = 0; i < incorrect.length; i++) {
  let mylist = incorrect[i];
  let build = [];
  build.push(mylist[0]);
  for (let j = 1; j < mylist.length; j++) {
    let index = 0;
    let flag = false;
    for (let k = 0; k < build.length; k++) {
      if (k === build.length) {
        build.push(mylist[j]);
      } else {
        // check if build[k] is in the list
        // if its the list, add at index
        // if not, up the index
        if (mydict[mylist[j]] === undefined) {
          break;
        } else if (mydict[mylist[j]].includes(build[k])) {
          index = k;
          flag = true;
          break;
        }
      }
    }
    if (flag) {
      build.splice(index, 0, mylist[j]);
    } else {
      build.push(mylist[j]);
    }
    // console.log("build: ", build);
  }
  console.log("build: ", build);
  let middle = Math.floor(build.length / 2);
  please += parseInt(build[middle]);
}
console.log("please: ", please);
