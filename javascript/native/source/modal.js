/**
 * On page load init Class teModal
 */
Event.observe(window, 'load', function(){   
	
	var teModalInt = new teModal();						

	
 }
);

teModal= Class.create({

/**
 * Prototype initialize function first called
 * this.show, masterShow, teModalCLOSE - bind 
 */
initialize : function(){
	
	/**
	 * Main teModal handler
	 */
	this.show =  this.show.bind(this);
	
	/**
	 * Open modal function
	 */
	this.masterShow =  this.masterShow.bind(this);
	
	/**
	 * Close modal function
	 */
	this.teModalCLOSE =  this.teModalCLOSE.bind(this);					
	
	/**
	 * Set observers on css modal class defined in teModal.addMethods
	 */
	$$(this.modalClass).invoke('observe', 'click', this.show);	

},

/**
 * show - Detecting modal settings and set teMOdal parameters
 * @param event - detect click on elements with css modal class  
 * @param string this.title
 * @param string this.href
 * @param string this.type
 * @param array this.dimensions
 * @param string this.footer
 */
show : function(event){
	
	/**
	 * Preventing default action
	 */
	event.preventDefault();

	/**
	 *  Get element event
	 */
	var linkClicked = event.findElement();
	/**
	 * Check for element event if not defined show error
	 */
	if(typeof linkClicked == 'undefined'){	
		
		this.error(1);	
		return false;
	}
	
	/**
	 * Element title 
	 * @var string this.title 
	 */
	this.title = linkClicked.readAttribute('title');
	
	this.mouseX = Event.pointerX(event);
	this.mouseY = Event.pointerY(event);

	/**
	 * Set container vars
	 * @param array var settings
	 * @param array var dataSplit
	 */
	var settings = [];
	var dataSplit = [];
	
	/**
	 * Split settings to array
	 * @param array data
	 */
	data = this.title.split(/, |,/); 
	
	/**
	 * Loop and create modal parameters Object
	 */
	for ( var ints = 0; ints < data.length; ints++) {
		dataSplit = data[ints].split(/: |:/);
		settings[dataSplit[0]] = dataSplit[1];
	
	}

	/**
	 * Detect type of element
	 */
	var href;
	
	if(linkClicked.tagName == 'A'){

		href = linkClicked.readAttribute('href');
	
		if(typeof href !== undefined){
		
			this.href = href;
		
		}else{
		
			this.errorHandler(6);
		}
		
	}else{
		
		
		if(settings.Type == 'Ajax'){}
		
			href = settings.Href;
			
			if(typeof href !== undefined){
				
				this.href = href;
			
			}else{
			
				this.errorHandler(6);
			}
	}
	
	
	/**
	 * Set teModal parameters 
	 */	
	this.title = settings.Title;					
	this.type = settings.Type;
	
		
	this.content = settings.Content;
	
	if(this.content == 'Inline'){
			
		this.messageHolder = settings.Container;
			
	}

	
	if(typeof settings.Validation !== undefined){
		
		this.validation = settings.Validation;
	}
	
	if(typeof settings.Width !== undefined){
		
		this.width = settings.Width;
	}	
	
	if(typeof settings.Height !== undefined){
		
		this.height = settings.Height;
	}
	
	if(typeof settings.Footer !== undefined){
		
		this.footer = settings.Footer;
	}
	if(settings.Link == 'check' && typeof settings.Ref !== undefined){

		 $('alert').action= href+ '/' +settings.Ref;

	}

	/**
	 * 
	 * Call createModal function
	 */
	this.createModal();

},

alertModal : function(container){

	this.title = $(container).readAttribute('title');

	
	
	/* check title tag for modal data */
	var titleData = this.title.split(/:::--:::/g);
	
	/* set modal parameters */

	this.title = titleData[0];
	this.href = titleData[1];
	this.type = titleData[2];
	
	if(this.href == 'inner'){
		
		this.innerData = $(container).innerHTML;

	}else{
		
		this.innerData = $(this.href).innerHTML;
	
	}
	alert(this.innerData);
	this.dimensions = titleData[3].split(/x/g);
	
	
	if(typeof titleData[4] == 'undefined'){
		
		this.footer = this.footerText;
		
	}else{
		
		this.footer = titleData[4];
	}
	

	this.BG_open_end  = '0.0';  	
	this.createModal();
	teModalCLOSE = this.teModalCLOSE;

	setTimeout(function(){
	teModalCLOSE(['0.0', '0.0']);}, 4000);
	
},

/**
 * createModal - Create all modal DOM elements
 */
createModal : function(){  

	/** 
	 * Get browser dimensions
	 * @return Browser dimensions
	 */
    this.getDimensions();
    
    /** 
     * Calculate modal top margin
     * @var number var topMargin 
     */
	var topMargin =   (this.docDimensions.height*0.5) -  (this.height*0.5);	
	
	/** 
	 * If we have negative value set to default top: 20px
	 */
	if(topMargin < 0){topMargin  = 20;}
	
	/** Calculate left margin
	 * @var number var leftMargin 
	 */
	var leftMargin =   ((this.docDimensions.width)- this.width) /2;
	
	/** 
	 * this.teBackground - Overlay element
	 */
	
	this.teBackground = new Element("div", {id: "teBackground"}).setStyle({display : 'block',  
																		   backgroundColor:this.bgColor,  
																		   width: parseInt(this.browserDimensions[0])-17+'px', 
																		   height: this.browserDimensions[1]+'px', opacity: 0.0}); 
	
	/**
	 * Calculate this.teModalHolder - heigth
	 */
	holderHeight = parseInt(this.height)+20;
	
	/**
	 * Alert - detect click coordinates
	 * Set top and left margins
	 */
	if(this.type == 'Alert'){
		
		/**
		 * Mouse Y coordinate - 1/2 of modal height
		 * @var number topMargin 
		 */
		topMargin = this.mouseY - (holderHeight*0.5);
		
		/**
		 * Mouse X coordinate - 1/2 of modal width
		 * @var number leftMargin
		 */
	    leftMargin = this.mouseX - (this.width*0.5);
	    
	    /**
	     * Check if alert box is not outside browser window
	     * @var number dim
	     */
		var dim = leftMargin+ parseInt(this.width);
		
		/** 
		 * If alert box is outside browser window decrease left margin for 1.3 x of modal width
		 */
	    if((leftMargin + this.width) > (this.browserDimensions[0] - (this.width*0.7) )){
	    	
	    	leftMargin =  this.browserDimensions[0]-(this.width*1.3);
	    } 
	}
	
	/** 
	 * this.teModalHolder - Modal warper
	 */ 
	this.teModalHolder = new Element("div", {id: "teModalHolder", "class": "teModalRadius" }).setStyle({width: this.width+'px', 
																										height: holderHeight+'px', 
																										top: topMargin+'px', 
																										left: leftMargin+'px', opacity: 0.0}); 	
	
	/** 
	 * this.teModalInnerHolder - Box model fix
	 */
	this.teModalInnerHolder= new Element("div", {id: "teModalInnerHolder"});	
	
	/** 
	 * this.teModalHeader - Title and close button holder
	 */
	this.teModalHeader = new Element("div", {id: "teModalHeader"});	
	
	/** 
	 * this.teModalTitle - Title element
	 */
	this.teModalTitle = new Element("div", { id: "teModalTitle"});
	
	/** 
	 * this.teModalClose - Close button holder 
	 */
	this.teModalClose = new Element("div", {id: "teModalClose"});
	
	/** this.teModalBodyWarper - Warp modal data
	 * @todo - Added for scroller must be implemented
	 */
	this.teModalBodyWarper = new Element("div", {id: "teModalBodyWarper"});	
	
	/** 
	 * this.teModalBody - Content holder
	 */
	this.teModalBody = new Element("div", {id: "teModalBody"});		
	
	/** 
	 * this.teModalFooter - Footer holder 
	 */
	this.teModalFooter = new Element("div", {id: "teModalFooter"}).setStyle({opacity: '0.0'  });
	
	/** 
	 * Inject elements in DOM
	 */

	this.inject();  

},

/**
 * inject - Injecting elements before showing them
 */
inject : function(){
	/** 
	 * Append elements
	 */
	document.body.appendChild(this.teBackground);                  
	this.teBackground.insert({ after : this.teModalHolder });											
	this.teModalHolder.insert({ top : this.teModalInnerHolder});										
	this.teModalHolder.insert({ top : this.teModalHeader});	
	this.teModalHeader.insert({ top : this.teModalTitle, bottom:  this.teModalClose });		
	this.teModalClose.update('<img src="'+this.closeModal+'" alt="modalClose" />');
	this.teModalInnerHolder.insert({ bottom : this.teModalBodyWarper });
	this.teModalBodyWarper.insert({ top : this.teModalBody });	
	this.teModalHolder.insert({ bottom  : this.teModalFooter });
	
	/**
	 *  Show modal
	 */
	this.teModalSHOW();
	
},

includeData : function(){

	/** Basic type
	 * @todo - Must be added other types
	 */
	if(this.type == 'Ajax'){
	
	/** 
	 * Error function
	 * */
	errorHandler = this.errorHandler;
		
		/**
		 * Get modal content
		 */
	modalContent = this.content;
	modalValidation = this.validation;
	new Ajax.Request(this.href,{
		method: this.ajaxMethod,
		onComplete: function(response){
			var message = response.responseText;
					
			/**
			 * Error handler
			 */
			if(typeof message == undefined){
						
				errorHandler(4);
						
			}else{
				/**
				 * Update modal content
				 */
				$('teModalBody').update(message);
				
				if(modalValidation && modalContent == 'Form'){
					
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
					
				}

			}
		},
		onFailure :  function(){errorHandler(5); return false;}
	});
		
	}else if(this.type == 'Alert'){
		
		/**
		 * Inner HTML from hidden selector declared in <a> title tag
		 * @var string|HTML updateData
		 */
		var updateData = $(this.messageHolder).innerHTML; 
		
		/**
		 * Local scope
		 */
		teModalCLOSE = this.teModalCLOSE;
		
		/**
		 * Update modal with new content
		 */
		$('teModalBody').update(updateData);

		/**
		 * Get all buttons on page - Not best solution but one that works
		 * @var array buttons
		 */
		var buttons = $$('input[type="button"].cancel');
		
		/**
		 * Loop over buttons and set eent observers
		 */
		buttons.each(function(index){
		
			$(index).observe( 'click', function(event) {
				/**
				 * Detect event element 
				 * @var object buttonsHolder
				 */
				buttonsHolder  = Event.findElement(event);
				/**
				 * Get form id
				 */
				var form = $(buttonsHolder.id).up('form').id;
				
				/**
				 * If confirm submit form else hide modal
				 */
				if(buttonsHolder.id == 'confirm'){
					
					$(form).submit();
				
				}else if(buttonsHolder.id == 'cancel'){
					closeData = ['0.0', '0.0'];
					teModalCLOSE(closeData);
				
				}

		});
		
		
	})
}
		
},

teModalSHOW : function(){  
	/** Update elements with data from title tag*/
	this.teModalTitle.update(this.title);
	this.teModalFooter.update(this.footer);

	/** Overlay - If we user effects - show overlay with effects we choose*/

if(this.type !== 'Alert'){
	
	if(this.BG_effectOrder !== 'none'){
		
		this.masterShow('teBackground', this.BG_effectOrder, this.BG_parallelOptions, this.BG_effect,  this.BG_effectParallel, this.BG_open_start, this.BG_open_end);
	
	/** Overlay - If we do not use modal effects - just show overlay*/
	}else{

		$('teBackground').setStyle({opacity: this.BG_open_end});
		
	}
}else{
	
	this.modal_effectOrder = 'none';
}
	/** Modal - If we user effects - just show modal*/
	if(this.modal_effectOrder !== 'none'){
		
		this.masterShow('teModalHolder', this.modal_effectOrder, this.modal_parallelOptions, this.modal_effect,  this.modal_effectParallel, this.modal_open_start, this.modal_open_end);
	
	/** Modal - If we do not use modal effects  - show modal with effects we choose*/
	}else{
		
		$('teModalHolder').setStyle({opacity: this.modal_open_end});
		
	}
	
	/** Insert content in modal*/
	this.includeData();
	
	/** If we set Draggable in addMethods*/ 
	if(this.draggable){
		
		new Draggable('teModalHolder', {  handle: 'teModalHeader' });
		this.teModalHeader.setStyle({cursor: 'move'});

	}
	
	/** Ser close modal observers*/
	$('teModalClose', 'teBackground').invoke('observe', 'click', this.teModalCLOSE);


},

teModalCLOSE : function(data){  
	
	if(data){

		this.BG_close_end = data[0];
		this.BG_close_start = data[1];


	}
	
	if(this.modal_effectOrder !== 'none'){

		this.masterShow('teModalHolder', this.modal_effectOrder, this.modal_parallelOptions, this.modal_effectClose,  this.modal_effectCloseParallel, this.modal_close_start, this.modal_close_end);

	}else{

		$('teModalHolder').setStyle({opacity: this.modal_close_end});

	}

	if(this.BG_effectOrder !== 'none'){
	
		this.masterShow.delay(this.delayTime, 'teBackground', this.BG_effectOrder, this.BG_parallelOptions, this.BG_effectClose,  this.BG_effectCloseParallel, this.BG_close_start, this.BG_close_end, this.removeModal);
		
	}else{
	
		$('teBackground').setStyle({opacity: this.BG_close_end});
		
	}

	//this.removeModal.delay(2.0);
	if(this.type !== 'alert'){
	$('teModalClose', 'teBackground').invoke('stopObserving');   //remove observers
	}

},

removeModal : function(){

	$('teModalHolder').remove();
	$('teBackground').remove();
	
	
	delete this.teBackground; 
	delete this.teModalHolder; 
},

masterShow : function(Selector, Options, OptionsParalell, EffectMaster, EffectParallel, startOpacity, endOpacity, afterFinishFunction){
	var removeModal = this.removeModal;

			this.effectsOptions[EffectMaster].opt.to = endOpacity;
			this.effectsOptions[EffectMaster].opt.from = startOpacity;
			if(typeof afterFinishFunction  !== 'undefined'){
			this.effectsOptions[EffectMaster].opt.afterFinish = function(){removeModal();};
			}

	//}
	
	if(Options == 'single'){				//SIGLE EFFECT										
			new this.effectsOptions[EffectMaster].effect(Selector, this.effectsOptions[EffectMaster].opt);
	}else if(Options == 'parallel'){		//PARALLEL EFFECT
	
	if(OptionsParalell == 'separate'){        	//if separate effects
			var parallelOptions = {};
		}else if(OptionsParalell == 'together'){	//if sync effects
			delete this.effectsOptions[EffectMaster].opt.duration;		//must delete this because the both effects use same duration
			delete this.effectsOptions[EffectParallel].opt.duration;		//must delete this because the both effects use same duration

			 this.effectsOptions[EffectMaster].opt.sync = true;
			 this.effectsOptions[EffectParallel].opt.sync = true;
			 
			 

	var parallelOptions = {duration: this.duration}; //for soem reason not working with delay
	
		}

	new Effect.Parallel([
	  new this.effectsOptions[EffectMaster].effect(Selector, this.effectsOptions[EffectMaster].opt), 
	  new this.effectsOptions[EffectParallel].effect(Selector, this.effectsOptions[EffectParallel].opt), 
	],  parallelOptions );
	
	}else if(Options == 'serial'){   //EFFECT QUEUE EFFECT ONE AFTER OTHER
	
	this.effectsOptions[EffectMaster].effect.queue = 'front'; 		//SET TO BE FIRST IN ORDER
	this.effectsOptions[EffectParallel].effect.queue = 'end'; 		//SET TO BE SECOND IN ORDER	
	//WE COULD ADD SCOPE BUT WE DO NOT NEED FOR NOW
	//this.Options.PARALEL_MAIN_bgEff.scope = 'menuxscope'; 
	
		 new this.effectsOptions[EffectMaster].effect(Selector, this.effectsOptions[EffectMaster].opt);   
		 new this.effectsOptions[EffectParallel].effect(Selector, this.effectsOptions[EffectParallel].opt);
	
	}
},

getDimensions : function(){

	this.docDimensions = document.viewport.getDimensions();             //GET CURRENT BROWSER WINDOW DIMENSIONS DOESN'T MATTER STATE RESIZE OR FULL SCREEN
	this.browserDimensions = [];
	this.browserDimensions[0] = window.screen.availWidth;	//GET BROWSER WINDOW AVAILBALE WIDTH
	this.browserDimensions[1] = window.screen.availHeight;	//GET  BROWSER WINDOW AVAILBALE HEIGHT
	
},

error : function(error){
	
	switch(error){
		case 1:
			errorInfo = 'Element is not defined.';
		break;
		case 1:
			errorInfo = 'For now this modal support only <b>a</b> tag.';
		break;		
		
	}
		
}
						
						

});

