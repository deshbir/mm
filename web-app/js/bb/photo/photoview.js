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
		TemplateManager.get('photo-panel', 
					function(template){
						PhotoCollection.get().each(function(model){
							var compiledTemplate = Mustache.render(template, model.toJSON());
							$("#library-photos").append(compiledTemplate);
						});
		 }); 
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};