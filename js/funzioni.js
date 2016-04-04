// JavaScript Document
'use strict';

function storeInRegister(value, letter) {
    /*siccome posso avere max 24 caratteri,
    abbrevio il valore del numero per evitare 
    la notazione esponenziale automatica introdotta dal JS*/
    
    // controllare che nei splittati (quindi maiuscoli e minuscoli) le cifre massime son 11
    console.log('storing ', value + ' in ' + letter);
    var val = value.toString();
    if (val.search('e+') !== -1) {
        //trovata notazione esponenziale
        value = val.parseFloat * 1e+23; // scrivo con 24 cifre
    }
    
    if (value.toString().length > 24) {
        console.log("overload");
        turnOnRedLight();
    }
    else {
        // we can store the value
        if (letter.search('/') != -1) {
            console.log('storing in splitted register');
            letter = letter[0].toLowerCase();
            console.log('storing in ' + letter);
        }
        var dst = "reg_" + letter;
        statoMacchina[dst] = value;
    }
}
function print() {
    var letter = statoMacchina.selectedRegister;
        var dst = "reg_" + letter;        
        var value = statoMacchina[dst];
        console.log('Registro:'+letter);
        //create the istruction
		
       var instruction = [];
		if (statoMacchina.slashPressed && letter=='M' || statoMacchina.slashPressed && letter == null){
		
		instruction.push(null);
		instruction.push('/');
        instruction.push('print');
		}
		else{
		
        instruction.push(null);
        instruction.push(statoMacchina.selectedRegister);
        instruction.push('print');
	   }
        scegliMod(instruction);
    
};
function somma() {
    var instruction = [];
    instruction.push(null);
    instruction.push(statoMacchina.selectedRegister);
    instruction.push('sum');
   
    scegliMod(instruction);
};

function sottrai() {
    var instruction = [];
    instruction.push(null);
    instruction.push(statoMacchina.selectedRegister);
    instruction.push('sub');
    scegliMod(instruction);
};

function moltiplica() {
    
    var instruction = [];
    instruction.push(null);
    instruction.push(statoMacchina.selectedRegister);
    instruction.push('mult');
        
    scegliMod(instruction);
    if(!statoMacchina.recordPrPressed && !statoMacchina.printPrPressed){
        printresult();
    }
}

function dividi() {
    
    var instruction = [];
    instruction.push(null);
    instruction.push(statoMacchina.selectedRegister);
    instruction.push('div');
    scegliMod(instruction);

    if(!statoMacchina.recordPrPressed && !statoMacchina.printPrPressed){
        printresult();
    }

};
function radice() {
    
    var instruction = [];
    instruction.push(null);
    instruction.push(statoMacchina.selectedRegister);
    instruction.push('sqrt');
    scegliMod(instruction);

    if(!statoMacchina.recordPrPressed && !statoMacchina.printPrPressed){
        printresult();
    }

};
function fromM(){
    if (statoMacchina.selectedRegister !== 'R' && statoMacchina.selectedRegister !== 'A' && statoMacchina.selectedRegister !== 'a') {
        //create the istruction
        var instruction = [];
        if (statoMacchina.reg_M != 0 && !statoMacchina.resetM) {
            instruction.push(statoMacchina.reg_M);
        }
        else{
            instruction.push(null);
        }
        instruction.push(statoMacchina.selectedRegister);
        instruction.push('fromM');
        scegliMod(instruction);

    }

    if (statoMacchina.selectedRegister=='a'){
        //create the istruction

        var instruction = [];
        var value = statoMacchina.reg_M;
        console.log('valore di M: ', value)
        instruction.push(value);
        instruction.push('a');
        instruction.push('fromM');
        codificaCostanti(instruction);
    }
};

function toA(){
    //tasto freccia su, muove il contenuto del registro selezionato in A
        console.log("selected registers: ", statoMacchina.selectedRegister);
        
        switch (statoMacchina.selectedRegister) {
        
        case 'A':
		deselectRegisterBox();
            return;
        default:
            var destination = statoMacchina.selectedRegister;
            //create the istruction
            var instruction = [];
            if (statoMacchina.reg_M != 0 && !statoMacchina.resetM) {
                instruction.push(statoMacchina.reg_M);
            }
            else{
                instruction.push(null);
            }
            instruction.push(destination);
            instruction.push('toA');
        }
        scegliMod(instruction);
};


