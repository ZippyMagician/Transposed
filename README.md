# Transposed
A matrix-based esolang https://esolangs.org/wiki/Transposed

## About
Transposed is an esolang based around certain aspects of a mathematical matrix. The code is designed to appear like a matrix, and output is stored in a matrix-like fashion. Certain commands are similarly designed to operate on "rows" and "columns" of the output matrix.

## Installation
Install Transposed onto your computer using the command `npm install -g transposed`. You can then run transposed using `transposed "FILE"` with STDIN afterwards. For example: `transposed "C:/Programs/example.itr" 54 C 3`

## Specifications
```
The program: each "command" is made up of two parts; the prefix and the suffix. Each command is seperated by spaces, and each row of commands is seperated by a newline. All rows must be the same length.
Memory: A single 16-cell memory called "C". Starts at 0
The matrix: When a program is run, each prefix is appended to the end of the current row of the matrix (unless the suffix is 8, E, or F). Once you either leave the current row of the program or use the GOTO command, a new row will be formed
Prefix/suffix: The prefix and suffix are in base16. This means they can be in the range[0-9A-F], or 0-15 to be more precise.
I/O: Input can be taken as either ASCII or INT, both are supported. All outputs are done with ASCII unless the filetype is .itr instead of .tr. If no input can be found on STDIN, a -1 is given to the matrix.

Suffixes: (N = the prefix that's currently in the matrix, C = the Memory)
0 = NIL
1 = READ FROM STDIN
2 = ADD CURRENT ROW
3 = SUBTRACT ROW
4 = DIVIDE ROW
5 = MULTIPLY ROW
6 = REVERSE ROW
7 = DELETE ROW
8 = GOTO ROW N IF ITEM IN ROW = 0
9 = END PROGRAM
A = ADD ALL ROWS
B = SUBTRACT ALL ROWS
C = DIVIDE ALL ROWS
D = MULTIPLY ALL ROWS
E = STORE ITEM IN ROW IN C[N]
F = PLACE C[N] INTO ROW
```

### Visual Representation
The way the language works can be visualized in this small example. Take this program:
```
01 12 28 13 00 18
09 00 00 00 00 00
```
This is a simple CAT program in this language. This means that whatever is in STDIN will be outputted. Lets say STDIN is this: `AB`.
Here is a walkthrough of what it looks like as it evaluates:
```
65

65 1

66

66 1

65

65
66

65 0
66 1

65
67

65 0
67 1

65
66
```
This resulsts in a 2x1 matrix. It is then transposed, resulting in a 1x2 matrix of `65 66`. This is then outputted as `AB`.

### Limitations
Due to the nature of the language only outputting once calculation is complete, this limits the types of programs that can be created. For example, you cannot dynamically print and then ask for input, and if your program never terminates nothing will ever be printed.

## Programs
Using this knowledge, we can create a few example programs:
```
# Hello World
10 90 85
A0 A5 12
10 C0 95
C0 10 95
C0 95 32
80 10 45
70 C5 32
90 C5 32
A0 B5 42
10 C0 95
A0 10 A5
```
```
# CAT Program
01 12 28 13 00 18
09 00 00 00 00 00
```