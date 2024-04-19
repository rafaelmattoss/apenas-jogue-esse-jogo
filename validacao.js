$('#entrar').click(function() {
    
    var email = $('#email').val();
    var senha = $('#senha').val();


    if (!email && !senha) {
        alert("Todos os campos devem ser preenchidos.");
    } else if (!email) {
        alert("O campo de E-mail é obrigatório.");
    } else if (!senha) {
        alert("O campo de Senha é obrigatório.");
    } else {
        window.location.href = 'jogo.html';
    }
});

const form ={
    email: document.querySelector('#email'),
}


            
               

    
    
    
