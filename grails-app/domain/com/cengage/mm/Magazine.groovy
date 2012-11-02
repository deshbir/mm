package com.cengage.mm

import grails.converters.JSON
import groovy.json.JsonSlurper

class Magazine {
	
	String name
	String jsonString
	
    static constraints = {
    }
		
	static mapping = {
		jsonString type:'text'
	}
	
	/***********************************
	 * START Offline configurations
	 ***********************************/
	
	def static String[] offlineCachedUrls() {
		return  [
				/*
					"/api/magazine?id=resume",
					"/api/magazine?id=my_animals",
					"/api/magazine?id=untitled_1",
					"/api/magazine?id=untitled_2",
					"/api/magazine?id=my_photos",
					"/api/magazine?id=my_new_animals"
					*/
				];
	}
		
	/******************************
	 * END Offline configurations
	 *******************************/
	
}