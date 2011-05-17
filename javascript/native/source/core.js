Event.observe(window, 'load', function(){
	/**
	 * Get all forms with class name class="form-validate" on page
	 * @param array var getForms
	 */
	var getForms = $$('.form-validate');
	/**
	 * Init Class if form with class name class="form-validate" wxist
	 */
	if(getForms.length > 0){
		
		var validate = new formValidation(getForms);
	}
		
 });
/**
 * Class formValidation
 */
formValidation = Class.create({

	/**
	 * initValidator - Set form observers on form submit call function validateForm
	 * @param array data
	 */
	initialize : function(data){
	
	this.validateForm = this.validateForm.bind(this);

	this.finalCheck = this.finalCheck.bind(this);
	data.invoke('observe', 'submit', this.validateForm);
	
},
/**
 * function validateForm - Detect form, form id, set array of input fields
 * @param event
 */
validateForm : function(event){

	event.preventDefault();
	
	var formSubmited = Event.findElement(event);
	this.form = formSubmited.id;

	this.action = $(this.form).readAttribute('action');

	this.textFields = $(formSubmited).getInputs('text');
	this.passwordFields  = $(formSubmited).getInputs('password');

	this.allElements = $(formSubmited).getInputs();

	this.validate();
	
},
/**
 * validate - Input fields validation
 */
validate : function(){
	var counter = 0; 	/** All input fields error counter */
	var passCount = 0;	/** Password fields counter*/
	var checkLength = '';	/** Empty variable*/
	var dbCheck = '';	/** Database user exist check POST parameters*/
	errorCheck = $$('.error');	/** Get error fields in array */
	
	/**
	 * Remove old validation errors if they exist
	 */
	errorCheck.each(function(index){

		$(index).remove();
				   
	});

/** Loop over all input elemets to validate them*/
this.allElements.each(function(index){

		checkLength = $(index).value.length;				/** Check input value length*/
		getType = $(index).readAttribute('type');			/** Read input field type attribute*/

		/**
		 * If we have empty input field trow error
		 * and increase error counter
		 */
		if(checkLength === 0){
			$(index).insert({ after : '<span class="error">This field is required, you leave it empty.</span>' });
				counter++;
				
				/** If input is type of password increase password error counter*/
				if(getType === 'password'){
					passCount++;
		
				}


		/**
		 * If input field is not empty validate it.
		 */
		}else{
			
			/** Read validate rule from title tag- match min|max length
			 * @param string getRepper - min or max length rule
			 * @param string getLengthRule - length
			 */
			if (getRepper = $(index).readAttribute('class').match(/(max|min)_\d+/)) {
				
				/** If there are rule match length*/			
				getLengthRule = getRepper[0].split(/_/); 

			} else {
				
				/** Set control value*/
				getLengthRule = 0;

			}

			/** We have rule defined so we validate field by rule*/
			if (getLengthRule !== 0) {
				/** Increase counter and password counter just once code reduction*/
				counter++;
				
				if(getType == 'password'){
					passCount++;
				}
				
				/** Checking max length validation rule, and insert error if field is not valid*/	
				if (getLengthRule[0] == 'max' && checkLength > getLengthRule[1]) {		
					
					$(index).insert({ after : '<span class="error">This field must not contain more than <strong>' + getLengthRule[1]+ '</strong>  characters</span>'});
				
				/** Checking min length validation rule, and insert error if field is not valid*/	
				}else if(getLengthRule[0] == 'min' && checkLength < getLengthRule[1]) {
					
					$(index).insert({ after : '<span class="error">This field must contain at least <strong>' + getLengthRule[1]+ '</strong>  characters</span>'});
				
				/** Length validation rule have no errors so we check for special characters*/
				}else{
					
					/** Nick name characters check - if character set do not match output error*/
				
					if(index.id == 'nick_name'){
						
						checkChars = /[a-zA-Z0-9_\.\-\,]+/;   /* Validation filter*/
						
						if (!checkChars.test($(index).value)) {
						
							$(index).insert({ after : '<span class="error">Nick name alowed chars: a-z, A-Z, 0-9 . , - _</span>'});
							
						}else{
							
							dbCheck+= 'nick_name='+$(index).value;

						}
						
					/** Full name characters check - if character set do not match output error*/	
					}else if(index.id == 'full_name'){
						checkChars = /[a-zA-Z]+/;      /* Validation filter */
						
						if (!checkChars.test($(index).value)) {
							
							$(index).insert({ after : '<span class="error">Nick name alowed chars: a-z, A-Z</span>'});
							
						}else{
							
							dbCheck+= '&full_name='+$(index).value;
						}
						
					/** E-mail validation - basic e mail validation*/	
					}else if(index.id == 'e_mail'){
					
						/** */
						filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
						
						/** If e-mail is not valid output error*/
						if (!filter.test($(index).value)) {						  
							counter++;			
						   $(index).insert({ after : '<span class="error">This is not valid e-mail address.</span>'});
									  
						}else{
							
							dbCheck+= '&e_mail='+$(index).value;
						}
						
						
						
					/** We do not have any errors in this loop - decrease counters.*/
					}else{
						counter--;
					}
					
					if(getType == 'password'){
						passCount--;
					}else{
						
						counter--;
					}
				}	
			}	
		}			

		
 });	
	
	/** 
	* If we do not have password errors before compare password and confirm password fields 
	* if they match - true|false increase counter
	*/
	if(passCount == 0){
		
		if($(this.passwordFields[0]).value !== $(this.passwordFields[1]).value){
			
			$(this.passwordFields[0]).insert({ after : '<span class="error">Paswword fields do not match.</span>'});
	
			$(this.passwordFields[1]).insert({ after : '<span class="error">Paswword fields do not match.</span>'});
			
			 counter++;
			 
		}
	}	
			
	/** If everything is validated no errors check for:
	 *  - Nick name, Full name, e-mail existance in database
	 *    also validate e mail with dns
	 */
	if (counter == 0 && passCount == 0) {
	
		
		/**
		 * @var string finalCheck - form id 
		 */
		finalCheck = this.finalCheck;

		/**
		 * Serialize form data
		 */
		params = $(this.form).serialize();
		formID = this.form;
		new Ajax.Request(this.action, {
				    method		: 'post',
				    parameters	: params,
				    onSuccess: function(transport){
				      var message = transport.responseText.evalJSON();
				      alert(message);
				      /**
				       * If we have duplicate data in database show error messages
				       */
				      if(message[0] !== 'ok'){
						finalCheck(message);
				      /**
				       * Redirect to Main User Page
				       */
				      }else{
						if(formID == 'update_user'){
							$('teModalBody').update('<div class="teModal-message">User Data updated</div>');
								setTimeout(function(){
								var teModalInt = new teModal();
								teModalInt.teModalCLOSE();
								window.location.href = message[1];}, 2000);
						}else{
							window.location.href = message[1]; 
						}
				      }
						
				    },
				    onFailure: function(){ alert('Something went wrong...');}
				});

	}
},
/**
 * Show error messages
 * @param array data - error messages
 */
finalCheck : function(data){
		
	for ( var key in data) {
		$(key).insert({ after : '<span class="error">'+ data[key] +'</span>'});
		
	}	
}

});