modules = {
	mmLib1 {
				//Utils function for namespace
				resource url:'js/libs/ppt/compro.js'
			}
	
	mmHome {
		//'cgrailsLibs' includes JQuery, Backbone, JSON2 & Underscore
		dependsOn 'cgrailsLibs'
		//Document load function for home page
		resource url:'js/home.js'
		//Jquery Popver js
		resource url:'js/libs/jquery.popover.js'
	}
	
    mmLib {

		//'cgrailsLibs' includes JQuery, Backbone, JSON2 & Underscore
		dependsOn 'cgrailsLibs'

		//Bootstrap JS components
		resource url:'js/libs/bootstrap-button.js'
		resource url:'js/libs/bootstrap-collapse.js'
		resource url:'js/libs/bootstrap-dropdown.js'
		resource url:'js/libs/bootstrap-transition.js'
		resource url:'js/libs/bootstrap-modal.js'

		//Custom Scrollbar JS
		resource url:'js/libs/jquery-ui-1.9.0.custom.js'
		resource url:'js/libs/jquery.mousewheel.js'
		resource url:'js/libs/jquery.mCustomScrollbar.js'
		
		//View Templates
		resource url:'js/libs/mustache.js'
		
		//raphael
		resource url:'js/libs/raphael.js'
		
		//jQuery imagesLoaded plugin v2.1.0
		resource url:'js/libs/jquery.imagesloaded.js'
    }
	
	mmPPT {
		dependsOn 'mmLib, mmLib1'
		
		//Core PPT Engine
		resource url:'js/libs/ppt/init.js'
		//keyMaster
		resource url:'js/libs/keymaster.js'
		
		resource url:'js/libs/ppt/events.js'
		resource url:'js/libs/ppt/utils.js'
		resource url:'js/libs/ppt/pick.js'
		resource url:'js/libs/ppt/image.js'
		resource url:'js/libs/ppt/text.js'
		resource url:'js/libs/ppt/shape.js'
		resource url:'js/libs/ppt/slide.js'
		resource url:'js/libs/ppt/workspace.js'
		
		//MM Tool Handler
		resource url:'js/tools/toolelementdraghandler.js'
		resource url:'js/tools/collage-drag.js'
		
		
	}
	
	mmApp {
		dependsOn 'mmPPT'
		
		//Main Application JavaScript - init and event binding
		resource url:'js/index.js'
		
		//Jquery Popver js
		resource url:'js/libs/jquery.popover.js'
		
		//Backbone tool View & Models & Collections
		resource url:'js/bb/tool/toolmodel.js'
		resource url:'js/bb/tool/toolcollection.js'
		resource url:'js/bb/tool/toolview.js'
		
		//Backbone ppt View & Models & Collections
		resource url:'js/bb/photo/photomodel.js'
		resource url:'js/bb/photo/photocollection.js'
		resource url:'js/bb/photo/photoview.js'

		//Backbone editor View & Models & Collections
		resource url:'js/bb/editor/editormodel.js'
		resource url:'js/bb/editor/editorcollection.js'
		resource url:'js/bb/editor/editorview.js'
		
		//Backbone text View & Models & Collections
		resource url:'js/bb/text/textmodel.js'
		resource url:'js/bb/text/textcollection.js'
		resource url:'js/bb/text/textview.js'
		
		//Backbone shape View & Models & Collections
		resource url:'js/bb/shape/shapemodel.js'
		resource url:'js/bb/shape/shapecollection.js'
		resource url:'js/bb/shape/shapeview.js'

		//Backbone Video View & Models & Collections
		resource url:'js/bb/video/videomodel.js'
		resource url:'js/bb/video/videocollection.js'
		resource url:'js/bb/video/videoview.js'
	}
	
}