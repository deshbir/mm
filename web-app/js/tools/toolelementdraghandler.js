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
	/*(function initializeModule()	{
		
	})();*/
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
		
		//Calculating the position of the mouse on the image to calculate correct position of dropped pick
		var workspaceEl = namespace.workspace.el;
		
		//Calculating the top-left coordinates in workspace where the pick would be placed
		var positionData = validateDrop(event, workspaceEl, elementDragged);
		if(positionData.isValid){
			var jsonProperties=JSON.parse(elementDragged.getAttribute(config.dataString + config.propString));
			//verifying if raphaelAttributes exist else create a new property called raphaelAttributes - might exists in shapes but not in images
			if (jsonProperties.raphaelAttributes == null)
				jsonProperties.raphaelAttributes = {};
			
			//passing element height width
			jsonProperties.raphaelAttributes.width = elementDragged.offsetWidth;
			jsonProperties.raphaelAttributes.height = elementDragged.offsetHeight;
			
			//Passing Properties and handler
			//Params:Handler,coordX,coordY,properties,toolsProps,storageProp(null),isFromStorage
			var handler = elementDragged.getAttribute(config.dataString + config.handlerString);
			namespace.workspace.addPick(handler,positionData.coordX,positionData.coordY,jsonProperties);
		}
		elementDragged.parentElement.removeChild(elementDragged);
		elementDragged = null;
		document.body.style.cursor = "default";
	}
	
	/*
	 * function to validate that element being dragged lies
	 * within the allowed area for dropping the element
	 */
	
	function validateDrop(event, workspaceEl, el){
		var workspaceBorder = parseFloat($(workspaceEl).css("border"));
		var workspacePaddingRight = parseFloat($(workspaceEl).css("padding-right"));
		var workspacePaddingTop = parseFloat($(workspaceEl).css("padding-top"));
		var workspacePaddingLeft = parseFloat($(workspaceEl).css("padding-left"));
		var workspacePaddingBottom = parseFloat($(workspaceEl).css("padding-bottom"));
		var coordX = event.pageX - $(workspaceEl).offset().left-workspacePaddingLeft-gElementDraggedX;
		var coordY = event.pageY -$(workspaceEl).offset().top-workspacePaddingTop-gElementDraggedY;
		coordX = coordX<0?(coordX+workspacePaddingLeft):coordX;
		coordY = coordY<0?(coordY+workspacePaddingTop):coordY;
		
		
		//Validating if coordinates lie inside the workspace
		var elementWidth = el.offsetWidth;
		var elementHeight = el.offsetHeight;
		var isSvg = false;
		
		if(el.childNodes.length >0 && el.childNodes[0].nodeName == 'svg') {
			elementWidth = el.width.animVal.value;
			elementHeight = el.height.animVal.value;
			console.log("elementWidth",elementWidth);	
			console.log("elementHeight",elementHeight);
			isSvg = true;
		}
		
		if(coordX>=0 && 
		(coordX<=workspaceEl.offsetWidth-elementWidth) &&
		coordY>=0 && coordY<=(workspaceEl.offsetHeight-elementHeight))
		{
			console.log("Inside");
			if(coordX>workspaceEl.offsetWidth-elementWidth - workspacePaddingRight - workspaceBorder)
				coordX = coordX - workspacePaddingRight - workspaceBorder;
			if(coordY>workspaceEl.offsetHeight-elementHeight - workspacePaddingBottom - workspaceBorder)
				coordY = coordY - workspacePaddingBottom - workspaceBorder;
			isValid = true;
		} else{
			isValid = false;
		}
		console.log("****************el : ", el);
		console.log("****************border : ", parseFloat(el.style.borderWidth));
		return {
			"coordX": coordX + parseFloat((!isSvg)?  0 : (Utils.getCssComputedProperty(el, 'padding-left'))),
			"coordY" : coordY + parseFloat((!isSvg)?  0 : ((parseFloat(Utils.getCssComputedProperty(el, 'padding-top'))) - parseFloat(el.style.borderWidth))),
			"isValid" : isValid

		};
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
		elementDragged.style.display="block";
		var posX = event.pageX-gElementDraggedX;
		var posY = event.pageY-gElementDraggedY;
		elementDragged.style.left = posX + "px";
		elementDragged.style.top = posY + "px";
		//handling for cursor-type while dragging
		var workspaceEl = namespace.workspace.el;
		var positionData = validateDrop(event, workspaceEl,elementDragged);
		if(!positionData.isValid){
			elementDragged.style.cursor = "not-allowed";
			document.body.style.cursor = "not-allowed";
		} else {
			elementDragged.style.cursor = "move";
			document.body.style.cursor = "move";
		}
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
		
		var mouseUpHandler = function(event) {
				event.preventDefault();
				droppedOnBody(event);
				Utils.removeEvent(document.body, 'mouseup.tool_mm');
				Utils.removeEvent(document.body, 'mousemove.tool_mm');
		};
		
		var mouseMoveHandler = function(event){
			//elementDragged.style.display="block";
			continueDragging(event);
		}


		Utils.attachEvent(el, 'mousedown',function (event) {
			event.preventDefault();
			dragStart(event,el);
			Utils.attachEvent(document.body, 'mouseup.tool_mm',mouseUpHandler,false);
			Utils.attachEvent(document.body, 'mousemove.tool_mm',mouseMoveHandler,false);
		}, false);
		Utils.attachEvent(el, 'dragstart',function (event) {
			event.preventDefault();
		}, false);
		

		//for touch devices
		Utils.attachEvent(el, 'touchstart',function (event) {
			dragStart(event.changedTouches[0], el);
			event.stopPropagation();
		}, false);
				
		Utils.attachEvent(el, 'touchmove',function (event) {
			event.preventDefault();
			continueDragging(event.changedTouches[0]);
		}, false);

		Utils.attachEvent(el, 'touchend',function (event) {
			event.preventDefault();
			droppedOnBody(event.changedTouches[0]);
		},false);
			
	
		/********************************************************/
		/*                 Event Handlers                       */ 
		/********************************************************/

		/*
		* event Handler for the dragstart event on the elements inside Tools
		*/
		function dragStart(event, el) {
			if(elementDragged==null){
				elementDragged = el;
				gElementDraggedX = event.pageX-$(elementDragged).offset().left;
				gElementDraggedY = event.pageY-$(elementDragged).offset().top;
			}
			elementDragged = el;
			var elementSibling = $(elementDragged).next();
			var elementParent = $(elementDragged).parent();
			var height = $(elementDragged).height();
			var width = $(elementDragged).width();
			var offset = $(elementDragged).offset();
			
			//Cloning and adding duplicate DOM element
			var cloneObj = ($(elementDragged).clone())[0];
			/*if (elementSibling[0] == null) {
				cloneObj = $(elementDragged).clone();
				$(cloneObj).appendTo(elementParent[0]);
			} else
				cloneObj = $(elementDragged).clone().insertBefore(elementSibling);*/
			
			//getting JSOn property of element
			//var jsonProperties=JSON.parse(elementDragged.getAttribute(config.dataString + config.propString));
			//new com.cengage.mm.tools.ToolElementDragHandler(cloneObj,elementDragged.getAttribute(config.dataString + config.handlerString),jsonProperties);
			
			$(cloneObj).appendTo($("body"));
			cloneObj.style.zIndex=-1;
			cloneObj.style.display="none";
			cloneObj.style.left = offset.left + "px";
			cloneObj.style.top = offset.top + "px";
			cloneObj.style.position ="absolute";
			cloneObj.style.zIndex = 999;
			
			$(cloneObj).width(width);
			elementDragged = cloneObj;
		}
	}

	/********************************************************/	
	/*                 PUBLIC METHODS                       */ 
	/********************************************************/
	return constr;
	//-------------------------------------------------------/


}())


