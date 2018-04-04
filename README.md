Los retos de la práctica 2 son los objetivos de la práctica 3 de egg

### Requisitos

1. Modifique el `<-` o `element` para que pueda acceder a un array multidimensional como en el ejemplo que sigue
  ```
    print(<-(x,2,1,1)) # x[2][1][1] is 5
  ```
2. Modifique `set` para que podamos modificar un elemento de un array:
  ```lisp
  $ cat examples/set-arr-arr-3.egg 
  do(
    :=(x, arr[4, 3, arr[2, arr[9, 3],1]]),
    =(x, 2, 1, 1, 5), # x[2][1][1] = 5
    print(<-(x,2,1,1)) # x[2][1][1] is 5
  )
  ```
4. Modifique las operaciones de adición, and (`&&`), or (`||`) multiplicación, división y restas para que en vez de dos operandos puedan recibir un número  arbitrario:
  ```lisp
  +(4,5,2,1) # 12
  ```
5.  Modifique las operaciones de menor, mayor, `<=`, `>=`, `==`, etc. para que en vez de dos operandos puedan recibir un número  arbitrario:
  ```lisp
  <(2,a,5) # true if 2 < a and a < 5 same as 2 < a < 5
  ```
6. Modifique el traductor y la evaluación para que el punto (`m.a`) permita acceder a los campos y un programa como este funcione
  ```
  $ cat examples/mapmap.egg 
  do {
    :=(m, map("a": map("x": array[70, 100]), "b": array[2,3])),
    print( m), # { a: { x: [ 70, 100 ] }, b: [ 2, 3 ] }
    print(m.a),  #  { x: [ 70, 100 ] }
    print(m.b),  # [ 2, 3 ]
    print(m.a.x.1),  # 100
    print(m.b.1),  # 3
  }
  ```
  Cuando se ejecuta debería producir:
  ```
  $ bin/egg.js examples/mapmap.egg 
  { a: { x: [ 70, 100 ] }, b: [ 2, 3 ] }
  { x: [ 70, 100 ] }
  [ 2, 3 ]
  100
  3
  ```
7. Modifique el intérprete para que se pueda acceder a los elementos de un array o map usando la notación corchete: 
  ```
  $ cat examples/array-3.egg 
  do(
    def(x, array[array[1,4], fun(x,y, +(x,y)),7]),
    print(x[1](5,9)),  # 14
    print(x[0, 1]),  # 4
    print(x[0][1])  # 4
  )
  $ bin/egg.js examples/array-3.egg 
  14
  4
  4
  ```
  Debería funcionar también con hashes:
  ```
  $ cat examples/map-bracket.egg 
  # Implemented. Accesing an element of a map
  do {
    :=(m, map["a":1,"b":2]),
    print("m = ", m),
    print("m[a] = ",m["a"]),  # 1
    print("m[b] = ",m["b"]),  # 2
    =(m, 'c', 3), # Future syntax? =(m[c], 3)
    print("m[c] = ",m["c"]),  # 3
    print("m = ", m),
  }

  $ bin/egg.js examples/map-bracket.egg 
  m =  { a: 1, b: 2 }
  m[a] =  1
  m[b] =  2
  m[c] =  3
  m =  { a: 1, b: 2, c: 3 }
  ```
8. Añada objetos al lenguaje
9. Proyecto: Modifique el lenguaje para que incorpore expresiones regulares extendidas como en este ejemplo:
  ```
  $ cat examples/regexp.egg
  /* Not implemented: regexp example */
  do {
    :=(d, /
           (?<year>  \d{4} ) -?  # year 
           (?<month> \d{2} ) -?  # month 
           (?<day>   \d{2} )     # day
          /x),
    print(d.test("2015-02-22")),  # true
    :=(m, d.exec("2015-02-22")),  /*  [ '2015-02-22', '2015', '02', '22', 
                                        index: 0, input: '2015-02-22', 
                                        year: '2015', month: '02', day: '22' ] 
                                  */
    print(m.year) # 2015
  }
  ```
  Estudie como hacerlo. Este es un objetivo a mas largo plazo
10. Para cada funcionalidad haga una o mas pruebas e incorpórelas a los tests

10. Añada pruebas, integre con [circleci](https://circleci.com/), publique el módulo npm

### Recursos

* [Eloquent JS: Chapter 11. Project: A Programming Language](http://eloquentjavascript.net/11_language.html)
* [El lenguaje egg: repo en GitHub](https://github.com/ULL-ESIT-PL-1617/egg)
* [Repo interpreter-egg](https://github.com/ULL-ESIT-PL-1617/interpreter-egg)
* [NodeJS Readline gist](https://gist.github.com/crguezl/430642e29a2b9293317320d0d1759387)
* En el repo [ULL-ESIT-PL-1617/interpreter-egg](https://github.com/ULL-ESIT-PL-1617/interpreter-egg) se muestra como hacer un bucle REPL
* [XRegExp](http://xregexp.com/)
* Tests. Mocking and Stubbing
    * [Sinon API](http://sinonjs.org/releases/v1.17.7/)
    * [Side effects of stubbing console in tests](https://gyandeeps.com/console-stubbing/)
    * [test-console](https://github.com/jamesshore/test-console) npm


