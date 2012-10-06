class UrlMappings {

	static excludes = ["/images/*", "/css/*", "/js/*"]
	static mappings = {

		"/$skin/$workflow/"	(controller:"main")
		
		"/$skin/$workflow/$controller/$action?/$id?"{
				constraints {
				// apply constraints here
			}
		}

		"/api/tool/$id?"(resource:"tool")
		"/api/photo/$id?"(resource:"photo")
		
		"/"		(controller:"main")
		"500"	(view:'/error')
	}
}
