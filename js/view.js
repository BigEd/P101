// JavaScript Document

function updateMachine() {
   
	$('#register_M').html(statoMacchina.reg_M);
	$('#register_A').html(statoMacchina.reg_A);
	$('#register_R').html(statoMacchina.reg_R);
	$('#register_B').html(statoMacchina.reg_B);
    $('#register_b').html(statoMacchina.reg_b);
	$('#register_C').html(statoMacchina.reg_C);
    $('#register_c').html(statoMacchina.reg_c);
	$('#register_D').html(statoMacchina.reg_D);
    $('#register_d').html(statoMacchina.reg_d);
	$('#register_E').html(statoMacchina.reg_E);
    $('#register_e').html(statoMacchina.reg_e);
	$('#register_F').html(statoMacchina.reg_F);
    $('#register_f').html(statoMacchina.reg_f);
}
function inserisciCartolina(){
    $("#cartolinaDiv").addClass("bordo");
    $("#cartolina").show("slow").delay(2200);    
    $("#cartolina").addClass("inserisci");
    $("#progName").delay(2200).show("slow");
    $("#progName").css("-webkit-user-select","text"); 
    $("#progName").css("-moz-user-select","text"); 
    $("#progName").css("-ms-user-select","text"); 

};

function estraiCartolina(){
    $("#progName").hide("slow");
    $("#cartolina").delay(200).removeClass("inserisci");
    $("#cartolina").delay(2200).hide("slow");
    $("#cartolinaDiv").removeClass("bordo");

};

function turnOnRedLight() {
    statoMacchina.redLight = true;
    $("#red_light").css("background-color", "#FD0000");
    $("#red_light").css("box-shadow", "0px 0 15px #FD0000");
}

function turnOffRedLight() {
    $("#red_light").css("background-color", "indianred");
    $("#red_light").css("box-shadow", "");
}

function selectRegisterBox() {
    $(statoMacchina.selectedRegisterLabel).addClass("regselected");
}
function modactive_ON(tasto) {
    $(tasto).addClass("modactive");
}
function modactive_OFF(tasto) {
    $(tasto).removeClass("modactive");
}

function deselectRegisterBox() {
    var removereg = '#register_' + statoMacchina.selectedRegister;               
    $(removereg).removeClass("regselected");
    registers = ['B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f'];

	statoMacchina.selectedRegister = null;   //REIMPOSTA REGISTRO M
    statoMacchina.slashPressed = false;     //REIMPOSTA FLAG SLASH

    //for (i in registers){ questo resetta brutalmente tutti i registri
    //    console.log(registers[i]);
    //    var removereg = '#register_' + registers[i];               
    //    $(removereg).removeClass("regselected");
    //}
} ;
function resetStyle() {
    deselectRegisterBox();
    modactive_OFF('#record_pr');
    modactive_OFF('#print_pr');
    turnOffRedLight();
    estraiCartolina();
};

function stampa(testo){
        
       $('#stampa').append(testo);
       var d = $('#posizione_stampa');
       d.scrollTop(d.prop("scrollHeight"));
       
};
