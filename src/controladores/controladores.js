const banco = require('../bancodedados')

const listarContasBancarias = (req,res)=>{
    return res.status(200).json(banco.contas)
}

const criarContas = (req,res)=>{
    const numero_conta = banco.contas.length+1
    const saldo = 0
    const {nome,cpf,data_nascimento,telefone,email,senha} = req.body;

    
    const novaConta = {
        numero_conta,
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha,
        saldo
    };

    
    banco.contas.push(novaConta);

    return res.status(201).json(novaConta)


}

const attConta = (req,res)=>{

    return res.status(204).json({mensagem:'Usuário atualizado'})
}

const deleteConta = (req,res)=>{
    
    return res.status(204).json()

}

module.exports = {
    listarContasBancarias,
    criarContas,
    attConta,
    deleteConta
}