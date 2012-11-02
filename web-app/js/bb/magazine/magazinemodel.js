//Magazine Backbone Model
MagazineModel = new function() {

	var modelObj = null;
	
	var Model = Backbone.Model.extend({
					defaults: {
						name : "Magazines"
					},
					urlRoot: com.compro.cgrails.REQUEST_CONTEXT + "/api/magazine/"	
				});
	
	this.get = function(){
		if (modelObj == null) {
			modelObj = new Model();
		}
		return modelObj;
    };
	
	
};