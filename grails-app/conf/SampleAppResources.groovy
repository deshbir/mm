modules = {	
	module1 {
		dependsOn 'cgrailsLibs'
		resource url: [dir: 'js/menu1', file:'menu1.js']
	}
	module2 {
		dependsOn 'cgrailsLibs'
		resource url: [dir: 'js/menu2', file:'menu2.js']
	}
}