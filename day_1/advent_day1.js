const fs = require('fs');

fs.readFile('advent_day1.txt', (err, data) => {
    if (err) throw err;
    let left = [];
    let right = [];
    let counter = true;
    console.log('this is datatext');
    // console.log(data.toString().split(' ').join(',').split("\n").join(',').split(','));
    let temp = data.toString().split(' ').join(',').split("\n").join(',').split(',');
    // console.log('temp: ', temp);
    for (let i = 0; i < temp.length; i++) {
        if (temp[i] !== '') {
            if (counter) {
                // console.log('in left: ', temp[i])
                left.push(temp[i]);
                counter = false;
            } else {
                right.push(temp[i]);
                counter = true;
            }
        }
    }
    // console.log('left: ', left);
    // console.log('right: ', right);

    let leftSorted = left.sort((a, b) => {return parseInt(a) - parseInt(b)});
    // console.log('leftSorted: ', leftSorted);
    let rightSorted = right.sort((a, b) => {return parseInt(a) - parseInt(b)});
    let output = 0;
    for (let i = 0; i < leftSorted.length; i++) {
        let diff = Math.abs(leftSorted[i] - rightSorted[i]);
        output += diff;
    }
    console.log('output: ', output);

    // add the count of rightlist to dict. key: value. key is the id. value is the count
    let mydict = {};
    for (let i = 0; i < right.length; i++) {
        if (mydict[right[i]] === undefined) {
            mydict[right[i]] = 1;
        } else {
            mydict[right[i]]++;
        }
    }
    // console.log('mydict: ', mydict);
    let secondOutput = 0;
    // take the id multiply by the count
    for (let i = 0; i < left.length; i++) {
        if (mydict[left[i]] !== undefined) {
            console.log('id: ', left[i]);
            console.log('value: ', mydict[left[i]]);
            let temp = parseInt(left[i]) * mydict[left[i]];
            secondOutput += temp;
        }
    }
    console.log('secondOutput: ', secondOutput);
})

