function somma(){
	
    var M=$(document).data('window.M');  //get M
	var A=$(document).data('window.A');  //get A
	var R=M+A;                       	 //Somma
	$(document).data('window.R', R);     //Store
	$('#register_R').html(R);	         //Print in register R
	return;
};

function input(numero){
	
    var $register_M = $('#register_M');
    if (numero=="." && virgola==false){                    //Controllo virgola
        virgola=true;    
        $register_M.html($register_M.html()+numero);
	}
    
    if (numero=="." && virgola==true){
			
		 $register_M.html($register_M.html());
		 }
		 else{
		  $register_M.html($register_M.html()+numero);}
		  
		var appo = $('#register_M').text();   //Get result
		appo=parseFloat(appo);	               //to float
		$(document).data('window.M', appo);    // Store in M

return;
};

function clear(){
//non serve	$register_M = 0
	$('#register_M').html(0);
	$(document).data('window.M', 0); //Devo portare anche il suo contenuto a 0?
};
