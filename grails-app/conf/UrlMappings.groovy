class UrlMappings {

	static mappings = {

		"/$skin/$workflow/"(controller:"main")
		
		"/$skin/$workflow/$controller/$action?/$id?"{
				constraints {
				// apply constraints here
			}
		}

		"/"(view:"/sampleAppIndex")
		"500"(view:'/error')
	}
}
