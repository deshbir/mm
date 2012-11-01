//Magazine Backbone Collection
MagazineCollection = new function() {
	  var collection = null;
	  var Collection = Backbone.Collection.extend({
	          model: MagazineModel.get(),
	          url: com.compro.cgrails.REQUEST_CONTEXT + "/api/magazine/"
		    
	  });
 	  this.get = function(){ // Each backbone collection needs to define "get()" function
	          if (collection == null) {
		         collection = new Collection();
	          }
		  return collection;
	  };
};