teModal.addMethods({
	modalClass  :   	   '.modal',					//set background color eg. #000 or #000000
	bgColor  :   		   '#000',					//set background color eg. #000 or #000000
	maxWidth :   		 	0.7, 		    		//set max teModal width it is possible in % means 0.7 is 70% of browser window or in px eg. 600px
	maxHeight :  			0.7,					//set max teModal height it is possible in % means 0.7 is 70% of browser window or in px eg. 600px
//	minWidth :   		 	250, 		    		//set max teModal width it is possible in % means 0.7 is 70% of browser window or in px eg. 600px
//	minHeight :  			120,					//set max teModal height it is possible in % means 0.7 is 70% of browser window or in px eg. 600px
	opacity		:  			'0.7',					//set default effect opacity, could be changed
	duration :				'2.0',					//set default effect duration, could be changed	
	delayTime :				1.0,					//set modal window effect delay ONLY FOR PARALEL EFFECTS
	backroundClose :        true,					//(true/ false) set modal window to close when you click overlay background 
	closeModal : 			'project/media/core/icons/effects/icon_close.png',       //close image apsolute path  OR just TEXT
	preloader:              'project/themes/admin/master/images/loading.gif',
	ajaxMethod : 			'post',					//(post/ get)ajax method used 
	draggable :             true, 					//(true/ false) scale everything when resizing teModal (text, images)
	footerText:				'teModal',
	validation: 			false,

	preloaderId:   	      'tePreloader',					//set background color eg. #000 or #000000
	outerRadius: 		   120,
	innerRadius:		   70,
	dashesNumber:          12,
	dashesWidth:           25,
	dashesColor:		   '#ccc',

	BG_effectOrder: 			'single',  				//single, parallel, serial 
	BG_parallelOptions: 	    'separate', 		    	//for parallel-->separate, together
	BG_effect: 				    'appear',   				//master overlay effect
	BG_effectParallel: 		    'blindDown',      	        //parallel overlay effect
	BG_effectClose: 			'fade',   				 	//master overlay effect
	BG_effectCloseParallel:     'blindUp',  				//parallel overlay effect
	BG_open_start:    		     0.0,  				//parallel overlay effect           
	BG_open_end:    		     0.7,  				//parallel overlay effect  
	BG_close_start:    		     0.7,  				//parallel overlay effect           
	BG_close_end:    		     0.0,  				//parallel overlay effect   



	modal_effectOrder: 			 'single',  				//none, single, parallel, serial
	modal_parallelOptions: 	     'separate', 		    	//for parallel-->separate, together
	modal_effect: 				 'appear',   				//master overlay effect
	modal_effectParallel: 		 'blindDown',      	        //parallel overlay effect
	modal_effectClose: 			 'fade',   				 	//master overlay effect
	modal_effectCloseParallel:   'blindUp',  				//parallel overlay effect
	modal_open_start:    		  0.0,  				//parallel overlay effect           
	modal_open_end:    		      1.0,  				//parallel overlay effect  
	modal_close_start:    		  1.0,  				//parallel overlay effect           
	modal_close_end:    		  0.0 ,				//parallel overlay effect     
	
effectsOptions : { 

	highlight: {effect : Effect.Highlight, opt : {startcolor : '#ffff99', endcolor : '#ffffff', restorecolor: '', keepBackgroundImage: true,duration : 2.0 }},
	//restorecolor: nothing- background color before effect, if set different that color will replace orginal color    
	//keepBackgroundImage: if is not true bg image will dissapear
	morph: {effect : Effect.Morph, opt : {duration : 2.0}},
    //there are two possibilities :
	//1. you define style        eg. style: {background: '', color: ''}
	//2. you define CSS class    eg. style: 'CSS_CLASS_NAME'
	move: {effect : Effect.Move, opt : {x : 50, y : 50, mode : 'relative', duration : 2.0}},
	// x: x-axis move
	// y: y-axis move  
	//mode: (relative, apsolute)
	oppacityUp: {effect : Effect.Opacity, opt : {from : 0.0, to : 1.0, duration : 2.0 }},
	oppacityDown: {effect : Effect.Opacity, opt : {from : 1.0, to : 0.0, duration : 2.0}},
	//from: strating value
	//to: finished value
	scale: {effect : Effect.Scale, opt : {scaleX : true, scaleY : true, scaleContent : true, scaleFromCenter  : false, scaleMode : 'box', scaleFrom : 100, duration : 2.0}},
	//scaleX: scaled horizontally default true
	//scaleY: scaled vertically default true
	//scaleContent: or not default true
	//scaleFromCenter: if true element stay on same position on screen
	//scaleMode : box or content or scaleMode: { originalHeight: 900, originalWidth: 900 }
	//scaleFrom: starting percentage for scaling
	appear: {effect : Effect.Appear, opt : {from : 0.0, to : 1.0, duration : 2.0}},
	blindDown : {effect : Effect.BlindDown, opt : {scaleX : false, scaleY : true, scaleContent: true, scaleFromCenter: false, scaleMode: 'box', scaleFrom: 100, scaleTo: 0, duration: 2.0}},  //scaleMode: options(box, content)   scaleFrom+ scaleTo: option(0-100)
	blindUp : {effect : Effect.BlindUp, opt : {scaleX : false, scaleY : true, scaleContent: true, scaleFromCenter: false, scaleMode: 'box', scaleFrom: 100, scaleTo: 0, duration: 2.0}}, //scaleMode: options(box, content)   scaleFrom+ scaleTo: option(0-100)
	blindRight : {effect : Effect.BlindRight, opt : {scaleX : false, scaleY : true, scaleContent: true, scaleFromCenter: false, scaleMode: 'box', scaleFrom: 100, scaleTo: 0, duration: 2.0}},  // scaleMode: options(box, content)   scaleFrom+ scaleTo: option(0-100)
	blindLeft: {effect : Effect.BlindLeft, opt : {scaleX : false, scaleY : true, scaleContent: true, scaleFromCenter: false, scaleMode: 'box', scaleFrom: 100, scaleTo: 0, duration: 2.0}}, //scaleMode: options(box, content)   scaleFrom+ scaleTo: option(0-100)
	dropOut: {effect : Effect.DropOut, opt : {duration : 2.0}},
	fade: {effect : Effect.Fade, opt : {from : 1.0, to : 0.0, duration : 2.0}},
	fold: {effect : Effect.Fold, opt : {duration : 2.0}},
	grow: {effect : Effect.Grow, opt : {duration : 2.0}},      //direction: options(center, top-left, top-right, bottom-left, bottom-right)
	puff: {effect : Effect.Puff, opt : {from : 0.0, to : 1.0, duration : 2.0}}, 
	pulsate: {effect : Effect.Pulsate, opt : {from : 0.0, pulses: 5,  duration : 2.0}}, //from : options(0.0-1.0)--opacity  pulses :  number of pulses
	shake: {effect : Effect.Shake, opt : {duration : 0.5, distance : 20, duration : 2.0}},
	shrink: {effect : Effect.Shrink, opt : { direction : 'center',duration : 2.0}},//direction: options(center, top-left, top-right, bottom-left, bottom-right)
	slideDown : {effect : Effect.SlideDown, opt : {scaleX : false, scaleY : true, scaleContent: true, scaleFromCenter: false, scaleMode: 'box', scaleFrom: 100, scaleTo: 0, duration: 2.0}},//scaleMode: options(box, content)   scaleFrom+ scaleTo: option(0-100) //must be warped in 2 div's
	slideUp : {effect : Effect.SlideUp,opt : { scaleX : false, scaleY : true, scaleContent: true, scaleFromCenter: false, scaleMode: 'box', scaleFrom: 100, scaleTo: 0, duration: 2.0}}, //scaleMode: options(box, content)   scaleFrom+ scaleTo: option(0-100)//must be warped in 2 div's
	squish: {effect : Effect.Squish, opt : {direction : 'center',duration : 2.0}},
	switchOff: {effect : Effect.SwitchOff, opt : {duration : 2.0}},
	ScrollTo: {effect : Effect.ScrollTo, opt : {offset: 0,duration : 2.0}}
}





});


