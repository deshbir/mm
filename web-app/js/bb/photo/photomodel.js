//Photo Backbone Model(linked to collection)
PhotoModel = new function() {        
	var Model = Backbone.Model.extend({
			defaults: {
				name : ".."
			}
		   });

  	this.get = function(){  // Each backbone model needs to define "get()" function
		return Model;
	};
};