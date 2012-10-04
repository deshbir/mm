com.compro.ppt.GLOBAL.initWorkspace = function(collageid,workspaceid){		
		/*
		* Creating a singleton object(application has only single "workspace")
		*/
		com.compro.ppt.workspace = (function(stateStr){
			/********************************************************/
			/*                   DEPENDENCIES                       */ 
			/********************************************************/

			var Utils = com.compro.ppt.Utils;
			var namespace = com.compro.ppt;
			var Slide = namespace.Slide;
			var collageScrollVisible = false;

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
			
			var saveState = function(){
				localStorage.setItem("slideList",JSON.stringify(slideList));
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
				slideList[selectedSlide].addPick(handler,coordX,coordY,properties,null,false);
				saveState();
			}

			var addPickFromStorage = function(handler,coordX,coordY,storageProps,saveStateFlag) {
				saveStateFlag = typeof saveStateFlag !== 'undefined' ? saveStateFlag : true;
				slideList[selectedSlide].addPick(handler,coordX,coordY,null,storageProps,true);
				if(saveStateFlag){
					saveState();
				}
			}

			var clearState = namespace.GLOBAL.clearState =  function(){
				localStorage.removeItem('slideList');
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
				selectedSlide = slideList.length-1;
				slide.show();
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
				var index = slideList.indexOf(slide)
				slideList[index].show();
				selectedSlide = index;
			}

			namespace.GLOBAL.addNewSlide = function(){
				newSlide();
				checkAndReRenderThumbs();
				saveState();
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
			if(stateStr!=null){
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
				saveState();
			}
			else{
				newSlide();
			}

			//return object
			return workspaceObj;
		}) (localStorage.getItem("slideList"));
}