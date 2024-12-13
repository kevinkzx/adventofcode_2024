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

JS making a copy of a 2D array
let arrCopy = structureClone(arrOriginal);
https://stackoverflow.com/a/76443507

---

### Day 7 part 1

we iterate from the back of the list. if the goal is divisible by the previous number, we divide. else we will subtract. once we reach the start of the list, we check whether our final value is 1/0. If it is, we know that this list is valid and can be achieved with either + or \* operation.

### Day 7 part 2

BRUTE FORCE D:

---

### Day 8 part 1

We add all the antennas of the same type into a dictionary. for each of the type of antenna, we check one antenna against the rest. calculate the distance between them and 'propogate' to find the position of the antinode and check that it is withint the boundary the city (input)

### Day 8 part 2

similar to part 1 just that the antinode does not only occur at 2x the distance away. it occurs at every x distance until it is out of the boundary.

---

### Day 9 part 1

after representing the data in the correct format, left pointer starts from the start. right pointer starts from the end. move left pointer up until we find a free space, ".". move right pointer down until we find a data. do a swap of the item.
in JS we can swap 2 items in an array by doing. [myarr[i], myarr[j]] = [myarr[j], myarr[i]].

### Day 9 part 2

we decrement our right pointer until we find a data. we calculate the size of the data. we then move up from the left and find a space that can fit the data. if the space is enough, we do the swap. if space not enough, we decrement our right pointer. repeat until right pointer is at the start.

---

### Day 10 part 1

we have a dictionary that stores the 'edges' of our graph. we store the 'nodes' as indexes [i, j] from the 2D array. we store in a separate array our different start point and end point. for each start point, we check against all the other end point and do a BFS to see if there exist a path from start to end.

https://www.geeksforgeeks.org/find-if-there-is-a-path-between-two-vertices-in-a-given-graph/
https://hackernoon.com/a-beginners-guide-to-bfs-and-dfs-in-javascript
https://prepfortech.io/leetcode-solutions/all-paths-from-source-to-target

### Day 10 part 2

for each of the valid start nodes 'trailheads' and their corresponding end nodes. we check how many paths there are to get from source to the target using DFS.
https://leetcode.com/problems/all-paths-from-source-to-target/solutions/2786004/clean-code/

---

### Day 11 part 1

naive brute force solution just checking the conditions and generating new stone. for each blink, new stones generated are added to a temp array. this temp array will then be assigned to the original array. we iterate thru the original array k=25 times.
\
sidenote: some precompute array attempt for numbers 0,1

### Day 11 part 2

brute force solution will not work. instead of using array as our datastructure to store the number of stones, we use a dictionary to store the number on the stone and how many of each stones there are. key : value. key is the 'number' on the stone. value is amount/quantity of this stone. we go thru the conditions and add to our new dict. at the end of each 'blink' we assign our dict with this tempdict. do this for k=75 times.
\
JS delete first character of string n times if it is equal to "0" \
https://stackoverflow.com/a/4564478

---
