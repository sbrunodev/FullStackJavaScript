console.log("===== Map =====");
var nomeString = "Bruno",
    numero = 25,
    booleano = true,
    arrayAlfabeto = ['a', 'b', 'c', 'd', 'e'],
    funcao = function () { console.log('função'); },
    objeto = { produto: 'Computador DELL' },
    regExp = /teste/gi;


console.log("===== Instanciando um Map =====");
const map = new Map();

console.log("===== Adicionando itens ao Map =====");
map.set(nomeString, numero);
map.set(booleano, arrayAlfabeto);
map.set(funcao, funcao);
map.set(objeto, objeto);

let retornoMap = map.set(regExp, regExp);

console.log("===== Recuperando informações do Map =====");
let n = map.get(nomeString);

console.log("===== Excluindo um item do Map =====");
console.log(map.delete(regExp));
console.log(map);


console.log("===== Pecorrendo o Map =====");
map.forEach((Valor, Chave, map) => {
    console.log("Valor - Chave", Valor + " - " + Chave)
})

console.log("===== Verifica se existe =====");
console.log(map.has(funcao));

console.log("===== Recupera as proximas Chaves =====");
let chaves = map.keys();
console.log(chaves);
chaves = chaves.next().value;
console.log(chaves);

console.log("===== Recupera as proximas Entradas =====");
let entries = map.entries();
console.log(entries);
entries = entries.next().value;
console.log(entries);

console.log("===== Limpando Lista Clear =====");
map.clear();
console.log(map);


// WeakMap, Set e WeakSet