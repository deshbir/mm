//Tool Backbone Collection
ToolCollection = new function() {
	  var collection = null;
	  var Collection = Backbone.Collection.extend({
	          model: ToolModel.get(),
	          url: com.compro.cgrails.REQUEST_CONTEXT + "/api/tool/"
		    
	  });
 	  this.get = function(){ // Each backbone collection needs to define "get()" function
	          if (collection == null) {
		         collection = new Collection();
	          }
		  return collection;
	  };
};