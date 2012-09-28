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
    }
	mmApp {
		dependsOn 'mmLib'
		
		//Main Application JavaScript - init and event binding
		resource url:'js/index.js'
		
		//Backbone View & Models & Collections
		resource url:'js/tool/toolmodel.js'
		resource url:'js/tool/toolcollection.js'
		resource url:'js/tool/toolview.js'
	}
	
}