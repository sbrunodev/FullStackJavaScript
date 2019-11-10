let p = new Promise(function (resolve, reject) {

    let teste = false;
    if (teste == true)
        resolve('Tudo OK');
    else
        reject('Erro encontrado');
});

p.then(retorno => {
    console.log(retorno);
}).catch(retorno => {
    console.log(retorno);
})