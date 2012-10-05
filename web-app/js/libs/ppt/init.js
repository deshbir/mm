// ******************** START Self executing independent block************

(function(){
	var namespacefn = c$.namespace("com.compro.ppt.GLOBAL");
	/*var ready =false;
	var fnStack = [];*/

	/*var whenReady = function(fn){
		if(ready){
			fn.call(this);
			return;
		}
		fnStack.push(fn);
	}*/

	namespacefn.initialize = function(collageid,workspaceid){
		$(document).ready(function(){
			namespacefn.initWorkspace(collageid,workspaceid);
		});
	}
	/*var readyStateCheckInterval = setInterval(function() {
	    if (document.readyState === "complete") {
	    	clearInterval(readyStateCheckInterval);
	    	ready=true;
	        while(fnStack.length!=0){
	       		(fnStack[0]).apply(this);
	       		fnStack.splice(0,1);
	       		console.log(fnStack.length);
	       	}
	        
	    }
	}, 10);*/
})();