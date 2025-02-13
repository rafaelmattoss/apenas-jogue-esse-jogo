$(document).ready(function() {
    $("#sucesemail").hide();
    $("#emailrec").hide();
    $("#confirmEmail").hide(); // Botão de confirmação escondido inicialmente

    $('#recoversenha').click(recuperarSenha);
    $("#recoveremail").click(() => {
        $("#emailrec").show(); // Exibe o campo de e-mail
        $("#confirmEmail").show(); // Exibe o botão de confirmação
    });

    $("#confirmEmail").click(alterarEmail); // Só chama alterarEmail ao clicar no botão de confirmação
});

function recuperarSenha() {
    const user = firebase.auth().currentUser;

    if (user) {
        const email = user.email;

        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                $("#sucesemail").text("Um e-mail de redefinição de senha foi enviado com sucesso para " + email);
                $("#sucesemail").show();
                setTimeout(() => {
                    $("#sucesemail").hide();
                }, 2000);
            })
            .catch((error) => {
                if (error.code === "auth/user-not-found") {
                    alert("Usuário não encontrado. Verifique o endereço de e-mail inserido.");
                } else {
                    alert("Ocorreu um erro ao enviar o e-mail de redefinição de senha. Por favor, tente novamente mais tarde.");
                    console.error("Erro ao enviar e-mail de redefinição de senha:", error);
                }
            });
    } else {
        alert("Nenhum usuário está logado.");
    }
}

function alterarEmail() {
    const user = firebase.auth().currentUser;
    const novoEmail = $("#emailrec").val().trim();
    const senhaAtual = prompt("Por favor, insira sua senha atual para confirmar:");

    if (!novoEmail) {
        alert("Por favor, insira um endereço de e-mail válido.");
        return;
    }

    if (user) {
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, senhaAtual);
        user.reauthenticateWithCredential(credential)
            .then(() => {
                return user.updateEmail(novoEmail);
            })
            .then(() => {
                return user.sendEmailVerification();
            })
            .then(() => {
                $("#sucesemail").text("Email alterado com sucesso para " + novoEmail + ". Por favor, verifique o novo endereço de email.");
                $("#sucesemail").show();
                setTimeout(() => {
                    $("#sucesemail").hide();
                }, 4000);

                // Esconde os elementos após o sucesso
                $("#emailrec").hide();
                $("#confirmEmail").hide();
            })
            .catch((error) => {
                console.error("Erro durante a atualização/verificação do email:", error);
                if (error.code === "auth/email-already-in-use") {
                    alert("Este endereço de e-mail já está em uso por outra conta.");
                } else if (error.code === "auth/requires-recent-login") {
                    alert("Por favor, faça login novamente e tente atualizar o email.");
                } else {
                    alert("Erro ao atualizar/verificar o email: " + error.message);
                }
            });
    } else {
        alert("Nenhum usuário está logado.");
    }
}
