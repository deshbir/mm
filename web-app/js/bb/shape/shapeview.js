ShapeView = new function() {

	var router = null;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'shape':'shape'
	    },	    
	    shape : function() {
	    	ShapeView.initialize();
	    }
	});
	
	this.initialize = function(){
		if (router == null) {
			router = new Router();
		}
	
		TemplateManager.get('shape-static', 
			function(template){
				$("#text .scroll-pane").append(template);
			});
		ShapeCollection.get().fetch({
			success: function(){
				ShapeCollection.get().each(function(model){
					var modelJ = model.toJSON();
					var textEl = $("#text #" + modelJ.type);
					var options;
					if(modelJ.shapeConfig){
			         options = (modelJ.shapeConfig);
					}
					//adding into raphaelAttributes of text
					var props = {
								options:options,
								items:[{
										raphaelType:modelJ.raphaelType,
										raphaelAttributes:modelJ.raphaelAttributes
										}]
								}; 
					var handle = new com.cengage.mm.tools.ToolElementDragHandler(textEl[0], "com.compro.ppt.Shape", props);
				});
				//Reset scrollbars on the main windows
				setTimeout('com.compro.application.mm.resetScrollbars();', 60);				
			}
		});
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};