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

		static String dataAPI = "/api/tool/"

		//returns list of models
		def static JSON initialData() {
			
			def slurper = new JsonSlurper()
			def allTools = slurper.parseText(Tool.jsonPayload)
			
			return allTools.tools
			//def o = JSON.parse ("[{'toolid':'photo', 'name':'Photos' },{'toolid':'layout','name':'Layout'},{'toolid':'video','name':'Video & Audios'},{'toolid':'editor','name':'Editor'}]")
			//return o as JSON
		}
		
	/******************************
	 * END Offline configurations
	 *******************************/
		
}