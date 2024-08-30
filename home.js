$("#menuconfig").hide()
$("#close").hide()


const mp = new MercadoPago('APP_USR-7001294782620310-082600-54fb00e6fb8d453a425d9df86a2a2f17-287444255');
const bricksBuilder = mp.bricks();


$("#configuracoes").click(()=>{
    $("#configuracoes").hide()
    $("#close").show()
    $("#menuconfig").toggle()
    $("#alertcurios").fadeOut(300);

})

$("#close").click(()=>{
    $("#configuracoes").show()
    $("#close").hide()
    $("#menuconfig").toggle()
})
$("#classico").click(function() {
    window.location.href = 'jogo.html';
});

$("#familia").click(function() {
    window.location.href = 'familia.html';
});

$("#date").click(function() {
    window.location.href = 'date.html';
});

$("#namoro").click(function() {
    window.location.href = 'namoro.html';
});

$("#suaconta").click(() => {
    window.location.href = 'perfil.html';
});

$("#regras").click(() => {
    window.location.href = 'regras.html';
});

$("#confi").click(() => {
    window.location.href = 'confi.html';
});

$("#curiosidade").click(() => {
    $("#alertcurios").fadeIn(300);
});

$("#fecharalert").click(() => {
    $("#alertcurios").fadeOut(300)
});

$("#logout").click(logOut)


function logOut() {
    firebase.auth().signOut()
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            alert('Erro ao fazer logout. Por favor, tente novamente.');
        });
}

$("#premium-button").click(() => {
    fetch('/create_preference', { // URL da função Firebase que cria a preferência de pagamento
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'cliente@exemplo.com' // Substitua pelo email do pagador, se necessário
        })
    })
    .then(response => response.json())
    .then(data => {
        // Inicializa o checkout do Mercado Pago com o ID da preferência
        bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: data.id // Use o preferenceId retornado pelo backend
            },
            customization: {
                texts: {
                    valueProp: 'smart_option',
                },
            },
        }).then(function (brick) {
            brick.show();
        }).catch(function (error) {
            console.error('Erro ao inicializar o checkout:', error);
        });
    })
    .catch(error => console.error('Erro ao criar preferência:', error));
});


