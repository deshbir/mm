package com.compro.cgrails

import com.cengage.mm.Magazine

class SinglepageController {
	
	def index() {
		render (view:"magazine_login",model:[:])
	}

	def home() {
		
		def magazine
		String jsonString = ""
				
		if (params.id != null) {
			if (params.id.equalsIgnoreCase("resume")) {
				jsonString = "resume";
			} else  {
				magazine = Magazine.findByName(params.id)
				jsonString = magazine.jsonString;
			}
		}
		render (view:"magazine_home",model:[jsonString:jsonString])
	}
	
	def logout() {
		session.removeAttribute("userLoggedIn");
		redirect(action:"index")
	}
}
