$(document).ready(function() {
    $("#fechar").hide();
    // Oculta todas as cartas no início
    $("#normal").hide();
    $('.cartaint').hide();

    let exibidas = []; // Array para rastrear as cartas já exibidas

    // Manipulação do clique no dado
    $('#dado').click(function() {
        // Adiciona a classe de animação ao dado
        $("#inst").hide()
        $(this).addClass('spin-animation');

        // Remove a classe de animação após 1 segundo (1000 milissegundos)
        setTimeout(() => {
            $(this).removeClass('spin-animation');
        }, 1000);

        // Oculta todas as cartas ao clicar no dado
        $('.cartaint').hide();

        // Seleciona todas as cartas "cartaint" não exibidas
        var $cartas = $('.cartaint:not(:visible)').filter(function() {
            return !exibidas.includes($(this).text());
        });

        // Reinicia a lista de exibidas se todas as cartas já foram mostradas
        if ($cartas.length === 0) {
            exibidas = [];
            $cartas = $('.cartaint:not(:visible)');
        }

        if ($cartas.length > 0) {
            var randomCarta = Math.floor(Math.random() * $cartas.length);
            var $cartaSelecionada = $cartas.eq(randomCarta);
            $cartaSelecionada.fadeIn(1800); // Exibe uma carta aleatória

            // Adiciona o texto da carta exibida ao array de exibidas
            exibidas.push($cartaSelecionada.text());
        }
    });

 
    
    $('#config').click(function() {
        $('#config').hide();
        $("#fechar").show();
        $('#menuconfig').show();
    });

    $('#fechar').click(function() {
        $('#config').show();
        $("#fechar").hide();
        $('#menuconfig').hide();
    });

    $("#regras").click(() => {
        window.location.href = 'regras.html';
    });

    $("#sair").click(() => {
        window.location.href = 'home.html';
    });

    $("#revelar").click(function() {
        const passwordField = $("#senhar");
        const confirmPasswordField = $("#confirmarSenhar");

        if (passwordField.attr('type') === 'password') {
            passwordField.attr('type', 'text');
            confirmPasswordField.attr('type', 'text');
            $(this).text('visibility_off');
        } else {
            passwordField.attr('type', 'password');
            confirmPasswordField.attr('type', 'password');
            $(this).text('visibility');
        }
    });
});



