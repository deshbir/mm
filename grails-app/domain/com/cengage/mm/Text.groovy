package com.cengage.mm

import grails.converters.JSON
import groovy.json.JsonSlurper

class Text {
	
	String id
	String type
	Map raphaelAttributes
		
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