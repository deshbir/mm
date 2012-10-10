package com.cengage.mm

import grails.converters.JSON

class Tool {

	String id
	String toolid
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
			def o = JSON.parse ("[{'toolid':'photo', 'name':'Photos' },{'toolid':'layout','name':'Layout'},{'toolid':'video','name':'Video & Audios'},{'toolid':'editor','name':'Editor'}]")
			return o as JSON
		}
		
	/******************************
	 * END Offline configurations
	 *******************************/
		
}