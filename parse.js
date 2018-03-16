const inspect = require("util").inspect;

const WHITES = /^(\s|#.*)*/;
const STRING = /^\s*"([^"]*)"\s*/;
const NUMBER = /^\s*(\d+)\b\s*/;
const WORD   = /^\s*([^\s(),"]+)\s*/;
const LP     = /^\s*([(])\s*/;
const RP     = /^\)/;
const COMMA  = /^\s*(,)\s*/;

let program;
let lookahead;

function lex() {
    let match;

    match = WHITES.exec(program);
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
        throw new SyntaxError(`Unexpect syntax: ${program.slice(0,10)}`);
      }
      program = program.slice(match[0].length);
    }
    else {
      debugger;
      lookahead = null;
    }
    return lookahead;
}

function parseExpression() {
  var expr;

  if (lookahead.type == "STRING") {
    expr = {type: "value", value: lookahead.value};
  } else if (lookahead.type == "NUMBER") {
    expr = {type: "value", value: lookahead.value};
  } else if (lookahead.type == "WORD") {
    expr = {type: "word", name: lookahead.value};
  } else {
    throw new SyntaxError(`Unexpected syntax: ${program.slice(0,10)}`);
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

  while (lookahead.type !== "RP") {
    var arg = parseExpression();
    tree.args.push(arg);

    if (lookahead.type == "COMMA") {
      lex();
    } else if (lookahead.type !== "RP") {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }
  lex();
  return parseApply(tree);
}

function parse(p) {
  program = p;
  lex();
  var result = parseExpression();
  //console.log("result = ",inspect(result, {depth: null}));

  return result;
}

module.exports = {
  parseExpression,
  parseApply,
  parse
};
