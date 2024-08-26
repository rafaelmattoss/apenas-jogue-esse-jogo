$("#menuconfig").hide()
$("#close").hide()


const mp = new MercadoPago('APP_USR-e02068c2-985b-42bc-b0e7-74f48594666b');
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


