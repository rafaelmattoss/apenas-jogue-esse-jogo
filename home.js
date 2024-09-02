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


function verificarPremiumERedirecionar(pagina) {
    const user = firebase.auth().currentUser;

    if (user) {
        const userId = user.uid;
        firebase.firestore().collection('usuarios').doc(userId).get().then((userDoc) => {
            if (userDoc.exists && userDoc.data().premium) {
                window.location.href = pagina;
            } else {
                $("#torne").show();
            }
        }).catch((error) => {
            console.error("Erro ao verificar status premium: ", error);
            alert("Ocorreu um erro ao verificar seu status. Por favor, tente novamente.");
        });
    } else {
        alert("Por favor, faça login primeiro.");
    }
}

$("#classico").click(function() {
    window.location.href = 'jogo.html'; // O modo clássico está acessível para todos os usuários
});

$("#familia").click(function() {
    verificarPremiumERedirecionar('familia.html');
});

$("#amigo").click(function() {
    verificarPremiumERedirecionar('amigos.html');
});

$("#date").click(function() {
    verificarPremiumERedirecionar('date.html');
});

$("#namoro").click(function() {
    verificarPremiumERedirecionar('namoro.html');
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

$("#fechartorne").click(() => {
    $("#torne").fadeOut(300);
    

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
    const user = firebase.auth().currentUser;
    if (!user) {
        console.error('Usuário não autenticado');
        alert('Você precisa estar autenticado para realizar essa ação.');
        return;
    }

    const userId = user.uid;

    fetch('https://us-central1-apenas-jogue-esse-jogo.cloudfunctions.net/createCheckoutSession', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
    .then(response => {
        if (!response.ok) {
            console.error('Resposta da rede não foi ok:', response);
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos do backend:', data);
        const stripe = Stripe('pk_live_51PjN8Z086aDpYuyzVT7w6smVTTlZa0jT219xzUNwxxOf52uHbYJhEUKetPwBrcu9Qh2JXrOtgaPNrT5Cc2MPctny00XElaXj4A');
        return stripe.redirectToCheckout({ sessionId: data.sessionId });
    })
    .then(result => {
        if (result.error) {
            console.error('Erro ao redirecionar para o checkout:', result.error.message);
            alert(result.error.message);
        }
    })
    .catch(error => {
        console.error('Erro ao criar a sessão de checkout:', error);
        alert('Erro ao criar a sessão de checkout. Verifique o console para detalhes.');
    });
});




