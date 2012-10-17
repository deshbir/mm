TextView = new function() {

	var router = null;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'text':'text'
	    },	    
	    text : function() {
	    	TextView.initialize();
	    }
	});
	
	this.initialize = function(){
		if (router == null) {
			router = new Router();
		}
		
		TextCollection.get().fetch({
			success: function(){
				TemplateManager.get('text-panel', 
					function(template){
				}); 
			}
		});
		
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};