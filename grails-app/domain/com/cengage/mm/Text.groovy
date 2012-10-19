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

		static String dataAPI = "/api/text/"

		//returns list of models
		def static JSON initialData() {
			
			def slurper = new JsonSlurper()
			def allTexts = slurper.parseText(Text.jsonPayload)
			return allTexts.texts
		}
		
	/******************************
	 * END Offline configurations
	 *******************************/
	
}