// Funcional
function sejaBemVindo() {
    console.log("Seja bem vindo");
}

sejaBemVindo();

// OO
var objPessoa = {
    nome: "Bruno",
    sobrenome: "Silva",

    exibirPessoa: function () {
        console.log("Pessoa: " + this.nome);
    }
}

objPessoa.exibirPessoa();


//ES5
function PessoaES5(nome, cpf) {
    //propriedades
    this.nome = nome;
    this.cpf = cpf;
}

PessoaES5.prototype.nomeUpper = function () {
    return this.nome.toUpperCase();
}

var objPessoa1 = new PessoaES5('Bruno 1', '42281162882');
var objPessoa2 = new PessoaES5('Bruno 2', '42521612464');

console.log(objPessoa1.nomeUpper());

// ES6
class PessoaES6 {
    constructor(nome, cpf) {
        this.nome = nome;
        this.cpf = cpf;
    }

    nomeUpeer() {
        return this.nome.toUpperCase();
    }   
}

var objPessoa3 = new PessoaES6('Bruno 3', '42294905201');
console.log(objPessoa3.nomeUpeer());