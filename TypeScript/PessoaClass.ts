class Pessoa {
    nome: string;
    constructor(nome: string) {
        this.nome = nome;
    }

    exibirNome() {
        return `Olá meu nome é ${this.nome}`;
    }
}

let objPessoa = new Pessoa("Bruno");
console.log(objPessoa.exibirNome());

