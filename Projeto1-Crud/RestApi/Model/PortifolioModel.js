const db = require('../Banco/dbConexao');

module.exports = class PortifolioModel {
    constructor() {

    }

    static getTodos(callback) {
        return db.query("SELECT * FROM PORTIFOLIO", callback);
    }

    static getId(Id, callback) {
        return db.query("SELECT * FROM PORTIFOLIO WHERE ID_PORTIFOLIO = ?", [Id], callback);
    }

    static adicionar(portifolio, callback) {
        return db.query("INSERT INTO PORTIFOLIO (DESCRICAO, DETALHES) VALUES (?,?)",
            [portifolio.descricao, portifolio.detalhes], callback
        );
    }

    static deletar(Id, callback) {
        return db.query("DELETE FROM PORTIFOLIO WHERE ID_PORTIFOLIO = ?", [Id], callback);
    }

    static editar(portifolio, callback) {

        return db.query("UPDATE PORTIFOLIO SET DESCRICAO = ?, DETALHES = ? WHERE ID_PORTIFOLIO = ?", 
        [portifolio.descricao, portifolio.detalhes, portifolio.id], callback);
    }
}