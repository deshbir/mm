/*
Pick:
------------
Responsible to properly initialize and setup a Pick object
such that "it is rendered on the Main Slide & Slide Thumbnail views.

The Pick objects are created by the PPT engine/core (Slide, Workspace)
at runtime. As of now there are two scenario which would trigger the
creation of new Pick objects;

(1) New Pick created in response to user actions
(2) Existing Pick loaded from memory/state/database.

Contructor Arguments:
---------------------
raphaelPaper.main -- Rapheal paper reference for Slide to be used for painting operations. 				
raphaelPaper.thumb -- Rapheal paper reference for Slide Thumbnail view

properites -- These are Pick properties that describe Raphael 
              attributes/commands/operation required to render the
              Pick object on Main and Thumbnail slides. These values
              of these properties must set relative to the container
              dimensions (or context) of "raphaelPaper.main".

              {
				handler:'com.compro.ppt.Image',

				raphaelType: One of support Rapheal Element TYPES
				raphaelAttributes: Supporting Rapheal Attributes (different for each type)
			  }
						
			  Rapheal reference: http://raphaeljs.com/reference.html#Paper.add
			
			  Examples:

   			  (1) 
   			    handler:'com.compro.ppt.Pick
   			  	raphaelType:'image',
   			  	context: {
					width=1000,
					height=500
   			  	},
				raphaelAttributes:{
						x:10,
						y:10,
						width:"100",
						height:"100"
				} //A image starting at (10,10) and having width,height as 100px

 			  (2) 	
   			    handler:'com.compro.ppt.Image'
   			  	raphaelType:'image',
				raphaelAttributes:{
						x:10,
						y:10,
						width:"100",
						height:"100"
				}

 			  (3)
  			    handler:'com.compro.ppt.Pick'
   			  	raphaelType:'circle',
				raphaelAttributes:{
					cx: 10,
					cy: 10,
					r: 5
				} //circle with radius 5px and center at (10,10)
				    

Extending the Pick:
--------------------

(1) Painting:
By default, the core Pick object will automatically render itself
correct on any Slide or Thumnbnail - including resizing itself 
based on container dimenstions. The painting output depends the
properties (Raphael SVG operations) passed during construction.

Normally, you should not need override the default paint function(s) 

However, in case you need perform operation before or after paint
define the following event_handlers in your child object

event_before_paint();
event_after_paint();

(2) Override default behavior for:
Selection, Resize, Drag, Delete, Rotate

- Selecting on the Slide (and provide mourse controls for moving, rotating, resizing & deleting)
- Moving the Pick on the Slide (via user mouse input/actions)
- Automatically updating/syncing the Main Slide and Preview Thumbnails


You can customize these default behaviors by overriding the default
get_behavior_options function which return a "behavior_config" object.
{
	selection_box:true/false,//also turns off resize,rotate,delete
	resize:true,
	rotate:true,
	delete:true
}

(3) Attaching your own custom behavior events.
	When a pick is selected, a "pickSelected" event is triggred
	to catch it inside the implemented class use:
	Utils.addCustomEventListener(this,"pickSelected",function(event){
				this.fun()//calling functions
	});
	 -for rotation call 
	       this.rotate(degree)//angle in degrees
	 -for rotation call 
	      this.resize(scale_x,scale_y,ref_x,ref_y)
	      //scale_x,scale_y: x and y scaling
	      //ref_x,ref_y: x and y points wrt sclaing needs to be performed, default is center of the pick
	  -for deleting call 
	      this.deletePick()

(4) Defining your own delete button/event.
		

	   		*/

