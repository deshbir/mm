ToolView = new function() {

	var router = null;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'tool':'tool'
	    },	    
	    tool : function() {
	    	ToolView.initialize();
	    }
	});
	
	this.initialize = function(){
		if (router == null) {
			router = new Router();
		}
		
		ToolCollection.get().fetch({
			success: function(){
				TemplateManager.get('right-panel', 
					function(template){
						ToolCollection.get().each(function(model){
							var compiledTemplate = Mustache.render(template, model.toJSON());
							$("#toolbar").append(compiledTemplate);
						});
						ToolCollection.get().each(function(model){
							//Adding show event with accordion tabs
				     	    var func = model.toJSON().viewName + "View.initialize()";
				     	    eval(func);
						});
				});
				$('#photo').addClass('in');
				
			}
		});
		
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};