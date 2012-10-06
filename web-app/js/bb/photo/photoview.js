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
							
							var photoEl = $("#library-photos > #photo" + model.toJSON().id);
							var props = {source: model.toJSON().dir + model.toJSON().fullfilename, thumbnail:model.toJSON().dir + model.toJSON().thumbfilename}; 
							var handle = new com.cengage.mm.tools.ToolElementDragHandler(photoEl[0], "com.compro.ppt.Image", props);				
						});
		 }); 
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};