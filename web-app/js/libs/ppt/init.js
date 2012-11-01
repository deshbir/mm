// ******************** START Self executing independent block************

(function(){
	var namespacefn = c$.namespace("com.compro.ppt.GLOBAL");
	
	function callHandlers(handlers,context,data){
		for(var i=1;i<handlers.length;i++){
			handlers[i].apply(context,data);
		}
	}
	namespacefn.triggerGlobalEvent = function (type,context,data){
		if(namespacefn.eventMap[type].length>1){
			(namespacefn.eventMap[type])[0].apply(context,[namespacefn.eventMap[type],data]);
		}
	}
	
	function afterPPTInit(handlers){
		callHandlers(handlers,this);
	}
	
	function onPickClick(handlers,pick){
		var obj = pick.externalObject();
		callHandlers(handlers,obj,[obj]);
	}
	
	function onPickUnSelect(handlers,pick){
		var obj = pick.externalObject();
		callHandlers(handlers,obj,[obj]);
	}
	
	function onStateChanged(handlers,state){
		callHandlers(handlers,this,[state]);
	}
	
	var EVENT_ON_PICK_CLICK = "ON_PICK_CLICK";
	var EVENT_ON_PICK_UNSELECT = "ON_PICK_UNSELECT";
	var EVENT_AFTER_PPT_INIT = "AFTER_PPT_INIT";
	var EVENT_STATE_CHANGED= "STATE_CHANGED";
	
	namespacefn.eventMap = {};
	namespacefn.eventMap[EVENT_AFTER_PPT_INIT] = [afterPPTInit];
	namespacefn.eventMap[EVENT_ON_PICK_CLICK] = [onPickClick];
	namespacefn.eventMap[EVENT_ON_PICK_UNSELECT] = [onPickUnSelect];
	namespacefn.eventMap[EVENT_STATE_CHANGED] = [onStateChanged];
	
	namespacefn.initialize = function(collageid,workspaceid,pickConfig, stateJson, selectedSlide){
		$(document).ready(function(){
			namespacefn.updatePickConfig(pickConfig);
			namespacefn.initWorkspace(collageid,workspaceid,stateJson,selectedSlide);
			namespacefn.triggerGlobalEvent(EVENT_AFTER_PPT_INIT,this);
		});
	}
	namespacefn.registerEvent = function(type,handler){
		if(namespacefn.eventMap[type]){
			if(namespacefn.eventMap[type].indexOf(handler)==-1){
				namespacefn.eventMap[type].push(handler);
			}
		}
	}
	
})();

