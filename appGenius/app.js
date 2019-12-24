_velocidade = 1000;
_sequenciaGeradaSistema = null;
_sequenciaGeradaUsuario = null;
_rodadas = 1;
_sistemaEmExecucao = false;
_tamanhoBase = 250;

$(document).ready(function () {

    inicializaBg();
    inicializarTela();

    $("#btnRun").click(() => {
        run();
    });
});

function inicializarTela() {

    $(".game, #msgPontuacao").hide();
    $("#msgRecorde, #btnRun, .config").show();
    $("#areaGame").empty();
    _sequenciaGeradaSistema = [];
    _sequenciaGeradaUsuario = [];

    let strRecorde = localStorage.getItem("recorde");

    if (strRecorde == null)
        $("#msgRecorde").html('Seu recorde é: 0');
    else {
        objRecorde = JSON.parse(strRecorde);

        $("#msgRecorde").html(`Seu recorde é: ${objRecorde.pontuacao}`);
        $("#msgRecorde").attr("title", "Recorde em: \n" + objRecorde.data);

    }
}

function inicializaBg() {

    setInterval(() => {
        //alert('Oi');
        let bgId = getRandom(1, 2);
        $("#bgBody").removeClass("bgNight").removeClass("bgDay");
        console.log(bgId);
        switch (bgId) {
            case 1: {
                $("#bgBody").addClass("bgDay");
            }

            case 2: {
                $("#bgBody").addClass("bgNight");
            }
        }
    }, 10000);
}

function inicializarCores() {

    let qtde = $("#qtde").val();

    for (let i = 0; i < qtde; i++) {
        let obj = _listaCores[i];
        alteraCor(obj.id, obj.cor);
    }
}

function run() {
    inicializarTela();
    notificacao("Vamos lá !", "primary");
    _velocidade = $("#velocidade").val();
    $(".game").show();
    $("#msgPontuacao").show();
    $("#msgRecorde, .config").hide();
    $("#btnRun").hide();
    constroiTela();

    inicializarCores();
    getSequencia();

    adicionarEvento();
}

function constroiTela() {
    let qtde = $("#qtde").val() / 4;

    let pos = 0;
    for (let i = 0; i < qtde; i++)
        pos = criaArea(pos);

    definirTamanhoArea(qtde);
}

function definirTamanhoArea(qtde) {
    let tamanho = _tamanhoBase / qtde;
    $(".area").css("width", tamanho);
    $(".area").css("height", tamanho);
}

function criaArea(pos) {
    let html = '';
    html += '<div class="p col-md-3">';
    html += '    <div class="area align-self-center" id="e' + (++pos) + '" ></div > ';
    html += '</div>';

    html += '<div class="p col-md-3">';
    html += '    <div class="area" id="e' + (++pos) + '"></div>';
    html += '</div>';

    html += '<div class="p col-md-3">';
    html += '    <div class="area" id="e' + (++pos) + '"></div>';
    html += '</div>';

    html += '<div class="p col-md-3">';
    html += '    <div class="area" id="e' + (++pos) + '"></div>';
    html += '</div>';

    $("#areaGame").append(html);
    return pos;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getSequencia() {

    let qtde = $("#qtde").val();
    _sistemaEmExecucao = true;

    let idElemento, obj;


    for (let i = 0; i < _sequenciaGeradaSistema.length; i++) {
        let obj = _sequenciaGeradaSistema[i];
        alteraCor(obj.id, "white");
        await sleep(_velocidade);
        alteraCor(obj.id, obj.cor);
        await sleep(_velocidade);

    }

    await sleep(_velocidade);

    // Exibe novo elemento
    idElemento = getRandom(1, qtde);
    obj = _listaCores.find(x => x.id == idElemento);
    alteraCor(obj.id, "white");
    await sleep(_velocidade);
    alteraCor(obj.id, obj.cor);

    _sequenciaGeradaSistema.push(obj);
    atualizaOrdensGeradas();

    _sistemaEmExecucao = false;

    notificacao('Agora é sua vez, vamos lá', 'primary');
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

    let qtde = $("#qtde").val();

    for (let i = 0; i < qtde; i++) {
        let obj = _listaCores[i];
        let elemento = document.getElementById(`e${obj.id}`);
        console.log(elemento);

        elemento.addEventListener("click", function () { clickArea(obj) }, false);

    }
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
            atualizaRecord(_sequenciaGeradaSistema.length - 1);
            notificacao(`Você errou :(, Pontuação: ${_sequenciaGeradaSistema.length - 1}`, 'danger');
            inicializarTela();
        }
        else
            if (_sequenciaGeradaUsuario.length == _rodadas) {
                getSequencia();
                notificacao('Preste atenção ! ', 'primary');
                //notificacao(`Rodada ${_rodadas} Finalizada. Preste atencao e contiue ganhando.`, 'success');
                await sleep(_velocidade);
                _rodadas++;
                _sequenciaGeradaUsuario = [];
                $("#msgPontuacao").html('Pontuação: ' + _sequenciaGeradaSistema.length);
            }
    }
    else
        notificacao('Aguarde sua vez e preste atencao nos valores exibidos pelo Sistema.', 'warning');
}

function atualizaRecord(pontuacao) {

    let atualizarValor = false;
    let strRecorde = localStorage.getItem("recorde");

    if (strRecorde == null)
        atualizarValor = true;
    else {
        objRecordoExistente = JSON.parse(strRecorde);
        if (pontuacao > objRecordoExistente.pontuacao)
            atualizarValor = true;
    }

    if (atualizarValor) {

        let dataAtual = new Date();

        let objRecorde = {
            pontuacao: pontuacao,
            data: dataAtual.toLocaleString('pt-BR', { timeZone: 'UTC' })
        }
        localStorage.setItem("recorde", JSON.stringify(objRecorde));
    }
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