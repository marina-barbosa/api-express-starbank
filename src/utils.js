function buscaUsuarioPorEmail(email) {
    return usuarios.find((usuario) => (usuario.email == email));
}

function enviaRecoveryPassword(email, novaSenha) {
    // implementação da função que vai mandar a mensagem por email
    console.log(`Nova senha do Usuário ${email}: ${novaSenha}`);
}

let validaCadastro = (usuario) => {
    let erros = [];

    /* se o nome estiver em branco */
    if (!usuario.nome) { erros.push('Nome é obrigatório') }

    /* se o cpf já existir */
    if (existeCPF(usuario.cpf)) { erros.push('Este CPF já está cadastrado') }

    /* se a senha não tiver mais de 8 caracteres ou menos que zero */
    if (!usuario.senha || usuario.senha.length < 6) { erros.push('A senha deve ter no mínimo 6 dígitos') }

    /* se a confirmação de senha não for igual a senha */
    if (usuario.senha != usuario.confirmar_senha) { erros.push('As senhas devem ser iguais') }

    /* retornando os erros caso haja algum */
    if (erros.length > 0) { return erros }
};

function buscaUsuario(usuarioBuscado) {
    for (let i in usuarios) {
        if (usuarioBuscado.email == usuarios[i].email &&
            usuarioBuscado.senha == usuarios[i].senha) {
            return usuarios[i];
        }
    }
}