$(document).ready(function() {
    
    $('.cartaint').hide();
    $('.cartacon').hide();
    $('.desafio').hide(); // Oculta os desafios inicialmente
    
    $('#dado').click(function() {
        
        $('#dado').addClass('spin-animation');

        setTimeout(function(){
            $('#dado').removeClass('spin-animation');
        }, 1000);

        $('.cartaint').hide();
        $('.cartacon').hide();
        $('.desafio').hide(); // Oculta todos os desafios ao clicar no botão

        // Gera um número aleatório entre 0 e 99
        var randomPercent = Math.floor(Math.random() * 100);

        // Verifica se o número está dentro dos 10% desejados para exibir um desafio
        if (randomPercent < 3) {
            var randomDesafio = Math.floor(Math.random() * $('.desafio').length);
            $('.desafio').eq(randomDesafio).fadeIn(1000); // Exibe um desafio aleatório
        } else {
            var randomIntimidade = Math.floor(Math.random() * $('.cartaint').length);
            var randomConhecer = Math.floor(Math.random() * $('.cartacon').length);
            var randomType = Math.random();
            
            if (randomType < 0.5) {
                $('.cartaint').eq(randomIntimidade).fadeIn(1000); 
            } else {
                $('.cartacon').eq(randomConhecer).fadeIn(1000); 
            }
        }
    });
});
