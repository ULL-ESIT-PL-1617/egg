const inspect = require("util").inspect;
let ins = (x) => inspect(x, {depth:null});
let fs = require("fs");

const WHITES = /^(\s|#.*|\/\*(.|\n)*?\*\/)*/;
const STRING = /^"((?:[^"\\]|\\.)*)"/;
const NUMBER = /^([-+]?\d*\.?\d+([eE][-+]?\d+)?)/;
const WORD   = /^([^\s(),"]+)/;
const LP     = /^([(])/;
const RP     = /^\)/;
const COMMA  = /^(,)/;
const NEWLINE = /\r\n|\r|\n/;

let program;
let lookahead;
let lineno = 1;

let setProgram = function(prg) {
  program = prg;
  lineno = 1;
  return {program, lineno}
};

let getProgram = function() {
  return {program, lineno}
};


function lex() {
    let match;

    match = WHITES.exec(program);
    if (NEWLINE.test(match[0])) {
      lineno += match[0].split(NEWLINE).length-1;
    }
    program = program.slice(match[0].length);

    if (program.length > 0) {
      if (match = STRING.exec(program)) {
        lookahead = { type: "STRING", value: match[1]}
      } else if (match = NUMBER.exec(program)) {
        lookahead = {type: "NUMBER", value: Number(match[1])};
      } else if (match = LP.exec(program)) { 
        lookahead = {type: "LP", value: match[1]};
      } else if (match = COMMA.exec(program)) {
        lookahead = {type: "COMMA", value: match[1]};
      } else if (match = RP.exec(program)) {
        lookahead = {type: "RP", value: match[0]};
      } else if (match = WORD.exec(program)) {
        lookahead = {type: "WORD", value: match[1]};
      } else {
        throw new SyntaxError(`Unexpect syntax line ${lineno}: ${program.slice(0,10)}`);
      }
      program = program.slice(match[0].length);
    }
    else {
      lookahead = null;
    }
    return lookahead;
}

function parseExpression() {
  var expr;

  debugger;
  if (lookahead.type == "STRING") {
    expr = {type: "value", value: lookahead.value};
  } else if (lookahead.type == "NUMBER") {
    expr = {type: "value", value: lookahead.value};
  } else if (lookahead.type == "WORD") {
    expr = {type: "word", name: lookahead.value};
  } else {
    throw new SyntaxError(`Unexpected syntax line ${lineno}: ${program.slice(0,10)}`);
  }
  lex();
  return parseApply(expr);
}

function parseApply(tree) {

  if (!lookahead) return tree;

  if (lookahead.type !== "LP") { // no apply
    return tree;
  }

  lex();

  tree = {type: 'apply', operator: tree, args: []};

  while (lookahead && lookahead.type !== "RP") {
    var arg = parseExpression();
    tree.args.push(arg);

    if (lookahead && lookahead.type == "COMMA") {
      lex();
    } else if (!lookahead || lookahead.type !== "RP") {
      throw new SyntaxError(`Expected ',' or ')'  at line ${lineno}: ... ${program.slice(0,20)}`);
    }
  }
  lex();

  if (!lookahead) return tree;
  return parseApply(tree);
}

function parse(p) {
  setProgram(p);
  lex();
  var result = parseExpression();
  //console.log("result = ",inspect(result, {depth: null}));

  return result;
}

function parseFromFile(fileName) {
  try {
    let program = fs.readFileSync(fileName, 'utf8');
    let tree = parse(program);
    let json = JSON.stringify(tree, null, "  ");
    fs.writeFileSync(fileName+".evm", json);
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  getProgram,
  lex,
  parse,
  parseApply,
  parseExpression,
  parseFromFile,
  setProgram,
};
