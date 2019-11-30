const db = require('../../banco/dbConexao');

class GaleriaModel {
    static getTodos(callback) {
        return db.query("SELECT * FROM GALERIA", callback)
    }

    static getId(id, callback) {
        return db.query("SELECT * FROM GALERIA WHERE ID_GALERIA = ?", [id], callback);
    }

    static adicionar(galeria, callback) {
        return db.query("INSERT INTO GALERIA (titulo, caminho) VALUES (?, ?)",
            [galeria.titulo, galeria.caminho],
            callback
        );
    }

    static editar(galeria, callback) {
        return db.query("UPDATE GALERIA SET  titulo = ?, caminho = ? WHERE id_galeria = ?",
            [galeria.titulo, galeria.caminho, galeria.id_galeria],
            callback
        );
    }

    static deletar(id, callback) {
        return db.query("DELETE FROM GALERIA WHERE id_galeria = ?",
            [id],
            callback
        );
    }

}

module.exports = GaleriaModel