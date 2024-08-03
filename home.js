$("#menuconfig").hide()
$("#close").hide()

$("#configuracoes").click(()=>{
    $("#configuracoes").hide()
    $("#close").show()
    $("#menuconfig").toggle()
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
    $("#alertcurios").show()
});

$("#fecharalert").click(() => {
    $("#alertcurios").hide()
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


