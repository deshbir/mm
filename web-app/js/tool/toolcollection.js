//Tool Backbone Collection
ToolCollection = new function() {
	  var collection = null;
	  var Collection = Backbone.Collection.extend({
	          model: ToolModel.get(),
	          url: "/" + com.compro.cgrails.APPLICATIONNAME + "/api/tool/"
		    
	  });
 	  this.get = function(){ // Each backbone collection needs to define "get()" function
	          if (this.collection == null) {
		         this.collection = new Collection();
	          }
		  return this.collection;
	  };
};