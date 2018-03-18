#!/usr/bin/env node
var {parseFromFile}  = require('../parse.js');

const fileName = process.argv.slice(2).shift();
if (fileName && fileName.length > 0) parseFromFile(fileName);


