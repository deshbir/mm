//Editor Backbone Collection
VideoCollection = new function() {
	  var collection = null;
	  var Collection = Backbone.Collection.extend({
	          model: VideoModel.get(),
	          url: com.compro.cgrails.REQUEST_CONTEXT + "/api/video/"
		    
	  });
 	  this.get = function(){ // Each backbone collection needs to define "get()" function
	          if (this.collection == null) {
		         this.collection = new Collection();
	          }
		  return this.collection;
	  };
};