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
/*                 Private Members                      */ 
/********************************************************/	
var elementDragged = null;

var DnDManager = function(handler, parent, appendBeforeElement, jsonProp) {
	var domElement = addToDom();

	addListeners(domElement);	

	function addListeners(el){
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
		},false);

		Utils.attachEvent(el, 'dragend',function (event) {
		 this.parentElement.removeChild(this);
		},false);
		
		
	}
	
	function addToDom(){
		var el = Utils.createElement('img');
		el.className = "thumbnail";
		el.src = jsonProp.thumnbnail;
		
		if(appendBeforeElement==null)
			Utils.appendChild(parent, el);
			//parent.appendChild(that.el);
		else
			Utils.insertBefore(parent, el, appendBeforeElement);
		el.setAttribute(config.dataString + config.handlerString,handler);
		el.setAttribute(config.dataString + config.propString,JSON.stringify(jsonProp));
			//parent.insertBefore(that.el,appendBeforeElement);
		return el;
	}