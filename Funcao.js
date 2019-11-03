// Atribuir uma função a uma variavel ou propriedade do objeto
var msg = function () {
    console.log("Bruno Silva");
}
msg();

function somar(a, b) { return a + b }
function subtrair(a, b) { return a - b }

function calculadora(fn, v1, v2) {
    return fn(v1, v2);
}

console.log(calculadora(somar, 10, 15));
console.log(calculadora(subtrair, 10, 15));

// Callback
function Contador() {
    var num = 10;
    for (let i = 0; i < num; i++)
        console.log((i + 1));
}

function Iniciar(callBack) {
    console.log('Iniciar');
    callBack();
    console.log('Finalizar');
}

Iniciar(Contador);

// Construtor Objetos
function Pessoa(nome, celular) {
    this.nome = nome;
    this.celular = celular;
    this.getNomeCelular = function () {
        return "Nome: " + this.nome + ", Celular: " + this.celular;
    }
}

var objPessoa1 = new Pessoa("Bruno", "18997458242");
var objPessoa2 = new Pessoa("Teste", "18996949124");
console.log(objPessoa1.getNomeCelular());
console.log(objPessoa2.getNomeCelular());


