$(document).ready(function() {
    $('#recoversenha').click(recuperarSenha);
    $("#recoveremail").click(alterarEmail)
});

function recuperarSenha() {

    const user = firebase.auth().currentUser;

    if (user) {
        const email = user.email;

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
    } else {
        alert("Nenhum usuário está logado.");
    }
}



function alterarEmail() {
    const user = firebase.auth().currentUser;
    const novoEmail = $("#emailrec").val();
    const senhaAtual = prompt("Por favor, insira sua senha atual para confirmar:");

    if (!novoEmail) {
        alert("Por favor, insira um endereço de e-mail válido.");
        return;
    }

    if (user) {
        // Reautenticar o usuário
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, senhaAtual);
        user.reauthenticateWithCredential(credential)
            .then(() => {
                console.log("Reautenticação bem-sucedida.");
                // Atualizar o email após a reautenticação
                user.updateEmail(novoEmail)
                    .then(() => {
                        console.log("Email atualizado para:", novoEmail);
                        // Enviar email de verificação para o novo email
                        return user.sendEmailVerification();
                    })
                    .then(() => {
                        alert("Email alterado com sucesso para " + novoEmail + ". Por favor, verifique o novo endereço de email.");
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
            })
            .catch((error) => {
                console.error("Erro na reautenticação:", error);
                alert("Erro na reautenticação: " + error.message);
            });
    } else {
        alert("Nenhum usuário está logado.");
    }
}


    



   


