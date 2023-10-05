const express = require('express');
const rotas = express()
const { listarContasBancarias, criarContas, attConta, deleteConta } = require('./controladores/controladores');
const { validacaoCriarConta, validarSenha, validarAtt, validarDelete } = require('./intermediarios/validacoes');
const { depositar, sacar, transferir, saldo, extrato } = require('./controladores/transacoes');
const { validarDeposito, validarSaque, validarTransferencia, validarSaldo, validarExtrato } = require('./intermediarios/validacoes-transacoes');


rotas.get('/contas',validarSenha,listarContasBancarias);
rotas.post('/contas',validacaoCriarConta,criarContas);
rotas.put('/contas/:numeroConta/usuario',validarAtt, attConta);
rotas.delete('/contas/:numeroConta',validarDelete,deleteConta);

rotas.post('/transacoes/depositar',validarDeposito,depositar)
rotas.post('/transacoes/sacar',validarSaque,sacar)
rotas.post('/transacoes/transferir',validarTransferencia,transferir)
rotas.get('/contas/saldo',validarSaldo,saldo)
rotas.get('/contas/extrato',validarExtrato,extrato)




module.exports = rotas;