class UrlMappings {

	static excludes = ["/images/*", "/css/*", "/js/*", "/json/*"]
	static mappings = {

		"/$skin/"	(controller:"singlepage")
		
		"/$skin/$controller/$action?/$id?"{
				constraints {
				// apply constraints here
			}
		}

		"/$skin/singlepage/home/$magazineName?"	(controller:"singlepage", action:"home")
		
		"/api/tool/$id?"(resource:"tool")
		"/api/photo/$category?"(resource:"photo")
		"/api/editor/$id?"(resource:"editor")
		"/api/text/$id?"(resource:"text")
		"/api/shape/$id?"(resource:"shape")
		"/api/video/$id?"(resource:"video")
		"/api/magazine/$id?"(resource:"magazine")
		
		"/"		(controller:"singlepage")
		"500"	(view:'/error')
	}
}
