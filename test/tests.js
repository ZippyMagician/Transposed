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
60 75 12 0F 03 68 07
90 55 02 0F 03 78 07
60 85 13 0F 03 88 07
60 75 02 0F 03 98 00
01 01 00 00 00 02 09
01 01 00 00 00 03 09
01 01 10 10 10 14 09
01 01 10 10 10 15 09`;
interpret(code, ['/', '6', '3'], true);

console.log("\nFACTORIAL TEST");

code = `01 0E 00 1E 07
10 02 02 02 02
1F 12 1E 0D 48
0F 1F 03 68 07
10 00 38 00 00
09 00 00 00 00`;
interpret(code, ['5'], true);