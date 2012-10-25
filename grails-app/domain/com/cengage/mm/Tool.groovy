package com.cengage.mm

import grails.converters.JSON
import groovy.json.JsonSlurper

class Tool {
	
	String toolid
	String name
	
    static constraints = {
    }
	
	
	/***********************************
	 * START Offline configurations
	 ***********************************/
	
	def static String[] offlineCachedUrls() {
		return  ["/api/tool/"];
	}	
		
	/******************************
	 * END Offline configurations
	 *******************************/
		
}