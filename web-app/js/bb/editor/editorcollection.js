//Editor Backbone Collection
EditorCollection = new function() {
	  var collection = null;
	  var Collection = Backbone.Collection.extend({
	          model: EditorModel.get(),
	          url: com.compro.cgrails.REQUEST_CONTEXT + "/api/editor/"
		    
	  });
 	  this.get = function(){ // Each backbone collection needs to define "get()" function
	          if (this.collection == null) {
		         this.collection = new Collection();
	          }
		  return this.collection;
	  };
};