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
							
							var photoEl = $("#library-photos > #" + model.id);
							var props = {source: model.dir + model.fullfilename, thumbnail:model.dir + model.thumbfilename}; 
							var handle = new com.cengage.mm.tools.ToolElementDragHandler(photoEl, "com.compro.ppt.Image", props);				
						});
		 }); 
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};