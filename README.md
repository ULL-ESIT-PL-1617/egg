### Code from Eloquent JS. Chapter 11. Project: A Programming Language

* [Eloquent JS. Chapter 11. Project: A Programming Language](http://eloquentjavascript.net/11_language.html)
* [Deploy at GitHub](https://ULL-ESIT-PL-1617.github.io/egg) (See branch gh-pages)
* [As an npm module](https://www.npmjs.com/package/@crguezl/eloquentjsegg)
* [gist to check the npm module](https://gist.github.com/crguezl/8dfcaa01a0377dead374bc35c462c29d)

### Debugging

* [Debugging Node.js with Chrome DevTools](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27#.32rn3vkkj) by Paul Irish Jun 24, 2016
* [NodeJS Debugger Documentation](https://nodejs.org/api/debugger.html)
  - [V8 Inspector Integration for Node.js](https://nodejs.org/api/debugger.html#debugger_v8_inspector_integration_for_node_js)
    - V8 Inspector integration allows attaching Chrome DevTools to Node.js instances for debugging and profiling. NOTE: This is an experimental feature.


### Grammar

```Yacc

expression: STRING 
          | NUMBER 
          | WORD apply 

apply: /* vacio */
     | '(' expression (',' expression)* ')' apply


WHITES: /(\s|#.*)*/
STRING: /"([^"]*)"/
NUMBER: /\d+\b/
WORD:   /[^\s(),"]+/
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

### Testing

* [Travis](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/travis.html)
