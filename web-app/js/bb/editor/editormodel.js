//Editor Backbone Model(linked to collection)
EditorModel = new function() {        
	var Model = Backbone.Model.extend({
			defaults: {
				name : "Editor"
			}
		   });

  	this.get = function(){  // Each backbone model needs to define "get()" function
		return Model;
	};
};