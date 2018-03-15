const WHITES = /^(\s|#.*)*/;
const STRING = /^\s*"([^"]*)"\s*/;
const NUMBER = /^\s*(\d+)\b\s*/;
const WORD   = /^\s*([^\s(),"]+)\s*/;
const LP     = /^\s*([(])\s*/;
const RP     = /^\s*([)])\s*/;
const COMMA  = /^\s*(,)\s*/;

function parseExpression(program) {
  //program = skipSpace(program);
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

function skipSpace(string) {
  return string.slice(WHITES.exec(string)[0].length);
}

function parseApply(expr, program) {
  var match, rpmatch;
  //program = skipSpace(program);

  if (!(match = LP.exec(program))) { // no apply
    return {expr: expr, rest: program};
  }

  //program = skipSpace(program.slice(match[0].length));
  program = (program.slice(match[0].length));
  expr = {type: 'apply', operator: expr, args: []};

  while (!(rpmatch = RP.exec(program))) {
    var arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = arg.rest;

    if (match = COMMA.exec(program)) {
      program = (program.slice(match[0].length));
    } else if (!(RP.exec(program))) {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }

  return parseApply(expr, program.slice(rpmatch[0].length));
}

function parse(program) {
  var result = parseExpression(program);

  if (skipSpace(result.rest).length > 0) {
  //if ((result.rest).length > 0) {
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
