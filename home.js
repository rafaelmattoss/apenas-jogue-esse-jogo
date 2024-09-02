$("#menuconfig").hide();
$("#close").hide();

$("#configuracoes").click(()=>{
    $("#configuracoes").hide();
    $("#close").show();
    $("#menuconfig").toggle();
    $("#alertcurios").fadeOut(300);
});

$("#close").click(()=>{
    $("#configuracoes").show();
    $("#close").hide();
    $("#menuconfig").toggle();
});

$("#classico").click(function() {
    window.location.href = 'jogo.html';
});

$("#familia").click(function() {
    window.location.href = 'familia.html';
});

$("#amigo").click(function() {
    window.location.href = 'amigos.html';
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
    $("#alertcurios").fadeOut(300);
});

$("#logout").click(logOut);

function logOut() {
    firebase.auth().signOut()
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            alert('Erro ao fazer logout. Por favor, tente novamente.');
        });
}

// Integração com o Stripe para o botão "Torne-se Premium"

$("#premium-button").click(() => {
    const userId = firebase.auth().currentUser.uid;

    fetch('https://us-central1-apenas-jogue-esse-jogo.cloudfunctions.net/createCheckoutSession', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
    .then(response => response.json())
    .then(data => {
        const stripe = Stripe('pk_live_51PjN8Z086aDpYuyzVT7w6smVTTlZa0jT219xzUNwxxOf52uHbYJhEUKetPwBrcu9Qh2JXrOtgaPNrT5Cc2MPctny00XElaXj4A'); // Substitua pela sua chave pública do Stripe
        return stripe.redirectToCheckout({ sessionId: data.sessionId });
    
    })
    .then(result => {
        if (result.error) {
            alert(result.error.message);
        }
    })
    .catch(error => console.error('Erro ao criar a sessão de checkout:', error));
});

