package com.cengage.mm

import grails.converters.JSON
import groovy.json.JsonSlurper

class Shape {

	def static jsonPayload = new File("web-app/json/magazine/shapes.json").text
	
	String id
	String type
	String options
	String raphaelType
	String raphaelAttributes
		
    static constraints = {
		options nullable:true
    }
	
	static mapping = {
		raphaelAttributes type:'text'
		options type:'text'
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