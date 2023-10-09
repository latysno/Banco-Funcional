const rotas = require('express').Router();
const rotasConta = require('./contasRoutes')
const rotasTransacoes = require('./transacoesRoutes')


rotas.use(rotasConta)
rotas.use(rotasTransacoes)

module.exports = rotas;