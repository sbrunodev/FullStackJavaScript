var express = require('express');
var router = express.Router();
var GaleriaModel = require('../model/galeria/GaleriaModel');
var RespostaClass = require('../model/RespostaClass');

// Trabalhar com sistemas de arquivo
var fs = require('fs');

var pastaPublica = "./public/imagens/";

router.get("/", function (req, resp, next) {
    GaleriaModel.getTodos(function (erro, retorno) {
        let resposta = new RespostaClass();

        if (erro) {
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro.";
        }
        else
            resposta.data = retorno;

        resp.json(resposta);
    });
});

router.get("/:id", function (req, resp, next) {
    GaleriaModel.getId(req.params.id, function (erro, retorno) {
        let resposta = new RespostaClass();

        if (erro) {
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro.";
        }
        else
            resposta.data = retorno;

        resp.json(resposta);
    });
});

router.post("/?", function (req, resp, next) {

    let resposta = new RespostaClass();

    console.log(req.body.dados_imagem);
    if (req.body.dados_imagem != null) {

        let bitmap = new Buffer.from(req.body.dados_imagem.imagem_base64, 'base64');

        let dataAtual = new Date().toLocaleString().replace(/\//g, '').replace(/:/g, '').replace(/-/g, '').replace(/ /g, '');
        let nomeImagemCaminho = pastaPublica + dataAtual + req.body.dados_imagem.nome_arquivo;

        fs.writeFileSync(nomeImagemCaminho, bitmap);
        req.body.caminho = nomeImagemCaminho;

        GaleriaModel.adicionar(req.body, function (erro, retorno) {

            if (erro) {
                resposta.erro = true;
                resposta.msg = "Ocorreu um erro.";
            }
            else {
                if (retorno.affectedRows > 0) {
                    resposta.msg = "Cadastro realizado com Sucesso";
                }
                else {
                    resposta.erro = true;
                    resposta.msg = "Não foi possivel realizar a operação";
                }
            }
            console.log('resp', resposta.msg);
            resp.json(resposta);
        });
    }
    else {
        resposta.erro = true;
        resposta.msg = "Não foi enviado uma imagem";
        console.log('erro', resposta.msg);
        resp.json(resposta);
    }
});


router.put("/?", function (req, resp, next) {

    let resposta = new RespostaClass();

    console.log(req.body.dados_imagem);
    if (req.body.dados_imagem != null) {

        let bitmap = new Buffer.from(req.body.dados_imagem.imagem_base64, 'base64');

        let dataAtual = new Date().toLocaleString().replace(/\//g, '').replace(/:/g, '').replace(/-/g, '').replace(/ /g, '');
        let nomeImagemCaminho = pastaPublica + dataAtual + req.body.dados_imagem.nome_arquivo;

        fs.writeFileSync(nomeImagemCaminho, bitmap);
        req.body.caminho = nomeImagemCaminho;
    }

    GaleriaModel.editar(req.body, function (erro, retorno) {

        if (erro) {
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro.";
        }
        else {
            if (retorno.affectedRows > 0) {
                resposta.msg = "Registro alterado com Sucesso";
            }
            else {
                resposta.erro = true;
                resposta.msg = "Não foi Alterar o registro a operação";
            }
        }
        console.log('resp', resposta.msg);
        resp.json(resposta);
    });
});

router.delete("/:id?", function (req, resp, next) {

    GaleriaModel.deletar(req.params.id, function (erro, retorno) {

        let resposta = new RespostaClass();
        if (erro) {
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro.";
        }
        else {
            if (retorno.affectedRows > 0) {
                resposta.msg = "Registro Excluido";
            }
            else {
                resposta.erro = true;
                resposta.msg = "Não foi possivel Excluir o registro";
            }
        }
     
        resp.json(resposta);
    });

});

module.exports = router;