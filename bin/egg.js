#!/usr/bin/env node
var {runFromFile}  = require('../lib/eggvm.js');
debugger;
const fileName = process.argv.slice(2).shift();
if (fileName && fileName.length > 0) runFromFile(fileName);

