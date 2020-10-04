var express = require('express');
var router = express.Router();
var conexao = require('../bin/bancodedados')

/* GET users listing. */
router.get('/clientes', (req, res) => {
    // var dadosFake = {
    //     status : 'ok',
    //     dados : [
    //         {id_cliente : 1, nome_cliente : "Andre", sobrenome_cliente : "Rabelo"},
    //         {id_cliente : 2, nome_cliente : "Eduardo", sobrenome_cliente : "Pereira"},
    //     ]
    // }
    var sql = 'select * from clientes'
    conexao.query(sql, (erro, resultado) => {
        var resposta = {
            status : '',
            dados : []
        }
        if(erro){
            resposta.status = 'erro'
            resposta.dados = erro
            //console.log(erro)
            res.send(resposta)
        } else {
            //console.log(resultado)
            resposta.status = 'ok'
            resposta.dados = resultado
            res.send(resposta);
        }
    })
  
   
});

router.get('/clientes/:id_cliente', (req, res) => {
    var sql = 'select * from clientes where id_cliente = ' + req.params.id_cliente
    conexao.query(sql, (erro, resultado) => {
        var resposta = {
            status : '',
            dados : []
        }
        if(erro){
            resposta.status = 'erro'
            resposta.dados = erro
            //console.log(erro)
            res.send(resposta)
        } else {
            //console.log(resultado)
            resposta.status = 'ok'
            resposta.dados = resultado
            res.send(resposta);
        }
    })
});

router.post('/clientes', (req, res) => {
    var nome_cliente = req.body.nome
    var sobrenome_cliente = req.body.sobrenome
    var sql = `insert into clientes(nome_cliente, sobrenome_cliente) values("${nome_cliente}", "${sobrenome_cliente}")`   
    conexao.query(sql, (erro, resultado) => {
        var resposta = {
            status : '',
            dados : undefined
        }
        if(erro){
            resposta.status = 'erro'
            resposta.dados = erro
            res.send(resposta)
        } else {
            resposta.status = 'ok'
            resposta.dados = resultado
            res.send(resposta)
        }
    })

})

router.patch('/clientes/:id', (req, res) => {
    var id_cliente = req.params.id
    var nome_cliente = req.body.nome
    var sobrenome_cliente = req.body.sobrenome
    var sql = `update clientes set nome_cliente = "${nome_cliente}", sobrenome_cliente = "${sobrenome_cliente}" where id_cliente = ${id_cliente}`   
    conexao.query(sql, (erro, resultado) => {
        var resposta = {
            status : '',
            dados : undefined
        }
        if(erro){
            resposta.status = 'erro'
            resposta.dados = erro
            res.send(resposta)
        } else {
            resposta.status = 'ok'
            resposta.dados = resultado
            res.send(resposta)
        }
    })

})
router.delete('/clientes/:id', (req, res) => {
    var id_cliente = req.params.id
    var sql = `delete from clientes where id_cliente = ${id_cliente}`   
    conexao.query(sql, (erro, resultado) => {
        var resposta = {
            status : '',
            dados : undefined
        }
        if(erro){
            resposta.status = 'erro'
            resposta.dados = erro
            res.send(resposta)
        } else {
            resposta.status = 'ok'
            resposta.dados = resultado
            res.send(resposta)
        }
    })

})


module.exports = router;