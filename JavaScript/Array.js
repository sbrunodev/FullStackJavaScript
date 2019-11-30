console.log('===== Adicionando e Removendo elementos ===== ')
function AdicionandoERemovendoElementos() {
    var numeros = [1, 2, 3, 4, 5];
    console.log("numeros: ", numeros);

    // Adicionar um novo elemento na ultima posição
    numeros.push(6);
    console.log(numeros);

    // Adicionar um elemento na primeira posição
    numeros.unshift(0);
    console.log(numeros);

    delete (numeros[2]);
    console.log(numeros);

    // Remove a ultima posição do Array
    numeros.pop();
    console.log(numeros);

    // Remove a primeira posição do Elemento
    numeros.shift();
    console.log(numeros);

    // Delete uma quantidade especifica no Array, informando o inicio e quantidade.
    numeros.splice(1, 4);
    console.log(numeros);

    // Alterando a Propriedade length
    numeros.length = 20;
    console.log(numeros);

    // Não deixando alterar a Propriedade length
    Object.defineProperty(numeros, 'length', { writable: false });
    numeros.length = 30;
    console.log(numeros);

    // Qual a diferença entre propriedades e elementos de um Array
    // Adicionar um novo elemento
    numeros[0] = 5;

    // Adicionando uma propriedade
    numeros.cores = 'azul';

    console.log(numeros);
}

console.log('===== Foreach ===== ')
var totalVenda = 0;
var vendas = [
    { produto: 1, quantidade: 1, valor: 2.5 },
    { produto: 2, quantidade: 3, valor: 5.7 },
    { produto: 3, quantidade: 2, valor: 4.9 },
]

vendas.forEach((item, index, array, ) => {
    console.log(item);
    console.log(index);
    console.log(array);
    totalVenda += (item.quantidade * item.valor);
})

console.log('===== Join ===== ') // Transfora o Array em String
var precos = [1.5, 2.5, 2.7, 3.1, 4.5, 5];
console.log(precos.join());
console.log(precos.join("-"));


console.log('===== Reverse ===== ') // Retorna um Array invertido
precos = [1.5, 2.5, 2.7, 3.1, 4.5, 5];
console.log(precos.reverse());


console.log('===== Sort ===== ') // Ordenar os Elementos de um Array
precos = [2.5, 4.5, 1.7, 0.1, 3.5, 5];
console.log(precos.sort());

console.log(precos.sort((x, y) => { x - y; }));

console.log('===== Concatenar ===== ') // Ordenar os Elementos de um Array
var lista1 = ['a', 'b'];
var lista2 = ['c', 'd', 'e'];

console.log(lista1.concat(lista2));

console.log('===== Slice ===== ') // Retorna parte de um Array passando um indice inicial e final
lista1 = ['a', 'b', 'c', 'd', 'e'];

console.log(lista1.slice(1, 2));

console.log('===== Map ===== ') // Retorna um novo Array de acordo com as alterações realizadas
numeros = [1, 2, 3, 4, 5];
console.log(numeros.map((item, index) => { return item + 10 }));

console.log('===== Filter ===== ') // Retorna um novo Array de acordo com as alterações realizadas
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(numeros.filter((item) => item > 5));

console.log('===== Every ===== ')
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(numeros.every((item) => item > 5)); // Se todos os elementos satisfazer a condição retorna true

console.log('===== Some ===== ')
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(numeros.some((item) => item > 5)); // Se pelo menos um elemento satisfazer a condição retorna true

console.log('===== Reduce ===== ') // Transforma o array em um único valor, tipo um sum. 
numeros = [1, 2, 3, 4, 5];
var retornoReduce = numeros.reduce(function (acumulador, valorEleArray, indice, array) {
    console.log(acumulador);
    console.log(valorEleArray);
    console.log(indice);
    console.log(array);
    console.log(' === Fim ===');
    return acumulador + valorEleArray;
}, 0);

console.log(retornoReduce);