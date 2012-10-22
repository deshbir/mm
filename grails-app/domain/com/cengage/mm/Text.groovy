package com.cengage.mm

import grails.converters.JSON
import groovy.json.JsonSlurper

class Text {

	def static jsonPayload = new File("web-app/json/magazine/texts.json").text
	
	String id
	String type
	String raphaelAttributes
		
    static constraints = {
		raphaelAttributes type:'text'
    }
		
	/***********************************
	 * START Offline configurations
	 ***********************************/
	
	def static String[] offlineCachedUrls() {
		return  ["/api/text/"];
	}
			
	/******************************
	 * END Offline configurations
	 *******************************/
	
}