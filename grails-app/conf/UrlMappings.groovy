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
		
		"/"		(controller:"main")
		"500"	(view:'/error')
	}
}
