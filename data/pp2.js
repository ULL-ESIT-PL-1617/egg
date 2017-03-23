var parse = require('parse').parse;
var u = `
      do(define(sum, fun(array,
         do(define(i, 0),
            define(sum, 0),
            while(<(i, length(array)),
              do(define(sum, +(sum, element(array, i))),
                 define(i, +(i, 1)))),
            sum))),
       print(sum(array(1, 2, 3))))
`; 
console.log(u);
var t = parse(u);
console.log(t);

