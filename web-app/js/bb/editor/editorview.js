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
					$(EditorView).triggerHandler("painted");
				});
				//Reset scrollbars on the main windows
				setTimeout('com.compro.application.mm.resetScrollbars();', 60);

				var myPPTApp = com.compro.ppt.GLOBAL;			
				$("#deleteobject").click(function (event) {
					myPPTApp.removeObject();
				});
				$("#sendback").click(function (event) {
					myPPTApp.moveObjectToBack();
				});
				$("#forward").click(function (event) {
					myPPTApp.moveObjectToFront();
				});
			}		
		});		
		
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};