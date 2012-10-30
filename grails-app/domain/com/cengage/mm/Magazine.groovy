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
					"/api/home/my_animals",
					"/api/home/untitled_1",
					"/api/home/untitled_2",
					"/api/home/my_photos",
					"/api/home/my_new_animals"
				];
	}
		
	/******************************
	 * END Offline configurations
	 *******************************/
	
}