const { interpret } = require('../src');
let code = ``;

console.log("HELLO_WORLD TEST");

code = `10 90 85
A0 A5 12
10 C0 95
C0 10 95
C0 95 32
80 10 45
70 C5 32
90 C5 32
A0 B5 42
10 C0 95
A0 10 A5`;
interpret(code, [], false);

console.log("\nCAT TEST");

code = `01 12 28 13 00 18
09 00 00 00 00 00`;
interpret(code, ['a', 'b', 'c', 'd'], false);

console.log("CALCULATOR TEST");

code = `01 0E 00 00 00 00 07
60 75 12 0F 03 48 07
90 55 02 0F 03 58 00
01 01 00 00 00 02 09
01 01 00 00 00 03 09`;
interpret(code, ['+', '31', '42'], true);