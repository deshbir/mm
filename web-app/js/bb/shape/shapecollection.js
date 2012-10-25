//Text Backbone Collection
ShapeCollection = new function() {
	  var collection = null;
	  var Collection = Backbone.Collection.extend({
	          model: ShapeModel.get(),
	          url: com.compro.cgrails.REQUEST_CONTEXT + "/api/shape/"
		    
	  });
 	  this.get = function(){ // Each backbone collection needs to define "get()" function
	          if (collection == null) {
		         collection = new Collection();
	          }
		  return collection;
	  };
};