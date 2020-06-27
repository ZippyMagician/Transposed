module.exports = (stream, stdin, intOutput) => {
    let c = [...Array(16).fill(0)];
    let row = 0, pRow = 0, col = 0, pCol = 0;;
    let didGOTO = false, terminated = false;
    let matrix = [];

    while (pRow < stream.length && !terminated) {
        matrix.push([]);
        while (col < stream[pRow].length && !terminated) {
            let item = stream[pRow][col];
            item.num = +num(item.num);

            switch (item.op) {
                case '0':
                    matrix[row].push(item.num);
                    break;
                case '1':
                    matrix[row].push(stdin.length > 0 ? input(stdin.shift()) : -1);
                    break;
                case '2':
                    matrix[row].push(item.num);
                    performOnRow(matrix, row, pCol, (a, b) => a + b);
                    break;
                case '3':
                    matrix[row].push(item.num);
                    performOnRow(matrix, row, pCol, (a, b) => a - b);
                    break;
                case '4':
                    matrix[row].push(item.num);
                    performOnRow(matrix, row, pCol, (a, b) => a / b);
                    break;
                case '5':
                    matrix[row].push(item.num);
                    performOnRow(matrix, row, pCol, (a, b) => a * b);
                    break;
                case '6':
                    matrix[row].push(item.num);
                    matrix[row] = matrix[row].reverse();
                    break;
                case '7':
                    matrix.splice(row, 1);
                    col = Number.MAX_VALUE;
                    row--;
                    break;
                case '8':
                    if (matrix[row][matrix[row].length - 1] === 0) {
                        pRow = item.num - 1;
                        didGOTO = true;
                        col = Number.MAX_VALUE; // Make sure the program moves on and doesn't try to evaluate this new line from a random column start
                    }
                    break;
                case '9':
                    terminated = true;
                    break;
                case 'A':
                    matrix[row].push(item.num);
                    performOnMatrix(matrix, row, (a, b) => a + b);
                    break;
                case 'B':
                    matrix[row].push(item.num);
                    performOnMatrix(matrix, row, (a, b) => a - b);
                    break;
                case 'C':
                    matrix[row].push(item.num);
                    performOnMatrix(matrix, row, (a, b) => a / b);
                    break;
                case 'D':
                    matrix[row].push(item.num);
                    performOnMatrix(matrix, row, (a, b) => a * b);
                    break;
                case 'E':
                    performOnRow(matrix, row, pCol - 1, (a, b) => a + b); // Subtract one because the "current" column of the matrix is not actually filled with anything
                    c[item.num] = matrix[row][0];
                    break;
                case 'F':
                    matrix[row].push(c[item.num]);
                    break;
            }

            pCol = matrix[row] ? matrix[row].length : 0;
            col++;
        }

        if (!didGOTO) pRow++;
        else didGOTO = false;
        row++;
        col = 0;
        pCol = 0;
    }

    matrix = zip(matrix); // Transpose the matrix
    for (let row of matrix) {
        row.filter(r => r !== 0).map(item => output(item, intOutput));
        process.stdout.write("\n");
    }
};

function performOnRow(matrix, row, col, call) {
    for (let c = 0; c < col; c++) {
        let left = matrix[row].shift();
        matrix[row][0] = call(left, matrix[row][0]);
    }
}

function performOnMatrix(matrix, row, call) {
    for (let ind = 0; ind < row; ind++) {
        let top = matrix[ind];
        matrix.splice(ind, 1);
        matrix[0].map((bottom, i) => call(top[i], bottom));
    }
}

function zip(matrix) {
    return matrix[0].map((_, c) => matrix.map(row => row[c]));
}

function num(inp) {
    return /\D/g.test(inp) ? "ABCDEF".indexOf(inp.toUpperCase()) + 10 : +inp;
}

function input(inp) {
    return /\D/g.test(inp) ? inp.charCodeAt(0) : +inp;
}

function output(out, intOutput) {
    process.stdout.write(intOutput ? out.toString() : String.fromCharCode(+out));
}