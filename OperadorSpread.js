// Exemplo 1;
function mostrarNumeros(a, b, c, d) {
    console.log("Números:", a, b, c, d);
}

const arrayNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
mostrarNumeros(...arrayNumeros);
mostrarNumeros(1, 2, ...[3, 4]);


// Exemplo 2;
let arrayLetras = ['a', 'b', 'c'];
let arrayNumeros1 = [1, 2, 3];
let arrayNumeros2 = [4, 5, 6];

let arrayConcat = arrayLetras.concat(arrayNumeros1, arrayNumeros2);
console.log(arrayConcat);

let arraySpread = [...arrayLetras, ...arrayNumeros1, ...arrayNumeros2];
console.log(arraySpread);



// Exemplo 3
function mostrarPessoa(...pessoas){
    console.log(pessoas);
}

mostrarPessoa('Bruno 1','Bruno 2', 'Bruno 3');
