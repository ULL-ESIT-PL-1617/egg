const WHITES = /^(\s|#.*)*/;
const STRING = /^\s*"([^"]*)"\s*/;
const NUMBER = /^\s*(\d+)\b\s*/;
const WORD   = /^\s*([^\s(),"]+)\s*/;
const LP     = /^\s*([(])\s*/;
const RP     = /^\s*([)])\s*/;
const COMMA  = /^\s*(,)\s*/;

let program;
let lookahead;

function lex() {
    let match;

    match = WHITES.exec(program);
    program = program.slice(match[0].length);

    program = program.replace(WHITES,'');
    if (match = STRING.exec(program)) {
      lookahead = { type: "STRING", value: match[1]}
    } else if (match = NUMBER.exec(program)) {
      lookahead = {type: "NUMBER", value: Number(match[1])};
    } else if (match = WORD.exec(program)) {
      lookahead = {type: "WORD", value: match[1]};
    } else if (match = LP.exec(program)) { 
      lookahead = {type: "LP", value: match[1]};
    } else if (match = COMMA.exec(program)) {
      lookahead = {type: "COMMA", value: match[1]};
    } else if (RP.exec(program)) {
      lookahead = {type: "RP", value: match[1]};
    } else {
      throw new SyntaxError(`Unexpect syntax: ${program}`);
    }
    program = program.slice(match[0].length);
    return lookahead;
}

  function parseExpression() {
    var match, expr;

    program = program.replace(WHITES,'');
    if (match = STRING.exec(program)) {
      expr = {type: "value", value: match[1]};
    } else if (match = NUMBER.exec(program)) {
      expr = {type: "value", value: Number(match[1])};
    } else if (match = WORD.exec(program)) {
      expr = {type: "word", name: match[1]};
    } else {
      throw new SyntaxError(`Unexpect syntax: ${program}`);
    }
    program = program.slice(match[0].length);
    return parseApply(expr);
  }

  function parseApply(tree) {
    var match, rpmatch;

    program = program.replace(WHITES,'');
    if (!(match = LP.exec(program))) { // no apply
      return tree;
    }

    program = program.slice(match[0].length);
    tree = {type: 'apply', operator: tree, args: []};

    while (!(rpmatch = RP.exec(program))) {
      var arg = parseExpression();
      tree.args.push(arg);

      if (match = COMMA.exec(program)) {
        program = (program.slice(match[0].length));
      } else if (!(RP.exec(program))) {
        throw new SyntaxError("Expected ',' or ')'");
      }
    }
    program = program.slice(rpmatch[0].length);
    return parseApply(tree);
  }

function parse(p) {
  program = p;
  var result = parseExpression();

  return result;
}

module.exports = {
  parseExpression,
  parseApply,
  parse
};
