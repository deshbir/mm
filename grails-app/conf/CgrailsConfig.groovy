cgrails {
	skinning {
		baseskin = "default"
		skins {
			skin1 { parent = "default" }
		}		
	}
	less {
		//Array of Less Files to compile.
		files = ["styles"]
	}	
	templates {
		url = "/main/template/"
		useConfiguration = false
	}
	javascriptMVC = "backbone"
}