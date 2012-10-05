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
		resource url:'js/libs/jquery-ui-1.8.23.custom.js'
		resource url:'js/libs/jquery.mousewheel.min.js'
		resource url:'js/libs/jquery.mCustomScrollbar.js'
		
		//View Templates
		resource url:'js/libs/mustache.js'
		
		//raphael
		resource url:'js/libs/raphael.js'
		
		//Utils function for namespace
		resource url:'js/libs/ppt/compro.js'
    }
	
	mmPPT {
		dependsOn 'mmLib'
		
		//.........
		resource url:'js/libs/ppt/init.js'
		resource url:'js/libs/ppt/events.js'
		resource url:'js/libs/ppt/utils.js'
		
		resource url:'js/libs/ppt/pick.js'
		resource url:'js/libs/ppt/image.js'
		resource url:'js/libs/ppt/shape.js'
		resource url:'js/libs/ppt/slide.js'
		
		resource url:'js/libs/ppt/workspace.js'
		
	}
	
	mmApp {
		dependsOn 'mmLib'
		
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
	}
	
}