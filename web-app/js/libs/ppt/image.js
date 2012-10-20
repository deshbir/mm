

com.compro.ppt.Image = function(){

		/********************************************************/
		/*                   DEPENDENCIES                       */ 
		/********************************************************/
	    var namespace = com.compro.ppt;
	    var Pick = namespace.Pick;
	    var Utils = namespace.Utils;
	    
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

		var defaultProps = {
				handler:'com.compro.ppt.Image',
				items: [{
					raphaelType : 'rect',
					raphaelAttributes:{
						x:0,
						y:0,
						width:100,
						height:100,
						r:4,
					}
				},{
						raphaelType:'image',
						raphaelAttributes:{
							x:"0",
							y:"0",
							width:"100",
							height:"100",
							cursor:'move',
							src:""
						}
				}]
		};

	    var ImageConstr = function(params) {

			var props;

			if(params.isFromStorage) {
				props = params.storageProps;
			} else {
				var clipRect = params.coordX + "," + params.coordY + "," + (params.toolsProps.raphaelAttributes.width||100) +"," +(params.toolsProps.raphaelAttributes.height||100) + ","+5; 

				var newImageOverrides = {
					items:[{
						raphaelAttributes:{
							x:params.coordX-5,
							y:params.coordY-5,
							width:params.toolsProps.raphaelAttributes.width+10,
							height:params.toolsProps.raphaelAttributes.height+10,
							fill:'#3362AF',
							stroke:'#3362AF'
						}
					},{
						raphaelAttributes:{
							x:params.coordX,
							y:params.coordY,
							src:(params.toolsProps.source),
							//"clip-rect":clipRect,
							width:params.toolsProps.raphaelAttributes.width,
							height:params.toolsProps.raphaelAttributes.height,
							
						}
					}]
				};

				props = Utils.merge_JSON(defaultProps,(Utils.merge_JSON(newImageOverrides,params.toolsProps)));
			}

	    	Pick.call(this,params.primeSvg,params.thumbSvg,props);
	    }

	     ImageConstr.prototype = Object.create(Pick.prototype, {
		    constructor: {value:com.compro.ppt.Image}
		 });

		/*ImageConstr.prototype.get_behavior_options =function(){
			return {
				selection_box:true,
				resize:false,
				rotate:true,
				remove:true
			};
		}*/

	      /*----No need-----*/
		 /*ImageConstr.prototype.paint = function(pickRatio){
		 	Pick.prototype.paint.apply(this,[pickRatio])
		 }*/
		

		/********************************************************/	
		/*                 Private Members                     */ 
		/********************************************************/
		

		/********************************************************/	
		/*                 Return Object                        */ 
		/********************************************************/
		
		
		return ImageConstr;
}();
