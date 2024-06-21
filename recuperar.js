$(document).ready(function() {
    $('#recoversenha').click(recuperarSenha);
    $("#recoveremail").click(alteraremail)
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



function alteraremail() {
    const user = firebase.auth().currentUser;
    const novoemail = $("#emailrec").val();

    if (!novoemail) {
        alert("Por favor, insira um endereço de e-mail válido.");
        return;
    }

    if (novoemail) {
        user.updateEmail(novoemail)
            .then(() => {
                alert("Email alterado com sucesso para " + novoemail);
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    alert("Este endereço de e-mail já está em uso por outra conta.");
                } else if (error.code === "auth/requires-recent-login") {
                    alert("Por favor, verifique o novo endereço de e-mail antes de alterá-lo.");
                } else {
                    alert("Erro ao atualizar o email: " + error.message);
                }
                console.error("Erro ao atualizar email:", error);
            });
    } else {
        alert("Nenhum usuário está logado.");
    }
}
    



   