function exchange() {
	 var instruction = []; 
	 if (statoMacchina.slashPressed && statoMacchina.selectedRegister=='M'|| statoMacchina.slashPressed && statoMacchina.selectedRegister == null){
		instruction.push(null);
		instruction.push('/');
        instruction.push('exchange');
		}
    else{
        instruction.push(null);
        instruction.push(statoMacchina.selectedRegister);
        instruction.push('exchange');
    }
    scegliMod(instruction);
		
};    
function scegliMod(instruction){
    if (statoMacchina.recordPrPressed){
		
        //record the instruction
        localStorage.setItem("instruction" + statoMacchina.instructionCounter, instruction);
        statoMacchina.instructionCounter++;
        localStorage.setItem('n', statoMacchina.instructionCounter);
		deselectRegisterBox();
        printInstruction(instruction);
    }
    else if(statoMacchina.printPrPressed){
        //print the instruction
        printInstruction(instruction);
        deselectRegisterBox();
        }
    else {
        //execute the instruction
        execute(instruction);
        }
};

function input(num) {
	
	if (num === '-') { //devo controllare il simbolo meno e non il punto
        console.log("segno");
        return;
    }

    if (num === '.' && statoMacchina.virgolaPresente) {
        console.log("virgola già presente");
        return;

    } else if (num === '.' && !statoMacchina.virgolaPresente) {
        console.log("inserisco la virgola alla fine");
        M = M + '.';
    }

    var M = statoMacchina.reg_M; //recupero il valore del reg dallo stato della macchina
	
    //funzione che reinizializza M se è stato premuto un tasto diverso da un numero
    if (statoMacchina.resetM){
        M = 0;
        statoMacchina.resetM = false;
        statoMacchina.virgolaPresente = false;
    }

	if (M == 0 && !statoMacchina.virgolaPresente && num != '.'){    //solo in questo caso scrive direttamente il numero
		if (statoMacchina.signM == 'positive'){
            M = num;
        }
        else{
            M = '-' + num;
        }
	}
    
	else{
        if (statoMacchina.signM == 'positive'){
            M = "" + M + num;
        }
        else if (statoMacchina.virgolaPresente == true){
            M = "" + M + num;
        }
        else {
            M = "-" + Math.abs(M) + num;
        }
	}

    storeInRegister(M,'M');  //memorizzo il valore sullo stato della macchina
	updateMachine();
} ;

function selectRegister(letter) {
    console.log(letter);
   
       if (statoMacchina.selectedRegister != null){
           //era già selezionato un registro lo deseleziono
           deselectRegisterBox();
           statoMacchina.selectedRegister = null;
       }
       var register = '#register_'+ letter;
        statoMacchina.selectedRegister = letter;
    
    console.log('selected ', register);
    statoMacchina.selectedRegisterLabel = register;
    selectRegisterBox();
} ;
function slash(){
	statoMacchina.slashPressed = true;        
    var SR = statoMacchina.selectedRegister;

    if (SR == 'B' || SR == 'C' || SR == 'D' || SR == 'E' || SR == 'F' || SR == 'A'){
        var reg = statoMacchina.selectedRegister;
        var register = '#register_' + reg.toLowerCase();
        deselectRegisterBox();
        statoMacchina.selectedRegister = null;
	    statoMacchina.selectedRegister = reg.toLowerCase();}
        console.log('selected ', register);
        statoMacchina.selectedRegisterLabel = register;
        selectRegisterBox();
};

function inserisciVirgola() {
	var M = statoMacchina.reg_M;
	
	if (!statoMacchina.virgolaPresente){
		statoMacchina.virgolaPresente = true;
	}
	else{
		return;
	}
    
	statoMacchina.reg_M = M;    //memorizzo il valore sullo stato della macchina
	updateMachine();
} ;

function cambiaSegno() {
    if (statoMacchina.signM == 'positive'){
        statoMacchina.signM = 'negative';
        statoMacchina.reg_M = '-' + statoMacchina.reg_M;
    }
    updateMachine();
}

function clear() {
	console.log("Premuto tasto clear");
	statoMacchina.reg_M = 0;
    statoMacchina.virgolaPresente = false;
    deselectRegisterBox();
    statoMacchina.selectedRegister = null;
    statoMacchina.resetM = false;
    statoMacchina.signM = 'positive';
} ;

function clearRegister() {
	console.log("Premuto tasto clear register")
	var instruction = [];
        instruction.push(null);
        instruction.push(statoMacchina.selectedRegister);
        instruction.push('clear');
   
    if (statoMacchina.recordPrPressed){
        //record the instruction
        localStorage.setItem("instruction" + statoMacchina.instructionCounter, instruction);
        statoMacchina.instructionCounter++;
        localStorage.setItem('n', statoMacchina.instructionCounter);
		deselectRegisterBox();
    }
    else {
        //execute the instruction
        execute(instruction);
    }
} ;

