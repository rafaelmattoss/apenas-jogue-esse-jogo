
$(document).ready(function() {

    // Oculta todas as divs com a classe 'familia'
    $(".familia").hide();
    $("#fechar").hide();
    $("#normal").hide();
    

    // Manipulação do clique no botão "Rode o Dado"
    $('#dado').click(function() {
        $("#inst").hide()

        $(this).addClass('spin-animation');

        setTimeout(() => {
            $(this).removeClass('spin-animation');
        }, 1000);

    
        $(".familia").hide();

        var $cartas = $('.familia:not(:visible)');
        
        // Verifica se há alguma div disponível para mostrar
        if ($cartas.length > 0) {
            
            var randomCarta = Math.floor(Math.random() * $cartas.length);
            
            $cartas.eq(randomCarta).fadeIn(1000);
        } else {
            console.log("Todas as cartas já foram exibidas!");
        }
    });
});

$('#config').click(function() {
    $('#config').hide()
    $("#fechar").show()
    $('#menuconfig').show(); // Alterna a visibilidade do menuconfig
})

$('#fechar').click(function() {
    $('#config').show()
    $("#fechar").hide()
    $('#menuconfig').hide(); // Alterna a visibilidade do menuconfig
})





$("#regras").click(() => {
    window.location.href = 'regras.html';
});


$("#sair").click(() => {
    window.location.href = 'home.html';
});