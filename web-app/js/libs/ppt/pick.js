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
		var namespacefn = c$.namespace("com.compro.ppt.GLOBAL");

		/********************************************************/	
		/*                 Private Members                      */ 
		/********************************************************/
		
		var pickOptionsDefaults = {
				selection_box:true,
				selection_box_attrs: { fill: '#fff', stroke: '#000',padding:0 },
				rotate_handle_distance: 1.3,
				rotate_handle_axes: ['x','y'],
				handle_box_size: 5,
				range: { rotate: [ -180, 180 ], scale: [ -99999, 99999 ] },
				drag: true,
				rotate: true,
				scale: true,
				remove:true,
				scale_keepRatio: true,
				snap: { rotate: 0, scale:0 , drag: 0 },
				pick_delete_image_attrs:{
					size:12,
					url:"images/deletered.png",
					x_distance: 8,
					y_distance: 0
				}
	   }
		namespacefn.updatePickConfig = function(config){
			if(config){
				pickOptionsDefaults = Utils.merge_JSON(pickOptionsDefaults,config);
			}
		}
		
		var defaultHideHandles = function() {
			var ft = this.freeTransform;
			[ 'x', 'y' ].map(function(axis) {
				if ( ft.handles[axis] ) {
					ft.handles[axis].disc.remove();
					ft.handles[axis].line.remove();

					ft.handles[axis] = null;
				}
			});
			if(ft.handles.deleteIcon){
				ft.handles.deleteIcon.remove();
			}

			if ( ft.bbox ) {
				ft.bbox.remove();

				ft.bbox = null;

				if ( ft.handles.bbox ) {
					ft.handles.bbox.map(function(handle) {
						handle.element.remove();
					});

					ft.handles.bbox = null;
				}
			}
		};

		
		
		
		var defaultShowHandles = function() {
			
			var ft = this.freeTransform;
			var pickOptions = this.pickOptions;
			this.hideHandles();
			var paper = this.primeSvg;
			if(pickOptions.rotate==true){
				pickOptions.rotate_handle_axes.map(function(axis) {
					ft.handles[axis] = {};
	
					ft.handles[axis].line = paper
						.path([ 'M', ft.attrs.center.x, ft.attrs.center.y ])
						.attr({
							stroke: pickOptions.selection_box_attrs.stroke,
							'stroke-dasharray': '- ',
							opacity: .5
							})
						;
	
					ft.handles[axis].disc = paper
						.circle(ft.attrs.center.x, ft.attrs.center.y, pickOptions.handle_box_size)
						.attr(pickOptions.selection_box_attrs)
						;
					ft.handles[axis].disc.freeTransform = {axis : axis};
				});
				
			}
			
			if(pickOptions.remove==true){
				ft.handles.deleteIcon = this.primeSvg.image( pickOptions.pick_delete_image_attrs.url,ft.attrs.center.x, ft.attrs.center.y, pickOptions.pick_delete_image_attrs.size, pickOptions.pick_delete_image_attrs.size);
				ft.handles.deleteIcon.click(Utils.proxyChangeContext(this.deletePick,this));
			}
			
			if(pickOptions.selection_box==true) {
				ft.bbox = this.primeSvg
					.path('')
					.attr({
						stroke: pickOptions.selection_box_attrs.stroke,
						'stroke-dasharray': '- ',
						opacity: .5
						})
					;

				ft.handles.bbox = [];
				if(pickOptions.scale){
					var i, handle;
	
					for ( i = 0; i < 4 ; i ++ ) {
						handle = {};
	
						handle.axis     = i % 2 ? 'x' : 'y';
						handle.isCorner = i < 4;
						
						handle.element = this.primeSvg
							.rect(ft.attrs.center.x, ft.attrs.center.y, pickOptions.handle_box_size * 2, pickOptions.handle_box_size * 2)
							.attr(pickOptions.selection_box_attrs)
							;
						handle.element.handleParent = handle;
	
						ft.handles.bbox[i] = handle;
					}
				}
			}


			// Drag bbox corner handles
			if (pickOptions.scale==true) {
				var that = this;
				ft.handles.bbox.map(function(handle) {
					handle.element.drag(Utils.proxy(that.resizing,that),Utils.proxy(that.resizeStart,that),Utils.proxy(that.resizeEnd,that) );
				});
			}
			var self = this;
			pickOptions.rotate_handle_axes.map(function(axis) {
				if ( !ft.handles[axis] ) { return; }

				var
					rotate = true;
					scale  = false;
				ft.handles[axis].disc.drag(Utils.proxy(self.rotating,self),Utils.proxy(self.rotateStart,self),Utils.proxy(self.rotateEnd,self));
			});
			this.updateHandles();
			
		};
		

		/**
		 * Update handles based on the element's transformations
		 */
		var defaultUpdateHandles = function(rotating) {
				var ft = this.freeTransform;
				var pickOptions = this.pickOptions;
				var paper = this.primeSvg;
				var corners = getBBox(this);

				// Get the element's rotation
				var rad = {
					x: ( ft.attrs.rotate      ) * Math.PI / 180,
					y: ( ft.attrs.rotate + 90 ) * Math.PI / 180
					};

				var radius = {
					x: (ft.attrs.size.x / 2 * ft.attrs.scale.x) + pickOptions.selection_box_attrs.padding,
					y: (ft.attrs.size.y / 2 * ft.attrs.scale.y) + pickOptions.selection_box_attrs.padding
					};

				pickOptions.rotate_handle_axes.map(function(axis) {
					if ( ft.handles[axis] ) {
						var
							cx = ft.attrs.center.x + ft.attrs.translate.x + radius[axis] * pickOptions.rotate_handle_distance * Math.cos(rad[axis]),
							cy = ft.attrs.center.y + ft.attrs.translate.y + radius[axis] * pickOptions.rotate_handle_distance * Math.sin(rad[axis])
							;
						
						if(!rotating){
							ft.handles[axis].disc.freeTransform.invert = false;
							if(cx + pickOptions.handle_box_size > paper.width || cx - pickOptions.handle_box_size < 0){
								cx = ft.attrs.center.x  + ft.attrs.translate.x -( radius[axis] * pickOptions.rotate_handle_distance * Math.cos(rad[axis]));
								cy = ft.attrs.center.y + ft.attrs.translate.y + radius[axis] * pickOptions.rotate_handle_distance * Math.cos(rad[axis]+Math.PI/2);
								ft.handles[axis].disc.freeTransform.invert = 'cx';
							}
							if(cy + pickOptions.handle_box_size > paper.height || cy + pickOptions.handle_box_size<0){
								cx = ft.attrs.center.x  + ft.attrs.translate.x + radius[axis] * pickOptions.rotate_handle_distance * Math.sin(rad[axis]-Math.PI/2);
								cy = ft.attrs.center.y + ft.attrs.translate.y -( radius[axis] * pickOptions.rotate_handle_distance * Math.sin(rad[axis]));
								ft.handles[axis].disc.freeTransform.invert = 'cy';
							}
						} else if(ft.handles[axis].disc.freeTransform.invert){
							if(ft.handles[axis].disc.freeTransform.invert=='cx'){
								cx = ft.attrs.center.x  + ft.attrs.translate.x -( radius[axis] * pickOptions.rotate_handle_distance * Math.cos(rad[axis]));
								cy = ft.attrs.center.y + ft.attrs.translate.y + radius[axis] * pickOptions.rotate_handle_distance * Math.cos(rad[axis]+Math.PI/2);
							} else {
								cx = ft.attrs.center.x  + ft.attrs.translate.x + radius[axis] * pickOptions.rotate_handle_distance * Math.sin(rad[axis]-Math.PI/2);
								cy = ft.attrs.center.y + ft.attrs.translate.y -( radius[axis] * pickOptions.rotate_handle_distance * Math.sin(rad[axis]));
							}
						}

						ft.handles[axis].disc.attr({ cx: cx, cy: cy });
						if((ft.handles[axis].disc.freeTransform.invert && (cx<-pickOptions.handle_box_size || cy<-pickOptions.handle_box_size || cx>paper.width + pickOptions.handle_box_size || cy>paper.height+pickOptions.handle_box_size))){
							ft.handles[axis].line.attr({opacity:0.0});
						} else
						ft.handles[axis].line.attr({opacity:1.0,
							path: [ [ 'M', ft.attrs.center.x + ft.attrs.translate.x, ft.attrs.center.y + ft.attrs.translate.y ], [ 'L', ft.handles[axis].disc.attrs.cx, ft.handles[axis].disc.attrs.cy ] ]
							});

						//ft.handles[axis].disc.toFront();
					}
				});
				
				if ( ft.bbox ) {
					ft.bbox.attr({
						path: [
							[ 'M', corners[0].x, corners[0].y ],
							[ 'L', corners[1].x, corners[1].y ],
							[ 'L', corners[2].x, corners[2].y ],
							[ 'L', corners[3].x, corners[3].y ],
							[ 'L', corners[0].x, corners[0].y ]
							]
						});
					// Allowed x, y scaling directions for bbox handles
					var bboxHandleDirection = [
						[ -1, -1 ], [ 1, -1 ], [ 1, 1 ], [ -1, 1 ],
						[  0, -1 ], [ 1,  0 ], [ 0, 1 ], [ -1, 0 ]
						];

					if ( ft.handles.bbox ) {
						ft.handles.bbox.map(function (handle, i) {
							var cx, cy, j, k;

							if ( handle.isCorner ) {
								cx = corners[i].x;
								cy = corners[i].y;
							} /*else {
								j  = i % 4;
								k  = ( j + 1 ) % corners.length;
								cx = ( corners[j].x + corners[k].x ) / 2;
								cy = ( corners[j].y + corners[k].y ) / 2;
							}*/

							handle.element
								.attr({
									x: cx - (pickOptions.handle_box_size),
									y: cy - (pickOptions.handle_box_size)
									})
								.transform('R' + ft.attrs.rotate)
								;

							handle.x = bboxHandleDirection[i][0];
							handle.y = bboxHandleDirection[i][1];
						});
					}
				}
				if(ft.handles.deleteIcon){
					ft.handles.deleteIcon.attr({
						x: corners[4].x - pickOptions.pick_delete_image_attrs.size/2,
						y: corners[4].y - pickOptions.pick_delete_image_attrs.size/2
					});
				}
			
		}
		
		
		/**
		 * Apply transformations, optionally update attributes manually
		 */
		var apply = function(obj) {
			var ft = obj.freeTransform;
				// Take offset values into account
			var
				center = {
					x: ft.attrs.center.x,
					y: ft.attrs.center.y
				},
				rotate    = ft.attrs.rotate,
				scale     = {
					x: ft.attrs.scale.x,
					y: ft.attrs.scale.y
				},
				translate = {
					x: ft.attrs.translate.x,
					y: ft.attrs.translate.y
				};

				obj.instance.transform([
					'R', rotate, center.x, center.y,
					'S', scale.x, scale.y, center.x, center.y,
					'T', translate.x, translate.y
					] + '');
				
				
			}
		
		var applyOnThumb = function(obj) {
			var ft = obj.freeTransform;
			var thumbInstance = obj.thumbInstance;
			if(!thumbInstance){
				return;
			}
			
			
			
				// Take offset values into account
			var
				center = {
					x: ft.attrs.center.x,
					y: ft.attrs.center.y
				},
				rotate    = ft.attrs.rotate,
				scale     = {
					x: ft.attrs.scale.x,
					y: ft.attrs.scale.y
				},
				translate = {
					x: ft.attrs.translate.x,
					y: ft.attrs.translate.y
				};
				var attrs = ft.attrs;
				var scale_x_compensation = (attrs.size.x/2)*(obj.config.thumbRatio-1);
				var scale_y_compensation = (attrs.size.y/2)*(obj.config.thumbRatio-1);
				scale.x *= obj.config.thumbRatio;
				scale.y *= obj.config.thumbRatio;
				translate.x = (attrs.translate.x + attrs.x)*obj.config.thumbRatio - attrs.x + scale_x_compensation;
				translate.y = (attrs.translate.y + attrs.y)*obj.config.thumbRatio - attrs.y + scale_y_compensation;
				thumbInstance.transform([
					'R', rotate, center.x, center.y,
					'S', scale.x, scale.y, center.x, center.y,
					'T', translate.x, translate.y
					] + '');
				
			}
		
		
		/**
		 * Apply limits
		 */
		var applyLimits = function(obj,bbox) {
			var ft = obj.freeTransform;
			var pickOptions = obj.pickOptions;
			// Snap to grid
			
			var corners = getBBox(obj);
			var min_x = Math.min(corners[0].x,(pickOptions.remove?corners[4].x:corners[1].x),corners[2].x,corners[3].x);
			var max_x = Math.max(corners[0].x,(pickOptions.remove?corners[4].x:corners[1].x),corners[2].x,corners[3].x);
			var min_y = Math.min(corners[0].y,(pickOptions.remove?corners[4].y:corners[1].y),corners[2].y,corners[3].y);
			var max_y = Math.max(corners[0].y,(pickOptions.remove?corners[4].y:corners[1].y),corners[2].y,corners[3].y);
			var current_width = (max_x - min_x)/Math.abs(ft.attrs.scale.x);
			var current_height = (max_y - min_y)/Math.abs(ft.attrs.scale.y);
			ft.attrs.scale.x = (ft.attrs.scale.x<0?-1:1)*Math.min((obj.primeSvg.width-2*pickOptions.handle_box_size-( pickOptions.pick_delete_image_attrs.x_distance + pickOptions.handle_box_size))/current_width,Math.abs(ft.attrs.scale.x));
			ft.attrs.scale.y = (ft.attrs.scale.y<0?-1:1)*Math.min((obj.primeSvg.height-2*pickOptions.handle_box_size-(pickOptions.pick_delete_image_attrs.y_distance + pickOptions.pick_delete_image_attrs.size))/current_height,Math.abs(ft.attrs.scale.y));
			if(pickOptions.scale_keepRatio){
				ft.attrs.scale.x = (ft.attrs.scale.x<0?-1:1) * Math.min(Math.abs(ft.attrs.scale.x),Math.abs(ft.attrs.scale.y));
				ft.attrs.scale.y = (ft.attrs.scale.y<0?-1:1)* Math.abs(ft.attrs.scale.x);
			}
			
			corners = getBBox(obj);
			var paper = obj.primeSvg;
			var objBoundary = {
					min:{
						x:corners[0].x,
						y:corners[0].y
					},
					max:{
						x:corners[0].x,
						y:corners[0].y
					}
			}
			corners.map(function(corner,i){
				var sizeFactor = 0;
				if(pickOptions.selection_box==true && pickOptions.scale){
					sizeFactor = 2*pickOptions.handle_box_size;
				}
				if(i==4 && pickOptions.remove==true){
					sizeFactor = 2*pickOptions.pick_delete_image_attrs.size/3;
				}
				objBoundary.min.x = Math.min(objBoundary.min.x,corner.x-sizeFactor);
				objBoundary.min.y = Math.min(objBoundary.min.y,corner.y-sizeFactor);
				objBoundary.max.x = Math.max(objBoundary.max.x,corner.x+sizeFactor);
				objBoundary.max.y = Math.max(objBoundary.max.y,corner.y+sizeFactor);
				
			});
			
			if ( bbox && pickOptions.snap.drag ) {
				var
					x    = bbox.x,
					y    = bbox.y,
					dist = { x: 0, y: 0 },
					snap = { x: 0, y: 0 }
					;

				[ 0, 1 ].map(function() {
					// Top and left sides first
					dist.x = x - Math.round(x / pickOptions.snap.drag) * pickOptions.snap.drag;
					dist.y = y - Math.round(y / pickOptions.snap.drag) * pickOptions.snap.drag;

					if ( Math.abs(dist.x) <= pickOptions.snap.drag ) { snap.x = dist.x; }
					if ( Math.abs(dist.y) <= pickOptions.snap.drag ) { snap.y = dist.y; }

					// Repeat for bottom and right sides
					x += bbox.width  - snap.x;
					y += bbox.height - snap.y;
				});

				ft.attrs.translate.x -= snap.x;
				ft.attrs.translate.y -= snap.y;
			}
			// Keep center within boundaries
			if(objBoundary.max.x>paper.width){
				ft.attrs.translate.x -=(objBoundary.max.x-paper.width)
			}
			if(objBoundary.max.y>paper.height){
				ft.attrs.translate.y -=(objBoundary.max.y-paper.height)
			}
			if(objBoundary.min.y<0){
				ft.attrs.translate.y +=(-objBoundary.min.y)
			}
			if(objBoundary.min.x<0){
				ft.attrs.translate.x +=(-objBoundary.min.x)
			}

			// Snap to angle, rotate with increments
			dist = Math.abs(ft.attrs.rotate % pickOptions.snap.rotate);
			dist = Math.min(dist, pickOptions.snap.rotate - dist);

			if ( dist < pickOptions.snap.rotate ) {
				ft.attrs.rotate = Math.round(ft.attrs.rotate / pickOptions.snap.rotate) * pickOptions.snap.rotate;
			}

			// Snap to scale, scale with increments
			dist = {
				x: Math.abs(( ft.attrs.scale.x * ft.attrs.size.x ) % pickOptions.snap.scale),
				y: Math.abs(( ft.attrs.scale.y * ft.attrs.size.x ) % pickOptions.snap.scale)
				};

			dist = {
				x: Math.min(dist.x, pickOptions.snap.scale - dist.x),
				y: Math.min(dist.y, pickOptions.snap.scale - dist.y)
				};

			if ( dist.x < pickOptions.snap.scale ) {
				ft.attrs.scale.x = Math.round(ft.attrs.scale.x * ft.attrs.size.x / pickOptions.snap.scale) * pickOptions.snap.scale / ft.attrs.size.x;
			}

			if ( dist.y < pickOptions.snap.scale ) {
				ft.attrs.scale.y = Math.round(ft.attrs.scale.y * ft.attrs.size.y / pickOptions.snap.scale) * pickOptions.snap.scale / ft.attrs.size.y;
			}

			// Limit range of rotation
			if ( pickOptions.range.rotate ) {
				var deg = ( 360 + ft.attrs.rotate ) % 360;

				if ( deg > 180 ) { deg -= 360; }

				if ( deg < pickOptions.range.rotate[0] ) { ft.attrs.rotate += pickOptions.range.rotate[0] - deg; }
				if ( deg > pickOptions.range.rotate[1] ) { ft.attrs.rotate += pickOptions.range.rotate[1] - deg; }
			}

			// Limit scale
			if ( pickOptions.range.scale ) {
				if ( ft.attrs.scale.x * ft.attrs.size.x < pickOptions.range.scale[0] ) {
					ft.attrs.scale.x = pickOptions.range.scale[0] / ft.attrs.size.x;
				}

				if ( ft.attrs.scale.y * ft.attrs.size.y < pickOptions.range.scale[0] ) {
					ft.attrs.scale.y = pickOptions.range.scale[0] / ft.attrs.size.y;
				}

				if ( ft.attrs.scale.x * ft.attrs.size.x > pickOptions.range.scale[1] ) {
					ft.attrs.scale.x = pickOptions.range.scale[1] / ft.attrs.size.x;
				}

				if ( ft.attrs.scale.y * ft.attrs.size.y > pickOptions.range.scale[1] ) {
					ft.attrs.scale.y = pickOptions.range.scale[1] / ft.attrs.size.y;
				}
			}
		}

		
		/**
		 * Recursive copy of object
		 */
		function cloneObj(obj) {
			var i, clone = {};

			for ( i in obj ) {
				clone[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
			}
			return clone;
		}

		
		/** 
		 * Get rotated bounding box
		 */
		function getBBox(object) {
			var ft = object.freeTransform;
			var pickOptions = object.pickOptions;
			var rad = {
				x: ( ft.attrs.rotate      ) * Math.PI / 180,
				y: ( ft.attrs.rotate + 90 ) * Math.PI / 180
				};

			var radius = {
				x: (ft.attrs.size.x / 2 * ft.attrs.scale.x) + pickOptions.selection_box_attrs.padding,
				y: (ft.attrs.size.y / 2 * ft.attrs.scale.y) + pickOptions.selection_box_attrs.padding
				};

			var
				corners = [],
				signs   = [ { x: -1, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 1 }, { x: -1, y: 1 } ]
				;

			signs.map(function(sign) {
				corners.push({
					x: ( ft.attrs.center.x + ft.attrs.translate.x + sign.x * radius.x * Math.cos(rad.x) ) + sign.y * radius.y * Math.cos(rad.y),
					y: ( ft.attrs.center.y + ft.attrs.translate.y + sign.x * radius.x * Math.sin(rad.x) ) + sign.y * radius.y * Math.sin(rad.y)
					});
			});
			corners.push({
					x: ( ft.attrs.center.x + ft.attrs.translate.x + 1 * (radius.x+(pickOptions.pick_delete_image_attrs.x_distance + pickOptions.handle_box_size)) * Math.cos(rad.x) ) + -1 * (radius.y-(pickOptions.pick_delete_image_attrs.y_distance - pickOptions.handle_box_size)) * Math.cos(rad.y),
					y: ( ft.attrs.center.y + ft.attrs.translate.y + 1 * (radius.x+(pickOptions.pick_delete_image_attrs.x_distance + pickOptions.handle_box_size)) * Math.sin(rad.x) ) + -1 * (radius.y-(pickOptions.pick_delete_image_attrs.y_distance - pickOptions.handle_box_size)) * Math.sin(rad.y)
			});

			return corners;
		}
		
		
		function getTransformation(obj) {
			var ft = obj.freeTransform;
			var raphaelObj;
			// If subject is not of type set, the first item _is_ the subject
			if ( obj.instance.type === 'set' ) {
				raphaelObj = obj.instance.items[0];
			} else {
				raphaelObj = obj.instance;
			}
			if ( raphaelObj._ && raphaelObj._.transform && typeof raphaelObj._.transform === 'object' ) {
				raphaelObj._.transform.map(function(transform) {
					if ( transform[0] ) {
						switch ( transform[0].toUpperCase() ) {
							case 'T':
								ft.attrs.translate.x += transform[1];
								ft.attrs.translate.y += transform[2];
								break;
							case 'S':
								ft.attrs.scale.x *= transform[1];
								ft.attrs.scale.y *= transform[2];
								break;
							case 'R':
								ft.attrs.rotate += transform[1];
								break;
						}
					}
				});
			}
		}
		
		
		

		/* FREE-TRANSFOREM END*/
		
		
		
		var defaultDragStartHandler = function (obj,x,y,event) {
				Utils.fireEvent(obj,obj.events.DRAG_START);
				obj.showHandles();
			
			/*   FREE-TRANSFORM START   */
				var ft = obj.freeTransform;
				
				ft.o = cloneObj(ft.attrs);

				ft.o.bbox = obj.instance.getBBox();
				obj.event_drag_start();

				/*   FREE-TRANSFORM END   */				
		};

		var defaultDragMoveHandler = function (obj,dx,dy) {
			
			/*   FREE-TRANSFORM START   */
			var ft = obj.freeTransform;
			ft.attrs.translate.x = ft.o.translate.x + dx;
			ft.attrs.translate.y = ft.o.translate.y + dy;

			var bbox = cloneObj(ft.o.bbox);

			bbox.x += dx;
			bbox.y += dy;

			applyLimits(obj,bbox);

			apply(obj);
			obj.updateHandles();
			/*   FREE-TRANSFORM END   */
		};

		var defaultDragEndHandler = function (obj) {		
			Utils.fireEvent(obj,obj.events.STATE_CHANGED);
			applyOnThumb(obj);
						
			obj.event_drag_end();
			Utils.fireEvent(obj,obj.events.DRAG_END);
			
			obj.event_pick_selected();
			Utils.fireEvent(obj,obj.events.PICK_SELECTED);
		}; 

		var defaultSelectPickHandler = function(){
			if(this.isSelected == true){
				return;
			}
			this.isSelected = true;
			this.showHandles();
		};

		var defaultUnselectPickHandler = function(){
			if(!this.isSelected){
				return;
			}
			if(this.instance.boxSet!=null){
				this.instance.boxSet.remove();
			}	
			this.hideHandles();
			this.isSelected = false;
			this.event_pick_unselected();
		};

		var defaultDeletePickHandler = function(){
			this.event_before_deletion();
			this.unSelect();
			this.thumbInstance.remove();
			this.instance.remove();
			this.event_after_deletion();
			Utils.fireEvent(this,this.events.PICK_DELETED);
		};

		var defaultMoveToFront = function(){
			this.instance.toFront();
			this.thumbInstance.toFront();
			if(this.isSelected == true){
				this.showHandles();
			}
			//Touch events are removed once the pick is brought to front, reattaching them
			this.instance.undrag();
			this.instance.drag(Utils.proxy(this.dragMove,this), Utils.proxy(this.dragStart,this), Utils.proxy(this.dragEnd,this));
			Utils.fireEvent(this,this.events.MOVED_TO_FRONT);
		};
		
		var defaultMoveToBack = function(){
			for(var i=this.instance.items.length-1;i>=0;i--){
				this.instance[i].toBack();
				this.thumbInstance[i].toBack();
			}
			//Touch events are removed once the pick is brought to front, reattaching them
			this.instance.undrag();
			this.instance.drag(Utils.proxy(this.dragMove,this), Utils.proxy(this.dragStart,this), Utils.proxy(this.dragEnd,this));
			Utils.fireEvent(this,this.events.MOVED_TO_BACK);
		};

		var defaultResizeStartHandler = function(obj){
			/**
			 * FREE-TRANSFORM START
			 */
			var ft = obj.freeTransform,pickOptions=obj.pickOptions,
			rotate = ( ( 360 - ft.attrs.rotate ) % 360 ) / 180 * Math.PI,
			handlePos = this.attr(['x', 'y']);

			ft.o = cloneObj(ft.attrs);
	
			ft.o.handlePos = {
				cx: handlePos.x + pickOptions.handle_box_size,
				cy: handlePos.y + pickOptions.handle_box_size
				};
	
			ft.o.rotate = {
			sin: Math.sin(rotate),
			cos: Math.cos(rotate)
			};
			obj.event_resize_start();
		}
			
		function keepRatio(axis,ft) {
			if ( axis === 'x' ) {
				ft.attrs.scale.y = ft.attrs.scale.x / ft.attrs.ratio;
			} else {
				ft.attrs.scale.x = ft.attrs.scale.y * ft.attrs.ratio;
			}
		}
			
		

		var defaultResizeHandler = function(obj,dx,dy){
			
			var ft = obj.freeTransform,pickOptions=obj.pickOptions,
				handle = this.handleParent;
			if (pickOptions.scale_keepRatio) {
				dx = handle.axis === 'x' ? -dy : dy;
			}

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

			ft.attrs.translate = {
				x: ft.o.translate.x + rdx / 2,
				y: ft.o.translate.y + rdy / 2
				};

			// Mouse position, relative to element center after translation
			mx = ft.o.handlePos.cx + dx - ft.attrs.center.x - ft.attrs.translate.x;
			my = ft.o.handlePos.cy + dy - ft.attrs.center.y - ft.attrs.translate.y;

			// Position rotated to align with element
			rx = mx * cos - my * sin;
			ry = mx * sin + my * cos;

			// Scale element so that handle is at mouse position
			sx = (rx * 2 * handle.x - 2*pickOptions.selection_box_attrs.padding)  / ft.o.size.x
			sy = (ry * 2 * handle.y - 2*pickOptions.selection_box_attrs.padding)/ ft.o.size.y
					ft.attrs.scale = {
				x: sx || ft.attrs.scale.x,
				y: sy || ft.attrs.scale.y
				};
			ft.attrs.ratio = ft.attrs.scale.x / ft.attrs.scale.y;
			// Maintain aspect ratio
			if (pickOptions.scale_keepRatio) {
				keepRatio(handle.axis,ft);
			}
			
			applyLimits(obj);
			apply(obj);
			obj.updateHandles();
		}

		var defaultResizeEndHandler = function(obj){
			applyOnThumb(obj);
			obj.event_resize_end();
			Utils.fireEvent(obj,obj.events.STATE_CHANGED);

		}

		var defaultRotateHandler = function(obj,dx,dy){
			var ft = obj.freeTransform,pickOptions=obj.pickOptions
			cx = dx + this.ox,
			cy = dy + this.oy
			var rotate = true;
			var mirrored = {
				x: ft.o.scale.x < 0,
				y: ft.o.scale.y < 0
				};
	
			if ( rotate ) {
				var rad = Math.atan2(cy - ft.o.center.y - ft.o.translate.y, cx - ft.o.center.x - ft.o.translate.x);
	
				ft.attrs.rotate = rad * 180 / Math.PI - ( this.freeTransform.axis === 'y' ? 90 : 0 );
				
				if(this.freeTransform.invert){
					ft.attrs.rotate += 180;
				}
				
				if ( mirrored[this.freeTransform.axis] ) { ft.attrs.rotate -= 180; }
			}

			var radius = Math.sqrt(Math.pow(cx - ft.o.center.x - ft.o.translate.x, 2) + Math.pow(cy - ft.o.center.y - ft.o.translate.y, 2));
		
			applyLimits(obj);
			apply(obj); 
			obj.updateHandles(true);
			obj.event_rotation_start();
		}
		var defaultRotateStartHandler = function(obj){
			var ft = obj.freeTransform;
			ft.o = cloneObj(ft.attrs);
			this.ox = this.attrs.cx;
			this.oy = this.attrs.cy;

		}
		var defaultRotateEndHandler = function(obj){
			document.body.style.cursor = 'auto';
			applyOnThumb(obj);
			obj.updateHandles();
			obj.event_rotation_end()
			Utils.fireEvent(obj,obj.events.STATE_CHANGED);
			
		}

		function renderThumb(obj){
			obj.thumbInstance = obj.thumbSvg.set();
			obj.properties.items.map(function(item){
				var element = obj.thumbSvg.add([{type:item.raphaelType}])[0];
				if(item.raphaelAttributes != null){
					element.attr(item.raphaelAttributes);
				} 
				element.attr({"stroke-width":element.attr("stroke-width")*obj.config.thumbRatio});
				obj.thumbInstance.push(element);
				element.node.style.vectorEffect = 'non-scaling-stroke';
				element.node.style.strokeWidth = element.attr('stroke-width');
			})
			applyOnThumb(obj);
		}

		

		function renderPick(pickRatio,obj){
			obj.instance = obj.primeSvg.set();
			obj.properties.items.map(function(item){
				var element = obj.primeSvg.add([{type:item.raphaelType}])[0]
				if(item.raphaelAttributes != null){
					element.attr(item.raphaelAttributes);
				} 
				obj.instance.push(element);
				element.node.style.vectorEffect = 'non-scaling-stroke';
				element.node.style.strokeWidth = element.attr('stroke-width');
			})
			/* FREE-TRANSFORM START */
			var bbox  = obj.instance.getBBox(true);
			obj.freeTransform = {
					// Keep track of transformations
					attrs: {
						x: bbox.x,
						y: bbox.y,
						size: { x: (bbox.width == 0 ) ? 1 : bbox.width, y: (bbox.height==0) ? 1: bbox.height},
						center: { x: bbox.x + bbox.width  / 2, y: bbox.y + bbox.height / 2 },
						rotate: 0,
						scale: { x: 1, y: 1 },
						translate: { x: 0, y: 0 },
						ratio: 1
					},
					handles: { center: null, x: null, y: null },
			}
			
			
			getTransformation(obj);
			
			/* FREE-TRANSFORM END */
			if(pickRatio){
				if(pickRatio.x!=1||pickRatio.y!=1){
					var attrs = obj.freeTransform.attrs;
					var scale_x_compensation = (attrs.size.x/2)*(pickRatio.x-1);
					var scale_y_compensation = (attrs.size.y/2)*(pickRatio.x-1);
					attrs.scale.x *= pickRatio.x;
					attrs.scale.y *= pickRatio.y;
					attrs.translate.x = (attrs.translate.x + attrs.x)*pickRatio.x - attrs.x + scale_x_compensation;
					attrs.translate.y = (attrs.translate.y + attrs.y)*pickRatio.y - attrs.y + scale_y_compensation;
					apply(obj);
					obj.updateSavedProps();
					
				}
			}
			if(obj.pickOptions.drag==true)
			obj.instance.drag(Utils.proxy(obj.dragMove,obj), Utils.proxy(obj.dragStart,obj), Utils.proxy(obj.dragEnd,obj));
		}



		/********************************************************/	
		/*                 Instance Members                     */ 
		/********************************************************/
		/********************************************************/	
		/*                 PUBLIC METHODS                       */ 
		/********************************************************/
		
		
		var PickConstr = function (primeSvg, thumbSvg, properties, pick_config) {
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
			this.pickOptions = Utils.merge_JSON(pickOptionsDefaults,pick_config);

			Utils.registerObjectForEvent(this);
			Utils.addCustomEventListener(this,this.events.STATE_CHANGED,this.updateSavedProps);
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
			renderPick(pickRatio,this);
			renderThumb(this);
			if(this.event_after_paint){
				this.event_after_paint(pickRatio);
			}
		}
		
		PickConstr.prototype.updateSavedProps= function() {
			var obj = this;
			this.properties.items.map(function(item,i){
				item.raphaelAttributes = obj.instance[i].attr();
			})
		}

		PickConstr.prototype.reRenderThumb=function(thumbSvgObj){
			this.thumbSvg = thumbSvgObj;
			if(this.thumbInstance)
				this.thumbInstance.remove();
			this.config.thumbRatio=namespace.config.thumbRatio;
			renderThumb(this);
		}

		PickConstr.prototype.reRender=function(primeSvgObj,thumbSvgObj,pickRatio){
			this.primeSvg = primeSvgObj;
			this.instance.remove();
			renderPick(pickRatio,this);
			this.reRenderThumb(thumbSvgObj);
			this.properties.context.height = primeSvgObj.height;
            this.properties.context.width = primeSvgObj.width;
		}

		PickConstr.prototype.rotate =function(degree){
			var ft = this.freeTransform;
			ft.attrs.rotate += degree;
			applyLimits(this);
			apply(this);
			applyOnThumb(this);
			this.updateHandles();
			Utils.fireEvent(this,this.events.STATE_CHANGED);
		}

		PickConstr.prototype.resize = function(scale_x,scale_y){
			var ft = this.freeTransform;
			ft.attrs.scale.x *= scale_x;
			ft.attrs.scale.y *= scale_y;
			applyLimits(this);
			apply(this);
			applyOnThumb(this);
			this.updateHandles();
			Utils.fireEvent(this,this.events.STATE_CHANGED);
		}

		PickConstr.prototype.translate = function(x,y){
			var ft = this.freeTransform;
			ft.attrs.translate.x += x; 
			ft.attrs.translate.y += y;
			applyLimits(this);
			apply(this);
			applyOnThumb(this);
			this.updateHandles();
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
		
		PickConstr.prototype.moveToBack = defaultMoveToBack;
		
		PickConstr.prototype.updateHandles = defaultUpdateHandles;
		PickConstr.prototype.showHandles = defaultShowHandles;
		PickConstr.prototype.hideHandles = defaultHideHandles;
		
		/**Default local event functions*/
		PickConstr.prototype.event_pick_selected = function(){}
		
		PickConstr.prototype.event_pick_unselected = function(){}
		
		PickConstr.prototype.event_drag_start = function(){}
		
		PickConstr.prototype.event_drag_end = function(){}
		
		PickConstr.prototype.event_resize_start = function(){}
		
		PickConstr.prototype.event_resize_end = function(){}
		
		PickConstr.prototype.event_rotation_start = function(){}
		
		PickConstr.prototype.event_rotation_end = function(){}
		
		PickConstr.prototype.event_before_deletion = function(){}
		
		PickConstr.prototype.event_after_deletion = function(){}
		
		/**Default local event functions END*/
		
		PickConstr.prototype.events = {
				PICK_SELECTED:'pickSelected',
				STATE_CHANGED:'stateChanged',
				PICK_DELETED:'pickDeleted',
				DRAG_END:'dragEnd',
				DRAG_START:'dragStart',
				MOVED_TO_FRONT: 'movedToFront',
				MOVED_TO_BACK:'movedToBack'
		};
		
		PickConstr.prototype.toJSON  = function() {
			return {
           		 "properties": this.properties
       		};
		}
		
		PickConstr.prototype.updateFTProps = function(){
			var bbox  = this.instance.getBBox(true);
			var freeTransform = {
					attrs: {
						x: bbox.x,
						y: bbox.y,
						size: { x: bbox.width, y: bbox.height },
						center: { x: bbox.x + bbox.width  / 2, y: bbox.y + bbox.height / 2 },
					}
			}
			this.freeTransform = Utils.merge_JSON(this.freeTransform,freeTransform);
		} 
		
		PickConstr.prototype.setProperties  = function(setIndex, attributes) {
			if(attributes.transform)
				return;
			this.instance[setIndex].attr(attributes);
			if(attributes["stroke-width"]){
				this.instance[setIndex].node.style.strokeWidth = attributes["stroke-width"];
				this.thumbInstance[setIndex].node.style.strokeWidth = attributes["stroke-width"];
				attributes["stroke-width"] = attributes["stroke-width"]*this.config.thumbRatio;
			}
			this.thumbInstance[setIndex].attr(attributes);
			this.updateFTProps();
			apply(this);
			applyOnThumb(this);
			this.updateHandles();
		}
		
		PickConstr.prototype.getProperties  = function(setIndex) {
			return this.instance[setIndex].attr();

		}
		
		PickConstr.prototype.externalObject = function(){
			var self = this;
			return {
				rotate:function(degree){self.rotate(degree)},
				resize:function(scale_x,scale_y){self.resize(scale_x,scale_y)},
				deletePick:function(){self.deletePick()},
				setProperties:function(setIndex, attributes){self.setProperties(setIndex, attributes)},
				handler:this.properties.handler,
				moveToFront: function(){self.moveToFront()},
				moveToBack: function(){self.moveToBack()}
			}
		}
		
		
		// return the constructor
		return PickConstr;


}();