$(document).ready(function() {
    
    $('.cartaint').hide();
    $('.cartacon').hide();
    $('.desafio').hide(); // Oculta os desafios inicialmente
    
    var divsExibidas = []; // Array para armazenar os índices das divs já exibidas
    
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
            var randomDesafio = getRandomIndex('.desafio', divsExibidas);
            $('.desafio').eq(randomDesafio).fadeIn(1000); // Exibe um desafio aleatório
            divsExibidas.push(randomDesafio);
        } else {
            var randomIntimidade = getRandomIndex('.cartaint', divsExibidas);
            var randomConhecer = getRandomIndex('.cartacon', divsExibidas);
            var randomType = Math.random();
            
            if (randomType < 0.5) {
                $('.cartaint').eq(randomIntimidade).fadeIn(1000); 
                divsExibidas.push(randomIntimidade);
            } else {
                $('.cartacon').eq(randomConhecer).fadeIn(1000); 
                divsExibidas.push(randomConhecer);
            }
        }
    });

    // Função para obter um índice aleatório não exibido
    function getRandomIndex(selector, displayedIndexes) {
        var indexes = [];
        $(selector).each(function(index) {
            if (!displayedIndexes.includes(index)) {
                indexes.push(index);
            }
        });
        return indexes[Math.floor(Math.random() * indexes.length)];
    }
});



