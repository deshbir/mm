PhotoView = new function() {

	var router = null;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'photo/:category':'photo'
	    },	    
	    photo : function(category) {
	    	PhotoView.initialize(category)
	    }
	});
	
	this.initialize = function(category){
		if (router == null) {
			router = new Router();
		}
		
		PhotoCollection.get(category).fetch({
			success: function(){
				TemplateManager.get('photo-panel', 
					function(template){
						$("#library-photos").removeClass("mCustomScrollbar");
						$("#library-photos").html("");
						PhotoCollection.get(category).each(function(model){
							var modelJ = model.toJSON();
							var compiledTemplate = Mustache.render(template, modelJ);
							$("#library-photos").append(compiledTemplate);
							
							var photoEl = $("#library-photos > #photo" + modelJ.id);
							var photoDir = "/" + com.compro.cgrails.APPLICATIONNAME + "/" + modelJ.dir;
							var props = {source: photoDir + modelJ.fullfilename, thumbnail: photoDir + modelJ.thumbfilename}; 
							var handle = new com.cengage.mm.tools.ToolElementDragHandler(photoEl[0], "com.compro.ppt.Image", props);				
						});
					}); 
				
				//Reset scrollbars on the main windows 
				//var mainAppWindow = com.compro.application.mm;
				setTimeout('com.compro.application.mm.resetScrollbars();', 5000);
			}
		});
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};