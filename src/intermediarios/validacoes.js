const banco = require('../bancodedados')


const validarSenha = (req,res,next)=>{
    const {senha_banco} = req.query

    if(!senha_banco){
        return res.status(400).json({mensagem:'senha não foi informada'})
    }

    if (senha_banco !== banco.banco.senha) {
        return res.status(400).json({mensagem:'senha incorreta'})
        
    }

    next();
}

const validacaoCriarConta = (req,res,next)=>{
    const {nome,cpf,data_nascimento,telefone,email,senha} = req.body;
    
    if (!nome) {
        return res.status(400).json({mensagem:'Campo nome obrigatório'})
    }
    if (!data_nascimento) {
        return res.status(400).json({mensagem:'Campo data de nascimento obrigatório'})
    }
    if (!telefone) {
        return res.status(400).json({mensagem:'Campo telefone obrigatório'})
    }
    if (!email) {
        return res.status(400).json({mensagem:'Campo email obrigatório'})
    }
    if (!senha) {
        return res.status(400).json({mensagem:'Campo senha obrigatório'})
    }
    
    
    const validarCpf = banco.contas.find((valida)=>{
        return valida.cpf === cpf
    })
    
    if(validarCpf){
        return res.status(400).json({mensagem:'cpf invalido'})
    
    }
    
    const validarEmail = banco.contas.find((valida)=>{
        return valida.email === email
    })
    
    if(validarEmail){
        return res.status(400).json({mensagem:'email invalido'})
    
    }

    next();
}


const validarAtt = (req,res,next)=>{
    const {nome,cpf,data_nascimento,telefone,email,senha} = req.body;
    


    const idUser = banco.contas.find((user)=>{
        return user.numero_conta === Number(req.params.numeroConta)
    })

    if(!idUser){
        return res.status(404).json({mensagem:'Usuário não encontrado'})
    }
    
    if (!nome) {
        return res.status(400).json({mensagem:'Campo nome obrigatório'})
    }
    if (!data_nascimento) {
        return res.status(400).json({mensagem:'Campo data de nascimento obrigatório'})
    }
    if (!telefone) {
        return res.status(400).json({mensagem:'Campo telefone obrigatório'})
    }
    if (!email) {
        return res.status(400).json({mensagem:'Campo email obrigatório'})
    }
    if (!senha) {
        return res.status(400).json({mensagem:'Campo senha obrigatório'})
    }
    

    idUser.nome = nome
    idUser.cpf = cpf
    idUser.data_nascimento = data_nascimento
    idUser.telefone = telefone
    idUser.email = email
    idUser.senha = senha

    next();

}

const validarDelete = (req,res,next)=>{
    const idUser = banco.contas.find((user)=>{
        return user.numero_conta === Number(req.params.numeroConta)
    })

    if (!idUser) {
        return res.status(404).json({mensagem:'Usuário não encontrado'})
    }

    banco.contas = banco.contas.filter((i)=>{
        return i.numero_conta !== Number(req.params.numeroConta)
    })
    next()
}

module.exports = {
    validacaoCriarConta,
    validarSenha,
    validarAtt,
    validarDelete
}