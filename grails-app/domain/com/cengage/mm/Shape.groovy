package com.cengage.mm

import grails.converters.JSON
import groovy.json.JsonSlurper

class Shape {

	def static jsonPayload = new File("web-app/json/magazine/shapes.json").text
	
	String id
	String type
	String raphaelType
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
		return  ["/api/shape/"];
	}	
		
	/******************************
	 * END Offline configurations
	 *******************************/
	
}