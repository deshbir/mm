
cgrails {

	skinning {
		baseskin = "default"
		skins {
			skin1 { parent = "default" }
		}		
	}
	less {
		//Array of Less Files to compile.
		files = ["index"]
	}	
	templates {
		url = "/main/template/"
		useConfiguration = false
	}
	javascriptMVC = "backbone"
	
	models {
		backbone {
			"com.cengage.mm.Tool" {
								type = "collection"
				backboneObject = "ToolCollection"
			}
		}
	}
}