$(document).ready(function() {
    // Esconde elementos ao carregar a página
    $("#normal").hide();
    $('.cartaint, .cartacon, .desafio, .cartarel').hide();
    $('#video-background').hide();

    // Comportamento padrão ao clicar no dado
    $('#dado').click(function() {
        $(this).addClass('spin-animation'); // Adiciona animação ao dado

        setTimeout(() => {
            $(this).removeClass('spin-animation');
        }, 1000);

        // Oculta todas as cartas ao clicar no dado
        $('.cartaint, .cartacon, .desafio, .cartarel').hide();

        // Gera número aleatório entre 0 e 99
        var randomPercent = Math.floor(Math.random() * 100);

        if (randomPercent < 3) {
            var $desafios = $('.desafio:not(:visible)');
            if ($desafios.length > 0) {
                var randomDesafio = Math.floor(Math.random() * $desafios.length);
                $desafios.eq(randomDesafio).fadeIn(1000);
            }
        } else {
            var $cartas = $('.cartaint, .cartacon:not(:visible)');
            if ($cartas.length > 0) {
                var randomCarta = Math.floor(Math.random() * $cartas.length);
                $cartas.eq(randomCarta).fadeIn(1000);
            }
        }
    });

    // Comportamento ao clicar no botão relacon
    $('#relacon').click(function() {
        $('.cartaint, .cartacon, .desafio, .cartarel').hide();
        $('#normal').show();
        $('#relacon').hide();
        $('#video-background').fadeIn();
        $('body').css('background-image', 'none');

        // Define comportamento do dado para cartas "relacon"
        $('#dado').click(()=>{
            $('.cartaint, .cartacon, .desafio, .cartarel').hide();

            var $cartasRelacion = $('.cartarel:not(:visible)');
            if ($cartasRelacion.length > 0) {
                var randomRelacion = Math.floor(Math.random() * $cartasRelacion.length);
                $cartasRelacion.eq(randomRelacion).fadeIn(1000);
            }
        })
    });

    // Comportamento ao clicar no botão normal
    $('#normal').click(function() {
        $('.cartaint, .cartacon, .desafio, .cartarel').hide();
        $('#relacon').show();
        $('#normal').hide();
        $('#video-background').hide();
        $('body').css('background-image', 'url("316dd73e47443990d0a853ce705af602.jpg")');

        // Define comportamento do dado para cartas normais
        $('#dado').click(()=>{
            $('.cartaint, .cartacon, .desafio, .cartarel').hide();

            var randomPercent = Math.floor(Math.random() * 100);

            if (randomPercent < 3) {
                var $desafios = $('.desafio:not(:visible)');
                if ($desafios.length > 0) {
                    var randomDesafio = Math.floor(Math.random() * $desafios.length);
                    $desafios.eq(randomDesafio).fadeIn(1000);
                }
            } else {
                var $cartas = $('.cartaint, .cartacon:not(:visible)');
                if ($cartas.length > 0) {
                    var randomCarta = Math.floor(Math.random() * $cartas.length);
                    $cartas.eq(randomCarta).fadeIn(1000);
                }
            }
        })
    });
});
