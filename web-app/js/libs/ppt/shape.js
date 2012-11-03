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
					 cursor:'move',
					 "vector-effect":'non-scaling-stroke'
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
			var pickConfig = {
								scale_keepRatio:false
							};
			if(params.isFromStorage) {
				props = params.storageProps;
				pickConfig = Utils.merge_JSON(pickConfig,params.storageProps.options);
			} else {
				var newShapeOverrides = {
				}
				pickConfig = Utils.merge_JSON(pickConfig,params.toolsProps.options);
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
				// Increasing selection area by adding a rectangle around the Pick.
				var increase_selection_area = this.pickOptions.increase_selection_area;
				if(increase_selection_area) {
					var increase_selection_area_rect = this.primeSvg.rect(bBox.x - increase_selection_area[3], bBox.y - increase_selection_area[0], bBox.width + increase_selection_area[1]+ increase_selection_area[3], bBox.height + increase_selection_area[0]+ increase_selection_area[2]);
					instance.push(increase_selection_area_rect);
					this.updateFTProps();
					increase_selection_area_rect.attr({"stroke":"#EEE","fill": "#fff", "fill-opacity":0, "opacity":0,"cursor":"move"});
					instance.undrag();
					instance.drag(Utils.proxy(this.dragMove,this), Utils.proxy(this.dragStart,this), Utils.proxy(this.dragEnd,this));
					if(this.pickOptions.apply_gesture_events==true) {
						var elementCount = instance.items.length;
/*						this.instance.items[elementCount-1].node.addEventListener('gesturestart', Utils.proxy(this.gestureStart, this));
						this.instance.items[elementCount-1].node.addEventListener('gesturechange', Utils.proxy(this.gestureChange, this));
						this.instance.items[elementCount-1].node.addEventListener('gestureend', Utils.proxy(this.gestureEnd, this));
*/	
						this.applyGestureEvents(this.instance.items[elementCount-1].node);	
					}
				}
				
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