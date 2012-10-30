package com.cengage.mm

import grails.converters.JSON
import groovy.json.JsonSlurper

class Text {
	
	String type
	String raphaelAttributes
		
    static constraints = {
    }
		
	static mapping = {
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