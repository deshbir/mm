

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
					rotate:false,
					selection_box_attrs:{
						padding:10
					}
			}
	    	Pick.call(this,params.primeSvg,params.thumbSvg,props,pickConfig);
	    }

	    TextConstr.prototype = Object.create(Pick.prototype, {
		    constructor: {value:com.compro.ppt.Text}
		 });
	    
	    
	    TextConstr.prototype.resizing = function(object, dx, dy) {
	    	var ft = object.freeTransform;
	    	var wrapWidth =	ft.o.wrapWidth;
	    	console.log("** resizzing : ", wrapWidth, " ** dx : ",dx);
	    	object.setProperties(0,{"wrap-width":wrapWidth+dx});
	    };
	    
	    TextConstr.prototype.resizeStart = function(object){
			var ft = object.freeTransform;
			if(!ft.o){
				ft.o={};
			}
			ft.o.wrapWidth =  object.getProperties(0)["wrap-width"]||"";
	    	console.log("** resize start : ", ft.o.wrapWidth);
	    };

		/********************************************************/	
		/*                 Private Members                     */ 
		/********************************************************/
		

		/********************************************************/	
		/*                 Return Object                        */ 
		/********************************************************/
		
		
		return TextConstr;
}();



