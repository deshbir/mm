package com.cengage.mm

import grails.converters.JSON

class Photo {

	String id
	String dir
	String fullfilename
	String thumbfilename
	String alt
	
    static constraints = {
    }
		
	/***********************************
	 * START Offline configurations
	 ***********************************/

		static String backboneObject = "PhotoCollection"
		 
		static String backboneType = "collection"

		//returns list of models
		def static JSON initialData() {
			def o = JSON.parse ("[{'dir':'images/magazine/photos','fullfilename':'pic1.jpg','thumbfilename':'pic1.jpg','alt':'pic1' },{'dir':'images/magazine/photos','fullfilename':'pic2.jpg','thumbfilename':'pic2.jpg','alt':'pic2'},{'dir':'images/magazine/photos','fullfilename':'pic3.jpg','thumbfilename':'pic3.jpg','alt':'pic3'}]")
			return o as JSON
		}
		
	/******************************
	 * END Offline configurations
	 *******************************/
	
}