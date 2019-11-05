var Pessoa = {
    nome: 'Bruno',
    profissao: 'Analista de Sistemas',
    endereco: {
        cidade: 'Presidente Prudente',
        estado: 'SP'
    }
}

var { cidade, estado } = Pessoa.endereco;

console.log(cidade);
console.log(estado);