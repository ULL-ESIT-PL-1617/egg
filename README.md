[![Build Status](https://travis-ci.org/ULL-ESIT-PL-1617/egg.svg?branch=master)](https://travis-ci.org/ULL-ESIT-PL-1617/egg)
[![npm version](https://badge.fury.io/js/%40crguezl%2Feloquentjsegg.svg)](https://badge.fury.io/js/%40crguezl%2Feloquentjsegg)

### Code from Eloquent JS. Chapter 11. Project: A Programming Language

* [Eloquent JS. Chapter 11. Project: A Programming Language](http://eloquentjavascript.net/11_language.html)
* [As an npm module](https://www.npmjs.com/package/@crguezl/eloquentjsegg)
* [gist to check the npm module](https://gist.github.com/crguezl/8dfcaa01a0377dead374bc35c462c29d)

### Grammar

```Yacc

expression: STRING 
          | NUMBER 
          | WORD apply 

apply: /* vacio */
     | '(' expression (',' expression)* ')' apply


WHITES = /^(\s|#.*|\/\*(.|\n)*?\*\/)*/;
STRING = /^"((?:[^"\\]|\\.)*)"/;
NUMBER = /^([-+]?\d*\.?\d+([eE][-+]?\d+)?)/;
WORD   = /^([^\s(),"]+)/;
```

### AST

* Expressions of type "VALUE" represent literal strings or numbers. 
Their `value` property contains the string or number value that they represent.

* Expressions of type "WORD" are used for identifiers (names). Such objects have a `name` property that holds the identifier’s name as a string. 
* Finally, "APPLY" expressions represent applications. They have an `operator` property that refers to the expression that is being applied, and an `args` property that holds an array of argument expressions.

```
ast: VALUE{value: String | Number}
   | WORD{name: String}
   | APPLY{operator: ast, args: [ ast ...]}
```

The `>(x, 5)` would be represented like this:

```bash
[~/ull-pl1718-campus-virtual/tema3-analisis-sintactico/ejs-egg(master)]$ cat greater-x-5.egg 
>(x,5)
[~/ull-pl1718-campus-virtual/tema3-analisis-sintactico/ejs-egg(master)]$ ./eggc.js greater-x-5.egg 
[~/ull-pl1718-campus-virtual/tema3-analisis-sintactico/ejs-egg(master)]$ cat greater-x-5.egg.evm 
{
  "type": "apply",
  "operator": {
    "type": "word",
    "name": ">"
  },
  "args": [
    {
      "type": "word",
      "name": "x"
    },
    {
      "type": "value",
      "value": 5
    }
  ]
}
```

### Examples

* [Directory with examples](https://github.com/ULL-ESIT-PL-1617/egg/tree/master/examples)

### Executables

* `egg` 
    - Runs an egg program: `egg examples/two.egg` compiles the source onto the AST and interprets the AST
* `eggc`
    - Compiles the input program to produce a JSON containing the tree: `eggc examples/two.egg` produces the JSON file `examples/two.egg.evm`
* `evm` 
    - Egg Virtual Machine. Runs the tree: `evm examples/two.egg.evm`

```
[/tmp/check-egg(master)]$ npm i -g @crguezl/eloquentjsegg
...
[/tmp/check-egg/node_modules/@crguezl/eloquentjsegg/examples(master)]$ cat one.egg
do(
  define(x, 4),
  define(setx, fun(val, 
      set(x, val)
    )
  ),
  setx(50),
  print(x)
)
[/tmp/check-egg/node_modules/@crguezl/eloquentjsegg/examples(master)]$ egg one.egg
50
[/tmp/check-egg/node_modules/@crguezl/eloquentjsegg/examples(master)]$ eggc one.egg
[/tmp/check-egg/node_modules/@crguezl/eloquentjsegg/examples(master)]$ ls -ltr | tail -1
-rw-r--r--  1 casiano  wheel  1656 19 mar 08:05 one.egg.evm
[/tmp/check-egg/node_modules/@crguezl/eloquentjsegg/examples(master)]$ evm one.egg.evm 
50
[/tmp/check-egg/node_modules/@crguezl/eloquentjsegg/examples(master)]$ cat one.egg.evm
{
  "type": "apply",
  "operator": {
    "type": "word",
    "name": "do"
  },
  "args": [
    {
      "type": "apply",
      "operator": {
        "type": "word",
        "name": "define"
      },
      "args": [
        {
          "type": "word",
          "name": "x"
        },
        {
          "type": "value",
          "value": 4
        }
      ]
    },
    {
      "type": "apply",
      "operator": {
        "type": "word",
        "name": "define"
      },
      "args": [
        {
          "type": "word",
          "name": "setx"
        },
        {
          "type": "apply",
          "operator": {
            "type": "word",
            "name": "fun"
          },
          "args": [
            {
              "type": "word",
              "name": "val"
            },
            {
              "type": "apply",
              "operator": {
                "type": "word",
                "name": "set"
              },
              "args": [
                {
                  "type": "word",
                  "name": "x"
                },
                {
                  "type": "word",
                  "name": "val"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "apply",
      "operator": {
        "type": "word",
        "name": "setx"
      },
      "args": [
        {
          "type": "value",
          "value": 50
        }
      ]
    },
    {
      "type": "apply",
      "operator": {
        "type": "word",
        "name": "print"
      },
      "args": [
        {
          "type": "word",
          "name": "x"
        }
      ]
    }
  ]
}
```
### Using it as a library

```js
> egg = require('@crguezl/eloquentjsegg')
{ run: [Function: run],
  runFromFile: [Function: runFromFile],
  runFromEVM: [Function: runFromEVM],
  parser: 
   { getProgram: [Function: getProgram],
     lex: [Function: lex],
     parse: [Function: parse],
     parseApply: [Function: parseApply],
     parseExpression: [Function: parseExpression],
     parseFromFile: [Function: parseFromFile],
     setProgram: [Function: setProgram] } }
> parser = egg.parser
> parser.parse('def(x,4)')
{ type: 'apply',
  operator: { type: 'word', name: 'def' },
  args: [ { type: 'word', name: 'x' }, { type: 'value', value: 4 } ] }
```