function resetFunction() {
    console.log('resetting');
    statoMacchina.reg_M = 0;
    statoMacchina.reg_A = 0;
    statoMacchina.reg_R = null;
    statoMacchina.reg_B = null;
    statoMacchina.reg_b = null;
    statoMacchina.reg_C = null;
    statoMacchina.reg_c = null;
    statoMacchina.reg_D = null;
    statoMacchina.reg_d = null;
    statoMacchina.reg_E = null;
    statoMacchina.reg_e = null;
    statoMacchina.reg_F = null;
    statoMacchina.reg_f = null;
    statoMacchina.numberOfDecimals = 2;
    statoMacchina.virgolaPresente = false;
    statoMacchina.slashPressed = false;
    statoMacchina.selectedRegister = null;
    statoMacchina.selectedRegisterLabel = null;
    statoMacchina.selectedLabel = null;
    statoMacchina.resetM = false;
    statoMacchina.signM = 'positive';
    statoMacchina.redLight = false;
    statoMacchina.greenLight = false;
    statoMacchina.recordPrPressed = false;
    statoMacchina.printPrPressed = false;
    statoMacchina.keybRlPressed = false;
    statoMacchina.instructionCounter = 0;
    statoMacchina.currentInstruction = 0;
    statoMacchina.running = false;
    statoMacchina.runnable = true;
    localStorage.clear();
};

function codificaCostanti(instruction){
    console.log('codifica della costante:');
    printInstruction(instruction.join());    
    if (statoMacchina.recordPrPressed){
        localStorage.setItem("instruction" + statoMacchina.instructionCounter, instruction);
        statoMacchina.instructionCounter++;
        localStorage.setItem('n', statoMacchina.instructionCounter);
    }
    var numero = parseFloat(instruction[0]);
    if (numero == '0' || numero == null) {
        console.log('nessun valore in M')
        return;
    }
    if (numero > 0) {
        var registro_base = 'R';
    }
    else {                           //tolgo segno meno
        registro_base = 'F';
        numero = Math.abs(numero);
    }
    var stringa = numero.toString();
    console.log('stringa senza segno: ' + stringa);
    var n_cifre = stringa.length;
    var i;
    if (stringa.indexOf('.') !== -1) {   //controllo virgola e segno posizione 
        var index = stringa.indexOf('.');
        stringa = stringa.replace('.','');  //rimuovo la virgola
        n_cifre = stringa.length;
    }
    else{
        index = n_cifre-1;
    }
    for (i = n_cifre-1; i >= 0; i--) {  //scorro la stringa
        var value = stringa[i];
        var istruzione = constantInstruction(value);               
        var registro = registro_base;
        if (i == 0){   //assegno D o E alla cifra più significativa
           if(registro == 'R' || registro == 'r'){
               registro = 'D';
           }
           else{
               registro = 'E';
           }
        }
        if (i == index - 1) {     //aggiungo / dove è presente la virgola
            registro=registro_base.toLowerCase();
        }
        if (istruzione != 'none'){  
            var instruction = [];
            instruction.push(null);
            instruction.push(registro);
            instruction.push(istruzione);
            console.log('istruzione i'+i+'registro:'+registro+'istruzione'+istruzione);
        }
        if (statoMacchina.recordPrPressed){
            //record the instruction
            localStorage.setItem("instruction" + statoMacchina.instructionCounter, instruction);
            statoMacchina.instructionCounter++;
            localStorage.setItem('n', statoMacchina.instructionCounter); 
        }
        if (statoMacchina.printPrPressed){
            console.log(instruction);
            printInstruction(instruction.join());
        }        
    }
    
    deselectRegisterBox();
    updateMachine();
    statoMacchina.resetM = true;
};

function truncateDecimals(number, digits) {
    var multiplier = Math.pow(10, digits);
    var adjustedNum = number * multiplier;
    var truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
};

function constantInstruction(value){
    switch (value) {
    case "0":
        return "S";        
    case "1":
        return "toA";       
    case "2":
        return "fromM";              
    case "3":
        return "exchange";        
    case "4":
        return "sum";        
    case "5":
        return "sub";            
    case "6":
        return "mult";        
    case "7":
        return "div";        
    case "8":
        return "print";       
    case "9":
        return "clear";
    default:
        return "none";}
};

function printProgram() {
    console.log('printing program');
    var n = statoMacchina.instructionCounter;
    var i = searchConst();
    for (i = searchConst(); i < n; i++){
        var instruction = localStorage.getItem('instruction'+i);
        printInstruction(instruction);
    }
};
function printInstruction(instruction) {
    if (statoMacchina.running){
        return;
    }
    var instruction = instruction.split(',');
    var cleanInstruction = toSymbol(instruction[2]);
    stampa(instruction[0] + ' ' + instruction[1] + ' ' + cleanInstruction +'<br>');
};

function toSymbol(instruction){
    switch(instruction) {            
        case "toA":
            return " &#x2193";
        case "fromM":
            return " &#x2191";                  
        case "exchange":
            return " &#x2195";            
        case "sum":
            return " +";            
        case "sub":
            return " -";            
        case "difference":
            return " -";                
        case "mult":
            return " X";            
        case "div":
            return " &#x00F7";            
        case "print":
            return " &#x25CA ";
        case "sqrt":
            return " &#x221A";
        case "clear":
            return " *";            
        case "slash":
            return " /";
        default:
            return instruction;
    }
};

