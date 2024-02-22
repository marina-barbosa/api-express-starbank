const { buscarCpf, buscarEmail, buscarTransacoes, buscarCartao } = require('../repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const knex = require('../services/conexao');

exports.cadastro = async (req, res) => {
    const { nome, cpf, telefone, endereco, email, senha } = req.body;
    try {        

        const cpfExiste = await buscarCpf(cpf);

        if (cpfExiste) return res.status(401).json({ message: 'O cpf ja esta em uso.' });

        const emailExiste = await buscarEmail(email);

        if (emailExiste) return res.status(401).json({ message: 'O email ja esta em uso.' });

        const novoUsuario = {
            nome,
            cpf,
            email,
            senha: await bcrypt.hash(senha, 10),
            telefone,
            endereco,
            usuarioavatar: 'perfil.jpg',
            saldototal: 0,
        }

        await knex('usuarios').insert(novoUsuario);

        const { id: usuario_id } = await buscarCpf(cpf);        

        await knex('transacoes').insert({
            usuario_id,
            tipo: 'entrada',
            data: new Date(),
            detalhes: 'Vazio',
            valor: 0,
        });
        
        await knex('cartao').insert({
            usuario_id,
            numero: '8632 3445 6783 4257',
            titular: nome,
            validade: '12/3000',
            cvv: '264',
            tipo: 'MasterCard'
        });       

        //return res.status(200).json(usuario_id);

        return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });

    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { cpf, senha } = req.body

    try {
        // //verificar campo vazio

        const usuario = await buscarCpf(cpf);

        if (!usuario) return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s).' });

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s).' });

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_PASS, { expiresIn: '8h' });

        return res.status(200).json({
            usuario: usuario,
            token: token
        });

    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({ message: error.message });
    }

}

exports.recuperarSenha = (req, res) => {
    let { email } = req.body;

    //Criar um link pra update
    //Enviar email
    //Nova rota de update / params ou query

}



exports.getUser = async (req, res) => {
    const { cpf } = req.params

    const { id, ...user } = await buscarCpf(cpf);
    const transacoes = await buscarTransacoes(id)
    const cartao = await buscarCartao(id)

    if (!user) {
        return res.status(401).json({ message: "CPF inválido!" })
    }

    return res.status(200).json({
        user,
        transacoes,
        cartao
    })
}