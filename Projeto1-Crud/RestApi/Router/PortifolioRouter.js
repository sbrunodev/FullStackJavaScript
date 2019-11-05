var express = require('express');
var router = express.Router();

var PortifolioModel = require('../Model/PortifolioModel');
var RespostaClass = require('../Class/RespostaClass');

router.get('/', (req, res, next) => { // Requisição, Resposta e Next

    PortifolioModel.getTodos(function (erro, retorno) {
        let resposta = new RespostaClass();
        if (erro) {
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro";
            console.log('erro: ', erro);
        }
        else
            resposta.dados = retorno;
        res.json(resposta);
    });
})

router.get('/:id?', (req, res, next) => { // Requisição, Resposta e Next

    PortifolioModel.getId(req.params.id, function (erro, retorno) {
        let resposta = new RespostaClass();
        if (erro) {
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro";
            console.log('erro: ', erro);
        }
        else
            resposta.dados = retorno;
        res.json(resposta);
    });
})

router.post('/?', (req, res, next) => { // Requisição, Resposta e Next

    PortifolioModel.adicionar(req.body, function (erro, retorno) {
        let resposta = new RespostaClass();
        if (erro) {
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro";
            console.log('erro: ', erro);
        }
        else {
            if (retorno.affectedRows > 0) { // Quantas linhas foram afetadas
                resposta.msg = "Cadastro realizado com Sucesso";
            }
            else
            {
                resposta.erro = true;
                resposta.msg = "Não foi possivel realizar o Cadastro";
            }
        }
        console.log('erro:', resposta);
        res.json(resposta);
    });
})

module.exports = router;