function mapJumpLabel(letter) {
    // useful for conditional and unconditional jumps
    if (letter == 'V' || letter == 'W' || letter == 'Y' || letter == 'Z'){
        return 'A' + letter;
    }
    if (letter == '/V' || letter == '/W' || letter == '/Y' || letter == '/Z'){
        return 'A/' + letter[1];
    }
    if (letter[0] == 'C' && letter[1] == '/'){
        return 'B/' + letter[2];
    }
    if (letter[0] == 'C'){
        return 'B' + letter[1];
    }
    if (letter[0] == 'D' && letter[1] == '/'){
        return 'E/' + letter[2];
    }
    if (letter[0] == 'D'){
        return 'E' + letter[1];
    }
    if (letter[0] == 'R' && letter[1] == '/'){
        return 'F/' + letter[2];
    }
    if (letter[0] == 'R'){
        return 'F' + letter[1];
    }
}

function openFile(event) {
    console.log("opened a file");
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        inserisciCartolina();
        var testo = reader.result;
        var linee = testo.split('\n');
        
        var title = document.getElementById('files').value;
		document.getElementById("progName").value = title;
        if (linee.length > 120){
            window.alert("Sono ammessi solo programmi con massimo 120 istruzioni");
            turnOnRedLight();
            return;
        }
        for (var i = 0; i < linee.length; i++){
            if (linee[i] != '\n' && linee[i] != ''){
                localStorage.setItem("instruction" + statoMacchina.instructionCounter, linee[i]);
                statoMacchina.instructionCounter++;
                localStorage.setItem('n', statoMacchina.instructionCounter);
            }
        }
        console.log(linee);
        console.log(reader.result.substring(0, 200));
    };
    reader.readAsText(input.files[0]);
} ;

function printresult(){
    var value = statoMacchina.reg_A;
    if (value != Infinity && value != -Infinity && value != NaN){
    stampa(value + ' ' + 'A' + ' &#x25CA <br>');
    }
};

function verifyDEF(){
    if (statoMacchina.reg_D !=0 && statoMacchina.reg_D !=null){
        storeConst('D');
    } 
    if (statoMacchina.reg_d !=0 && statoMacchina.reg_d !=null){
        storeConst('d');
    } 
    if (statoMacchina.reg_E !=0 && statoMacchina.reg_E !=null){
        storeConst('E');
    } 
    if (statoMacchina.reg_e !=0 && statoMacchina.reg_e !=null){
        storeConst('e');
    } 
    if (statoMacchina.reg_F !=0 && statoMacchina.reg_F !=null){
        storeConst('F');
    } 
    if (statoMacchina.reg_f !=0 && statoMacchina.reg_f !=null){
        storeConst('f');
    } 
};

function storeConst(letter){
        var dst = "reg_" + letter;        
        var value = statoMacchina[dst];
        var instruction = []; 
	
		instruction.push(value);
		instruction.push(letter);
        instruction.push('store');
        
        localStorage.setItem("instruction" + statoMacchina.instructionCounter, instruction);
        statoMacchina.instructionCounter++;
        localStorage.setItem('n', statoMacchina.instructionCounter); 
        
    
};
function searchConst() {
	var i = 0;
    var numConst=0;
	console.log('searching for store instruction ');
	for (i = 0; i < 5; i++) {
       
		var instruction = localStorage.getItem('instruction' + i);
		if (instruction) {
            instruction = instruction.split(',');
			if (instruction[2] == 'store'){
				console.log('store instruction found');
                loadConst(instruction);
                numConst++;
			}
        }
       
	}updateMachine();
    if (numConst==0){
        console.log('no constant in this program');
    }
    else{
        console.log(numConst+' constant found');
    }
    return numConst;
};
function loadConst(instruction){     
        var value = instruction[0];
        var destination = instruction[1];
        storeInRegister(value, destination);
};

function getWeelPosition(){
    var chooseId = window.matchMedia("screen and (min-width: 650px)");
    if(chooseId.matches){
        var position=$('#spinnerBottom').val();
        
    }
    else{
        var position=$('#spinnerTop').val();
        
        
    }
    return position;
}

function saveTextAsFile()
{
	var textToWrite = saveProgram();
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var name = document.getElementById("progName").value;
    var fileNameToSaveAs=name+'.txt';
	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function saveProgram() {
    var output='';
    var n = statoMacchina.instructionCounter;
    for (var i = 0; i < n; i++){
        var output= output + localStorage.getItem('instruction'+i)+'\n';
        
    }
    return output;
};
