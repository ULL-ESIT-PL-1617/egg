const WHITES = /^(\s|#.*)*/;
const STRING = /^\s*"([^"]*)"\s*/;
const NUMBER = /^\s*(\d+)\b\s*/;
const WORD   = /^\s*([^\s(),"]+)\s*/;
const LP     = /^\s*([(])\s*/;
const RP     = /^\s*([)])\s*/;
const COMMA  = /^\s*(,)\s*/;

function skipSpace(string) {
  return string.slice(WHITES.exec(string)[0].length);
}

function parseExpression(program) {
  var match, expr;

  if (match = STRING.exec(program)) {
    expr = {type: "value", value: match[1]};
  } else if (match = NUMBER.exec(program)) {
    expr = {type: "value", value: Number(match[1])};
  } else if (match = WORD.exec(program)) {
    expr = {type: "word", name: match[1]};
  } else {
    throw new SyntaxError(`Unexpect syntax: ${program}`);
  }

  return parseApply(expr, program.slice(match[0].length));
}


function parseApply(tree, program) {
  var match, rpmatch;

  if (!(match = LP.exec(program))) { // no apply
    return {expr: tree, program: program};
  }

  program = program.slice(match[0].length);
  tree = {type: 'apply', operator: tree, args: []};

  while (!(rpmatch = RP.exec(program))) {
    var arg = parseExpression(program);
    tree.args.push(arg.expr);
    program = arg.program;

    if (match = COMMA.exec(program)) {
      program = (program.slice(match[0].length));
    } else if (!(RP.exec(program))) {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }

  return parseApply(tree, program.slice(rpmatch[0].length));
}

function parse(program) {
  var result = parseExpression(program);

  if (skipSpace(result.program).length > 0) {
    throw new SyntaxError('Unexpected text after program');
  }

  return result.expr;
}

module.exports = {
  skipSpace: skipSpace,
  parseExpression: parseExpression,
  parseApply: parseApply,
  parse: parse
};
