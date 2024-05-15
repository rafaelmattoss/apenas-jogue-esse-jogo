$('#entrar').click(function() {
    var email = $('#email').val();
    var senha = $('#senha').val();

    if (!email || !senha) {
        alert("Todos os campos devem ser preenchidos.");
        return;
    } else {
        // Chama a função login com os dados fornecidos
        login(email, senha);
    }
});

function login(email, senha) {
    animaçãoDecarregamento(); // Mostra a animação de carregamento

    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location.href = 'jogo.html';
        })
        .catch((error) => {
            console.error("Erro durante o login:", error);
            alert("Falha ao realizar login. Verifique suas credenciais.");
        })
        .finally(() => {
            $(".c-loader").hide(); // Oculta a animação de carregamento após a tentativa de login
        });

}

var botaoRecuperar = $("#recover");
botaoRecuperar.click(recuperarSenha);


function recuperarSenha() {
    var email = $('#email').val(); 

    if (!email) {
        alert("Por favor, insira seu endereço de e-mail.");
        return;
    }

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Um e-mail de redefinição de senha foi enviado com sucesso para " + email);
        })
        .catch((error) => {
            if (error.code === "auth/user-not-found") {
                alert("Usuário não encontrado. Verifique o endereço de e-mail inserido.");
            } else {
                alert("Ocorreu um erro ao enviar o e-mail de redefinição de senha. Por favor, tente novamente mais tarde.");
                console.error("Erro ao enviar e-mail de redefinição de senha:", error);
            }
        });
}







