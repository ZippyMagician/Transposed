const tokenify = require('./tokenizer');
const parse = require('./parser');

module.exports.interpret = (code, stdin, intOutput) => parse(tokenify(code), stdin, intOutput);