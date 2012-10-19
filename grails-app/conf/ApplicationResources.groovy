modules = {
    mmLib {

		//'cgrailsLibs' includes JQuery, Backbone, JSON2 & Underscore
		dependsOn 'cgrailsLibs'

		//Bootstrap JS components
		resource url:'js/libs/bootstrap-button.js'
		resource url:'js/libs/bootstrap-collapse.js'
		resource url:'js/libs/bootstrap-dropdown.js'
		resource url:'js/libs/bootstrap-transition.js'

		//Custom Scrollbar JS
		resource url:'js/libs/jquery-ui-1.9.0.custom.js'
		resource url:'js/libs/jquery.mousewheel.min.js'
		resource url:'js/libs/jquery.mCustomScrollbar.js'
		
		//View Templates
		resource url:'js/libs/mustache.js'
		
		//raphael
		resource url:'js/libs/raphael.js'
		
		//Utils function for namespace
		resource url:'js/libs/ppt/compro.js'
		
		//jQuery imagesLoaded plugin v2.1.0
		resource url:'js/libs/jquery.imagesloaded.js'
    }
	
	mmPPT {
		dependsOn 'mmLib'
		
		//Core PPT Engine
		resource url:'js/libs/ppt/init.js'
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
		
	}
	
	mmApp {
		dependsOn 'mmPPT'
		
		//Main Application JavaScript - init and event binding
		resource url:'js/index.js'
		
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
	}
	
}