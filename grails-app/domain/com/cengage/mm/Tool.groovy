package com.cengage.mm

import grails.converters.JSON
import groovy.json.JsonSlurper

class Tool {

	def static jsonPayload = new File("web-app/json/magazine/tools.json").text
	
	String id
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