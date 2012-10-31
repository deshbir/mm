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
							//Adding show event with accordion tabs
				     	    
							$('#' + model.toJSON().toolid).on('show', function () {
				     	    	Backbone.history.navigate("#/"+ model.toJSON().toolid, {trigger:true});
				    		});
							
						});
				});
				$('#photo').collapse('show');
			}
		});
		
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};