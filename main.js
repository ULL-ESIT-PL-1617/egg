const {run} = require('lib/eggvm.js');
function main() {
// Examples
//console.log(parse("+(a, 10)"));

var example1 = `
    do(define(x, 4),
       define(setx, fun(val, set(x, val))),
       setx(50),
       print(x))
`;
//console.log(parse(example1));
run(example1);

var example2 = `
      do(define(sum, fun(array,
         do(define(i, 0),
            define(sum, 0),
            while(<(i, length(array)),
              do(define(sum, +(sum, element(array, i))),
                 define(i, +(i, 1)))),
            sum))),
       print(sum(array(1, 2, 3))))
`;
run(example2);

var example3 = `
  do(
      define(tutu, fun(val, 
        define(val, *(val,8))
      )),
      print(tutu(4))
    )  
`;
run(example3);
};

window.onload = main;
