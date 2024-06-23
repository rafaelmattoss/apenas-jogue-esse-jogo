
$(document).ready(function() {
    // Oculta todas as divs com a classe 'familia'
    $(".familia").hide();

    // Manipulação do clique no botão "Rode o Dado"
    $('#dado').click(function() {
        // Adiciona a classe de animação ao botão
        $(this).addClass('spin-animation');

        // Remove a classe de animação após 1 segundo (1000 milissegundos)
        setTimeout(() => {
            $(this).removeClass('spin-animation');
        }, 1000);

        // Oculta todas as divs com a classe 'familia' novamente
        $(".familia").hide();

        // Seleciona todas as divs com a classe 'familia' que não estão visíveis
        var $cartas = $('.familia:not(:visible)');
        
        // Verifica se há alguma div disponível para mostrar
        if ($cartas.length > 0) {
            // Gera um número aleatório para selecionar uma div
            var randomCarta = Math.floor(Math.random() * $cartas.length);
            // Exibe a div selecionada aleatoriamente
            $cartas.eq(randomCarta).fadeIn(1000);
        } else {
            console.log("Todas as cartas já foram exibidas!");
        }
    });
});
