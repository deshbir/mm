//Photo Backbone Collection
PhotoCollection = new function() {
	  var collectionMap = new Object;
	  var defaulturlGET = com.compro.cgrails.REQUEST_CONTEXT + "/api/photo/";
	  
	  var Collection = Backbone.Collection.extend({
	          model: PhotoModel.get(),
	          url: defaulturlGET
	  });
	  
 	  this.get = function(category){ // Each backbone collection needs to define "get()" function
 		  
 		  var urlGET = com.compro.cgrails.REQUEST_CONTEXT + "/api/photo/";
 		  if (typeof category != "undefined") {
 			  urlGET =  urlGET + category ;
 		  } 	  
 		  
          if (collectionMap[category] == null) {
        	  collectionMap[category] = new Collection();
        	  collectionMap[category].url = urlGET;
          }
		  return collectionMap[category];
	  };
};