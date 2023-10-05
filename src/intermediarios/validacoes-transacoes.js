const banco = require('../bancodedados')


const validarDeposito = (req,res,next)=>{
    const {numero_conta,valor} = req.body

    const idUser = banco.contas.find((user)=>{
        return user.numero_conta === Number(numero_conta)
    })

    if(!idUser){
        return res.status(404).json({mensagem:'Usuário não encontrado'})
    }

    if (!numero_conta) {
        return res.status(400).json({mensagem:"O número da conta e o valor são obrigatórios!"})
    }

    if(!valor){
        return res.status(400).json({mensagem:"O número da conta e o valor são obrigatórios!"})
    }

    
    next();
}
const validarSaque = (req,res,next)=>{
    const {numero_conta,valor,senha} = req.body

    const idUser = banco.contas.find((user)=>{
        return user.numero_conta === Number(numero_conta)
    })

    if(!idUser){
        return res.status(404).json({mensagem:'Usuário não encontrado'})
    }


    if(!valor){
        return res.status(400).json({mensagem:'saldo inválido'})
    }

    if (valor > idUser.saldo) {
        return res.status(400).json({mensagem:'saldo insuficiente'})
    }

    if (senha !== idUser.senha) {
        return res.status(400).json({mensagem:'senha incorreta'})
    }

    idUser.saldo -= valor;
    next();
}

const validarTransferencia = (req,res,next)=>{
    const { numero_conta_origem,numero_conta_destino,valor,senha } = req.body

    const idUser = banco.contas.find((user)=>{
        return user.numero_conta === Number(numero_conta_origem)
    })
    const idUserDestino = banco.contas.find((user)=>{
        return user.numero_conta === Number(numero_conta_destino)
    })

    if(!idUser){
        return res.status(404).json({mensagem:'Usuário não encontrado'})
    }

    if(!idUserDestino){
        return res.status(404).json({mensagem:'Usuário não encontrado'})
    }


    if(!valor){
        return res.status(400).json({mensagem:'saldo inválido'})
    }

    if (valor > idUser.saldo) {
        return res.status(400).json({mensagem:'saldo insuficiente'})
    }

    if (senha !== idUser.senha) {
        return res.status(400).json({mensagem:'senha incorreta'})
    }

    idUser.saldo -= valor;
    
    idUserDestino.saldo += valor

    next();
}
const validarSaldo = (req,res,next)=>{
    const { numero_conta, senha } = req.query


    const idUser = banco.contas.find((user)=>{
        return user.numero_conta === Number(numero_conta)
    })

    if(!idUser){
        return res.status(404).json({mensagem:'Usuário não encontrado'})
    }

    if(!senha){
        return res.status(400).json({mensagem:'senha não foi informada'})
    }

    if (senha !== idUser.senha) {
        return res.status(400).json({mensagem:'senha incorreta'})
        
    }

    next();

}

const validarExtrato = (req,res,next)=>{
    const { numero_conta, senha } = req.query


    const idUser = banco.contas.find((user)=>{
        return user.numero_conta === Number(numero_conta)
    })

    if(!idUser){
        return res.status(404).json({mensagem:'Usuário não encontrado'})
    }

    if(!senha){
        return res.status(400).json({mensagem:'senha não foi informada'})
    }

    if (senha !== idUser.senha) {
        return res.status(400).json({mensagem:'senha incorreta'})
        
    }

    next();
}


module.exports ={
    validarDeposito,
    validarSaque,
    validarTransferencia,
    validarSaldo,
    validarExtrato

}