//Tool Backbone Model(linked to collection)
TextModel = new function() {        
	var Model = Backbone.Model.extend({
			defaults: {
				name : "Texts"
			}
		   });

  	this.get = function(){  // Each backbone model needs to define "get()" function
		return Model;
	};
};