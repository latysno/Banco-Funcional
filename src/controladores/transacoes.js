const banco = require('../bancodedados');
const { format } = require('date-fns')

const formatarData = format(new Date(),"yyyy-MM-dd HH:mm:ss")

const depositar = (req,res)=>{
    // const {numeroConta,valor} = req.body
    const {numero_conta,valor} = req.body

    
    const idUser = banco.contas.find((user)=>{
        return user.numero_conta === Number(numero_conta)
    })

    banco.depositos.push({
        data:formatarData,
        numero_conta,
        valor:valor
    })

    idUser.saldo += valor;

    return res.status(201).json({
        data:formatarData,
        numero_conta,
        valor:valor
    })
}

const sacar = (req,res)=>{
    const {numero_conta,valor} = req.body

    banco.saques.push({
        data:formatarData,
        numero_conta,
        valor:valor
    })
    
    return res.status(201).json({
    data:formatarData,
    numero_conta,
    valor:valor
})
}

const transferir = (req,res)=>{
    const { numero_conta_origem,numero_conta_destino,valor,senha } = req.body
    

    banco.transferencias.push({
        data:formatarData,
        numero_conta_origem,
        numero_conta_destino,
        valor:valor
    });



    return res.status(200).json({
        data:formatarData,
        numero_conta_origem,
        numero_conta_destino,
        valor:valor
    })

}

const saldo = (req,res)=>{
    const { numero_conta, senha } = req.query
    

    const idUser = banco.contas.find((user)=>{
        return user.numero_conta === Number(numero_conta)
    })

    return res.status(200).json({saldo:idUser.saldo})

}

const extrato = (req,res)=>{
    const { numero_conta } = req.query
    console.log(banco.depositos[0].numero_conta);
    const depositos = banco.depositos.filter((i)=>{
        return i.numero_conta === numero_conta
    })
    
    const saques = banco.saques.filter((i)=>{
        return i.numero_conta === numero_conta
    })
    const transferenciasEnviadas = banco.transferencias.filter((i)=>{
        return i.numero_conta_origem === numero_conta
    })
    const transferenciasRecebidas = banco.transferencias.filter((i)=>{
        return i.numero_conta_destino === numero_conta
    })

    console.log(depositos);
    const extratos = {
       depositos,
       saques,
       transferenciasEnviadas,
       transferenciasRecebidas
    }

    return res.status(200).json(extratos)
}




module.exports = {
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}