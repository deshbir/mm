class UrlMappings {

	static excludes = ["/images/*", "/css/*", "/js/*", "/json/*"]
	static mappings = {

		"/$skin/$workflow/"	(controller:"main")
		
		"/$skin/$workflow/$controller/$action?/$id?"{
				constraints {
				// apply constraints here
			}
		}

		"/api/tool/$id?"(resource:"tool")
		"/api/photo/$category?"(resource:"photo")
		"/api/editor/$id?"(resource:"editor")
		"/api/text/$id?"(resource:"text")
		
		"/"		(controller:"main")
		"500"	(view:'/error')
	}
}
