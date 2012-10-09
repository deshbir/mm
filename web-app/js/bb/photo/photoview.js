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
		PhotoCollection.get().fetch({
			success: function(){
				TemplateManager.get('photo-panel', 
					function(template){
						PhotoCollection.get().each(function(model){
							var modelJ = model.toJSON();
							var compiledTemplate = Mustache.render(template, modelJ);
							$("#library-photos").append(compiledTemplate);
							
							var photoEl = $("#library-photos > #photo" + modelJ.id);
							var props = {source: modelJ.dir + modelJ.fullfilename, thumbnail:modelJ.dir + modelJ.thumbfilename}; 
							var handle = new com.cengage.mm.tools.ToolElementDragHandler(photoEl[0], "com.compro.ppt.Image", props);				
						});
					}); 
				
				//Reset scrollbars on the main windows 
				var mainAppWindow = com.compro.application.mm;
				setTimeout('com.compro.application.mm.resetScrollbars();', 60);
			}
		});
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};