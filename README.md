[![Build Status](https://travis-ci.org/ULL-ESIT-PL-1617/egg.svg?branch=master)](https://travis-ci.org/ULL-ESIT-PL-1617/egg)
[![npm version](https://badge.fury.io/js/%40crguezl%2Feloquentjsegg.svg)](https://badge.fury.io/js/%40crguezl%2Feloquentjsegg)

### Reto

1. Modifique la versión actual del lenguaje egg para que acepte como entrada este programa en [`examples/reto.egg`](https://github.com/ULL-ESIT-PL-1617/egg/blob/reto/examples/reto.egg):
  ```lisp
  do {
    def(sum,  ; function
      -> { nums, 
        do {
           := (i, 0), # Creates a local variable i and sets to 0
           := (s, 0), # Creates local var s and sets to 0
           while { <(i, length(nums)),
             do { =(s, +(s, <-(nums, i))),
                =(i, +(i, 1))
             }
           },
           s
        }
     )
   },
   print(+("sum(array[1, 2, 3]) := ", sum(array[1, 2, 3])))
  }
  ```
2. Introduzca una prueba en `test/test.js` que demuestre que una entrada como la de [`examples/scope-err.egg`](https://github.com/ULL-ESIT-PL-1617/egg/blob/reto/examples/scope-err.egg):
  ```lisp
  do( 
    set(x,9),
    print(x) # ReferenceError: Tried setting an undefined variable: x
  )
  ```
  produce una excepción de este estilo: `SyntaxError: Unexpected input after reached the end of parsing 1: 5) ;`
  Estudie [la API de Should.js](https://shouldjs.github.io/#should-throws)

2. Introduzca una prueba en `test/test.js` que demuestre que una entrada como la de `examples/number-as-fun-err.egg`: 
  ```lisp
  4(5) ; Calling a number as a function
  ```
  produce una excepción

2. Introduzca una prueba en `test/test.js` que demuestre que una entrada como la de `examples/one.egg`: 
  ```lisp
  do(
    define(x, 4),
    define(setx, fun(val, 
        set(x, val)
      )
    ),
    setx(50),
    print(x)
  )
  ```
  produce una salida en `stdout` de 50. 
  * Utilice la técnica de stubbing (test stubs are software components that simulate the behaviors of other software components (or modules) that a module undergoing tests depends on). Haga stubbing sobre `console.log`
  * Algo como esto le puede ayudar:

  ```js
  describe("run", function() {
    let originalLog;
    beforeEach(function() {
      originalLog = console.log;
      console.log = function (...args) { 
        ...
      };
    });
    // test code here
    afterEach(function() {
      ...
    });
    it("testing one.egg with mocking of console.log", function() {
      ...
    }
    }
  ```
  Si quiere saber mas sobre stubbing estudie la librería [sinon](http://sinonjs.org/)

9. Aquí esta el [repo](https://github.com/ULL-ESIT-PL-1617/egg) con la versión pública de nuestr versión del lenguaje `egg`

### Recursos

* [Eloquent JS: Chapter 11. Project: A Programming Language](http://eloquentjavascript.net/11_language.html)
* [El lenguaje egg: repo en GitHub](https://github.com/ULL-ESIT-PL-1617/egg)
* [Repo interpreter-egg](https://github.com/ULL-ESIT-PL-1617/interpreter-egg)
* [NodeJS Readline gist](https://gist.github.com/crguezl/430642e29a2b9293317320d0d1759387)
* En el repo [ULL-ESIT-PL-1617/interpreter-egg](https://github.com/ULL-ESIT-PL-1617/interpreter-egg) se muestra como hacer un bucle REPL
* [XRegExp](http://xregexp.com/)

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
     | '(' (expression ',')* expression? ')' apply


WHITES = /^(\s|[#;].*|\/\*(.|\n)*?\*\/)*/;
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
$ cat greater-x-5.egg 
>(x,5)
$ ./eggc.js greater-x-5.egg 
$ cat greater-x-5.egg.evm 
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

### Instalation

```
$ npm i -g @crguezl/eloquentjsegg
...
```

### Executables

* `egg` 
    - Runs an egg program: `egg examples/two.egg` compiles the source onto the AST and interprets the AST

```
$ cat one.egg
do(
  define(x, 4),
  define(setx, fun(val, 
      set(x, val)
    )
  ),
  setx(50),
  print(x)
)
$ egg one.egg
50
```

* `eggc`
    - Compiles the input program to produce a JSON containing the tree: `eggc examples/two.egg` produces the JSON file `examples/two.egg.evm`
* `evm` 
    - Egg Virtual Machine. Runs the tree: `evm examples/two.egg.evm`
```
$ eggc one.egg
$ ls -ltr | tail -1
-rw-r--r--  1 casiano  wheel  1656 19 mar 08:05 one.egg.evm
$ evm one.egg.evm 
50
```

Here is the tree in JSON format for the former `one.egg` program:

```
$ cat one.egg.evm
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
