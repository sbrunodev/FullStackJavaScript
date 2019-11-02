
console.log("===== String ===== ");

var nome = "Olá";
var numero = 25;

console.log(typeof nome);
console.log(typeof numero);

console.log("===== Number - Inteiores ou Ponto Flutuante ===== ");

var valor1 = 50;
var valor2 = -10;
var resultado = valor1 + valor2;

console.log(resultado);
console.log(Number.MAX_VALUE); // Maior número que o Js suporta
console.log(Number.MIN_VALUE); // Menor número que o Js suporta

console.log(resultado.toString(2)); // Valor na base 2
console.log(resultado.toString(10)); // Valor na base 10

console.log("===== Objeto ===== ");
// Literal
var itens = {};
var itens2 = { nome: "Refrigerante", preco: 2.5, ativo: true };

// Construtor
var refrigerante = new Object();
refrigerante.preco = 2.5;
refrigerante.ativo = true;

// Acessar
console.log(itens2);
console.log(refrigerante);
console.log(refrigerante['preco']);


console.log("===== Date ===== ");
var data = new Date('2019-02-25');

console.log(data.getDay());
console.log(data.getMonth());
console.log(data.getFullYear());


console.log("===== Regex ===== ");
var regexLiteral = /A./;
var regexConstrutor = new RegExp("A.");

var stringCurso = "Bruno A. Silva";
console.log(regexConstrutor.test(stringCurso));
console.log(regexConstrutor.exec(stringCurso));