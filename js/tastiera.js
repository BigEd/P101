// JavaScript Document


// Globali - Registri
window.M=0;    //inizializzazione non funziona
window.A=0;
window.R=0;
window.B=0;
window.C=0;
window.D=0;
window.E=0;
window.F=0;



var virgola=false; //virgola - controllo


var regselect=0;  //Registro selezionato


$(document).data('window.R', 0);   //Inizializzo le variabili globali.(Inizializzazione a 0 sembra non funzionare)
$(document).data('window.M', 0);
$(document).data('window.A', 0);

 $(function(){
     //Input da tastiera       
    $('.numero').click(function(){
        var $this = $(this);
        num = $this.html();
        input(num);
    });
});

 $(function(){
     //tasto clear  
    $('.clear').click(function(){
        clear();		 
    });
});

$(function(){
	
    $('.registro').click(function(){                     //Seleziona registro
        var removereg='#register_'+regselect;                        //Rimuove stile vecchio registro
        $(removereg).removeClass("regselected");
          
        var $this = $(this);
        register ='#register_'+ $this.html();
        regselect=$this.html();
        $(register).addClass("regselected");	
	});
});

$(function(){	
    $('#sum').click(function(){//Funzione somma
        somma();
    });
});


$(function(){
	
     $('#fromM').click(function(){     //tasto freccia su

         var destination=regselect;
         if(destination!="A" && destination!="R"){    
             var M=$(document).data('window.M');  //get M
             
             $(document).data('window.+destination', M);  //set register
             
             var prova=$(document).data('window.+destination');  //verifico istruzione 'window.register'
             stamparegistro ='#register_'+ destination; //print in register_x
             $(stamparegistro).html(prova);
         }
        
     });
});

$(function(){
	
    $('#exchange').click(function(){     //tasto freccia su

        var destination=regselect;

        var A=$(document).data('window.A');  //get A
        var X=$(document).data('window.+destination');  //get X

        $(document).data('window.A',X);  //set A=X
        $(document).data('window.+destination',A);//setX=A

        var stampa_X=$(document).data('window.+destination');  //Stampo X
        stamparegistro ='#register_'+ destination; //print in register_x
        $(stamparegistro).html(stampa_X);

        var stampa_A=$(document).data('window.A');  //Stampo X
        stamparegistro ='#register_A' //print in register_x
        $(stamparegistro).html(stampa_A);
    });
});
	
$(function(){
	
    $('#toA').click(function(){     //tasto freccia su

        var destination=regselect;

        var X=$(document).data('window.+destination');  //get X

        $(document).data('window.A',X);  //set A=X


        var stampa_A=$(document).data('window.A');  //Stampo X            
        stamparegistro ='#register_A' //print in register_x
        $(stamparegistro).html(stampa_A);
    });
});
	 

$(function() {
    $( "#spinner" ).spinner({
        spin: function( event, ui ) {
        if ( ui.value > 15 ) {
            $( this ).spinner( "value", 0 );
                return false;
            }
        else if ( ui.value < 0 ) {
            $( this ).spinner( "value", 15 );
                return false; 
            }       

        }
      
    });
});

$(function() {
    $( "#setvalue" ).click(function() {
        spinner.spinner( "value" , 5 );
	});
});