com.compro.ppt.Pick = function(){

	 	/********************************************************/
		/*                   DEPENDENCIES                       */ 
		/********************************************************/
		var Utils = com.compro.ppt.Utils;
		var namespace = com.compro.ppt;

		/********************************************************/	
		/*                 Private Members                      */ 
		/********************************************************/
		var defaultDragStartHandler = function (obj,x,y,event) {
			// storing original coordinates
				console.log("drag start",event);
				Utils.fireEvent(obj,"dragStart");					
				var bBox = this.getBBox(false);
				this.ox = bBox.x;
				this.oy = bBox.y;
				console.log('a',this.ox,this.oy); 
				this.transx = 0;
				this.transy = 0;
		};

		var defaultDragMoveHandler = function (obj,dx,dy) {
			var bBox = this.getBBox(false);
			var trans_x = dx-this.transx;
			var trans_y = dy-this.transy;
			var nowX = Math.min(obj.primeSvg.width - bBox.width-5, this.ox + trans_x);
			var nowY = Math.min(obj.primeSvg.height - bBox.height-5, this.oy+ trans_y);
			nowX = Math.max(5, nowX);
			nowY = Math.max(5, nowY);      
			//console.log(nowX-this.ox,nowY-this.oy);
			if(nowX-this.ox!=0 || nowY-this.oy!=0) {
				//console.log('b');
				this.transform("...T" + (nowX-this.ox) + "," + (nowY-this.oy));
				this.transx = nowX-this.ox+this.transx;
				this.transy = nowY-this.oy+this.transy;
				this.ox = nowX;
				this.oy = nowY;
			}
			
		};

		var defaultDragEndHandler = function (obj) {
			// restoring state
			//this.attr({opacity: .5});
			var bBox = this.getBBox(false);
			var thumbBBox = this.thumbInstance.getBBox(false);
			var config = obj.config;
			this.thumbInstance.transform("...T" + (bBox.x*config.thumbRatio-thumbBBox.x) + "," + (bBox.y*config.thumbRatio-thumbBBox.y));
			Utils.fireEvent(obj,"stateChanged");
			Utils.fireEvent(obj,"dragEnd");
			//Toch events are removed once the pick is brought to front, reattaching them
			this.undrag();
			this.drag(Utils.proxy(obj.dragMove,obj), Utils.proxy(obj.dragStart,obj), Utils.proxy(obj.dragEnd,obj));
		}; 

		var defaultSelectPickHandler = function(){
			if(this.get_behavior_options().selection_box==true){
				var boxSet = this.primeSvg.set();
				//get bounding box of the shapes
				//instance.toBack();
				var bBox = this.instance.getBBox(false);
				var strokeWidth = parseInt(this.instance.attr('stroke-width')) + 1;
				var rect_x = bBox.x - strokeWidth;
				var rect_y = bBox.y - strokeWidth;
				var rect_width = bBox.width + 2*strokeWidth;
				var rect_height = bBox.height + 2*strokeWidth;
				var selectionRect = this.primeSvg.rect(rect_x, rect_y, rect_width, rect_height);
				var cursors = ['nw-resize','e-resize','ne-resize','n-resize']

					for(var i = 0,x = rect_x - 4; i < 3; i++) {
					for(var j = 0,y = rect_y - 4; j < 3; j++) {
						if(!(i==1 && j==1)) {
							var smallRect = this.primeSvg.rect(x, y, 8, 8);
							boxSet.push(smallRect);
							if(this.get_behavior_options().resize==true) {
								smallRect.attr({
									cursor:cursors[boxSet.length<=4?boxSet.length-1:8-boxSet.length]
								});
								smallRect.drag(Utils.proxy(this.resizing,this),Utils.proxy(this.resizeStart,this),Utils.proxy(this.resizeEnd,this));
							}
						}
						y = y + (rect_height/2);
					}
					x = x + (rect_width/2);
				}
				if(this.get_behavior_options().rotate==true){
					var rotateCircle = this.primeSvg.circle(rect_x+(rect_width/2),rect_y-28,4,4);
					rotateCircle.attr({cursor:'crosshair'});
					boxSet.push(rotateCircle);
					rotateCircle.drag(Utils.proxy(this.rotating,this),Utils.proxy(this.rotateStart,this),Utils.proxy(this.rotateEnd,this));
					var path = 'M' + (rect_x+(rect_width/2)) + ',' + rect_y + 'L' + (rect_x+(rect_width/2)) + ',' + (rect_y-24);
					var line = this.primeSvg.path(path);
					boxSet.push(line);
				}
				//adding the delete button
				
				boxSet.attr({"fill":"#FFF","stroke":"000","stroke-width":"1"});
				selectionRect.attr({
					"stroke":"#A1C9FF",
					"stroke-width":"3", 
					"stroke-linecap":"round",
					"stroke-linejoin":"round"
				});
				boxSet.push(selectionRect);
				if(this.get_behavior_options().remove==true){
					var deleteIcon = this.primeSvg.image("images/DeleteRed.png",rect_x+rect_width+8, rect_y-8, 16, 16);
					deleteIcon.click(Utils.proxyChangeContext(this.deletePick,this));
					boxSet.push(deleteIcon);
				}
			
				
				this.instance.boxSet = boxSet;
				Utils.fireEvent(this,"pickSelected");
			}
		};

		var defaultUnselectPickHandler = function(){
			if(this.instance.boxSet!=null){
				this.instance.boxSet.remove();
			}	
		};

		var defaultDeletePickHandler = function(){
			this.unSelect();
			this.instance.thumbInstance.remove();
			this.instance.remove();
			Utils.fireEvent(this,"pickDeleted");
		};

		var defaultMoveToFront = function(){
			this.instance.toFront();
			this.instance.thumbInstance.toFront();
		};

		var defaultResizeStartHandler = function(obj){
			var bBoxInstance = obj.instance.getBBox(false);
			var tempInstance;
			if(obj.instance.type=='image'){
				tempInstance = obj.primeSvg.rect(bBoxInstance.x,bBoxInstance.y,bBoxInstance.width,bBoxInstance.height);
				tempInstance.attr({stroke:"#00F",
					'stroke-width':2})
			}else{
				tempInstance = obj.instance.clone();
			}
			obj.instance.tempInstance=tempInstance;
			tempInstance.attr({'fill-opacity':0.0,
								"stroke-opacity":0.7,
								"opacity":0.5});
			var bBox = tempInstance.getBBox(false);
			tempInstance.ox=0;
			tempInstance.oy=0;
			var dragBoxIndex = obj.instance.boxSet.items.indexOf(this);
			tempInstance.mult_y=1;
			tempInstance.mult_x=1;
			tempInstance.ref_x = bBox.x;
			tempInstance.ref_y = bBox.y;
			if(dragBoxIndex==0||dragBoxIndex==3||dragBoxIndex==5){
				tempInstance.mult_y=-1;
				tempInstance.ref_y = bBox.y2; 
			}

			if(dragBoxIndex==1||dragBoxIndex==6){
				tempInstance.mult_y=0;
			}

			if(dragBoxIndex==3||dragBoxIndex==4){
				tempInstance.mult_x=0;
			}

			if(dragBoxIndex<=2){
				tempInstance.mult_x=-1;
				tempInstance.ref_x = bBox.x2;
			}
			tempInstance.current_w =  bBox.width;
			tempInstance.current_h = bBox.height;
			document.body.style.cursor = this.attr("cursor");
			
		}

		var defaultResizeHandler = function(obj,dx,dy){
			var tempInstance = obj.instance.tempInstance;
			var bBox = tempInstance.getBBox(false);
			var current_w = tempInstance.current_w;
			var current_h = tempInstance.current_h;
			var new_w = tempInstance.mult_x * (dx-tempInstance.ox) + current_w;
			var new_h = tempInstance.mult_y * (dy-tempInstance.oy) + current_h;
			if(new_w==0||new_h==0){
				console.log(new_w,new_h,"zero");
			}
			var scale_x = new_w/current_w;
			var scale_y = new_h/current_h;
			var ref_x = tempInstance.ref_x;
			var ref_y = tempInstance.ref_y;
			tempInstance.transform("...s" + (scale_x) + "," + (scale_y) + "," + ref_x + "," + ref_y);
			tempInstance.ox = dx;
			tempInstance.oy = dy;
			tempInstance.current_w = new_w==0?new_w+0.0001:new_w;
			tempInstance.current_h = new_h==0?new_h+0.0001:new_h;
			console.log(tempInstance.current_w,tempInstance.current_h,new_w,new_h);
		}

		var defaultResizeEndHandler = function(obj){
			var tempInstance = obj.instance.tempInstance;
			var bBoxTemp = tempInstance.getBBox(false);
			var bBox = obj.instance.getBBox(false);

			var new_w = tempInstance.current_w;
			var new_h = tempInstance.current_h;

			var ref_x = bBox.x;
			var ref_y = bBox.y;
			if(tempInstance.mult_x<0){
				ref_x = bBox.x2;
			}
			if(tempInstance.mult_y<0){
				ref_y = bBox.y2;
			}

			var scale_x = new_w/bBox.width;
			var scale_y = new_h/bBox.height;
			tempInstance.remove();
			console.log("resize parameters:",scale_x,scale_y,ref_x,ref_y,bBox);
			obj.resize(scale_x,scale_y,ref_x,ref_y);

			document.body.style.cursor = 'auto';

		}

		var defaultRotateHandler = function(obj,dx,dy){
			var bBoxInstance = obj.instance.getBBox(false);
			var tempInstance = obj.instance.tempInstance;
			var x = tempInstance.x_move = (tempInstance.x_move||0) + dx;
			var y = tempInstance.y_move = (tempInstance.y_move||0) + dy;
			console.log(y,x,dy,dx);
			var rotate = 360 - ((180 / Math.PI) * Math.atan2(-dy, dx));
		
			/*if(tempInstance.previousRotate>180){
				rotate = 360-rotate;
			}*/
			console.log(rotate);
			tempInstance.transform("...R" + -tempInstance.previousRotate);
			tempInstance.transform("...R" + rotate);
			tempInstance.previousRotate = rotate;
		}
		var defaultRotateStartHandler = function(obj){
			document.body.style.cursor = this.attr("cursor");
			var bBoxInstance = obj.instance.getBBox(false);
			var tempInstance;
			if(obj.instance.type=='image'){
				tempInstance = obj.primeSvg.rect(obj.instance.attr("x"),obj.instance.attr("y"),obj.instance.attr("width"),obj.instance.attr("height"));
				tempInstance.attr({stroke:"#00F",
					'stroke-width':2,
					transform:obj.instance.attr("transform")});
			}else{
				tempInstance = obj.instance.clone();
			}
			obj.instance.tempInstance=tempInstance;
			tempInstance.attr({'fill-opacity':0.0,
								"stroke-opacity":0.7,
								"opacity":0.5});
			tempInstance.previousRotate = 0;
		}
		var defaultRotateEndHandler = function(obj){
			document.body.style.cursor = 'auto';
			obj.rotate(obj.instance.tempInstance.previousRotate);
			obj.instance.tempInstance.remove();
		}

		function renderThumb(obj){
			var thumbInstance = (obj.thumbSvg.add([{type:obj.properties.raphaelType}]))[0];
			//keeping reference the thumbnail of the image in collage
			obj.instance.thumbInstance = thumbInstance;
			obj.instance.thumbInstance.attr(obj.properties.raphaelAttributes);
			var instanceBbox = obj.instance.getBBox(false);
			var thumbBbox = thumbInstance.getBBox(false);
			var config = obj.config;
			thumbInstance.attr({"stroke-width":thumbInstance.attr("stroke-width")*config.thumbRatio});
			thumbInstance.transform("...s" + config.thumbRatio + "," + config.thumbRatio + "," + thumbBbox.x + "," + thumbBbox.y);
			thumbBbox = thumbInstance.getBBox(false);
			thumbInstance.transform("...T" + (instanceBbox.x*config.thumbRatio-thumbBbox.x) + "," + (instanceBbox.y*config.thumbRatio-thumbBbox.y));
		}

		

		function rendePick(pickRatio,obj){
			obj.instance = (obj.primeSvg.add([{type:obj.properties.raphaelType}]))[0];
			if(obj.properties.raphaelAttributes != null){
				obj.instance.attr(obj.properties.raphaelAttributes);
			} 
			if(pickRatio){
				if(pickRatio.x!=1||pickRatio.y!=1){
					var temp = (obj.primeSvg.add([{type:obj.properties.raphaelType}]))[0];
					temp.attr(obj.instance.attr());
					var instanceBbox = obj.instance.getBBox(false);
					var tempBbox = temp.getBBox(false);
					temp.transform("...s" + pickRatio.x + "," + pickRatio.y + "," + instanceBbox.x + "," + instanceBbox.y);
					tempBbox = temp.getBBox(false);
					temp.transform("...T" + (instanceBbox.x*pickRatio.x-tempBbox.x) + "," + (instanceBbox.y*pickRatio.y-tempBbox.y));
					obj.instance.remove();
					obj.instance = temp;
				}
			}
			obj.properties.raphaelAttributes = obj.instance.attr();
			obj.instance.drag(Utils.proxy(obj.dragMove,obj), Utils.proxy(obj.dragStart,obj), Utils.proxy(obj.dragEnd,obj));
		}



		/********************************************************/	
		/*                 Instance Members                     */ 
		/********************************************************/
		/********************************************************/	
		/*                 PUBLIC METHODS                       */ 
		/********************************************************/
		
		
		var PickConstr = function (primeSvg, thumbSvg, properties) {
			this.primeSvg = primeSvg;
			this.thumbSvg = thumbSvg;
            this.properties = properties;
            if(this.properties.context!==null){
				this.properties.context={}
			}
            this.properties.context.height = primeSvg.height;
            this.properties.context.width = primeSvg.width;
			this.config = {
				thumbRatio: namespace.config.thumbRatio
			};

			Utils.registerObjectForEvent(this);
			Utils.addCustomEventListener(this,"stateChanged",function(event){
				this.properties.raphaelAttributes = this.instance.attr();
			});
		};
		
		// public API -- prototype
		PickConstr.prototype = {
			constructor: com.compro.ppt.Pick,
			version: "1.0"
		};
		
		
		PickConstr.prototype.paint=function(pickRatio) {

			if(this.event_before_paint){
				this.event_before_paint(pickRatio);
			}
			rendePick(pickRatio,this);
			renderThumb(this);
			if(this.event_after_paint){
				this.event_after_paint(pickRatio);
			}
		}

		PickConstr.prototype.reRenderThumb=function(thumbSvgObj){
			this.thumbSvg = thumbSvgObj;
			if(this.instance.thumbInstance)
				this.instance.thumbInstance.remove();
			this.config.thumbRatio=namespace.config.thumbRatio;
			renderThumb(this);
		}

		PickConstr.prototype.reRender=function(primeSvgObj,thumbSvgObj,pickRatio){
			this.primeSvg = primeSvgObj;
			this.instance.remove();
			rendePick(pickRatio,this);
			this.reRenderThumb(thumbSvgObj);
			this.properties.context.height = primeSvgObj.height;
            this.properties.context.width = primeSvgObj.width;
		}

		PickConstr.prototype.get_behavior_options =function(){
			return {
				selection_box:true,
				resize:true,
				rotate:true,
				remove:true
			};
		}

		PickConstr.prototype.rotate =function(degree){
			this.instance.transform("...R" + degree);
			this.instance.thumbInstance.transform("...R" + degree);
			if(this.instance.boxSet)
				this.instance.boxSet.remove();
			this.selectPick();
			Utils.fireEvent(this,"stateChanged");
		}

		PickConstr.prototype.resize = function(scale_x,scale_y,ref_x,ref_y){
			var main_scale_str = "...S" + (scale_x) + "," + (scale_y);
			var thumb_scale_str = main_scale_str;
			if(ref_x!=null && ref_y!=null){
				var thumbref_x = ref_x*this.config.thumbRatio;
				var thumbref_y = ref_y*this.config.thumbRatio;
				thumb_scale_str = thumb_scale_str + "," + thumbref_x + "," + thumbref_y;
				main_scale_str = main_scale_str + "," + ref_x + "," + ref_y;
			}
			if(this.instance.boxSet)
				this.instance.boxSet.remove();
			this.instance.transform(main_scale_str);
			this.instance.thumbInstance.transform(thumb_scale_str);
			this.selectPick();
			Utils.fireEvent(this,"stateChanged");
		}

		
		PickConstr.prototype.dragStart = defaultDragStartHandler;

		
		
		PickConstr.prototype.dragMove = defaultDragMoveHandler;
		
		

		PickConstr.prototype.dragEnd = defaultDragEndHandler;

		PickConstr.prototype.rotateStart = defaultRotateStartHandler;

		PickConstr.prototype.rotating = defaultRotateHandler;

		PickConstr.prototype.rotateEnd = defaultRotateEndHandler;

		PickConstr.prototype.resizeStart = defaultResizeStartHandler;

		PickConstr.prototype.resizing = defaultResizeHandler;

		PickConstr.prototype.resizeEnd = defaultResizeEndHandler;
					

	
		
		PickConstr.prototype.selectPick = defaultSelectPickHandler;
		

		PickConstr.prototype.unSelect = defaultUnselectPickHandler;

		

		PickConstr.prototype.deletePick = defaultDeletePickHandler;


		

		PickConstr.prototype.moveToFront = defaultMoveToFront;

		PickConstr.prototype.toJSON  = function() {
			return {
           		 "properties": this.properties
       		};
		}
		

		
		
		// return the constructor
		return PickConstr;
}();