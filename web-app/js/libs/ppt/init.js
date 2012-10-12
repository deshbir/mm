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
		var obj = {
				rotate:pick.rotate,
				resize:pick.resize,
				deletePick:pick.deletePick
		}
		callHandlers(handlers,obj,[obj]);
	}
	
	var EVENT_ON_PICK_CLICK = "ON_PICK_CLICK";
	var EVENT_AFTER_PPT_INIT = "AFTER_PPT_INIT";
	
	namespacefn.eventMap = {};
	namespacefn.eventMap[EVENT_AFTER_PPT_INIT] = [afterPPTInit];
	namespacefn.eventMap[EVENT_ON_PICK_CLICK] = [onPickClick];
	
	namespacefn.initialize = function(collageid,workspaceid){
		$(document).ready(function(){
			namespacefn.initWorkspace(collageid,workspaceid);
			namespacefn.triggerGlobalEvent(EVENT_AFTER_PPT_INIT,this);
		});
	}
	namespacefn.registerEvent = function(type,handler){
		if(namespacefn.eventMap[type]){
			namespacefn.eventMap[type].push(handler);
		}
	}
	
})();