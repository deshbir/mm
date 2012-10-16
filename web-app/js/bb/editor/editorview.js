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
		
		TemplateManager.get('editor-static', 
				function(template){
			$("#editor > .accordion-inner ").html(template);
		});		
		EditorCollection.get().fetch({
			success: function(){
				TemplateManager.get('editor-panel', function(template){
					$("#library-editor").html(template);
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