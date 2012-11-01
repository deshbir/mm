package com.compro.cgrails

import com.cengage.mm.Magazine

class SinglepageController {
	
	def index() {
		render (view:"magazine_login",model:[:])
	}

	def home() {
		
		def magazine
		String name = ""
				
		if (params.id != null) {
			if (params.id.equalsIgnoreCase("resume")) {
				name = "resume";
			} else  {
				magazine = Magazine.findByName(params.id)
				name = magazine.jsonString;
				//name = params.id
			}
		}
		render (view:"magazine_home",model:[name:name])
	}
	
	def logout() {
		session.removeAttribute("userLoggedIn");
		redirect(action:"index")
	}
}
