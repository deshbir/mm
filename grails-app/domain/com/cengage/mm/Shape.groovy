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

		static String dataAPI = "/api/shape/"

		//returns list of models
		def static JSON initialData() {
			
			def slurper = new JsonSlurper()
			def allShapes = slurper.parseText(Shape.jsonPayload)
			return allShapes.shapes
		}
		
	/******************************
	 * END Offline configurations
	 *******************************/
	
}