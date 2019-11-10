import PortifolioModel from '../models/portifolio/PortifolioModel';

let objIndexController;
let divPortifolio = window.document.getElementById("divPorfifolio");

class IndexController {

    getTodosIndex(divPortifolio) {
        let promise = new Promise(function (resolve, reject) {

            let promiseFetch = PortifolioModel.getTodos();

            promiseFetch.then(response => {
                resolve(response);
            });
        });

        promise.then(response => {
            let dados = "";

            
            for (const servico of response.dados) {

                console.log(servico);

                dados += `
                <div class="card text-white bg-primary">
                    <h5 class="card-header">${servico.descricao}</h5>
                    <div class="card-body">
                       <p class="card-text">${servico.detalhes}</p>
                    </div>
                </div> <br>         
                `;
            }

            divPortifolio.innerHTML = dados;

        }).catch(response => {
            console.log('Erro Catch', response);
        });
    }

}

function main() {
    objIndexController = new IndexController();
    objIndexController.getTodosIndex(divPortifolio);
}

window.onload = main;