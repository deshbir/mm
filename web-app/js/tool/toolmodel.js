//Tool Backbone Model(linked to collection)
ToolModel = new function() {        
	var Model = Backbone.Model.extend({
			defaults: {
				name : "Photos"
			}
		   });

  	this.get = function(){  // Each backbone model needs to define "get()" function
		return Model;
	};
};