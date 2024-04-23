$(document).ready(function() {
    $("#registrar").click(function() {
        animaçãoDecarregamento(); 
        validarRegistro(); 
    });
});

// Função para validar o registro do usuário
function validarRegistro() {
    const nome = $("#nome").val();
    const email = $("#emailr").val();
    const senha = $("#senhar").val();
    const confirmarSenha = $("#confirmarSenhar").val();
    
    const usuario = {
        nome: nome,
        email: email,
        senha: senha,
        confirmarSenha: confirmarSenha
    };
    
    const erros = [];

    if (!usuario.nome) {
        erros.push("Por favor, informe seu nome completo.");
    }

    if (!usuario.email) {
        erros.push("Por favor, informe seu e-mail.");
    } else if (!isValidEmail(usuario.email)) {
        erros.push("Por favor, informe um e-mail válido.");
    }

    if (!usuario.senha) {
        erros.push("Por favor, digite sua senha.");
    } else if (usuario.senha.length < 6) {
        erros.push("A senha deve ter pelo menos 6 caracteres.");
    }

    if (!usuario.confirmarSenha) {
        erros.push("Por favor, confirme sua senha.");
    } else if (usuario.senha !== usuario.confirmarSenha) {
        erros.push("As senhas digitadas não coincidem.");
    }

    if (erros.length > 0) {
        // Se houver erros, exibe mensagens de erro e interrompe o registro
        alert(erros.join("\n"));
        return;
    }

    // Se não houver erros, tenta registrar o usuário
    registrarUsuario(usuario);
}

// Função para validar o formato de e-mail
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para registrar o usuário no Firebase Authentication e adicionar ao Firestore
function registrarUsuario(usuario) {
    const { nome, email, senha } = usuario;

    // Verifica se o e-mail já está em uso antes de criar o usuário
    firebase.auth().fetchSignInMethodsForEmail(email)
        .then((signInMethods) => {
            if (signInMethods && signInMethods.length > 0) {
                // Email já está em uso, exibe alerta ao usuário
                alert("O e-mail já está registrado. Por favor, use outro e-mail.");
            } else {
                // Email não está em uso, cria o usuário com e-mail e senha no Firebase Authentication
                return firebase.auth().createUserWithEmailAndPassword(email, senha)
                    .then((userCredential) => {
                        // Usuário criado com sucesso, adiciona informações ao Firestore
                        const user = userCredential.user;
                        const userData = {
                            uid: user.uid,
                            nome: nome,
                            email: email,
                            senha: senha
                            // Adicione outras propriedades do usuário ao objeto userData conforme necessário
                        };

                        // Adiciona os dados do usuário ao Firestore
                        return firebase.firestore().collection('usuarios').doc(user.uid).set(userData);
                    })
                    .then(() => {
                        // Registro concluído com sucesso
                        alert("Conta criada com sucesso! Faça login para acessar.");
                        window.location.href = 'index.html';
                        limparCampos(); 
                    });
            }
        })
        .catch((error) => {
            console.error("Erro ao registrar usuário:", error);
            alert("Ocorreu um erro ao criar a conta. Por favor, tente novamente.");
        });
}

function limparCampos() {
    $("#nome").val("");
    $("#emailr").val("");
    $("#senhar").val("");
    $("#confirmarSenhar").val("");
}
