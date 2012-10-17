//Text Backbone Collection
TextCollection = new function() {
	  var collection = null;
	  var Collection = Backbone.Collection.extend({
	          model: TextModel.get(),
	          url: "/" + com.compro.cgrails.APPLICATIONNAME + "/api/text/"
		    
	  });
 	  this.get = function(){ // Each backbone collection needs to define "get()" function
	          if (collection == null) {
		         collection = new Collection();
	          }
		  return collection;
	  };
};