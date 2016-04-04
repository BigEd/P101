// JavaScript Document
'use strict';

function execute(instruction){
    //instruction in the form (value,register,command)
    statoMacchina.numberOfDecimals=getWeelPosition(); //Prelevo il valore della "decimal wheel"
    if (!instruction){
        statoMacchina.running = false;
        return;
    }
    console.log(instruction);
    if (instruction[2] == 'S'){
        printInstruction(instruction.join());
        console.log('stopping the machine');
        statoMacchina.running = false;
    }
    if (instruction[2] == 'print') {
        console.log('printing command');
		var destination = instruction[1];
        var dst = 'reg_' + destination;
        value = statoMacchina[dst];
        if (value == null){
            value = 0;
        }
        if (instruction[1] == '/') {
            stampa('<br>');
        }
        else if(instruction[1]=='M'){
            stampa(value + ' &#x25CA <br>');
		}
        else{
            stampa(value + ' ' + instruction[1] + ' &#x25CA <br>');
        }
    }
    if(instruction[1] == 'A/' && instruction[2] == 'fromM'){
        console.log('Constant as instruction');
        storeInRegister(instruction[0], 'M');
        printInstruction(instruction.join());
       
        if (statoMacchina.running == true){
             var number = Math.abs(parseFloat(instruction[0]));
             var length = (number + '').replace('.', '').length;
             console.log('skipping ',length,' instruction because of costant as instruction');
             statoMacchina.currentInstruction = statoMacchina.currentInstruction + length
        }   
    }
    if (instruction[1] != 'A/' && instruction[2] == 'fromM') {
        console.log('fromM command');
        printInstruction(instruction.join());
        if (instruction[1] == null || instruction[1] == ''){
            instruction[1] = 'M';
        }
        //constructing destination
        var destination = instruction[1];
        console.log("moving values from M to ", destination);     
        //storing the value
        storeInRegister(statoMacchina.reg_M, destination);
        /*
        //print
        if (destination.search('/') != -1) {
            destination = destination[0].toLowerCase();
        }
		if (destination == 'M' && !statoMacchina.resetM){
            stampa(statoMacchina.reg_M + ' ' + ' &#8593;<br>');	
		}
        else if(destination == 'M' && statoMacchina.resetM){
            stampa('&#8593;<br>');
        }
        else if(statoMacchina.resetM){
            stampa(destination + ' &#8593;<br>');
        }
        else {
            stampa(statoMacchina.reg_M + ' ' + destination + ' &#8593;<br>');
		}
        */
    }
    if (instruction[2] == 'toA') {
        console.log('toA command');
        printInstruction(instruction.join());
        if (instruction[1] == null || instruction[1] == ''){
            instruction[1] = 'M';
        }
        var source = instruction[1];
        console.log('moving values from ' + source + ' to A');
        //need to make the conversion first
        if (source.search('/') != -1) {
            source = source[0].toLowerCase();
        }
        var src = 'reg_' + source;
        var value = statoMacchina[src];
        
		if (value == null){
			value = 0;
		}
        storeInRegister(value, 'A');
        
        /*
        //print
        if (source == 'M'){
            stampa(value + ' &#8595;<br>');
        }
        else{
            stampa(source + ' &#8595;<br>');
        }     
        */
    }
    
    if (instruction[2] == 'sum') {
        console.log('sum');
        printInstruction(instruction.join());
        if (instruction[1] == null || instruction[1] == ''){
            instruction[1] = 'M';
        }
		if(instruction[1] != 'M'){
            var dst = 'reg_' + instruction[1];
            console.log("moving values from ", dst, " to M");
            var value = statoMacchina[dst];
			if (value == null){
				value = 0;
			}
            statoMacchina.reg_M = value;
            //stampa(instruction[1] + ' ' + '+<br>');
        }
		else{
            //stampa(statoMacchina.reg_M+' '+'+<br>');	
		}     
        var float_M = parseFloat(statoMacchina.reg_M);
        var float_A = parseFloat(statoMacchina.reg_A);
        console.log(float_A + '+' + float_M);
        var R = float_A + float_M;        
        A = (R).toFixed(statoMacchina.numberOfDecimals); //valore troncato
        storeInRegister(R, 'R');
        storeInRegister(A, 'A');
        
    }
   
    if (instruction[2] == 'sub') {
        console.log('subtract');
        printInstruction(instruction.join());
        if (instruction[1] == null || instruction[1] == ''){
            instruction[1] = 'M';
        }		
		if(instruction[1]!='M'){		
            var dst = 'reg_' + instruction[1];
            console.log("moving values from ", dst, " to M");
            var value = statoMacchina[dst];
			if (value==null){
				value=0;
			}
            statoMacchina.reg_M = value;
            //(instruction[1] + ' ' + '-<br>');
		}
		else{
            //stampa(statoMacchina.reg_M+' '+'-<br>');	
		}		
        var M = statoMacchina.reg_M;
        var A = statoMacchina.reg_A;    
        var float_M = parseFloat(M)
        var float_A = parseFloat(A);    
        var R = float_A - float_M;	
        A = (R).toFixed(statoMacchina.numberOfDecimals); //valore troncato    
        storeInRegister(R, 'R');
        storeInRegister(A, 'A');
        
    }
	if (instruction[2] == 'mult') {
        console.log('mult');
        printInstruction(instruction.join());
        if (instruction[1] == null || instruction[1] == ''){
            instruction[1] = 'M';
        }
		if(instruction[1]!='M'){		
            var dst = 'reg_' + instruction[1];
            console.log("moving values from ", dst, " to M");
            var value = statoMacchina[dst];
			if (value==null){
				value=0;
			}
            statoMacchina.reg_M = value;
            //stampa(instruction[1] + ' ' + 'X<br>');
		}
		else{
            //stampa(statoMacchina.reg_M+' '+'X<br>');	
		}
		
        var M = statoMacchina.reg_M;
		if (M == 'null'){
			M = 0;
		}
        var A = statoMacchina.reg_A;    
        var float_M = parseFloat(M)
        var float_A = parseFloat(A);    
        var R = float_A * float_M;	
        A = (R).toFixed(statoMacchina.numberOfDecimals); //valore troncato    
        storeInRegister(R, 'R');
        storeInRegister(A, 'A');
        
    }
	if (instruction[2] == 'div') {
        console.log('division');
        printInstruction(instruction.join());
        if (instruction[1] == null || instruction[1] == ''){
            instruction[1] = 'M';
        }
		if( instruction[1] != 'M'){		
            var dst = 'reg_' + instruction[1];
            console.log("moving values from ", instruction[1], " to M");
            var value = statoMacchina[dst];
			if (value == null){
				value = 0;
			}
            statoMacchina.reg_M = value;
            //stampa(instruction[1] + ' ' + '&#x00F7<br>');
		}
		else{
            //stampa(statoMacchina.reg_M+' '+'&#x00F7<br>');	
		}
		
        var M = statoMacchina.reg_M;
		if (M =='null'){
			M = 0;
		}
        var A = statoMacchina.reg_A;    
        var float_M = parseFloat(M)
        var float_A = parseFloat(A);    
        var quoziente = float_A / float_M;
        console.log(quoziente,' =',float_A,' / ',float_M);
        if (quoziente === Infinity || quoziente === -Infinity || isNaN(quoziente)) {
            console.log("divisione per zero");
            turnOnRedLight();
            return;
        }
        A = truncateDecimals(quoziente, statoMacchina.numberOfDecimals); //valore troncato
        var R = float_A % float_M;
        storeInRegister(R, 'R');
        storeInRegister(A, 'A')
    }
	if (instruction[2] == 'sqrt') {
	    console.log('radice');
        printInstruction(instruction.join());
        if (instruction[1] == null || instruction[1] == ''){
            instruction[1] = 'M';
        }
	    if (instruction[1] != 'M') {
            source = instruction[1];
            if (source.search('/') != -1) {
                source = source[0].toLowerCase();
            }
            console.log("moving values from ", source, " to M");
		    var src = 'reg_' + source;	    
		    var value = statoMacchina[src];
		    if (value == null){
			    value = 0;
		    }
            storeInRegister(value, 'M');
		    stampa(instruction[1] + ' ' + '&#x221A<br>');
	    }
	    else{
		    stampa('&#x221A<br>');	
	    }
	    var M = statoMacchina.reg_M;	
	    var float_M = parseFloat(M);
	    var R = Math.sqrt(float_M);
	    var A = (R).toFixed(statoMacchina.numberOfDecimals); //inserire valore troncato in base alla rotella
	    var M = 2*A;
	    storeInRegister(R, 'R');
	    storeInRegister(A, 'A');
	    storeInRegister(M, 'M');
	}
    if (instruction[2] == 'exchange'){
        printInstruction(instruction.join());
        if (instruction[1] == null || instruction[1] == ''){
            instruction[1] = 'M';
        }
	    if(instruction[1] == '/'){		
		    var A=statoMacchina.reg_A;
		    var dec_part=(A+"").split(".")[1];
            if(dec_part==null){
                dec_part=0;
            }
            else{
                dec_part='0.'+dec_part;
            }
		    storeInRegister(dec_part, 'M');
            //stampa('/'+' '+'&#x2195<br>');
		    deselectRegisterBox();
            updateMachine();
            statoMacchina.resetM = true;
	        return;
	    }
	    if(instruction[1]=='R'){
            console.log("puttin R in A");
            var R = statoMacchina.reg_R;
		    storeInRegister(R, 'A');
		    //stampa(instruction[1] + ' ' + '&#x2195<br>');
		    deselectRegisterBox();
            updateMachine();
            statoMacchina.resetM = true;
            return;
	    }
	     
        if(instruction[1]=='A'){
            console.log("absolute value of A");
            var A = statoMacchina.reg_A;
            var abs_A = Math.abs(A);
            statoMacchina.reg_A = abs_A;
            //stampa(instruction[1] + ' ' + '&#x2195<br>');
            deselectRegisterBox();
            updateMachine();
            statoMacchina.resetM = true;
            return;
        }
        
        console.log("destination selected:"+dst);
        var destination = instruction[1];
        var dst = 'reg_' + destination;
        var A = statoMacchina.reg_A;	
        var X = statoMacchina[dst];

	    if (X == null){
		    X = 0;
	    }
        
	    storeInRegister(X, 'A');
        storeInRegister(A,destination);
        /*
	    if(instruction[1] == 'M'){
            stampa('&#x2195<br>');
	    }
	    else
	    {
		    stampa(instruction[1] + ' ' + '&#x2195<br>');
        }
        */
	
    }
    if (instruction[2] == 'clear'){
        printInstruction(instruction.join());
        if (instruction[1] == null || instruction[1] == ''){
            instruction[1] = 'M';
        }
        var destination = instruction[1];
        var dst = "reg_" + destination;
        
        if (destination == 'M' || destination == null){
            //stampa('*<br>');
            return;
        }
        if (destination == 'R' ){
            //stampa(instruction[1] + ' ' + '*<br>');
            return;
        }
        else{
            value = statoMacchina[dst];
                if (value == null){
                    value = 0;
                }
            //stampa(value+' ' + instruction[1] + ' ' + '*<br>');
            statoMacchina[dst] = null;
            
        }
	}
	if (instruction[2].search('V') != -1 || instruction[2].search('W') != -1 || instruction[2].search('Y') != -1 || instruction[2].search('Z') != -1 ) {
        //try to find the letter V,W,Y,Z in the 3rd part of the instruction, we have a jump instruction
        console.log('founded a jump: ' + instruction[2]);
        
        var label = instruction[2];
        if (label.search('/') == -1){
            // no / means unconditional jump
            console.log('founded an unconditional jump');
            var dst = mapJumpLabel(label);
            seek(dst);
            return;
        }
        /*
        while (statoMacchina.currentInstruction != 0) {
			console.log(statoMacchina.currentInstruction);
            destination = mapJumpLabel(instruction[2]);
			seek(destination);
		}
        */
	}

    if (instruction[2].search('/') != -1 ){  //the instruction contain a / we have a conditional jump
        console.log('founded conditional jump');
        src = instruction[2]; //get the 3rd camp of the intruction
        if (src.length == 2){ // jump in the /X form
            if (statoMacchina.reg_A > 0){ //check the condition
                console.log('type 1 jump from ' + src);
                dst = mapJumpLabel(src); //get the destination
                seek(dst); //jump to destination
                return;
            }
            else{
                console.log('unsatisfied jump condition');
            }
        }
        if (src.length == 3) { //jump in the X/X form
            if (statoMacchina.reg_A > 0){
                console.log('type 2 jump from ',src,' ...');
                dst = mapJumpLabel(src);
                console.log('...to ', dst);
                seek(dst);
            }
            else{
                console.log('unsatisfied jump condition');
            }
        }
    }

    deselectRegisterBox();
    updateMachine();
    statoMacchina.resetM = true;
    statoMacchina.signM='positive';
};

