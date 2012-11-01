com.compro.ppt.GLOBAL.initWorkspace = function(collageid,workspaceid,stateJson,selectedSlideNumber){		
		/*
		* Creating a singleton object(application has only single "workspace")
		*/
		var state = stateJson;
		var selectedSlideN0 = selectedSlideNumber;
		if(state==null || state=='resume'){
			state = localStorage.getItem("slideList");
			selectedSlideN0 = localStorage.getItem("ppt_selectedslide");
		}		
		com.compro.ppt.workspace = (function(stateStr, storedSelectedSlide){
			/********************************************************/
			/*                   DEPENDENCIES                       */ 
			/********************************************************/

			var Utils = com.compro.ppt.Utils;
			var namespace = com.compro.ppt;
			var Slide = namespace.Slide;
			var collageScrollVisible = false;
			var undoStack = new Array();
			var redoStack = new Array();
			var MAX_STACK_SIZE = 10;

			/********************************************************/	
			/*                 Private Members                     */ 
			/********************************************************/
			var selectedSlide = -1;

			/********************************************************/
			/*                 Instance Members                     */ 
			/********************************************************/
			var el = Utils.getById(workspaceid);
			var collageDiv = Utils.getById(collageid);

			if(el==null){
				throw ("div with id: " + workspaceid + " not found");
			}
			if(collageDiv==null){
					throw ("div with id: " + collageid + " not found");
			}
			var slideList = [];
			
			var saveState = function(notsaveinStack){
				var state = JSON.stringify(slideList);
				if(!notsaveinStack){
					undoStack.push({state:state,selectedSlide:selectedSlide});
					if(undoStack.length>MAX_STACK_SIZE+1){
						undoStack.splice(0,1);
					}
					console.log(undoStack.length);
					redoStack.length = 0;
				}
				localStorage.setItem("slideList",JSON.stringify(slideList));
				namespace.GLOBAL.triggerGlobalEvent("STATE_CHANGED",this,state);

			}
		
			/*
				handler - The object which will handle the creation of the Pick 
                          in terms of Rapheal attributes 

                coordX - X coordinate relation to the workspace. This will be passed on "as is"  
                         to the Handler contructor
                coordY - Y coordinate relation to the workspace. This will be passed on "as is"  
                         to the Handler contructor 

                properties - An JSON object representing properties/data/config/etc. for the 
                             newly added Pick. This properties object  will be passed on "as is"  
                             to the Handler contructor. 

                             It is the responsibility of the Handler constructor to MAP these to 
                             valid Rapheal attributes/commands required to contruct the Pick.                    

			*/

			var addPick = function(handler,coordX,coordY,properties) {
				var pick = slideList[selectedSlide].addPick(handler,coordX,coordY,properties,null,false);
				Utils.addCustomEventListener(pick,pick.events.PICK_SELECTED,function(event){
					namespace.GLOBAL.triggerGlobalEvent("ON_PICK_CLICK",pick,pick);
				});
				Utils.addCustomEventListener(pick,pick.events.PICK_UNSELECTED,function(event){
					namespace.GLOBAL.triggerGlobalEvent("ON_PICK_UNSELECT",pick,pick);
				});
				saveState();
			}

			var addPickFromStorage = function(handler,coordX,coordY,storageProps,saveStateFlag) {
				saveStateFlag = typeof saveStateFlag !== 'undefined' ? saveStateFlag : true;
				var pick = slideList[selectedSlide].addPick(handler,coordX,coordY,null,storageProps,true);
				Utils.addCustomEventListener(pick,pick.events.PICK_SELECTED,function(event){
					namespace.GLOBAL.triggerGlobalEvent("ON_PICK_CLICK",pick,pick);
				});
				Utils.addCustomEventListener(pick,pick.events.PICK_UNSELECTED,function(event){
					namespace.GLOBAL.triggerGlobalEvent("ON_PICK_UNSELECT",pick,pick);
				});
				if(saveStateFlag){
					saveState();
				}
			}

			var clearState = namespace.GLOBAL.clearState =  function(){
				localStorage.removeItem('slideList');
				localStorage.removeItem('ppt_selectedslide');
				document.location.reload(true);
			}



			var newSlide = function(slideProp){
				if(selectedSlide!=-1){
					slideList[selectedSlide].hide();
				}
				var slide = new Slide(el.id,collageDiv.id,slideProp);
				slideList.push(slide);
				

				Utils.addCustomEventListener(slide,"stateChanged",function(event){
					saveState();
				});

				Utils.addCustomEventListener(slide,"slideSelected",function(event){
					selectSlide(event.target);
				});
				selectSlide(slide);
				return slide;
			}

			var deleteSlide = function(){
				var slide = slideList[selectedSlide];
				slide.remove();
				slideList.splice(selectedSlide,1);
				var tempSelectedSlide = selectedSlide;
				selectedSlide = -1;
				selectSlide(slideList[(tempSelectedSlide)%slideList.length]);
				saveState();
			}

			var selectSlide= function(slide){
				if(selectedSlide!=-1){
						slideList[selectedSlide].hide();
				}
				var index = slideList.indexOf(slide);
				slideList[index].show();
				selectedSlide = index;
				localStorage.setItem("ppt_selectedslide",selectedSlide);
			}
			

			namespace.GLOBAL.moveSlide = function(srcIndex, destinationIndex){
				if(srcIndex<0||destinationIndex>=slideList.length)
					return -1;
				if(selectedSlide == srcIndex){
					selectedSlide = destinationIndex;
				} else if(selectedSlide<=destinationIndex && selectedSlide>srcIndex){
					selectedSlide--;
				}else if(selectedSlide>=destinationIndex && selectedSlide<srcIndex){
					selectedSlide++;
				}
				localStorage.setItem("ppt_selectedslide",selectedSlide);
				var slide = slideList[srcIndex];
				slideList.splice(srcIndex,1);
				slideList.splice(destinationIndex,0,slide);
				saveState();
			}
			
			namespace.GLOBAL.undoAction = function(){
				if(undoStack.length<=1){
					return;
				}
				redoStack.push(undoStack.pop());
				var stateJson = undoStack.pop();
				undoStack.push(stateJson);
				restoreState(stateJson);
			}
			
			Utils.addControlZListener(namespace.GLOBAL.undoAction);
			
			namespace.GLOBAL.redoAction = function(){
				if(redoStack.length<1){
					return;
				}
				var stateJson = redoStack.pop();
				undoStack.push(stateJson);
				restoreState(stateJson);
			}
			
			Utils.addControlYListener(namespace.GLOBAL.redoAction);
			
			var restoreState = function(stateJson){
				slideList.map(function(slide){
					slide.remove();
				});
				slideList.length = 0;
				selectedSlide = -1;
				var state = JSON.parse(stateJson.state);
				for(var slideNum=0; slideNum<state.length; slideNum++){
					var slideProp = {
						oldH:state[slideNum].currentH,
						oldW:state[slideNum].currentW
					}
					var slide = newSlide(slideProp);
					for(var picNum=0;picNum<state[slideNum].pickList.length;picNum++){
						var oldSlidePick = state[slideNum].pickList[picNum];
						addPickFromStorage(oldSlidePick.properties.handler, oldSlidePick.properties.coordX, oldSlidePick.properties.coordY,oldSlidePick.properties,false);
					}
					slide.resetOLdValues();
				}
				checkAndReRenderThumbs();
				if(stateJson.selectedSlide && stateJson.selectedSlide!=-1){
					selectSlide(slideList[stateJson.selectedSlide]);
				}
				saveState(true);
			}
			
			namespace.GLOBAL.addNewSlide = function(){
				var slide = newSlide();
				checkAndReRenderThumbs();
				saveState();
				return {
					"thumbDiv":slide.collageDiv
				}
			}
			namespace.GLOBAL.nextSlide = function(){
				var totalSlides = slideList.length;
				if (selectedSlide < totalSlides-1){
					selectSlide(slideList[selectedSlide+1]);
					//return true if the newly selected Slide is not the last slide
					if(selectedSlide < totalSlides-1){
						return true;
					}
				}
				return false;
				
			}
			
			namespace.GLOBAL.previousSlide = function(){
				if(selectedSlide>0){
					selectSlide(slideList[selectedSlide-1]);
					//return true if the newly selected slide is not the first slide
					if(selectedSlide > 0){
						return true;
					}
				}
				return false;
			}
			
			namespace.GLOBAL.moveObjectToFront = function(){
				if(selectedSlide!=-1){
					return  slideList[selectedSlide].movePickToFront();
				} else{
					return -1;
				}
			}
			
			namespace.GLOBAL.moveObjectToBack = function(){
				if(selectedSlide!=-1){
					return  slideList[selectedSlide].movePickToBack();
				} else{
					return -1;
				}
			}
			
			namespace.GLOBAL.removeObject = function(){
				if(selectedSlide!=-1){
					return  slideList[selectedSlide].removePick();
				} else{
					return -1;
				}
			}
			
			namespace.GLOBAL.getSelectedObject = function(){
				if(selectedSlide!=-1){
					return slideList[selectedSlide].getSelectedPick();
				} else{
					return null;
				}
			}

			var checkAndReRenderThumbs= function(){
				if(collageScrollVisible!=(collageDiv.scrollHeight>collageDiv.offsetHeight)){
						collageScrollVisible = (collageDiv.scrollHeight>collageDiv.offsetHeight);
						for(var i=0;i<slideList.length;i++){
							slideList[i].reRenderThumbs();
					}
				}
			}
			
			namespace.GLOBAL.deleteSelectedSlide = function(){
					deleteSlide();
					checkAndReRenderThumbs();
			}
			
			var reRenderUnderProcess = false;
			var reRenderRequestRecieved = false;
			var reRender = namespace.GLOBAL.reRender = function(){
				reRenderRequestRecieved = true;
				if(reRenderUnderProcess){
					return;
				}
				while(reRenderRequestRecieved){
					reRenderRequestRecieved = false;
					reRenderUnderProcess = true;
					if(selectedSlide!=-1){
								slideList[selectedSlide].hide();
					}
					for(var i=0;i<slideList.length;i++) {
							slideList[i].show();
							slideList[i].reRender();
							slideList[i].hide();
					}
					if(selectedSlide!=-1){
							slideList[selectedSlide].show();
					}
				}
				reRenderUnderProcess = false;
				saveState();
			}

			
			var workspaceObj = {
				"el":el,
				"collageDiv":collageDiv,
				"saveState":saveState,
				"addPick":addPick
			};
			/********************************************************/
			/*                 One-time Execution Block             */ 
			/********************************************************/			
			if(stateStr!=null && stateStr!=""){
				var state = JSON.parse(stateStr);
				for(var slideNum=0; slideNum<state.length; slideNum++){
					var slideProp = {
						oldH:state[slideNum].currentH,
						oldW:state[slideNum].currentW
					}
					var slide = newSlide(slideProp);
					for(var picNum=0;picNum<state[slideNum].pickList.length;picNum++){
						var oldSlidePick = state[slideNum].pickList[picNum];
						addPickFromStorage(oldSlidePick.properties.handler, oldSlidePick.properties.coordX, oldSlidePick.properties.coordY,oldSlidePick.properties,false);
					}
					slide.resetOLdValues();
				}
				checkAndReRenderThumbs();
				if(storedSelectedSlide && storedSelectedSlide!=-1){
					selectSlide(slideList[storedSelectedSlide]);
				}
				saveState();
			}
			else{
				newSlide();
				saveState();
			}

			//return object
			return workspaceObj;
		}) (state,selectedSlideN0);
}