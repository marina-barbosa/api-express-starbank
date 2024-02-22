const knex = require('./services/conexao');


exports.buscarCpf = async (cpf) => {
    return await knex('usuarios').where('cpf', cpf).first();
}

exports.buscarEmail = async (email) => {
    return await knex('usuarios').where('email', email).first();
}

exports.buscarTransacoes = async (usuarioId) => {
    return await knex.select('id', 'usuario_id', 'tipo', 'data', 'detalhes', 'valor').from('transacoes').where('usuario_id', usuarioId);
}

exports.buscarCartao = async (usuarioId) => {
    return await knex.select('id','numero', 'titular', 'validade', 'cvv', 'tipo').from('cartao').where('usuario_id', usuarioId);
}