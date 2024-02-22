const express = require('express');
const { cadastro, login, recuperarSenha, getUser } = require('./controllers/usuarioController');
const validarReqBody = require('./validarReqBody');
const schemaUsuario = require('./schemaUsuario');

const rotas = express();

rotas.get('/api/oi', (req, res) => {
    return res.status(200).json({ message: 'Ok' });
});

// rotas.post('/api/cadastro', validarReqBody(schemaUsuario),cadastro);
rotas.post('/api/cadastro', cadastro);
rotas.post('/api/login', login);
rotas.get('/api/recuperarsenha/:email', recuperarSenha);
rotas.get('/api/user/:cpf', getUser);

module.exports = rotas;