$(document).ready(function() {
    $("#fechar").hide();
    // Oculta todas as cartas no início
    $("#normal").hide();
    $('.cartaint, .cartacon, .desafio, .cartarel').hide();

let exibidas = [];

// Manipulação do clique no dado
$('#dado').click(function() {
    // Adiciona a classe de animação ao dado
    $(this).addClass('spin-animation');

    // Remove a classe de animação após 1 segundo (1000 milissegundos)
    setTimeout(() => {
        $(this).removeClass('spin-animation');
    }, 1000);

    // Oculta todas as cartas ao clicar no dado
    $('.cartaint, .cartacon, .desafio, .cartarel').hide();

    // Gera um número aleatório entre 0 e 99
    var randomPercent = Math.floor(Math.random() * 100);

    // Verifica se o número está dentro dos 3% desejados para exibir um desafio
    if (randomPercent < 3) {
        var $desafios = $('.desafio:not(:visible)');
        if ($desafios.length > 0) {
            var randomDesafio = Math.floor(Math.random() * $desafios.length);
            $desafios.eq(randomDesafio).fadeIn(1000); // Exibe um desafio aleatório
        }
    } else {
        // Seleciona todas as cartas visíveis exceto as que já foram exibidas
        var $cartas = $('.cartaint:not(:visible), .cartacon:not(:visible)').filter(function() {
            return !exibidas.includes($(this).text());
        });

        // Reinicia a lista de exibidas se todas as cartas já foram mostradas
        if ($cartas.length === 0) {
            exibidas = [];
            $cartas = $('.cartaint:not(:visible), .cartacon:not(:visible)');
        }

        if ($cartas.length > 0) {
            var randomCarta = Math.floor(Math.random() * $cartas.length);
            var $cartaSelecionada = $cartas.eq(randomCarta);
            $cartaSelecionada.fadeIn(1000); // Exibe uma carta aleatória

            // Adiciona o texto da carta exibida ao array de exibidas
            exibidas.push($cartaSelecionada.text());
        }
    }
});

        
    });

    // Manipulação do clique no botão relacon
    $('#relacon').click(function() {
        $("body").addClass("novo-papel-de-parede")
        $("#normal").show();
        $("#relacon").hide();
    

        // Oculta todas as cartas ao clicar no botão
        $('.cartaint, .cartacon, .desafio, .cartarel').hide();

        $("#dado").click(()=>{

            $('.cartaint, .cartacon, .desafio, .cartarel').hide();

            // Exibe uma carta "relacon" aleatória
            var $cartasRelacion = $('.cartarel:not(:visible)');
            if ($cartasRelacion.length > 0) {
                var randomRelacion = Math.floor(Math.random() * $cartasRelacion.length);
                $cartasRelacion.eq(randomRelacion).fadeIn(1000);
            }
        })


       
    });




$("#normal").click(()=>{
    $("body").removeClass("novo-papel-de-parede")
    $('#relacon').show();
    $("#normal").hide();
    $('.cartaint, .cartacon, .desafio, .cartarel').hide();

    // Manipulação do clique no dado
    $('#dado').click(function() {
        // Adiciona a classe de animação ao dado
        $(this).addClass('spin-animation');

        // Remove a classe de animação após 1 segundo (1000 milissegundos)
        setTimeout(() => {
            $(this).removeClass('spin-animation');
        }, 1000);

        // Oculta todas as cartas ao clicar no dado
        $('.cartaint, .cartacon, .desafio, .cartarel').hide();

        // Gera um número aleatório entre 0 e 99
        var randomPercent = Math.floor(Math.random() * 100);

        // Verifica se o número está dentro dos 3% desejados para exibir um desafio
        if (randomPercent < 3) {
            var $desafios = $('.desafio:not(:visible)');
            if ($desafios.length > 0) {
                var randomDesafio = Math.floor(Math.random() * $desafios.length);
                $desafios.eq(randomDesafio).fadeIn(1000); // Exibe um desafio aleatório
            }
        } else {
            var $cartas = $('.cartaint, .cartacon:not(:visible)');
            if ($cartas.length > 0) {
                var randomCarta = Math.floor(Math.random() * $cartas.length);
                $cartas.eq(randomCarta).fadeIn(1000); // Exibe uma carta aleatória
            }
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



