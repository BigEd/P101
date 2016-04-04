// JavaScript Document
'use strict';

console.log("creo ed inizializzo lo stato della macchina");
var statoMacchina = {};
resetFunction();
updateMachine();

$(".audioDemo").trigger('load');

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    console.log('file support present');
} else {
    alert('The File APIs are not fully supported by your browser.');
}

$(function () {
     //Inserimento numeri
    $('.numero').click(function () {        
        $(".audioDemo").trigger('play');
        var num = $(this).html();
        input(num);
    });
});

$(function () {
     //Inserimento virgola
    $('#virgola').click(function () {
        inserisciVirgola();
    });
});

$(function () {
     //Cambio Segno
    $('#segno').click(function () {
        cambiaSegno();
    });
});

$(function () {
    $("#start").click(function () {
        if (statoMacchina.recordPrPressed){
            // Store
            localStorage.setItem("instruction" + statoMacchina.instructionCounter, ",,S");
            statoMacchina.instructionCounter++;
            localStorage.setItem('n', statoMacchina.instructionCounter);
        }
        else{
            statoMacchina.running = true;
            stampa(statoMacchina.reg_M + ' S<br>');
            runProgram();
        }
    });
});

$(function () {
     //Tasto clear
    $('#clear').click(function () {
        clear();
        updateMachine();
        
    });
});

$(function () {
     //Tasto reset
    $('.reset').click(function () {
        resetStyle();
        resetFunction();
        updateMachine();
    });
});
$(function () {
     //Tasto elimina stampa
    $('#eliminaStampa').click(function () {
        $( "#stampa" ).empty();
        
    });
});

$(function () {
    $('.registro').click(function () {    //Seleziona registro
        //css stuff
        var letter = $(this).html();
        selectRegister(letter);
	});
});

$(function () {
    $('#clear_reg').click(function () {
        clearRegister();
    });
});

$(function () {
    $('#sum').click(function () {
        somma();
    });
});

$(function () {
    $('#subtract').click(function () {
        console.log("funzione sottrai");
        sottrai();
    });
});

$(function () {
    $('#divide').click(function () {
        console.log("funzione dividi");
        dividi();
    });
});

$(function () {
    $('#multiply').click(function () {
        console.log("funzione moltiplica");
        moltiplica();
    });
});

$(function () {
    $('#sqrt').click(function () {
        console.log("funzione moltiplica");
        radice();
    });
});

$(function () {
    $('#print').click(function () {
        print();
        
	});
});

$(function () {	
    $('#fromM').click(function () {     
     fromM();    
        
    });
});


$(function () {	
    $('#toA').click(function () {
        toA();
        
    });
});

$(function () {	
    $('#exchange').click(function () {     //tasto freccia su
       exchange();
    });
});

$(function () {
    $("#record_pr").click(function () {
       
        if (statoMacchina.recordPrPressed == false){
            console.log("Record Program mode ON");
            modactive_ON('#record_pr');
            statoMacchina.recordPrPressed = true;
            verifyDEF();
            inserisciCartolina();
            
        }
        else{
            console.log("Record Program mode OFF");
            statoMacchina.recordPrPressed = false;
            modactive_OFF('#record_pr');
            estraiCartolina();
        }
    });
});

$(function () {
    $("#print_pr").click(function () {
       
        if (statoMacchina.printPrPressed == false){
        console.log("Print Program mode ON");
        modactive_ON('#print_pr');
        statoMacchina.printPrPressed = true;
        printProgram();
        }
        else{
            console.log("Print Program mode OFF");
            statoMacchina.printPrPressed = false;
            modactive_OFF('#print_pr');
        }
    });
});



$(function () {
    $("#label_V").click(function () {
		console.log('pressed V');
        if (statoMacchina.recordPrPressed){
            if (statoMacchina.selectedRegister == 'A'){
                console.log('register A selected');
                //create the istruction
                var instructions = [];
                instructions.push('AV');
                instructions.push('');
                instructions.push('');
                //record the instruction            
                localStorage.setItem("instruction" + statoMacchina.instructionCounter, instructions);
                statoMacchina.instructionCounter++;
                localStorage.setItem('n', statoMacchina.instructionCounter);
	    	    deselectRegisterBox();
            }
        }
		else{
			seek('AV');
			statoMacchina.running = true;
        	runProgram();
		}
        statoMacchina.selectedLabel = 'V';
	});
});

$(function () {
    $("#label_W").click(function () {
		console.log('pressed W');
		if (statoMacchina.recordPrPressed){
            if (statoMacchina.selectedRegister == 'A'){
                //create the istruction
                var instructions = [];
                instructions.push('AW');
                instructions.push('');
                instructions.push('');
                //record the instruction            
                localStorage.setItem("instruction" + statoMacchina.instructionCounter, instructions);
                statoMacchina.instructionCounter++;
                localStorage.setItem('n', statoMacchina.instructionCounter);
	    	    deselectRegisterBox();
				}
        }
		else{
			seek('AW');
            statoMacchina.running = true;
        	runProgram();
		}
        statoMacchina.selectedLabel = 'W';
	});
});

$(function () {
    $("#label_Y").click(function () {
		console.log('pressed Y');
        if (statoMacchina.recordPrPressed){
            if (statoMacchina.selectedRegister == 'A'){
                //create the istruction
                var instructions = [];
                instructions.push('AY');
                instructions.push('');
                instructions.push('');
                //record the instruction            
                localStorage.setItem("instruction" + statoMacchina.instructionCounter, instructions);
                statoMacchina.instructionCounter++;
                localStorage.setItem('n', statoMacchina.instructionCounter);
	    	    deselectRegisterBox();
            }
        }
		else {
			seek('AY');
			statoMacchina.running = true;
        	runProgram();
		}
        statoMacchina.selectedLabel = 'Y';
	});
});

$(function () {
    $("#label_Z").click(function () {
		console.log('pressed Z');
        if (statoMacchina.recordPrPressed){
            if (statoMacchina.selectedRegister == 'A'){
                //create the istruction
                var instructions = [];
                instructions.push('AZ');
                instructions.push('');
                instructions.push('');
                //record the instruction            
                localStorage.setItem("instruction" + statoMacchina.instructionCounter, instructions);
                statoMacchina.instructionCounter++;
                localStorage.setItem('n', statoMacchina.instructionCounter);
	    	    deselectRegisterBox();
			}
        }
		else{
			seek('AZ');
			statoMacchina.running = true;
        	runProgram();
		}
	statoMacchina.selectedLabel = 'Z';
	});
});
$(function () {
    $("#slash").click(function () {
        slash();
		
	});
});
$(function () {
    $("#save").click(function () {
        saveTextAsFile();
		
	});
});

$(function () {
    $('#stepForward').click(function () {
        statoMacchina.running = true;
        var i = statoMacchina.currentInstruction;
        var instruction = localStorage.getItem('instruction'+i);
        console.log('stepping into instruction ',i+1);
        if (instruction) {
            instruction = instruction.split(',');
            execute(instruction);
            statoMacchina.currentInstruction++;
        }
        statoMacchina.running = false;
    });
});