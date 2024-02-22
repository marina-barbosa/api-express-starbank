const joi = require('joi');


const schemaUsuario = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório',
    }),

    email: joi.string().email().required().messages({
        'string.email': 'O campo email precisa ter um formato válido',
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório',
    }),

    senha: joi.string().min(4).required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha é obrigatório',
        'string.min': 'A senha precisa conter, no mínimo, 4 caracteres',
    }),
    telefone: joi.string().pattern(new RegExp('^\\+?[1-9]\\d{1,14}$')).required().messages({
        'any.required': 'O campo telefone é obrigatório',
        'string.empty': 'O campo telefone é obrigatório',
        'string.pattern.base': 'Telefone inválido. Deve seguir o formato +99999999999.',        
    }),
    // validar cep
    // validar cpf

})

module.exports = schemaUsuario