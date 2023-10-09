const { depositar, sacar, transferir, saldo, extrato } = require('../controladores/transacoes');
const { validarDeposito, validarSaque, validarTransferencia, validarSaldo, validarExtrato } = require('../intermediarios/validacoes-transacoes');

const rotasTransacoes = require('express').Router();

rotasTransacoes.post('/transacoes/depositar',validarDeposito,depositar)
rotasTransacoes.post('/transacoes/sacar',validarSaque,sacar)
rotasTransacoes.post('/transacoes/transferir',validarTransferencia,transferir)
rotasTransacoes.get('/contas/saldo',validarSaldo,saldo)
rotasTransacoes.get('/contas/extrato',validarExtrato,extrato)

module.exports = rotasTransacoes