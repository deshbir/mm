View1 = new function() {

	var router = null;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'menu1':'menu1'
	    },	    
	    menu1 : function() {
	    	View1.initialize()
	    }
	});
	this.initialize = function(){
		if (router == null) {
			router = new Router();
		}
		TemplateManager.get('template1', function(template){
			$("#main_container").html(template);
		 }); 
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};