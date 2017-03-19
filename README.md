### Code from Eloquent JS. Chapter 11. Project: A Programming Language

* [Eloquent JS. Chapter 11. Project: A Programming Language](http://eloquentjavascript.net/11_language.html)
* [Deploy at GitHub](https://ULL-ESIT-PL-1617.github.io/egg) (See branch gh-pages)

### Debugging

* [Debugging Node.js with Chrome DevTools](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27#.32rn3vkkj) by Paul Irish Jun 24, 2016
* [NodeJS Debugger Documentation](https://nodejs.org/api/debugger.html)
  - [V8 Inspector Integration for Node.js](https://nodejs.org/api/debugger.html#debugger_v8_inspector_integration_for_node_js)
    - V8 Inspector integration allows attaching Chrome DevTools to Node.js instances for debugging and profiling. NOTE: This is an experimental feature.


### Grammar

```Yacc

expression: string 
          | number 
          | word apply 

apply: /* vacio */
     | '(' expression (',' expression)* ')'
```

