package com.cengage.mm

import grails.converters.JSON
import groovy.json.JsonSlurper

class Photo {

	def static jsonPayload = new File("web-app/json/magazine/photo-media.json").text
	
	String id
	String category
	String dir
	String fullfilename
	String thumbfilename
	String copyright
	
    static constraints = {
    }
		
	/***********************************
	 * START Offline configurations
	 ***********************************/

		static String dataAPI = "/api/photo/"

		//returns list of models
		def static JSON initialData() {
			
			def slurper = new JsonSlurper()
			def allPhotos = slurper.parseText(Photo.jsonPayload)
			
			//def o = JSON.parse ("[{'dir':'images/magazine/photos','fullfilename':'pic1.jpg','thumbfilename':'pic1.jpg','alt':'pic1' },{'dir':'images/magazine/photos','fullfilename':'pic2.jpg','thumbfilename':'pic2.jpg','alt':'pic2'},{'dir':'images/magazine/photos','fullfilename':'pic3.jpg','thumbfilename':'pic3.jpg','alt':'pic3'}]")
			//return o as JSON
			return allPhotos.photos
		}
		
	/******************************
	 * END Offline configurations
	 *******************************/
	
}