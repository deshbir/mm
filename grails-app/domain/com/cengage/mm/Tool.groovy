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
			def o = JSON.parse ("[{'id':'tab1', 'name':'Photos' },{'id':'tab2','name':'Videos'},{'id':'tab3','name':'Audios'}]")
			return o as JSON
		}
		
	/******************************
	 * END Offline configurations
	 *******************************/
		
}