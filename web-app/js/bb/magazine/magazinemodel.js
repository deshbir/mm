//Magazine Backbone Model(linked to collection)
MagazineModel = new function() {        
	var Model = Backbone.Model.extend({
			defaults: {
				name : "Magazines"
			}
		   });

  	this.get = function(){  // Each backbone model needs to define "get()" function
		return Model;
	};
};