package com.cengage.mm

import grails.converters.JSON
import net.sf.json.groovy.JsonSlurper

class MagazineController {

	/*
	GET	show
	PUT	update
	POST	save
	DELETE	delete
	*/
	
	def show = {
		
		if(params.name) {
			
			def magazine = Magazine.findByName(params.name)
			
			if(magazine) {
				render magazine as JSON
			} else {
				// What is Backbone standard for this?
			    def notFound = new Text(type: 'NA', text: 'NA', fontfamily: 'arial' , fontsize: '10' , fontcolor: 'red', fontweight: 'normal', fontstyle: 'normal')
				render notFound as JSON
			}
		}
		else {
			def allMagazine = Magazine.list()
			render allMagazine as JSON
		}
	}
}

