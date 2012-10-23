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
					//if(modelJ.options){
						//options = modelJ.options.replace(/\'/g,'"');
						//options = JSON.parse(options);
					//}
					//adding into raphaelAttributes of text
					var props = {
								options:modelJ.shapeConfig,
								items:[{
										raphaelType:modelJ.raphaelType,
										raphaelAttributes:modelJ.raphaelAttributes
										}]
								}; 
					var handle = new com.cengage.mm.tools.ToolElementDragHandler(textEl[0], "com.compro.ppt.Shape", props);
				});
				com.compro.application.mm.resetScrollbars();
			}
		});
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};