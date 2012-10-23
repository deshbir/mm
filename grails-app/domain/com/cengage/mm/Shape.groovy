package com.cengage.mm

import grails.converters.JSON
import groovy.json.JsonSlurper

class Shape {
	
	String id
	String type
	String shapeConfig
	String raphaelType
	String raphaelAttributes
		
    static constraints = {
		shapeConfig nullable:true
    }
	
	static mapping = {
		raphaelAttributes type:'text'
		shapeConfig type:'text'
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