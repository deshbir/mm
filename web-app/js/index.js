/*
-----------------
GLOBAL Util Module
-----------------
*/

function namespace(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';

    for(var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }

    return parent;
}

/*
-----------------
Anonymouse Module
-----------------

Name: PPTFrame Sample
Description: A GUI framework for a powerpoint type application.

*/
namespace("com.compro.application");
com.compro.application.mm = (function() {

    /********************************************************/
	/*                   DEPENDENCIES                       */
	/********************************************************/

	//JS Library Dependencies
	/////var UTILS = com.compro.Util;

	//DOM Dependencies
	//TODO: Commented because it is conflicting with the dom ready sitting down to this code.
	//$(document).ready(function() {
		var el_leftsidebar = $("#leftsidebar");
		var el_maincontainer = $("#main-container");
		var el_toolbar = $("#toolbar");
		var el_accordion_group_arr = $(".accordion-group");
		var el_accordion_heading_arr = $(".accordion-heading");
		var el_accordion_body_arr = $(".accordion-body");
		var el_accordion_inner_arr = $(".accordion-inner");
		var el_the_slide = $("#the-slide");
		var el_slide_toggle = $('#slide-toggle');
		var el_header = $(".header");
		var el_col_arr = $(".col");
		var el_body = $('body');
		var screenWidth = el_body.width();
		var el_my_photos_btn = $("#my-photos-btn");
		var el_library_photos_btn =  $("#library-photos-btn");
		var el_library_photos = $("#library-photo");
		var el_my_photos = $("#my-photos");
		//UTILS.checkDomDependencies(.................);
	//});
	/*

	TODO
	1. Can we assume that these DOM element are initializaed by this time
	2. Exception handling - do not allow code to proceed, if any of these depencies
	   are not present.

	*/
		
	/********************************************************/
	/*                 PRIVATE MEMBERS                     */
	/********************************************************/
	// PPTApp varibale declaration 
	var document_dir = "ltr";
	document_dir = el_body.attr("dir");
	// sidebar and toolbar directions got reversed in "RTL" document direction.
	var position_sidebar = document_dir == "rtl" ? "right" : "left";
	var position_toolbar = (position_sidebar == "left") ? "right" : "left";
	var myPPTApp = com.compro.ppt.GLOBAL;
	
	// Config for plug
	var config = {
		HEADER_HEIGHT:	'91px',
		BODY_ELEMS_TOP: '99px',
		HEADER_HEIGHT_MOBILE: '45px',
		BODY_ELEMS_TOP_MOBILE: '50px',
		THUMBNAIL_SIDEBAR_WIDTH : "150px",
		ACCORDION_INNER_PADDING:9,
		SLIDE_TOGGLE_POSITION:'8.3em',
		MARGIN_TOP_IPAD_SLIDE_TOGGLE : '3.5em',
		MARGIN_TOP_SLIDE_TOGGLE : '6em',
		MAINCONTAINER_ZERO_POSITION:'0',
		TOOLBAR_WIDTH:'350px'
	};

	// Config for devices
	var device_vars = {
	    MOBILE_MAX_WIDTH : 767,
		TABLET_MIN_WIDTH:768,
		TABLET_MAX_WIDTH : 980,
		DESKTOP_MIN_WIDTH : 981,
		MIN_HEIGHT_THRESHOLD : 650,
		margins_el_maincontainer : 27,
		scrollbar_el_maincontainer : 10,
		borders_el_maincontainer : 12,
		paddings_el_maincontainer : 26
	};

	function toggleSidebar(){
		if(el_leftsidebar.is(":visible")) {
			el_leftsidebar.css("display","none");
			el_maincontainer.css(position_sidebar,config.MAINCONTAINER_ZERO_POSITION);
			if(document_dir == "rtl") {
				$(el_slide_toggle.find("i")).removeClass("icon-caret-right");
				$(el_slide_toggle.find("i")).addClass("icon-caret-left");
			} else {
				$(el_slide_toggle.find("i")).removeClass("icon-caret-left");
				$(el_slide_toggle.find("i")).addClass("icon-caret-right");
			}
			el_slide_toggle.css("margin-"+position_sidebar,"0");
		} else {
			el_leftsidebar.css({
				"display":"block"
			});
			el_maincontainer.css(position_sidebar,config.THUMBNAIL_SIDEBAR_WIDTH);
			if(document_dir == "rtl") {
				$(el_slide_toggle.find("i")).removeClass("icon-caret-left");
				$(el_slide_toggle.find("i")).addClass("icon-caret-right");
			} else {
				$(el_slide_toggle.find("i")).removeClass("icon-caret-right");
				$(el_slide_toggle.find("i")).addClass("icon-caret-left");
			}
			el_slide_toggle.css("margin-"+position_sidebar,config.SLIDE_TOGGLE_POSITION);
	   }
	   setMainSlideHeight();
	}
	
	/**
	 * TODO : Move this function to some another js(not yet decided).
	 */
	function setAccordionScroll() {
		var accordionHeight =  $("#toolbar").height();
		var accordionTabs = $(".accordion-group").length;
		var accordionHeadingHeight = $(".accordion-heading").height();
		var allTabsHeight = accordionTabs*accordionHeadingHeight;
		//Reduce the padding top and bottom also to set the height.
		var paddingHeight = (9+2)* accordionTabs;
		var calcAccordionInnerHeight =  accordionHeight-allTabsHeight-paddingHeight;
		//Set height for each accordion inner tab
		for(var i=0; i<accordionTabs; i++) {
			var scrollDiv = $($(".accordion-inner")[i]).find(".scroll-pane");
			//Since Photos tab contain scroll in info div as well no extra height, hence do not reduce.
			if(i==1) {
				scrollDiv.height(calcAccordionInnerHeight + "px");
			} else {
				//reduce extra height other than scrollable div
				var extraHeight = $($(".accordion-inner")[i]).height() - scrollDiv.height();
				scrollDiv.height(calcAccordionInnerHeight - extraHeight + "px");
			}
		}
		if(!checkAppleDevice()) {
			var scrollPanesElems = $(".accordion-inner .scroll-pane");
			for(var j=0;j<scrollPanesElems.length;j++) {
				var scrollElem = $(scrollPanesElems[j]);
				if(!scrollElem.hasClass("mCustomScrollbar")) {
					scrollElem.mCustomScrollbar({
						scrollInertia:0
					});
				}
			}
		}
	}

	function setMainSlideHeight() {
		var containerHeight = el_maincontainer.height();
		var containerWidth = el_maincontainer.width();
		var consumedWidth = device_vars.borders_el_maincontainer + device_vars.paddings_el_maincontainer
							+ device_vars.scrollbar_el_maincontainer + device_vars.margins_el_maincontainer + $(".copyright-info").height() + 5;
		if(containerHeight <= device_vars.MIN_HEIGHT_THRESHOLD)	{
			slideWidth = (containerWidth - consumedWidth);
			slideHeight = slideWidth / 0.77;
		} else {
			var consumedHeight = device_vars.borders_el_maincontainer + device_vars.paddings_el_maincontainer
								 + device_vars.scrollbar_el_maincontainer + device_vars.margins_el_maincontainer + $(".copyright-info").height() + 5;
			slideHeight = containerHeight - consumedHeight;
			slideWidth = slideHeight * 0.77;
			if (slideWidth >= (containerWidth - consumedWidth))	{
				slideWidth = containerWidth - consumedWidth;
				slideHeight = slideWidth / 0.77;
			}
		}
		el_the_slide.height(slideHeight);
		el_the_slide.width(slideWidth);
		el_the_slide.css ( {
			"margin-top": device_vars.margins_el_maincontainer,
			"margin-right": "auto",
			"margin-bottom": "5px",
			"margin-left": "auto"
		});
		if(!checkAppleDevice()) {
			el_maincontainer.mCustomScrollbar("update");
		}
		if(myPPTApp.reRender) {
			myPPTApp.reRender();
			if(!checkAppleDevice()) {
				$("#collage-scroll").mCustomScrollbar("update");
			}
		}	
	}

	function showMyPhotos() {
		el_library_photos.css("display","none");
		el_my_photos.css("display","block");
		el_my_photos_btn.addClass("active");
		el_library_photos_btn.removeClass("active");
	}

	function showLibraryPhotos() {
		if(el_my_photos.is(":visible")) {
			el_library_photos.css("display","block");
			el_my_photos.css("display","none");
			el_my_photos_btn.removeClass("active");
			el_library_photos_btn.addClass("active");
			el_library_photos_btn.attr("data-toggle","");
		} else {
			el_library_photos_btn.attr("data-toggle","dropdown");
		}
	}
	
	/*
	 * Backbone Initialization
	 * 
	 * 
	 */
	function backbone_init_routers()	{
		ToolView.routerInitialize();
		PhotoView.routerInitialize();
		EditorView.routerInitialize();
		TextView.routerInitialize();
		ShapeView.routerInitialize();
		VideoView.routerInitialize();
	}
	
	function backbone_start_navigation()	{
		Backbone.history.start();
		Backbone.history.navigate("#/tool", {trigger:true,replace:true});
	}
	
	/*Click event mapping when any component (image/text etc..) 
	 * state is changed in mail container
	 * 
	 */ 
	myPPTApp.registerEvent("STATE_CHANGED", function(obj){
		//MagazineModel.get().set("jsonString", obj);
		//MagazineModel.get().save();
	});

	/*Click event mapping when any component (image/text etc..) 
	 * is clicked in mail container
	 * 
	 */ 
	myPPTApp.registerEvent("ON_PICK_CLICK", function(obj){
		
		var handler = obj.handler;
		if (!($('.accordion-group > #editor').hasClass("in"))) {
			$('.accordion-heading > a[href="#editor"]').click();
		}
	
		if (handler == "com.compro.ppt.Image") {
			$('#image-editor').css('display','block');
			$('#text-editor').css('display','none');
		}
		if (handler == "com.compro.ppt.Text") {
			$('#image-editor').css('display','none');
			$('#text-editor').css('display','block');
			$('#tinymce-editor').val(obj.getProperties(0).text);
		}
		
	});
	
	/* Click event mapping when any component (image/text etc..) 
	 * is unselected in mail container
	 * 
	 */ 
	myPPTApp.registerEvent("ON_PICK_UNSELECT", function(obj){
		
		var handler = obj.handler;
		if (handler == "com.compro.ppt.Text") {
			$('#tinymce-editor').val("");
		}		
	});
	
	
	// Text editor Sync function
	function syncText(textEditorObject) {
		var selectedObject = myPPTApp.getSelectedObject();
		if (selectedObject != null)
			selectedObject.setProperties(0,{text:$(textEditorObject).val()});
	}
	
	// Text font increase function
	function textFontIncrease() {
		var selectedObject = myPPTApp.getSelectedObject();
		if (selectedObject != null) {
			var currentFontSize = selectedObject.getProperties(0)['font-size'];
			currentFontSize = parseFloat(currentFontSize) + 2;
			selectedObject.setProperties(0,{'font-size':currentFontSize});
		}
	}
	
	// Text font increase function
	function textFontDecrease() {
		var selectedObject = myPPTApp.getSelectedObject();
		if (selectedObject != null) {
			var currentFontSize = selectedObject.getProperties(0)['font-size'];
			currentFontSize = parseFloat(currentFontSize) - 2;
			selectedObject.setProperties(0,{'font-size':currentFontSize});
		}
	}

	// Move to next slide
	function moveNextSlide() {
		var doMoreNextSlideExists = myPPTApp.nextSlide();
		return doMoreNextSlideExists;
	}
	
	// Move to previous slide
	function movePrevSlide() {
		var doMorePrevSlideExists = myPPTApp.previousSlide();
		return doMorePrevSlideExists;
	}
	
	function get_magazine_data(customMagazineName) {
		MagazineModel.get().set(customMagazineName);       
		var modelJ = MagazineModel.get().toJSON();
		var jsonString = (modelJ.jsonString).replace(/\'/g, '"');       		
       	return jsonString;
	}

	function init_ppt_engine() {
		var handler = function(){
			//do something
			//$("#collage-container").sortable();
			if(!checkAppleDevice()) {
				$("#collage-scroll").mCustomScrollbar({scrollInertia:0});
			}
			com.cengage.mm.drag.DragHandler.drag("collage-element");
		};
		myPPTApp.registerEvent("AFTER_PPT_INIT", handler);
		//Main PPT Engine (Generic) Initialization
		var pickConfig = {
				snap: { rotate: 15},
				pick_delete_image_attrs:{
					url:com.compro.cgrails.utils.resource("/images/deletered.png")
				},
				range:{scale: [ minWidth, 99999, minWidth, 99999 ]}
		}
		
		//var jsonString = com.compro.magazine.customMagazineName.replace(/\'/g, '"');
		var jsonString = "";
		if (com.compro.magazine.customMagazineName != "" && com.compro.magazine.customMagazineName != "resume" )
			jsonString = get_magazine_data(com.compro.magazine.customMagazineName);
		else
			jsonString = com.compro.magazine.customMagazineName;
		
		myPPTApp.initialize("collage-container","the-slide",pickConfig,jsonString);
		
		//Bindings for Slide Add / Clear / Delete functions
		$("#state-clear").click(function(){
			myPPTApp.clearState();
		});
		$(".new-slide").click(function (event) {
			addNewSlide();
		});
		$(".new-magazine").click(function (event) {
			clearState();
		});
		$("#delete-slide-confirm").click(function (event) {
			deleteSlide();
		});
		//Binding touch event for Touch devices Closed. 
	}	
	
	function deleteSlide(){
		if($(".collage-element").length > 1) {
			myPPTApp.deleteSelectedSlide();
			if(!checkAppleDevice()) {
				$("#collage-scroll").mCustomScrollbar("update");
			}
		}
		$('#confirm-modal').modal('hide');
	}
	function addNewSlide(){
		var newSlide = myPPTApp.addNewSlide().thumbDiv;
	
		//Update Scrollbar when content is added.
		if(!checkAppleDevice()) {
			$("#collage-scroll").mCustomScrollbar("update");
		}
		com.cengage.mm.drag.DragHandler.applyDragonElement(newSlide);
    }
	
	function clearState(){
		myPPTApp.clearState();
    }
	
	/**
	 * Function to check apple devices.
	 * Returns false in case of Macbook else returns true.
	 */ 
	function checkAppleDevice() {
		// Apple detection object
		var Apple = {};
		Apple.UA = navigator.userAgent;
		Apple.Device = false;
		Apple.Types = ["iPhone", "iPod", "iPad"];
		for (var d = 0; d < Apple.Types.length; d++) {
			var t = Apple.Types[d];
			Apple[t] = !!Apple.UA.match(new RegExp(t, "i"));
			Apple.Device = Apple.Device || Apple[t];
		}
		// is this an Apple device?
		if(Apple.iPhone || Apple.iPad || Apple.iPod) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * Specific function to update scroll bar in toolbar(accordion) element.
	 */
	function updateScrollbar() {
		var scrollPanesElems = $(".accordion-inner .scroll-pane");
		for(var j=0;j<scrollPanesElems.length;j++) {
			var scrollElem = $(scrollPanesElems[j]);
			if(scrollElem.hasClass("mCustomScrollbar")) {
				$(scrollElem).mCustomScrollbar("update"); 
			}
		}
	}
	
	/*function callTinyMceEditor() {
		$('textarea.tinymce').tinymce({
			// Location of TinyMCE script
		script_url : '../../js/libs/tiny_mce.js',

			// General options
			theme : "simple"
		});
	}*/

	/********************************************************/
	/*                 ONE TIME INIT FUNCTION              */
	/********************************************************/

	(function init()	{
			$(document).ready(function() {
				el_slide_toggle.click(function(e) {
					e.preventDefault();
					toggleSidebar();
				});

				el_my_photos_btn.click(function(e) {
					showMyPhotos();
				});

				el_library_photos_btn.click(function(e) {
					showLibraryPhotos();
				});
				
				// Specific change for RTL.
				if(document_dir == "rtl") {
					$(el_slide_toggle.find("i")).removeClass("icon-caret-left");
					$(el_slide_toggle.find("i")).addClass("icon-caret-right");
				}
				setMainSlideHeight();
				if(!checkAppleDevice()) {
					// first time initialize scrollbar on main container.
					el_maincontainer.mCustomScrollbar({
						scrollInertia:0
					});
			    }
				$(".navbar-inner>.nav-collapse").on("shown", function() {
			    	 var setHeight = $(this).height()+ 43;
					 $(".header").css("height",setHeight+"px");
					 $(".col").css("top",(setHeight+8)+"px");
					 $('#slide-toggle').css("margin-top",(setHeight+8+16) + "px");
				 });
				 $(".navbar-inner>.nav-collapse").on("hide", function() {
					 $(".header").css("height","43px");
					 $(".col").css("top","50px");
					 $('#slide-toggle').css("margin-top","3.5em");
				 });
				/*added jquery popover for preview button*/
				$('a[rel*="popover"]').popover({
				    trigger: 'click',
				    title: "Title",
				    verticalOffset: 6,
				    position:'bottom',
				    fadeOut:1000,
				    content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
				});
				
				$('a[rel*="popover"]').click(function(event) {
					$(this).popover('hideAll');
					event.preventDefault();
					event.stopPropagation();
					var title = $(this).attr('title');
					var content = $(this).attr('content');
					$(this).popover('title',title).popover('content',content).popover('show');
				});
				backbone_init_routers();
				backbone_start_navigation();
				init_ppt_engine();
			});


			/*! Normalized address bar hiding for iOS & Android (c) @scottjehl MIT License */
			(function( win ){
			    var doc = win.document;

			    // If there's a hash, or addEventListener is undefined, stop here
			    if( !location.hash && win.addEventListener ){

			        //scroll to 1
			        window.scrollTo( 0, 1 );
			        var scrollTop = 1,
			            getScrollTop = function(){
			                return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			            },

			        //reset to 0 on bodyready, if needed
			            bodycheck = setInterval(function(){
			                if( doc.body ){
			                    clearInterval( bodycheck );
			                    scrollTop = getScrollTop();
			                    win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
			                }
			            }, 15 );

			        win.addEventListener( "load", function(){
			            setTimeout(function(){
			                //at load, if user hasn't scrolled more than 20 or so...
			                if( getScrollTop() < 20 ){
			                    //reset to hide addr bar at onload
			                    win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
			                }
			            }, 0);
			        } );
			    }
			})( this );
			
			//FIX: iphone viewport scaling bug. The bug occurs when you set the viewport width
			// to device-width and rotate the phone to landscape view.
			(function(doc) {

			    var addEvent = 'addEventListener',
			        type = 'gesturestart',
			        qsa = 'querySelectorAll',
			        scales = [1, 1],
			        meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

			    function fix() {
			        meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
			        doc.removeEventListener(type, fix, true);
			    }

			    if ((meta = meta[meta.length - 1]) && addEvent in doc) {
			        fix();
			        scales = [.25, 1.6];
			        doc[addEvent](type, fix, true);
			    }

			}(document));
			
			$(window).resize(function() {
			    screenWidth = el_body.width();
			    //console.log("screenWidth *****" + screenWidth);
				//This is done in case user resize the browser when top navbar is open.
				if(screenWidth > device_vars.DESKTOP_MIN_WIDTH) {
					el_header.css("height",config.HEADER_HEIGHT);
					el_col_arr.css("top",config.BODY_ELEMS_TOP);
				} else {
					el_header.css("height",config.HEADER_HEIGHT_MOBILE);
					el_col_arr.css("top",config.BODY_ELEMS_TOP_MOBILE);
				}
				if(screenWidth <= device_vars.MOBILE_MAX_WIDTH) {
				  el_toolbar.css("display","none");
				  el_leftsidebar.css("display","none");
				  el_maincontainer.css(position_sidebar,config.MAINCONTAINER_ZERO_POSITION);
				  el_maincontainer.css(position_toolbar,config.MAINCONTAINER_ZERO_POSITION);
				} else if((screenWidth >= device_vars.TABLET_MIN_WIDTH) && (screenWidth <= device_vars.TABLET_MAX_WIDTH)) {
				  el_leftsidebar.css("display","none");
				  el_toolbar.css("display","block");
				  el_maincontainer.css(position_sidebar,config.MAINCONTAINER_ZERO_POSITION);
				  el_maincontainer.css(position_toolbar,config.TOOLBAR_WIDTH);
				  el_slide_toggle.css({
				  	"margin-top":config.MARGIN_TOP_IPAD_SLIDE_TOGGLE
				  });
				  el_slide_toggle.css("margin-"+position_sidebar,0);
				} else if(screenWidth > device_vars.DESKTOP_MIN_WIDTH) {
					el_leftsidebar.css({
					"display":"block"
				  });
				  el_toolbar.css("display","block");
				  el_maincontainer.css(position_sidebar,config.THUMBNAIL_SIDEBAR_WIDTH);
				  el_maincontainer.css(position_toolbar,config.TOOLBAR_WIDTH);
				  el_slide_toggle.css( {
				  	"margin-top":config.MARGIN_TOP_SLIDE_TOGGLE
				  });
				  el_slide_toggle.css("margin-"+position_sidebar,config.SLIDE_TOGGLE_POSITION);
				}
				setMainSlideHeight();
				setAccordionScroll();
			});
		})();

	/********************************************************/
	/*                 Public   */
	/********************************************************/

	return	{
		"config":config,
		"resetScrollbars":setAccordionScroll,
		"updateScrollbar":updateScrollbar,
		"syncText":syncText,
		"textFontDecrease":textFontDecrease,
		"textFontIncrease":textFontIncrease,
		"moveNextSlide":moveNextSlide,
		"movePrevSlide":movePrevSlide
	}

})();