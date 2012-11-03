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
						var modelJ = ToolCollection.get().toJSON();
						var compiledTemplate = Mustache.render(template, modelJ);
						$("#toolbar").append(compiledTemplate);
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