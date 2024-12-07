# adventofcode

can i get out of the naughty list?
https://adventofcode.com/

make sure text file is LF format

sometimes in life. if it works it works

---

### Day 1 part 1

sort and get absolute difference at each index

### Day 1 part 2

add the right list into a dictionary. key: value. key is the id and value is the count

---

### Day 2 part 1

check if the list is increasing or decreasing. for each step check the difference is at least 1 and at most 3.

### Day 2 part 2

for cases that failed, generate all the permutations possible by removing each value once. check if list is valid. remove item in array with splice() method. myArr.splice(index, 1)

---

### Day 3 part 1

regex to get list of all valid instructions
https://www.w3schools.com/jsref/jsref_obj_regexp.asp \
https://javascript.info/regexp-methods#:~:text=The%20method%20str.,regexp%20in%20the%20string%20str%20.&text=If%20the%20regexp%20has%20flag,capturing%20groups%20and%20other%20details. \
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions \
https://stackoverflow.com/questions/3541750/regular-expression-to-allow-for-number-values-between-1-3-digits \
https://stackoverflow.com/questions/15090829/javascript-regex-pattern-match-multiple-strings-and-or-against-single-strin

### Day 3 part 2

set flag when encounter a do() or don't(). only carry out the mul() instruction if the flag is do().

---

### Day 4 part 1

when we encounter a "X", we check the corresponding 'star' pattern. once it does not match, we set the corresponding direction to false. count and return number of true

### Day 4 part 2

when we encouter an "A", we get the 4 corners and make a temporary list. we check this list against all the other possible permutation. cout and return

---

### Day 5 part 1

for the rules of the pages, we add them to a dictionary with (key : value) pair of (pages : array of page rules). iterate thru each test case. Set L pointer on current page. Set R pointer on remaining pages, check that for each R, it exist in the value of the key L.

### Day 5 part 2

for test cases that are wrong, we iterate thru the testcase and 'build' our own order. for each incoming individual page, we check against the pages that are in our 'build' array and find the correct slot to place it in. \
to find the correct spot, we iterate thru 'build' array. at I'th position, we check whether this page is included in the incoming individual page. if it is, we insert incoming individual page at the I'th position. if I'th reaches the end, we insert incoming individual page to the end of the 'build' array.

\
JS adding item to specific index in array \
myArr.splice(index, 0, item); \
https://stackoverflow.com/a/586189

---

### Day 6 part 1

while within the bounds, we check the current position the guard is facing, (U, R, D, L). we first change the current position to X to mark if current position is not visited. we then find the next position that the guard will be and check if the next position is a blockage "#". if it is a blockage, we change the direction the guard is facing and place him on the next spot.

### Day 6 part 2

brute force all the possible location that we can put a singular blockage "#". for each new maze, we calculate if there is a blockage. we use a dictionary to check the position that we have visited. key: value. key is the postion and value is the direction that the guard is facing when at that position. we know that we are in a loop if at the current position, the guard is facing the same way as previous.

NOTE: compared to part 1, we cannot pre move the guard when we are checking if the next position is a blockage. we can only change the direction that the guard is facing

---
