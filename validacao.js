
            
            let botaoentrar = $("#entrar")
            botaoentrar.click(validacaodeuser)


            function validacaodeuser(){
                let usuario = $("#usuario").val();
                let senha = $("#senha").val();
                let erro =$("#erro");
                
                if(!usuario || !senha){
                    erro.show();
                }

            }
  
            

    
    
    
