// Funcional
function sejaBemVindo() {
    console.log("Seja bem vindo");
}

sejaBemVindo();

// OO
var objPessoa = {
    nome = "Bruno",
    sobrenome = "Silva",

    exibirPessoa: function () {
        console.log("Pessoa: " + nome);
    }
}

objPessoa.exibirPessoa();