function seek(label) {
	var i = 0;
	console.log('searching for ' + label);
	for (i = 0; i < statoMacchina.instructionCounter; i++) {
		var instruction = localStorage.getItem('instruction' + i);
		if (instruction) {
            instruction = instruction.split(',');
			if (instruction[0] == label){
				console.log('label founded at ' + i);
                statoMacchina.currentInstruction = i;
                break;
			}
        }
        else {
            console.log('label not founded');
            break;
        }
	}
}

function runProgram() {
    searchConst();
    var n = localStorage.getItem('n');
    do {
        var i = statoMacchina.currentInstruction;
        console.log('executing instruction ' + i);
        var instruction = localStorage.getItem('instruction'+i);
        if (instruction) {
            instruction = instruction.split(',');
            execute(instruction);
            statoMacchina.currentInstruction++;
        }
        else{
            statoMacchina.running = false;
            break;
        }
    } while (statoMacchina.running);
}

function checkProgram() {
    var i=searchConst();
    console.log('numero costanti;'+i);
    var inst = localStorage.getItem('instruction'+i);
    var instruction = inst.split(',');  
    if (instruction[0] == 'AV'){
        console.log('condizione AV soddisfatta');
        return;
    }
    else {
        console.log(instruction[0]);
        alert('il programma deve iniziare con AV');
        statoMacchina.runnable = false;
        turnOnRedLight();
        return;
    }         
}
