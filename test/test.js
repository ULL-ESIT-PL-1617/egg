var should = require("should");
var parser = require('../lib/parse.js');

/*
describe("skipSpace", function() {
  it("should skip prefix spaces", function() {
    parser.skipSpace("  \t\n a").should.equal('a');
  })
});
*/

describe("parse", function() {
  it("should parse numbers and leave rest", function() {
    var value = { type: 'value', value: 1 };
    parser.setProgram('1');
    parser.lex();
    parser.parseExpression().should.eql(value);
  })
  it("should parse strings", function() {
    parser.setProgram('"s"');
    parser.lex();
    var value = { type: 'value', value: 's' }
    parser.parseExpression('"s"').should.eql(value);
  })
  it("should parse word not followed by '('", function() {
    parser.setProgram('word');
    parser.lex();
    var value = { type: 'word', name: 'word' };
    parser.parseExpression('word').should.eql(value);
  })
  it("should parse apply if word followed by '('", function() {
    parser.setProgram('word(a)');
    parser.lex();
    var value = { 
      type: 'apply',
      operator: { type: 'word', name: 'word' },
      args: [ { type: 'word', name: 'a' } ] 
    };
    parser.parseExpression('word ( a ) r ').should.eql(value);
  })
  /*
  it("should parse apply with multiple arguments", function() {
    var value = 
      { expr: 
        { type: 'apply',
          operator: { type: 'word', name: 'word' },
          args:  [ { type: 'word', name: 'a' },
            { type: 'word', name: 'b' },
            { type: 'word', name: 'c' } ] },
        program: '' }
    parser.parseExpression('word (a, b, c)').should.eql(value);
  })
  it("should parse apply with no args", function() {
    var value = 
      { expr: 
        { type: 'apply',
          operator: { type: 'word', name: 'word' },
          args: [] },
      program: '' }
    parser.parseExpression('word ( )').should.eql(value);
  })
  it("should apply can be chain", function() {
    var value = 
        { expr: 
          { type: 'apply',
            operator: { 
              type: 'apply', 
              operator: { type: 'word', name: 'word' },
              args: [ { type: 'word', name: 'a' }, { type: 'word', name: 'b' } ]
            },
            args: [ { type: 'word', name: 'c' }, { type: 'word', name: 'd' } ]
          },
          program: '' };
    parser.parseExpression('word (a , b ) (c, d)').should.eql(value);
  })
  it("should have syntax error if not valid", function() {
    (function(){parser.parseExpression('')}).should.throw(Error);
    (function(){parser.parseExpression('a(,')}).should.throw(Error);
    (function(){parser.parseExpression('a( )(')}).should.throw(Error);
    (function(){parser.parseExpression('a(, )')}).should.throw(Error);
  })
  it("should have not expected , or ) if not correct separator", function() {
    (function(){parser.parseExpression('word (a b)')}).should.throw(/Expected.*,.*or.*\)/i);
    (function(){parser.parseExpression('a(a')}).should.throw(/Expected/i);
  })
  it("parse should throw when there are rest", function(){
    (function() {parser.parse("+(a,b) e")}).should.throw(/unexpected text after program/i)
  })
  it("parse should work well otherwise", function(){
    var value = 
      { type: 'apply',
        operator: { type: 'word', name: '+' },
        args: [ { type: 'word', name: 'a' }, { type: 'word', name: 'b' } ] }
    parser.parse("+(a,b)").should.eql(value);
  })
  */
})

