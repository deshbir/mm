PhotoView = new function() {

	var router = null;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'photo':'photo'
	    },	    
	    photo : function() {
	    	PhotoView.initialize()
	    }
	});
	
	this.initialize = function(){
		if (router == null) {
			router = new Router();
		}
		
		PhotoCollection.get().fetch();
		TemplateManager.get('right1', 
							function(template){
								PhotoCollection.get().each(function(model){
									var compiledTemplate = Mustache.render(template, model.toJSON());
									$("#toolbar").append(compiledTemplate);
								});
		 }); 
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};