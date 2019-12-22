_listaCores = [];
_velocidade = 500;
_sequenciaGeradaSistema = [];
_sequenciaGeradaUsuario = [];
_rodadas = 1;
_sistemaEmExecucao = false;

$(document).ready(function () {

    inicializarTela();
    inicializarCores();
    adicionarEvento();

    $("#btnRun").click(() => {
        run();
    });

});

function inicializarTela() {
    $(".game").hide();
    let strRecorde = localStorage.getItem("recorde");

    if (strRecorde == null)
        $("#msgRecorde").html('Seu recorde é: 0');
    else {
        objRecorde = JSON.parse(strRecorde);

        $("#msgRecorde").html(`Seu recorde é: ${objRecorde.pontuacao}`);
        $("#msgRecorde").attr("title","Recorde em: \n"+objRecorde.data);

    }
}

function inicializarCores() {

    _listaCores.push({ id: 1, cor: "blue" });
    _listaCores.push({ id: 2, cor: "red" });
    _listaCores.push({ id: 3, cor: "green" });
    _listaCores.push({ id: 4, cor: "yellow" });

    _listaCores.forEach(obj => {
        alteraCor(obj.id, obj.cor);
    });
}

function run() {
    $(".game").show();
    getSequencia();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getSequencia() {

    _sistemaEmExecucao = true;

    let idElemento, obj;


    for (let i = 0; i < _sequenciaGeradaSistema.length; i++) {
        let obj = _sequenciaGeradaSistema[i];
        alteraCor(obj.id, "black");
        await sleep(_velocidade);
        alteraCor(obj.id, obj.cor);
        await sleep(_velocidade);

    }

    await sleep(_velocidade);

    // Exibe novo elemento
    idElemento = getRandom(1, 4);
    obj = _listaCores.find(x => x.id == idElemento);
    alteraCor(obj.id, "black");
    await sleep(_velocidade);
    alteraCor(obj.id, obj.cor);


    _sequenciaGeradaSistema.push(obj);
    atualizaOrdensGeradas();

    _sistemaEmExecucao = false;
}

function atualizaOrdensGeradas() {

    exibeLog('Iniciou');
    _sequenciaGeradaSistema.forEach(obj => {
        exibeLog(`${obj.id} - ${obj.cor}`);
        exibeLog(` ----- `);
    });
}

async function mostrarElemento(obj) {
    alteraCor(obj.id, "black");
    await sleep(_velocidade);
    alteraCor(obj.id, obj.cor);
    await sleep(_velocidade);
}

function adicionarEvento() {
    _listaCores.push({ id: 1, cor: "blue" });
    _listaCores.forEach(obj => {
        let elemento = document.getElementById(`e${obj.id}`);
        elemento.addEventListener("click", function () { clickArea(obj) }, false);
    });
}

async function clickArea(obj) {

    //exibeLog("Sistema em Execução: " + _sistemaEmExecucao);
    if (!_sistemaEmExecucao) {
        _sequenciaGeradaUsuario.push(obj);

        exibeLog(_sequenciaGeradaUsuario.length + " " + _rodadas);

        // Verifica se está tudo certo
        let errou = false;
        for (let i = 0; i < _sequenciaGeradaUsuario.length && !errou; i++) {

            if (_sequenciaGeradaUsuario[i].cor != _sequenciaGeradaSistema[i].cor)
                errou = true;
        }

        if (errou) {

            let dataAtual = new Date();

            let objRecorde = {
                pontuacao: _sequenciaGeradaUsuario.length - 1,
                data: dataAtual.toLocaleString('pt-BR', { timeZone: 'UTC' })
            }

            localStorage.setItem("recorde", JSON.stringify(objRecorde));

            notificacao(`Você errou :(, Pontuação: ${_sequenciaGeradaUsuario.length - 1}`, 'danger');
            _sequenciaGeradaSistema = [];
            inicializarTela();
        }
        else
            if (_sequenciaGeradaUsuario.length == _rodadas) {
                getSequencia();
                notificacao(`Rodada ${_rodadas} Finalizada. Preste atencao e contiue ganhando.`, 'success');
                await sleep(_velocidade);
                _rodadas++;
                _sequenciaGeradaUsuario = [];
            }
    }
    else
        notificacao('Aguarde sua vez e preste atencao nos valores exibidos pelo Sistema.', 'warning');
}

function notificacao(msg, tipo) {

    var html = '';
    html += `<div class="alert alert-${tipo}" role="alert">`;
    html += msg
    html += `</div>`;

    $("#divMsg").html(html);
}


function exibeLog(msg) {
    $("#divLog").prepend(msg + "<br/>");
}

function alteraCor(id, cor) {
    $(`#e${id}`).css("background", cor);
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}