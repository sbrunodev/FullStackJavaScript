var Pessoa = /** @class */ (function () {
    function Pessoa(nome) {
        this.nome = nome;
    }
    Pessoa.prototype.exibirNome = function () {
        return "Ol\u00E1 meu nome \u00E9 " + this.nome;
    };
    return Pessoa;
}());
var objPessoa = new Pessoa("Bruno");
console.log(objPessoa.exibirNome());
