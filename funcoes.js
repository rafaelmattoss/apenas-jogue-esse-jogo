$(document).ready(function() {
    
    $('.cartaint').hide();
    $('.cartacon').hide();

   
    $('#dado').click(function() {
        
        $('#dado').addClass('spin-animation');

        
        setTimeout(function(){
            $('#dado').removeClass('spin-animation');
        }, 1000);

        $('.cartaint').hide();
        $('.cartacon').hide();

       
        var randomIntimidade = Math.floor(Math.random() * $('.cartaint').length);
        var randomConhecer = Math.floor(Math.random() * $('.cartacon').length);

      
        var randomType = Math.random();

        
        if (randomType < 0.5) {
            $('.cartaint').eq(randomIntimidade).fadeIn(1000); 
        } else {
            $('.cartacon').eq(randomConhecer).fadeIn(1000); 
        }
    });
});
