//Editor Backbone Model(linked to collection)
VideoModel = new function() {        
	var Model = Backbone.Model.extend({
			defaults: {
				name : "Video"
			}
		   });

  	this.get = function(){  // Each backbone model needs to define "get()" function
		return Model;
	};
};