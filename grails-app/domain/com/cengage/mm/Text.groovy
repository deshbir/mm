package com.cengage.mm

import grails.converters.JSON
import groovy.json.JsonSlurper

class Text {

	def static jsonPayload = new File("web-app/json/magazine/text-media.json").text
	
	String id
	String type
	String text
	String fontfamily
	String fontsize
	String fontcolor
	String fontweight
	String fontstyle
		
    static constraints = {
    }
		
	/***********************************
	 * START Offline configurations
	 ***********************************/

		static String backboneObject = "TextCollection"
		 
		static String backboneType = "collection"

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