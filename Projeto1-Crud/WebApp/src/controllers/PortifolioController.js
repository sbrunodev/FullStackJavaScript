import PortifolioModel from "../models/portifolio/PortifolioModel";
import PortifolioClass from "../models/portifolio/PortifolioClass";

let divMensagem = window.document.getElementById("msg");
let divPortifolios = window.document.getElementById("portifolios");
let formulario = window.document.getElementById("form");

let objPortifolioController;

class PortifolioController {

    getTodosTable(divPortifolio) {
        let promise = new Promise(function (resolve, reject) {

            let promiseFetch = PortifolioModel.getTodos();

            promiseFetch.then(response => {
                resolve(response);
            });
        });

        promise.then(response => {
            let html = "";

            if (response.erro) {
                this.exibirMsgAlert(response.msg, "erro");
            }

            html += `
            <div class="table-responsive">
                <table class="table table-stiped table-bordered table-hover table-sm">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            for (const servico of response.dados) {

                html += `
                   <tr>
                        <td>${servico.id_portifolio}</td>
                        <td>${servico.descricao}</td>
                        <td>
                            <button class="btn btn-primary btnEditar" data-id=${servico.id_portifolio}>Editar</button>
                            <button class="btn btn-danger btnExcluir" data-id=${servico.id_portifolio}>Excluir</button>
                        </td>
                        
                   </tr>
                `;
            }

            html += `
                    </tbody>
                </table>
            </div>
            `;

            divPortifolios.innerHTML = html;

            let btnsEditar = document.querySelectorAll(".btnEditar");
            let btnsExcluir = document.querySelectorAll(".btnExcluir");

            btnsEditar.forEach(function (item) {
                item.addEventListener("click", event => {
                    objPortifolioController.limparAlert();
                    let id = event.target.getAttribute("data-id");
                    objPortifolioController.prepararEditar(id);
                })
            });

            btnsExcluir.forEach(function (item) {
                item.addEventListener("click", event => {
                    objPortifolioController.limparAlert();
                    let id = event.target.getAttribute("data-id");
                    objPortifolioController.deletar(id);
                })
            });

        }).catch(response => {
            console.log('Erro Catch', response);
        });
    }

    prepararEditar(id) {
        console.log("Editar: " + id);

        PortifolioModel.getId(id)
            .then((response) => {


                objPortifolioController.exibirElemento("divFomulario");
                objPortifolioController.ocultarElemento("divListagem");

                console.log(response);
                if (!response.erro) {
                    let data = response.dados[0];

                    let objPortifolioClass = new PortifolioClass(data.id_portifolio, data.descricao, data.detalhes);

                    formulario.id.value = objPortifolioClass.id;
                    formulario.descricao.value = objPortifolioClass.descricao;
                    formulario.detalhes.value = objPortifolioClass.detalhes;

                }
            })
            .catch((response) => {
                console.log('Erro Catch', response);
            });

    }

    deletar(id) {
        console.log("(f) - Deletar: " + id);
        PortifolioModel.deletar(id)
            .then(response => {

                if (response.erro)
                    this.exibirMsgAlert(response.msg, "erro");
                else {
                    this.getTodosTable(divPortifolios);
                    this.exibirMsgAlert(response.msg, "sucesso");
                }

            })
            .catch(response => {
                console.log('Erro Catch', response);
            });

    }

    ocultarElemento(elemento) {
        document.getElementById(elemento).style.display = "none";
    }

    exibirElemento(elemento) {
        document.getElementById(elemento).style.display = "block";
    }

    limparCamposForm(form) {
        form.id.value = "";
        form.descricao.value = "";
        form.detalhes.value = "";
    }

    exibirMsgAlert(msg, tipo) {
        let html = "";

        html = `
            <div class="alert alert-${tipo == "sucesso" ? "success" : "danger"} alert-dismissible fade show" role="alert">
                <strong>${msg}</strong> 
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `;

        divMensagem.innerHTML = html;
    }

    limparAlert() {
        divMensagem.innerHTML = "";
    }

    editar(formulario) {
        let id, descricao, detalhes;

        id = form.id.value;
        descricao = formulario.descricao.value;
        detalhes = formulario.detalhes.value;

        if (id && descricao && detalhes) {
            let objPortifolioClass = new PortifolioClass(id, descricao, detalhes);

            console.log("OEEEEEEEEEEEEEEEE");
            console.log(objPortifolioClass);

            PortifolioModel
                .editar(objPortifolioClass)
                .then(response => {

                    if (response.erro)
                        this.exibirMsgAlert(response.msg, "erro");
                    else {
                        this.getTodosTable(divPortifolios);
                        this.exibirMsgAlert(response.msg, "sucesso");
                        objPortifolioController.ocultarElemento("divFomulario");
                        objPortifolioController.exibirElemento("divListagem");
                        this.limparCamposForm(formulario);
                    }

                })
                .catch(response => {
                    console.log("erro catch:", response);
                });
        }
        else {
            this.exibirMsgAlert("Por favor Preehcer todos os campos.", "erro");
        }
    }

    adicionar(formulario) {
        let descricao, detalhes;

        descricao = formulario.descricao.value;
        detalhes = formulario.detalhes.value;

        if (descricao && detalhes) {
            let objPortifolioClass = new PortifolioClass(null, descricao, detalhes);

            PortifolioModel
                .adicionar(objPortifolioClass)
                .then(response => {

                    if (response.erro)
                        this.exibirMsgAlert(response.msg, "erro");
                    else {
                        this.getTodosTable(divPortifolios);
                        this.exibirMsgAlert(response.msg, "sucesso");
                        objPortifolioController.ocultarElemento("divFomulario");
                        objPortifolioController.exibirElemento("divListagem");
                        this.limparCamposForm(formulario);
                    }

                })
                .catch(response => {
                    console.log("erro catch:", response);
                });

            /*
            let promise = new Promise(function (resolve, reject) {
                let promiseFetch = PortifolioModel.adicionar(objPortifolioClass);

                promiseFetch.then(response => {
                    resolve(response);
                });
            });

            promise.then(response => {
                console.log(response);

                if (response.erro)
                    this.exibirMsgAlert(response.msg, "erro");
                else {
                    this.getTodosTable(divPortifolios);
                    this.exibirMsgAlert(response.msg, "sucesso");
                    objPortifolioController.ocultarElemento("divFomulario");
                    objPortifolioController.exibirElemento("divListagem");
                    this.limparCamposForm(formulario);

                }
            }).catch(response => {
                console.log("erro catch:", response);
            });
            */


        }
        else {
            this.exibirMsgAlert("Por favor Preehcer todos os campos.", "erro");
        }
    }

    registrarEvents() {
        document.getElementById("btnExibirFormulario")
            .addEventListener("click", function () {
                objPortifolioController.limparAlert();
                objPortifolioController.ocultarElemento("divListagem");
                objPortifolioController.exibirElemento("divFomulario");
            });

        document.getElementById("btnCadastrarPortifolio")
            .addEventListener("click", function (event) {
                event.preventDefault();
                objPortifolioController.limparAlert();

                console.log('BTN SALVAR');
                if (formulario.id.value) {
                    objPortifolioController.editar(formulario);
                }
                else
                    objPortifolioController.adicionar(formulario);

            })


        document.getElementById("btnCancelarPortifolio")
            .addEventListener("click", function (event) {
                objPortifolioController.limparAlert();
                objPortifolioController.limparCamposForm(formulario);
                objPortifolioController.ocultarElemento("divFomulario");
                objPortifolioController.exibirElemento("divListagem");
            })

    }
}

function main() {
    objPortifolioController = new PortifolioController();
    objPortifolioController.ocultarElemento("divFomulario");
    objPortifolioController.getTodosTable(divPortifolios);
    objPortifolioController.registrarEvents();
}

window.onload = main;