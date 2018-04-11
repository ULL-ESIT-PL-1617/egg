Los retos de la práctica 3 son los objetivos de la práctica 4 de egg

### Requisitos

1. Modifique el traductor y la evaluación para que el punto (`m.a`) permita acceder a los campos.
  Un problema que complica la traducción del operador punto es dar soporte a los métodos ya existentes 
  en JavaScript. 
  Sería bueno que un programa como este funcionara:
  ```
  $ cat examples/array-push.egg 
  do(
    def(x, array[array[1,4],5,7]),
    x.push(4), 
    print(x),
    print(x.shift()),
    print(x),
  )
  ```
  También debería funcionar un programa como este:
  ```
  $ cat examples/array-push-3.egg 
  do(
    :=(z, array[1, 4, "a"]),
    # Not implemented. The grammar must be changed
    #          print(array[1, 4, "a"].push(5)),
    # Or may be to make the dot equivalent to a call a.b ≡ a(b)
    # This way it conforms to the current grammar
    print(z.push(9)), # But this works!
    print(z["push"](5)), # But this works!
    print(z),
  )
  ```
10. Expanda el lenguaje para que permita el uso de librerías como en el ejemplo que sigue. Este es un ejemplo de cliente:
  ```
  $ cat examples/require/client.egg 
  do {
    :=(z, require("examples/require/module.egg")),
    print(z.inc(4))
  }

  ```
  y este sería el código en el módulo:
  ```
  $ cat examples/require/module.egg 
  # module. Exports z
  do {
    :=(z, map("inc": ->(x, 
                          +(x,1)
                        ) # end fun
             ) # end map
    ), # end of :=
    z  # el último valor será exportado
  }
  ```
  Repase el vídeo [Como implementar la funcionalidad de "require"](https://www.youtube.com/watch?v=qffmnSCRR3c&feature=youtu.be).
  Aquí tiene un enlace al [Repo correspondiente al vídeo](https://github.com/ULL-ESIT-MII-CA-1718/ejs-chapter10-modules/tree/master/require).
  * Memoize las librerías para que no se carguen dos veces
  * Procure añadir esta funcionalidad sin tocar el código principal usando el strategy pattern + registry pattern
11. Actualmente tenemos que poner el nombre de un atributo o campo entre comillas. Así debemos escribir 
`map {"a": 4}` 
y no podemos escribir 
`map {a: 4}` 
que sería *mas bonito*.
Modifique el traductor de manera que que se pueda hacer esto y así podamos escribir 
`Object{a:4, b: ->(x, x+this.a)}` 
en vez de 
`Object{"a":4, "b": ->(x, x+this.a)}` 
sin que tener que poner dobles comillas en la cadena
12. Expanda el traductor con un operador `...` que funcione como el equivalente de JavaScript y permita un número variable de argumentos en las llamadas a función
13. Extienda el lenguaje con un bucle `for(counter, stop-expresion, increment-expresion, body)`
13. Extienda el lenguaje con un bucle `map(element, array, body)`
11. Añada pruebas, integre con [circleci](https://circleci.com/), publique el módulo npm
8. Añada objetos al lenguaje. Ejemplo de creación de un objeto con dos métodos:
  ```
  $ cat examples/objects.egg 
  do {
    :=(x, Object { 
      "c": 0,
      "gc": ->(this.c),
      "sc": ->(value, 
                 =(this.c, value)
              )
    }),
    print(x.gc()),
    x.sc(4),
    print(x.gc()),
  }
  ```
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
* Repase el vídeo [Como implementar la funcionalidad de "require"](https://www.youtube.com/watch?v=qffmnSCRR3c&feature=youtu.be)
* [Repo correspondiente al vídeo](https://github.com/ULL-ESIT-MII-CA-1718/ejs-chapter10-modules/tree/master/require)
