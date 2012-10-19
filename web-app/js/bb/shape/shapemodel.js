//Shape Backbone Model(linked to collection)
ShapeModel = new function() {        
	var Model = Backbone.Model.extend({
			defaults: {
				name : "Shapes"
			}
		   });

  	this.get = function(){  // Each backbone model needs to define "get()" function
		return Model;
	};
};