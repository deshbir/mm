package com.cengage.mm

import grails.converters.JSON
import groovy.json.JsonSlurper

class Photo {
	
	String category
	String dir
	String fullfilename
	String thumbfilename
	String copyright
	
    static constraints = {
    }
		
	/***********************************
	 * START Offline configurations
	 ***********************************/
	
	def static String[] offlineCachedUrls() {
		return  [
					"/api/photo/", 
					"/api/photo/african_wildlife", 
					"/api/photo/ancient_structures",
					"/api/photo/coral_reefs",
					"/api/photo/egypt",
					"/api/photo/gorillas",
					"/api/photo/landscapes",
					"/api/photo/reptiles",
					"/api/photo/plants",
					"/api/photo/space",
					"/api/photo/wonders",
					"/api/photo/butterflies"
				];
	}
		
	/******************************
	 * END Offline configurations
	 *******************************/
	
}