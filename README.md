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

### Day 12 part 1

we iterate thru each spot on the garden and a BFS. for BFS logic, we BFS the flower that is on the current spot. we check the spot we are going to next is of the same type.
if it is of the same type, we add to our queue and increase the flower count. important to add our current spot to visited set so that we do not come back to this spot. if i am not wrong, this approach is considered floodfilling.
\
for fence logic, we check for the current spot, the UP DOWN LEFT RIGHT if it is touching any of the flower of its on type and whether it is at the edge of the garden

### Day 12 part 2

aside from adding fence count from part 1, we indicate which side of the flower of the fence we are adding to. this way we can track whether the fence is inner or outer fence.
\
my approach. summarised by redditors. Take all our fences found in part 1, put them in separate horizontal and vertical fence arrays, then sort based on row/col (for horizontal, sort by row first, then column). This means all contiguos blocks of fence will be next to each other in each array. we can then 'walk' through the sorted array and any time we jump a row/col or if the gap between the same row/col is bigger than one, we found a new side.
\
second approach is we can count the number or corners we have. the number of corners would be equal to how many sides of fences we have

---

### Day 13 part 1

since each button can only be pressed 100 times each, we just do a double for loop and see whether we can get to the target. a naive approach

### Day 13 part 2

the 'lowest' cost to reach target is somewhat of a red herring as there could only be one answer if it is possible to catch the prize. we can use math to find out whether it is possible to get the price.

```
// MATHTEMATICAL PROOF
\
for button A. we can say that each press of button A, moves a_x in the horizontal direction and a_y in the vertical direction
for button B. we can say that each press of button B, moves b_x in the horizontal direction and b_y in the vertical direction
let our target location be p_x and p_y.
so for any given value, we want the following equation to be true.
let A be the number of times we press button A. and B be the number of times we press button B.
(1) Aa_x + Bb_x = p_x
(2) Aa_y + Bb_y = p_y

    by using simple math, we can solve for A and B.
    e.g solving for A.
    from equation (2)
    Bb_y = p_y - Aa_y
    B = (p_y - Aa_y) / b_y
    sub b into equation (1)
    Aa_x + ( (b_x*p_y - Ab_x*a_y) / b_y ) = p_x
    Aa_x*b_y + b_x*p_y - Ab_x*a_y = p_x*b_y
    Aa_x*b_y - Ab_x*a_y = p_x*b_y - p_y*b_x
    A(a_x*b_y - b_x*a_y) = p_x*b_y - p_y*b_x
    A = ( p_x*b_y - p_y*b_x ) / ( a_x*b_y - b_x*a_y )

    Taking one of the example where
    A x+94 y+34
    B x+22 y+67
    Target x=8400 y=5400
    a_x = 94
    a_y = 34
    b_x = 22
    b_y = 67
    p_x = 8400
    p_y = 5400

    subbing in the values, we can see that A = 80

    If it is not possible for the claw machine to get the toy, A and B will not return whole numbers
    A = ( p_x*b_y - p_y*b_x ) / ( a_x*b_y - b_x*a_y )
    B = ( p_x*a_y - p_y*a_x ) / ( b_x*a_y - b_y*a_x )

```

---
