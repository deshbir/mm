ToolView = new function() {

	var router = null;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'tool':'tool'
	    },	    
	    tool : function() {
	    	ToolView.initialize();
	    }
	});
	
	this.initialize = function(){
		if (router == null) {
			router = new Router();
		}
		
		ToolCollection.get().fetch();
		TemplateManager.get('right-panel', 
							function(template){
								ToolCollection.get().each(function(model){
									var compiledTemplate = Mustache.render(template, model.toJSON());
									$("#toolbar").append(compiledTemplate);
								});
		 });
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};