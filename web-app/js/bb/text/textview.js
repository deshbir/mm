TextView = new function() {

	var router = null;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'text':'text'
	    },	    
	    text : function() {
	    	TextView.initialize();
	    }
	});
	
	this.initialize = function(){
		if (router == null) {
			router = new Router();
		}
		
		TemplateManager.get('text-static', 
			function(template){
				$("#text > .accordion-inner ").html(template);
			});
		
		TextCollection.get().fetch({
			success: function(){
				TextCollection.get().each(function(model){
					var modelJ = model.toJSON();
					
					var textEl = $("#text #" + modelJ.type);
					var props = {text: modelJ.text, "font-family": modelJ.fontfamily, "font-size": modelJ.fontsize, "font-weight": modelJ.fontweight, stroke: modelJ.fontcolor}; 
					var handle = new com.cengage.mm.tools.ToolElementDragHandler(textEl[0], "com.compro.ppt.Text", props);
				});
				com.compro.application.mm.resetScrollbars();
			}
		});
		
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};