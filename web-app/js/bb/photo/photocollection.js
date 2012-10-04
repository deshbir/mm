//Photo Backbone Collection
PhotoCollection = new function() {
	  var collection = null;
	  var Collection = Backbone.Collection.extend({
	          model: PhotoModel.get(),
	          url: "/" + com.compro.cgrails.APPLICATIONNAME + "/api/photo/"
		    
	  });
 	  this.get = function(){ // Each backbone collection needs to define "get()" function
	          if (this.collection == null) {
		         this.collection = new Collection();
	          }
		  return this.collection;
	  };
};