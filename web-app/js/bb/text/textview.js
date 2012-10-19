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
				$("#text > .accordion-inner ").html("<div class='scroll-pane'></div>");
				$("#text .scroll-pane").append(template);
			});
		
		TextCollection.get().fetch({
			success: function(){
				TextCollection.get().each(function(model){
					var modelJ = model.toJSON();
					
					var textEl = $("#text #" + modelJ.type);
					var attr = modelJ.raphaelAttributes.replace(/\'/g,'"');
					var raphaelAttr = JSON.parse(attr);					
					//adding into raphaelAttributes of text
					var props = {raphaelAttributes:raphaelAttr};
					//var props = {raphaelAttributes:{text: modelJ.text, "font-family": modelJ.fontfamily, "font-size": modelJ.fontsize, "font-weight": modelJ.fontweight, stroke: modelJ.fontcolor}}; 
					var handle = new com.cengage.mm.tools.ToolElementDragHandler(textEl[0], "com.compro.ppt.Text", props);
				});
				Backbone.history.navigate("#/shape", {trigger:true});
				//com.compro.application.mm.resetScrollbars();
			}
		});
		
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};