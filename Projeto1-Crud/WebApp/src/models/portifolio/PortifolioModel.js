import ConfigClass from '../../ConfigClass';

const caminho = `${ConfigClass.getUrlApi().toString()}/portifolio`;

export default class PortifolioModel {

    constructor() {

    }

    static getTodos() {
        return fetch(caminho).then(response => {

            if (response.status >= 400) {
                throw new Error('Erro ao se Conectar ao Servidor');
            }

            return response.json();
        });
    }

    static getId(id) {
        return fetch(`${caminho}/${id}`).then(response => {

            if (response.status >= 400) {
                throw new Error('Erro ao se Conectar ao Servidor');
            }

            return response.json();
        });
    }

    static deletar(id) {
        return fetch(`${caminho}/${id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE",

            })
            .then(response => {

                if (response.status >= 400) {
                    throw new Error('Erro ao se Conectar ao Servidor');
                }

                return response.json();
            });
    }

    static adicionar(objPortifolioClass) {

        return fetch(caminho,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(objPortifolioClass)

            })
            .then(response => {

                if (response.status >= 400) {
                    throw new Error('Erro ao se Conectar ao Servidor');
                }

                return response.json();
            });
    }

    static editar(objPortifolioClass) {

        return fetch(caminho,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify(objPortifolioClass)

            })
            .then(response => {

                if (response.status >= 400) {
                    throw new Error('Erro ao se Conectar ao Servidor');
                }

                return response.json();
            });

    }


}