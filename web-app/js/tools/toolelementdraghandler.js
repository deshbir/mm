/*
* Commom Module for Tool Element Drag Functions
*
*/

c$.namespace("com.cengage.mm.tools");
com.cengage.mm.tools.ToolElementDragHandler = (function(){

 	/********************************************************/
	/*                   DEPENDENCIES                       */ 
	/********************************************************/
	var namespace = com.compro.ppt;
	var Utils = namespace.Utils;

	/********************************************************/	
	/*                 Private Members                     */ 
	/********************************************************/
	var config = {
		dataString:'data-',
		handlerString:'handler',
		propString:'prop'
	}

	/********************************************************/
	/*                 Private Shared Members               */ 
	/********************************************************/	
	var elementDragged = null;

	/********************************************************/
	/*                 ONE TIME INIT FUNCTIONS              */ 
	/********************************************************/
	(function initializeModule()	{

		Utils.attachEvent(document.body, 'drop',function (event) {
			event.preventDefault();
			droppedOnBody(event);
				},false);

		Utils.attachEvent(document.body, 'dragover',function (event) {
			event.preventDefault();
			continueDragging(event);
		},false);

	})();
	//-------------------------------------------------------/

	/**************************************************/
	/*            BODY EVENT HANDLERS                 */ 
	/**************************************************/
	/*
	* Event Handler for Drop event.
	* The target of the drop event is the element where 
	* the other element is being dropped
	*/
	function droppedOnBody(event) {
		
		if(elementDragged==null) {
			return;
		}
		//Get What is being dragged and its x / y possition
		var source = elementDragged.src;
		
		var elementDraggedX = event.pageX-$(elementDragged).offset().left;
		var elementDraggedY = event.pageY-$(elementDragged).offset().top;
		
		//Calculating the position of the mouse on the image to calculate correct position of dropped pick
		var workspaceEl = namespace.workspace.el;
		console.log($(elementDragged).offset(),$(workspaceEl).offset());
		if(elementDraggedX<0 || elementDraggedX>elementDragged.offsetWidth)
			elementDraggedX = gElementDraggedX;
		if(elementDraggedY<0 || elementDraggedY>elementDragged.offsetHeight)
			elementDraggedY = gElementDraggedY;

		console.log(elementDragged);
		//Calculating the top-left coordinates in workspace where the pick would be placed
		var coordX = event.pageX - $(workspaceEl).offset().left-elementDraggedX;
		var coordY = event.pageY -$(workspaceEl).offset().top-elementDraggedY;
		
		//Validating if coordinates lie inside the workspace
		if(coordX>=0 && 
		(coordX<=workspaceEl.offsetWidth) &&
		coordY>=0 && coordY<=(workspaceEl.offsetHeight))
		{
			var jsonProperties=JSON.parse(elementDragged.getAttribute(config.dataString + config.propString));
			
			//Passing Properties and handler
			//Params:Handler,coordX,coordY,properties,toolsProps,storageProp(null),isFromStorage
			var handler = elementDragged.getAttribute(config.dataString + config.handlerString);
			namespace.workspace.addPick(handler,coordX,coordY,jsonProperties);
		} else{
		console.log(coordX, " " ,workspaceEl.offsetWidth);
		console.log(coordY, " " ,workspaceEl.offsetHeight);
		}

		//myeltPPT.elementDragged.parentElement.removeChild(myeltPPT.elementDragged);
		elementDragged = null;		
	}

	/*
	* Handler for dragging(before dropping onto the Slide) the elements from Tools to Slide
	*/
	//For dragging effect
	function continueDragging(event){
		if(elementDragged==null) {
			return;
		}
		//var workspaceEl = Utils.getById("workspace");
		//Calculating dragged image new coordinates
		var posX = event.pageX-gElementDraggedX;
		var posY = event.pageY-gElementDraggedY;
		elementDragged.style.left = posX + "px";
		elementDragged.style.top = posY + "px";
	}	
	
	/********************************************************/	
	/*                 CONSTRUCTOR                          */ 
	/********************************************************/

	/**
		el: Dom Element
		handler: The object which will handle the creation of the Pick 
             in terms of Rapheal attributes.
		jsonProp: Properties which would eventually be passed to workspace object.
	*/
	var constr = function(el, handler, jsonProp) {
		
		el.setAttribute(config.dataString + config.handlerString,handler);
		el.setAttribute(config.dataString + config.propString, JSON.stringify(jsonProp));

		Utils.attachEvent(el, 'dragstart',function (event) {
			dragStart(event);
		}, false);

		//for touch devices
		Utils.attachEvent(el, 'touchstart',function (event) {
			dragStart(event.changedTouches[0]);
		}, false);
				
		Utils.attachEvent(el, 'touchmove',function (event) {
			event.preventDefault();
			continueDragging(event.changedTouches[0]);
		}, false);

		Utils.attachEvent(el, 'touchend',function (event) {
			event.preventDefault();
			 this.parentElement.removeChild(this);
			drop(event.changedTouches[0]);
		},false);

		Utils.attachEvent(el, 'mousemove',function (event) {
		//	animation.mouseMove(event);
		},
		false);

		Utils.attachEvent(el, 'dragend',function (event) {
			this.parentElement.removeChild(this);
		},false);
			
	
		/********************************************************/
		/*                 Event Handlers                       */ 
		/********************************************************/

		/*
		* event Handler for the dragstart event on the elements inside Tools
		*/
		function dragStart(event) {
			if(elementDragged==null){
				elementDragged = event.target;
				gElementDraggedX = event.pageX-$(elementDragged).offset().left;
				gElementDraggedY = event.pageY-$(elementDragged).offset().top;
			}
			console.log("dragStart Event" + event.target);
			elementDragged = event.target;
			var elementSibling = $(elementDragged).next();
			var elementParent = $(elementDragged).parent();
			var height = $(elementDragged).height();
			var width = $(elementDragged).width();
			var offset = $(elementDragged).offset();
			
			//Cloning and adding duplicate DOM element
			var cloneObj;
			if (elementSibling[0] == null) {
				cloneObj = $(elementDragged).clone();
				$(cloneObj).appendTo(elementParent[0]);
			} else
				cloneObj = $(elementDragged).clone().insertBefore(elementSibling);
			
			//getting JSOn property of element
			var jsonProperties=JSON.parse(elementDragged.getAttribute(config.dataString + config.propString));
			new com.cengage.mm.tools.ToolElementDragHandler(cloneObj[0],elementDragged.getAttribute(config.dataString + config.handlerString),jsonProperties);
			
			console.log("dragStart",elementDragged);
			$(elementDragged).appendTo($("body"));
			elementDragged.style.left = offset.left + "px";
			elementDragged.style.top = offset.top + "px";
			elementDragged.style.position ="absolute";
			event.target.style.zIndex=999;
			
			$(elementDragged).width(width);
			$(elementDragged).height();
		}
	}

	/********************************************************/	
	/*                 PUBLIC METHODS                       */ 
	/********************************************************/
	return constr;
	//-------------------------------------------------------/


}())