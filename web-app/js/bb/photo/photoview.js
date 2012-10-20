PhotoView = new function() {

	var router = null;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'photo/:category':'photo',
	      'photo':'photo'
	    },	    
	    photo : function(category) {
	    	PhotoView.initialize(category)
	    }
	});
	
	this.initialize = function(category){
		if (router == null) {
			router = new Router();
		}
		
		TemplateManager.get('photo-static', 
			function(template){
				$("#photo > .accordion-inner ").html(template);
		});
		
		PhotoCollection.get(category).fetch({
			success: function(){
				TemplateManager.get('photo-panel', 
					function(template){
						$("#library-photo").removeClass("mCustomScrollbar");
						$("#library-photo").html("");
						PhotoCollection.get(category).each(function(model){
							var modelJ = model.toJSON();
							var compiledTemplate = Mustache.render(template, modelJ);
							$("#library-photo").append(compiledTemplate);
							
							var photoEl = $("#library-photo > #photo" + modelJ.id);
							var photoDir = com.compro.cgrails.utils.resource(modelJ.dir);
							var props = {source: photoDir + modelJ.fullfilename, thumbnail: photoDir + modelJ.thumbfilename}; 
							var handle = new com.cengage.mm.tools.ToolElementDragHandler(photoEl[0], "com.compro.ppt.Image", props);				
						});
					}); 
				
				//Reset scrollbars on the tool windows - Once the all images are loaded
				$('#library-photo').imagesLoaded(function() {
					com.compro.application.mm.resetScrollbars();
				});
			}
		});
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};