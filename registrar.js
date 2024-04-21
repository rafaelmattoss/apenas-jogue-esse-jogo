// Aguarda o carregamento completo do documento HTML
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

    const erros = [];

    if (!nome) {
        erros.push("Por favor, informe seu nome completo.");
    }

    if (!email) {
        erros.push("Por favor, informe seu e-mail.");
    } else if (!isValidEmail(email)) {
        erros.push("Por favor, informe um e-mail válido.");
    }

    if (!senha) {
        erros.push("Por favor, digite sua senha.");
    } else if (senha.length < 6) {
        erros.push("A senha deve ter pelo menos 6 caracteres.");
    }

    if (!confirmarSenha) {
        erros.push("Por favor, confirme sua senha.");
    } else if (senha !== confirmarSenha) {
        erros.push("As senhas digitadas não coincidem.");
    }

    if (erros.length > 0) {
        // Se houver erros, exibe mensagens de erro e interrompe o registro
        alert(erros.join("\n"));
        return;
    }

    // Se não houver erros, tenta registrar o usuário
    registrarUsuario(email, senha);
}

// Função para validar o formato de e-mail
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para registrar o usuário no Firebase Authentication
function registrarUsuario(email, senha) {
    // Verifica se o e-mail já está em uso antes de criar o usuário
    firebase.auth().fetchSignInMethodsForEmail(email)
        .then((signInMethods) => {
            if (signInMethods && signInMethods.length > 0) {
                // Email já está em uso, exibe alerta ao usuário
                alert("O e-mail já está registrado. Por favor, use outro e-mail.");
            } else {
                // Email não está em uso, cria o usuário com e-mail e senha
                return firebase.auth().createUserWithEmailAndPassword(email, senha);
            }
        })
        .then((userCredential) => {
            if (userCredential) {
                const user = userCredential.user;
                alert("Conta criada com sucesso! Faça login para acessar.");
                window.location.href = 'index.html';
                limparCampos(); 
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
