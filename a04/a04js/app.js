//Testando a exportação dos métodos modularizados.

//Para isso, utilizamos o método require(), que atribui o método de um módulo
//para uma variável.
var soma = require("./Calculadora/soma")
var sub = require("./Calculadora/sub")
var mult = require("./Calculadora/mult")
var div = require("./Calculadora/div")

//Testando os métodos de calculadora uma vez aue foram exportados.
console.log(`6 + 2 = ${soma(6, 2)}`) // 8
console.log(`23 - 54 = ${sub(23, 54)}`) // -31
console.log(`4 x 6 = ${mult(4, 6)}`) // 24
console.log(`5 / 2 = ${div(5, 2)}`) // 2.5