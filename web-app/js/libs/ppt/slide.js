com.compro.ppt.Slide = function() {

    /********************************************************/
	/*                   DEPENDENCIES                       */ 
	/********************************************************/
	var Utils = com.compro.ppt.Utils;
	var namespace = com.compro.ppt;
	//It has dependencies on Pick, Shape, Image, and rest of the Pick implementations

	/********************************************************/	
	/*                 PUBLIC METHODS                       */ 
	/********************************************************/
	

    	var SlideConstr = function (workspaceid,collageid,slideProp) {
    		Utils.registerObjectForEvent(this);
			this.workspace = Utils.createElement("div");
			Utils.appendChild(Utils.getById(workspaceid),this.workspace);
			this.workspace.style.height="100%";


			this.collageDiv = Utils.createElement("div");
			Utils.addClass(this.collageDiv,"collage-element");
			Utils.addClass(this.collageDiv,"middle");
			Utils.appendChild(Utils.getById(collageid),this.collageDiv);

			this.createThumb();
			var computedWidthCollage = parseFloat(Utils.getCssComputedProperty(this.collageDiv, 'width'));
		var ratio = computedWidthCollage/this.workspace.offsetWidth;
		if(namespace.config == null) {
			namespace.config = {};	
		}
		namespace.config.thumbRatio = ratio;

		this.svgWidth = this.workspace.offsetWidth;
		this.svgHeight = this.workspace.offsetHeight;
		this.primeSvg = Raphael(this.workspace, this.svgWidth, this.svgHeight);
		this.backRect = this.primeSvg.rect(0,0,this.svgWidth,this.svgHeight).attr({
				'stroke-width': 0,
				'fill': '#fff',
				'fill-opacity': 0.0
		});


		//creating collage-thumbnail for the slide
		var that = this;
		Utils.attachEvent(this.collageDiv,"click",function(){
			Utils.fireEvent(that,"slideSelected");
		});

		
		
		this.selectedPick = -1;
		this.pickList = [];

		this.backRect.click(Utils.proxyChangeContext(this.unSelectPick,this));
		this.slideProp = slideProp;

		};

	// public API -- prototype
	var slideproto = SlideConstr.prototype = {
		constructor: com.compro.ppt.Slide,
		version: "1.0"
	};
	
      slideproto.createThumb=function(){
		
		this.aspectRatio = Utils.aspectRatio(this.workspace.parentNode);
		console.log("aspectRatio" + this.aspectRatio);
		
		/* Fancy Code Starts */
		
		var paddingLeft = parseFloat(Utils.getCssComputedProperty(this.workspace.parentNode, 'padding-left'));
		var paddingRight = parseFloat(Utils.getCssComputedProperty(this.workspace.parentNode, 'padding-right'));
		var paddingTop = parseFloat(Utils.getCssComputedProperty(this.workspace.parentNode, 'padding-top'));
		var paddingBottom = parseFloat(Utils.getCssComputedProperty(this.workspace.parentNode, 'padding-bottom'));
		
		var computedWidth = parseFloat(Utils.getCssComputedProperty(this.workspace.parentNode, 'width'));
		var computedHeight = parseFloat(Utils.getCssComputedProperty(this.workspace.parentNode, 'height'));
		
		var computedWidthCollage = parseFloat(Utils.getCssComputedProperty(this.collageDiv, 'width'));
		
		var leftPaddingForSvg = (paddingLeft/computedWidth) * computedWidthCollage;
		var rigthPaddingForSvg = (paddingRight/computedWidth) * computedWidthCollage;
		
		this.collageDiv.style.paddingLeft = leftPaddingForSvg + 'px';
		this.collageDiv.style.paddingRight = rigthPaddingForSvg + 'px';

		
		
		var computedWidthCollage = parseFloat(Utils.getCssComputedProperty(this.collageDiv, 'width'));
		
		
		console.log("computedWidth" + computedWidthCollage);
		
		//this.collageDiv.style.width = this.collageDiv.style.width -(leftPaddingForSvg+rigthPaddingForSvg);
		/* Fancy Code Ends */
		var computedHeightForSvgThumbnail = (computedWidthCollage + leftPaddingForSvg + rigthPaddingForSvg)/this.aspectRatio ;
		
		
		console.log("computedHeightForSvgThumbnail :" + computedHeightForSvgThumbnail);
		this.collageDiv.style.height = computedHeightForSvgThumbnail + "px";
		
		var computedHeightCollage = parseFloat(Utils.getCssComputedProperty(this.collageDiv, 'height'));
		var topPaddingForSvg = (paddingTop/computedHeight) * computedHeightCollage;
		var bottomPaddingForSvg = (paddingBottom/computedHeight) * computedHeightCollage;		
		this.collageDiv.style.paddingTop = topPaddingForSvg + 'px';
		this.collageDiv.style.paddingBottom = bottomPaddingForSvg + 'px';
		this.collageDiv.style.height = (computedHeightCollage-topPaddingForSvg-bottomPaddingForSvg) + "px";
		var computedHeightCollage = parseFloat(Utils.getCssComputedProperty(this.collageDiv, 'height'));
		
		this.thumbSvg = Raphael(this.collageDiv, computedWidthCollage, computedHeightCollage);
	}

	slideproto.addPick = function(handler,coordX,coordY,toolsProps,storageProps,isFromStorage){
		var params = {
			coordX:coordX,
			coordY:coordY,
			primeSvg:this.primeSvg,
			thumbSvg:this.thumbSvg,
			toolsProps:toolsProps,
			storageProps:storageProps,
			isFromStorage:isFromStorage
		}
		var evalString = 'new ' + handler + '(params)';
		var pick = eval(evalString);
		var pickRatio;
		if(this.slideProp && this.slideProp.oldW && this.slideProp.oldH) {
			pickRatio = {
				x:this.svgWidth/this.slideProp.oldW,
				y:this.svgHeight/this.slideProp.oldH
			}
		}

		pick.paint(pickRatio);
		
		this.pickList.push(pick);
		Utils.addCustomEventListener(pick,pick.events.STATE_CHANGED,Utils.proxy(function(obj,event){
			obj.saveState();
		},this));

		Utils.addCustomEventListener(pick,pick.events.PICK_DELETED,Utils.proxy(function(obj,event){
			obj.unSelectPick();
			obj.removePickfromList(event.target);
			obj.saveState();
		},this));

		Utils.addCustomEventListener(pick,pick.events.DRAG_END,Utils.proxy(function(obj,event){
			obj.selectPick(event.target);
		},this));

		Utils.addCustomEventListener(pick,pick.events.DRAG_START,Utils.proxy(function(obj,event){
			obj.unSelectPick();
			obj.movePickToFront(event.target);
		},this));

		return pick;
	}

	slideproto.resetOLdValues = function(){
		this.slideProp = null;
	}

	slideproto.saveState = function() {
		Utils.fireEvent(this,"stateChanged");
	}

	slideproto.unSelectPick = function(){
		if(this.selectedPick!=-1){
			this.pickList[this.selectedPick].unSelect();
			this.selectedPick = -1;
		}
	}

	slideproto.selectPick = function(pick){
		pick.selectPick();
		this.selectedPick = this.pickList.indexOf(pick);
	}

	slideproto.movePickToFront=function(pick){
		var pickIndex = this.pickList.indexOf(pick);
		this.pickList.splice(pickIndex,1);
		this.pickList.push(pick);
		pick.moveToFront();
	}

	slideproto.removePickfromList = function(pick){
		var pickIndex = this.pickList.indexOf(pick);
		this.pickList.splice(pickIndex,1);
	}

	slideproto.hide = function(){
		Utils.addClass(this.workspace,"hide");
		Utils.removeClass(this.collageDiv,"slide_selected");
		
	}

	slideproto.show = function(){
		Utils.removeClass(this.workspace,"hide");
		Utils.addClass(this.collageDiv,"slide_selected");
	}

	slideproto.remove = function(){
		this.primeSvg.remove();
		this.thumbSvg.remove();
		Utils.removeFromDOM(this.workspace);
		Utils.removeFromDOM(this.collageDiv);
	}

	slideproto.reRenderThumbs = function(){
		this.createThumb();
		var computedWidthCollage = parseFloat(Utils.getCssComputedProperty(this.collageDiv, 'width'));

		var ratio = computedWidthCollage/this.svgWidth;
		namespace.config.thumbRatio = ratio;
		for(var i=0;i<this.pickList.length;i++){
			this.pickList[i].reRenderThumb(this.thumbSvg);
		}
	}

	slideproto.reRender = function(){
		console.log("in reRender");
		var pickRatio = {
			x:(this.workspace.offsetWidth/this.svgWidth),
			y:(this.workspace.offsetHeight/this.svgHeight)
		}

		if(pickRatio.x==1&&pickRatio.y==1){
			return;
		}
		console.log(pickRatio);
		this.svgWidth  = this.workspace.offsetWidth;
		this.svgHeight  = this.workspace.offsetHeight;
		this.thumbSvg.remove();
		this.primeSvg.remove();
		this.primeSvg = Raphael(this.workspace,this.svgWidth ,this.svgHeight );
		this.backRect = this.primeSvg.rect(0,0,this.svgWidth,this.svgHeight).attr({
			'stroke-width': 0,
			'fill': '#fff',
			'fill-opacity': 0.0
		});
		this.createThumb();
		var computedWidthCollage = parseFloat(Utils.getCssComputedProperty(this.collageDiv, 'width'));
		var ratio = computedWidthCollage/this.svgWidth;
		namespace.config.thumbRatio = ratio;
		for(var i=0;i<this.pickList.length;i++){
			this.pickList[i].reRender(this.primeSvg,this.thumbSvg,pickRatio);
		}
		if(this.selectedPick!=-1){
			this.selectPick(this.pickList[this.selectedPick]);
		}
		this.backRect.click(Utils.proxyChangeContext(this.unSelectPick,this));
	}

	slideproto.toJSON = function(){
		return {
			"pickList":this.pickList,
			"currentH":this.svgHeight,
			"currentW":this.svgWidth,
		}
	}

	return SlideConstr;
}();