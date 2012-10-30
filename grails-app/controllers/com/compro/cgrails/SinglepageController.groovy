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
			magazine = Magazine.findAllByName(params.id)
			jsonString = magazine.jsonString;
			jsonString = jsonString.substring(1,jsonString.length()-1)
		}
		render (view:"magazine_home",model:[jsonString:jsonString])
	}
	
	def logout() {
		session.removeAttribute("userLoggedIn");
		redirect(action:"index")
	}
}
