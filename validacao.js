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

$("#revelarr").click(function() {
    const senha = document.getElementById("senha");
    const revelar = document.getElementById("revelar");

    if (senha.type === 'password') {
        senha.type = 'text'; // Mostra a senha
        revelar.textContent = 'visibility_off'; // Muda o ícone para "esconder"
    } else {
        senha.type = 'password'; // Esconde a senha novamente
        revelar.textContent = 'visibility'; // Muda o ícone para "mostrar"
    }
});

$("#revelar").click(function() {
    let senha = $("#senha");
    let tipo = senha.attr("type") === "password" ? "text" : "password";

    // Criando um novo input para evitar perda de estilização
    let novoInput = $("<input>")
        .attr("type", tipo)
        .attr("id", "senha")
        .attr("name", "senha")
        .attr("placeholder", "Senha")
        .attr("required", true)
        .val(senha.val()) // Mantém o valor da senha atual
        .addClass(senha.attr("class")); // Mantém a estilização original

    senha.replaceWith(novoInput); // Substitui o input antigo pelo novo
    $(this).text(tipo === "password" ? "visibility" : "visibility_off");
});

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







