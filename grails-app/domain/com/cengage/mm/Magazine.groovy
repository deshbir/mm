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
					"/api/home?id=resume",
					"/api/home?id=my_animals",
					"/api/home?id=untitled_1",
					"/api/home?id=untitled_2",
					"/api/home?id=my_photos",
					"/api/home?id=my_new_animals"
					*/
				];
	}
		
	/******************************
	 * END Offline configurations
	 *******************************/
	
}