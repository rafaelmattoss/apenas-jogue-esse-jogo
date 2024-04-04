$(document).ready(function() {
    
    $('.cartaint').hide();
    $('.cartacon').hide();
    $('.desafio').hide(); 
    $('.cartarel').hide(); 
    
    var divsExibidas = []; // Array para armazenar os índices das divs já exibidas
    
    $('#dado').click(function() {
        
        $('#dado').addClass('spin-animation');

        setTimeout(function(){
            $('#dado').removeClass('spin-animation');
        }, 1000);

        $('.cartaint').hide();
        $('.cartacon').hide();
        $('.desafio').hide(); // Oculta todos os desafios ao clicar no botão
        $('.cartarel').hide(); // Oculta todas as divs cartarel

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

$('#relacon').click(function() {
    $('body').addClass('novo-papel-de-parede');
    $('.cartaint').hide();
    $('.cartacon').hide();
    $('.desafio').hide(); 

    $('#dado').click(function() {
        $('.cartaint').hide();
        $('.cartacon').hide();
        $('.desafio').hide(); 

        var divsExibidas = []; // Array para armazenar os índices das divs já exibidas

        // Oculta todas as divs cartarel
        $('.cartarel').hide();

        // Gera um número aleatório entre 0 e o número total de divs com a classe cartarel
        var randomIndex = Math.floor(Math.random() * $('.cartarel').length);
        
        // Exibe a div com o índice aleatório escolhido
        $('.cartarel').eq(randomIndex).fadeIn(1000); 
    });
});
