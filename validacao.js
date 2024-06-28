$('#entrar').click(function() {
    var email = $('#email').val();
    var senha = $('#senha').val();

    if (!email || !senha) {
        $("#errorcampos").show();
        setTimeout(() => {
            $("#errorcampos").hide();;
          }, 2000);
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
            $("#errorfalha").show();
        setTimeout(() => {
            $("#errorfalha").hide();;
          }, 2000);
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
        $("#erroremail").show();
        setTimeout(() => {
            $("#erroremail").hide();;
          }, 4000);
        return;
    }

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            
            $("#sucesemail").text("Um e-mail de redefinição de senha foi enviado com sucesso para  "  + email);
            $("#sucesemail").show();
        setTimeout(() => {
            $("#sucesemail").hide();;
          }, 2000);
        })
        .catch((error) => {
            if (error.code === "auth/user-not-found") {
                $("#erroruser").show();
                setTimeout(() => {
                    $("#erroruser").hide();;
                }, 2000);
                return
            } else {
                $("#erroruser").show();
                setTimeout(() => {
                    $("#erroruser").hide();;
                }, 2000);
        
                
            }
        });
}







