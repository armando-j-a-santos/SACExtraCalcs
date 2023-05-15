(function()  {
    let tmpl = document.createElement('template');
    let libraryUrl = 'https://cdn.jsdelivr.net/npm/@formulajs/formulajs/lib/browser/formula.min.js';
    tmpl.innerHTML = `#`;

    class CWExtraCalcs extends HTMLElement {
	constructor() {
			super(); 
			this._shadowRoot = this.attachShadow({mode: "open"});
		    	this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
		    	this._functionN = "-";
		    	this._param1 = "-";
		    	this._param2 = "-";
		    	this._param3 = "-";
		    	this._param4 = "-";
		    	this._param5 = "-";
		    	this._param6 = "-";
		    	this._param7 = "-";
		    	this.isFormulaMade = false
			this._resultString = "x";
			
            		// Load necessary libarary (define at the beg of this script)
			loadLibrary(libraryUrl);
    	}
		
	_submit(evento) {
		evento.preventDefault();
		this.dispatchEvent(new CustomEvent("propertiesChanged", {
			detail: {
				properties: {
					resultString: this._resultString
				}
			}
		}));		
	}	

	connectedCallback(){}

	disconnectedCallback(){}
            
	onCustomWidgetBeforeUpdate(oChangedProperties){}
	
	callFunction(typeFormula, arg1, arg2, arg3, arg4, arg5, arg6, arg7){
		if (typeFormula != "") {
			// Formula layout
			let formula = makeFormula(typeFormula, arg1, arg2, arg3, arg4, arg5, arg6, arg7)
			this.resultString = formula.toString();
			this.isFormulaMade = true;
         	}		
	}

	getResultString(){
		if (this.isFormulaMade === true) {
			this._functionN = "-"
			this._param1 = "-"
			this._param2 = "-"
			this._param3 = "-"
			this._param4 = "-"
			this._param5 = "-"
			this._param6 = "-" 
			this._param7 = "-"
			return this._resultString;
		}
	}
		
	onCustomWidgetAfterUpdate(oChangedProperties) {}
        
	onCustomWidgetDestroy(){}

	//Getters and Setters for function and parameters
	get functionN() {
		return this._functionN;
	}

	set functionN(value) {
		this._functionN = value;
	}

	get param1() {
		return this._param1;
	}

	set param1(value) {
		this._param1 = value;
	}

	get param2() {
		return this._param2;
	}

	set param2(value) {
		this._param2 = value;
	}

	get param3() {
		return this._param3;
	}

	set param3(value) {
		this._param3 = value;
	}

	get param4() {
		return this._param4;
	}

	set param4(value) {
		this._param4 = value;
	}

	get param5() {
		return this._param5;
	}

	set param5(value) {
		this._param5 = value;
	}

	get param6() {
		return this._param6;
	}

	set param6(value) {
		this._param6 = value;
	}

	get param7() {
		return this._param7;
	}

	set param7(value) {
		this._param7 = value;
	}

	get resultString() {
		return this._resultString;
	}

	set resultString(value) {
		this._resultString = value;
	}		
}; 		// to close: class CWExtraCalcs extends HTMLElement
// Return to SAC
customElements.define('com-sap-asantos-cwextracalcs', CWExtraCalcs);	
})(); 		// to close: (function()  {

// Load the necessary library
function loadLibrary(url) {
	var script = document.createElement('script');
	script.src = url;
	document.head.appendChild(script);
}

// Create the formula layout, starting with:
// formulajs. +
// type of formula +
// (param1, param2, param3 ...)
function makeFormula(typeFormula, arg1, arg2, arg3, arg4, arg5, arg6, arg7){
	let ListArguments = [arg1, arg2, arg3, arg4, arg5, arg6, arg7]
	let formula = "formulajs." + typeFormula + "("
	for (let x = 0; x < ListArguments.length; x++) {
		const element = ListArguments[x];
		if (element != "-" && element != "") {
			if (element != null) {
				if(x==0){
					formula = formula + element
				} else {
					formula = formula +  "," + element
				}							
			}
		}
	}
	formula = formula + ")"

	try {
		// RUN the formula, passing it to the library
		return eval(formula)
	} catch (e) {
		return e.stack
	}
}
