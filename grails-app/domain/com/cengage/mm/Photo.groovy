package com.cengage.mm

import grails.converters.JSON
import groovy.json.JsonSlurper

class Photo {

	def static jsonPayload = new File("web-app/json/magazine/photo-media.json").text
	
	String id
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
					"/api/photo/ancient_structures"
				];
	}
		
	/******************************
	 * END Offline configurations
	 *******************************/
	
}