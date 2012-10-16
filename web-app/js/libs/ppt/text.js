

com.compro.ppt.Text = function(){

		/********************************************************/
		/*                   DEPENDENCIES                       */ 
		/********************************************************/
	    var namespace = com.compro.ppt;
	    var Pick = namespace.Pick;
	    var Utils = namespace.Utils;
	    
		var defaultProps = {
				handler:'com.compro.ppt.Text',
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
					cursor:'move'
				}
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
					raphaelAttributes:{
						x:params.coordX,
						y:params.coordY
					}
				};

				props = Utils.merge_JSON(defaultProps,(Utils.merge_JSON(newImageOverrides,params.toolsProps)));
			}

	    	Pick.call(this,params.primeSvg,params.thumbSvg,props);
	    }

	    TextConstr.prototype = Object.create(Pick.prototype, {
		    constructor: {value:com.compro.ppt.Text}
		 });	

		/********************************************************/	
		/*                 Private Members                     */ 
		/********************************************************/
		

		/********************************************************/	
		/*                 Return Object                        */ 
		/********************************************************/
		
		
		return TextConstr;
}();
