$(document).ready(function() {
    // Esconde todas as cartas no início
    $('.cartaint').hide();
    $('.cartacon').hide();

    // Função para mostrar uma carta aleatória quando o botão for clicado
    $('#dado').click(function() {
        // Esconde todas as cartas antes de mostrar uma aleatória
        $('.cartaint').hide();
        $('.cartacon').hide();

        // Gera um número aleatório entre 0 e o número total de cartas de cada tipo
        var randomIntimidade = Math.floor(Math.random() * $('.cartaint').length);
        var randomConhecer = Math.floor(Math.random() * $('.cartacon').length);

        // Gera um número aleatório para decidir qual tipo de carta será mostrada
        var randomType = Math.random();

        // Verifica qual tipo de carta será mostrada e exibe apenas ela
        if (randomType < 0.5) {
            $('.cartaint').eq(randomIntimidade).show();
        } else {
            $('.cartacon').eq(randomConhecer).show();
        }
    });
});
