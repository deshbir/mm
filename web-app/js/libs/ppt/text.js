

com.compro.ppt.Text = function(){

		/********************************************************/
		/*                   DEPENDENCIES                       */ 
		/********************************************************/
	    var namespace = com.compro.ppt;
	    var Pick = namespace.Pick;
	    var Utils = namespace.Utils;
	    
		var defaultProps = {
				handler:'com.compro.ppt.Text',
				items: [{
					raphaelType:'text',
					raphaelAttributes:{
						x:"0",
						y:"0",
						text:"default text",
						width:"100",
						height:"100",
						fontfamily:"arial",
						fontsize:"10",
						fontweight:"normal",
						fontcolor:"black",
						cursor:'move',
						"text-anchor":"start",
						"wrap-width" : 200
					}
				}]
		};
	    
	    
	    /*
	    Constructor: The responsibility of the constructor to properly initialize and setup
	                the Pick (Text) such that it is rendered on the Main Slide & Slide Thumbnail
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

	    var TextConstr = function(params) {

			var props;

			if(params.isFromStorage) {
				props = params.storageProps;
			} else {
				var newImageOverrides = {
					items:[{
						raphaelAttributes:{
							x:params.coordX,
							y:parseFloat(params.coordY) + parseFloat(params.toolsProps.items[0].raphaelAttributes["font-size"])
						}
					}]
				};

				props = Utils.merge_JSON(defaultProps,(Utils.merge_JSON(newImageOverrides,params.toolsProps)));
			}
			
			var pickConfig = {
					scale:true,
					rotate:true,
					apply_gesture_events: true,
					scale_boundry : false,
					translate_boundry : false,
					selection_box_attrs:{
						padding:10
					}
			}
	    	Pick.call(this,params.primeSvg,params.thumbSvg,props,pickConfig);
	    }

	    TextConstr.prototype = Object.create(Pick.prototype, {
		    constructor: {value:com.compro.ppt.Text}
		 });
	    
	    
	    TextConstr.prototype.resizing = function(obj, dx, dy) {
	    	
			var ft = obj.freeTransform,pickOptions=obj.pickOptions,
			handle = this.handleParent;
		
			var sin, cos, rx, ry, rdx, rdy, mx, my, sx, sy;
			
			sin = ft.o.rotate.sin;
			cos = ft.o.rotate.cos;
			// First rotate dx, dy to element alignment
			rx = dx * cos - dy * sin;
			ry = dx * sin + dy * cos;
	
			rx *= Math.abs(handle.x);
			ry *= Math.abs(handle.y);
	
			// And finally rotate back to canvas alignment
			rdx = rx *   cos + ry * sin;
			rdy = rx * - sin + ry * cos;
	
			ft.attrs.center = {
				x: ft.o.center.x + rdx / 2,
				y: ft.o.center.y + rdy / 2
				};
	
			// Mouse position, relative to element center after translation
			mx = ft.o.handlePos.cx + dx - ft.attrs.center.x - ft.attrs.translate.x;
			my = ft.o.handlePos.cy + dy - ft.attrs.center.y - ft.attrs.translate.y;
	
			// Position rotated to align with element
			rx = mx * cos - my * sin;
			ry = mx * sin + my * cos;
	
			
			ft.attrs.size.x = (rx * 2 * handle.x-2*pickOptions.selection_box_attrs.padding)/ ft.attrs.scale.x;
	    	ft.attrs.size.y = (ry * 2 * handle.y-2*pickOptions.selection_box_attrs.padding)/ ft.attrs.scale.y;
			
			obj.updateHandles();
	    };
	    
	    TextConstr.prototype.resizeEnd = function(obj){
	    	var ft = obj.freeTransform;
	    	// To restrict the width of the text box not to exceed the width of the svg
	    	//var wrapWidth =	Math.min(ft.attrs.size.x, obj.primeSvg.width - 100);
	    	var wrapWidth =	ft.attrs.size.x;
	    	obj.setProperties(0,{"wrap-width":wrapWidth});
	    	obj.updateFTProps();
			obj.event_resize_end();
			Utils.fireEvent(obj,obj.events.STATE_CHANGED);
			obj.updateHandles();
		}
	    
	    TextConstr.prototype.gestureChange = function(obj, event) {
			var scaleFactor = Math.max(.05,event.scale); 
			var ft = obj.freeTransform;
			ft.attrs.size.x = scaleFactor * ft.o.scale.x * ft.o.size.x;
			ft.attrs.size.y = scaleFactor * ft.o.scale.y * ft.o.size.y;
			obj.updateHandles();
	    };
	    
	    TextConstr.prototype.gestureEnd =  function(obj, event) {
	    	obj.resizeEnd(obj);
	    	var ft = obj.freeTransform;
			ft.o.isGesture = false;
	    };

	    
		/********************************************************/	
		/*                 Private Members                     */ 
		/********************************************************/
		
		function cloneObj(obj) {
			var i, clone = {};

			for ( i in obj ) {
				clone[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
			}
			return clone;
		}

	    
		/********************************************************/	
		/*                 Return Object                        */ 
		/********************************************************/
		
		
		return TextConstr;
}();



