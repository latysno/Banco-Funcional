const express = require('express');
const rotasConta = express();
const { validarSenha, validacaoCriarConta, validarAtt, validarDelete } = require('../intermediarios/validacoes');
const { listarContasBancarias, criarContas, attConta, deleteConta } = require('../controladores/controladores');

rotasConta.get('/contas',validarSenha,listarContasBancarias);
rotasConta.post('/contas',validacaoCriarConta,criarContas);
rotasConta.put('/contas/:numeroConta/usuario',validarAtt, attConta);
rotasConta.delete('/contas/:numeroConta',validarDelete,deleteConta);

module.exports = rotasConta;