#!/usr/bin/env node
var {runFromEVM}  = require('eggvm');

const fileName = process.argv.slice(2).shift();
if (fileName && fileName.length > 0) runFromEVM(fileName);

