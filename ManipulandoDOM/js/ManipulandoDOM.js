var txtNome = window.document.getElementById("txtNome");
var txtEmail = window.document.getElementById("txtEmail");
var txtSenha = window.document.getElementById("txtSenha");
var selCidades = window.document.getElementById("selCidades");
var btnEntrar = window.document.getElementById("btnEntrar");

function selecionarCamposTexto() {
    console.log(typeof txtEmail);
    console.log(Object.prototype.toString.call(txtEmail));
    console.log("Type: " + txtEmail.type);
    console.log("Email Digitado: " + txtEmail.value);
    txtEmail.disabled = true;
}

function selecionarCamposSelect() {
    console.log(Object.prototype.toString.call(selCidades));
    console.log("Type: " + selCidades.type);
    console.log("Cidade Selecionada: " + selCidades.value);
}

var cbManterSelecionado = document.querySelector("#cbManterSelecionado");

function selecionarCamposCheck() {
    console.log(Object.prototype.toString.call(cbManterSelecionado));
    console.log("Type: " + cbManterSelecionado.type);
    console.log("Manter Selecionado: " + cbManterSelecionado.checked);
}

var cbManterSelecionado = document.querySelector("[name=rbSexo]");

function selecionarCamposRadio() {
    console.log(Object.prototype.toString.call(cbManterSelecionado));
    console.log("Type: " + cbManterSelecionado.type);
    console.log("Radio Selecionado: " + cbManterSelecionado.checked);
}

btnEntrar.onclick = function () {
    selecionarCamposTexto();
    selecionarCamposSelect();
    selecionarCamposCheck();
    selecionarCamposRadio();
}
