const fs = require("fs");
//testing upload existing folder to git repo online

fs.readFile("advent_day2_2.txt", (err, data) => {
  if (err) throw err;

  // console.log('input: ', data.toString().split('\n'));
  let input = data.toString().split("\n");
  let temp = [];
  for (let i = 0; i < input.length; i++) {
    // console.log(input[i].split(' '));
    temp.push(input[i].split(" "));
  }
  // console.log('temp: ', temp);
  temp.pop();
  let output = 0;
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].length === 1 || temp[i].length === 0) {
      output++;
    } else {
      let mylist = temp[i];
      let tempcount = 0;
      if (parseInt(mylist[0]) < parseInt(mylist[mylist.length - 1])) {
        //increasing
        for (let j = 0; j < mylist.length - 1; j++) {
          let difference = parseInt(mylist[j + 1]) - parseInt(mylist[j]);
          if (difference >= 1 && difference <= 3) {
            tempcount++;
          }
        }
        if (tempcount === mylist.length - 1) {
          console.log("this is okay: ", mylist);
          output++;
        } else {
          console.log("this is not okay: ", mylist);
        }
      } else if (parseInt(mylist[0]) > parseInt(mylist[mylist.length - 1])) {
        //decreasing
        for (let j = 0; j < mylist.length - 1; j++) {
          let difference = parseInt(mylist[j]) - parseInt(mylist[j + 1]);
          if (difference >= 1 && difference <= 3) {
            tempcount++;
          }
        }
        if (tempcount === mylist.length - 1) {
          console.log("this is okay: ", mylist);
          output++;
        } else {
          console.log("this is not okay: ", mylist);
        }
      }
    }
  }
  console.log("output: ", output);
  console.log("no test cases: ", temp.length);
  console.log("temp first: ", temp[0]);
  console.log("temp last: ", temp[temp.length - 1]);
});
