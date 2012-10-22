com.compro.ppt.Shape = function(){

		/********************************************************/
	    /*                   DEPENDENCIES                       */ 
	    /********************************************************/
	    
	    var namespace = com.compro.ppt;
		var Utils = namespace.Utils;
		var Pick = namespace.Pick;


		/********************************************************/	
		/*                 Private Members                     */ 
		/********************************************************/

		var defaultProps = {
			handler:'com.compro.ppt.Shape',
			items:[{
				raphaelAttributes:{
					"stroke-width":'1',
					"fill":"#fff",
					"fill-opacity":'1.0',
					 cursor:'move'
					 
				}
			}]
		}

		/*
	    Contructor: The responsibility of the constructor to properly initialize and setup
	                the Pick (Image) such that it isrendered on the Main Slide & Slide Thumbnail
	                and automatic support the following operations:

					The constructor takes the following "params" object containing 
					necessary initialization paramteres
	
					params = {
						primeSvg,      -- Rapheal paper reference for Slide - 
									      to be used for painting operations.
						thumbSvg,      -- Rapheal paper reference for Slide Thumbnail view
						isFromStorage: -- true, if Image Pick is being loaded from storage 
						                  false, if a new Image Pick 
						
						------- Following attributes are applicable only isFromStorage=false -------
						storageProps

						------- Following attributes are applicable only isFromStorage=true ----		
	
						toolsProps-- same format as that of  storageProps

						coordX,        -- X coordinate of where new Pick should be painted on the Slide
						coordY,        -- Y coordinate of where new Pick should be painted on the Slide

					}

	    */

		
		

		/********************************************************/	
		/*                 Instance Memeber                        */ 
		/********************************************************/

		var ShapeConstr = function(params) {
			
			var props;
			var pickConfig;
			if(params.isFromStorage) {
				props = params.storageProps;
				pickConfig = params.storageProps.options;
			} else {
				var newShapeOverrides = {
				}
				pickConfig = params.toolsProps.options;
				props = Utils.merge_JSON(defaultProps,Utils.merge_JSON(newShapeOverrides,params.toolsProps));
			}
			
	    	Pick.call(this,params.primeSvg,params.thumbSvg,props,pickConfig);
	    	this.isFromStorage = params.isFromStorage;
	    	this.coordX = params.coordX;
	    	this.coordY = params.coordY;

	    }

	     ShapeConstr.prototype = Object.create(Pick.prototype, {
		    constructor: {value:com.compro.ppt.Shape}
		 });

		 ShapeConstr.prototype.event_after_paint = function(pickRatio){
			if(this.isFromStorage==false){
				var instance = this.instance;
				var thumbInstance = this.thumbInstance;
				var bBox = instance.getBBox(false);
				var currentX = bBox.x;
				var currentY = bBox.y;
				//var scale = 100/bBox.width;
				var transX = (this.coordX - currentX);
				var transY =(this.coordY - currentY);
				
				var thumb_transY = transY*this.config.thumbRatio;
				var thumb_transX = transX*this.config.thumbRatio;
				this.translate(transX,transY);
				//this.resize(scale,scale);
				Utils.fireEvent(this,"stateChanged");
			}
		 }
		
		return ShapeConstr;
	}();