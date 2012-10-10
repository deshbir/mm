EditorView = new function() {

	var router = null;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'editor':'editor'
	    },	    
	    editor : function() {
	    	EditorView.initialize();
	    }
	});
	
	this.initialize = function(){
		if (router == null) {
			router = new Router();
		}
		
		EditorCollection.get().fetch({
			success: function(){
				TemplateManager.get('editor-panel', function(template){
					$("#library-photos").append(template);
				});
			}
		});
		
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};