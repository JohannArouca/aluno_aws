var express = require('express');
var router = express.Router();
var conexao = require('../bin/database');

router.get('/', function(req, res) {
  const sql = 'select * from aluno';
  
  conexao.query(sql, (erro, resultado) => {
    var resposta = {
      status: '',
      dados: []
    }

    if(erro){
        resposta.status = 'erro';
        resposta.dados = erro

      res.send(resposta);
    } else {
        resposta.status = 'ok';
        resposta.dados = resultado

      res.send(resposta);
    }
  });

});

router.get('/:idaluno', function(req, res) {
  const sql = 'select * from aluno where idaluno = ' + req.params.idaluno;

  conexao.query(sql, (erro, resultado) => {
    let resposta = {
      status: '',
      dados: []
    }

    if(erro){
        resposta.status = 'erro';
        resposta.dados = erro

      res.send(resposta);
    } else {
        resposta.status = 'ok';
        resposta.dados = resultado

      res.send(resposta);
    }
  });
});

//Create aluno
router.post('/aluno', function(req, res) {
  var nome = req.body.nome
  var email = req.body.email
  var telefone = req.body.telefone
  var turma_idturma = req.body.turma_idturma

  var sql = `insert into aluno(nome, email, telefone, turma_idturma) values("${nome}", "${email}", "${telefone}", "${turma_idturma}")`
  
  conexao.query(sql, (erro, resultado) => {
    var resposta = {
      status: '',
      dados: undefined
    }

    if(erro){
      resposta.status = 'erro';
      resposta.dados = erro

      res.send(erro);
    } else {
        resposta.status = 'ok';
        resposta.dados = resultado;

      res.send(resposta);
    }
  });
});

//Update aluno
router.patch('/aluno/:idaluno', function(req, res) {
    var idaluno = req.params.idaluno
    var nome = req.body.nome
    var email = req.body.email
    var telefone = req.body.telefone
    var turma_idturma = req.body.turma_idturma
  
    var sql = `update aluno set nome = "${nome}", email = "${email}", telefone = "${telefone}", turma_idturma = "${turma_idturma}"  where idaluno = ${idaluno}`
    
    conexao.query(sql, (erro, resultado) => {
      var resposta = {
        status: '',
        dados: undefined
      }
  
      if(erro){
        resposta.status = 'erro';
        resposta.dados = erro
  
        res.send(resposta);
      } else {
        resposta.status = 'ok';
        resposta.dados = resultado;
  
        res.send(resposta);
      }
    });
  });

//Delete aluno
router.delete('/aluno/:idaluno', function(req, res) {
    var idaluno = req.params.idaluno
  
    var sql = `delete from turma where idaluno = ${idaluno}`
    
    conexao.query(sql, (erro, resultado) => {
      var resposta = {
        status: '',
        dados: undefined
      }
  
      if(erro){
        resposta.status = 'erro';
        resposta.dados = erro
  
        res.send(resposta);
      } else {
        resposta.status = 'ok';
        resposta.dados = resultado;
  
        res.send(resposta);
      }
    });
  });

module.exports = router;
