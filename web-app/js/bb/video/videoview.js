VideoView = new function() {

	var router = null;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'video':'video'
	    },	    
	    video : function() {
	    	VideoView.initialize();
	    }
	});
	
	this.initialize = function(){
		if (router == null) {
			router = new Router();
		}
		
		TemplateManager.get('video-static', 
				function(template){
			$("#video > .accordion-inner ").html(template);
		});		
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};