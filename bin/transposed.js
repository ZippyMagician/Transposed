#!/usr/bin/env node
const interpreter = require('../src');
const cli = require('./cli');
const fs = require('fs');

const argv = require('minimist')(process.argv.slice(2));

cli.readArgs(argv, args => {
    if (args[0].split(".")[1].startsWith("i")) var intOutput = true;
    else var intOutput = false;

    if (args[0].startsWith('C:/') || args[0].startsWith('C:\\')) {
        fs.readFile(args[0], 'utf8', (err, file) => {
            if (err) console.error('Could not find file');
            args.shift();
            interpreter.interpret(file, args.map(r => r.match(/[a-z]+|[^a-z]+/gi)).flat(), intOutput);
        });
    } else {
        fs.readFile(__dirname + '/' + args[0], 'utf8', (err, file) => {
            if (err) console.error('Could not find file');
            args.shift();
            interpreter.interpret(file, args.map(r => r.match(/[a-z]+|[^a-z]+/gi)).flat(), intOutput);
        })
    }
});