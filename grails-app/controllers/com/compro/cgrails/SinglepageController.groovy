package com.compro.cgrails

import grails.converters.JSON

import com.cengage.mm.Magazine

class SinglepageController {
	
	def index() {
		render (view:"magazine_login",model:[:])
	}

	def home() {
		
		String name = "";
					
		if (params.magazineName != null) {
			if (params.magazineName.equalsIgnoreCase("resume")) {
				name = "resume";
			} else  {
				def magazine = Magazine.findByName(params.magazineName)
				name = magazine as JSON;
			}
		}
		
		render (view:"magazine_home",model:[name:name])
	}
	
	def logout() {
		session.removeAttribute("userLoggedIn");
		redirect(action:"index")
	}
}
