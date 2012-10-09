package com.cengage.mm

import grails.converters.JSON

class Tool {

	String id
	String name
	
    static constraints = {
    }
	
	
	/***********************************
	 * START Offline configurations
	 ***********************************/

		static String backboneObject = "ToolCollection"
		 
		static String backboneType = "collection"

		//returns list of models
		def static JSON initialData() {
			def o = JSON.parse ("[{'id':'photo', 'name':'Photos' },{'id':'layout','name':'Layout'},{'id':'video','name':'Video & Audios'},{'id':'editor','name':'Editor'}]")
			return o as JSON
		}
		
	/******************************
	 * END Offline configurations
	 *******************************/
		
}