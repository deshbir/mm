package com.cengage.mm

import grails.converters.JSON

class TextController {

	/*
	GET	show
	PUT	update
	POST	save
	DELETE	delete
	*/
	
	def show = {
		
		if(params.id) {
			
			def text = Text.get(params.id)
			
			if(text) {
				render text as JSON
			} else {
				// What is Backbone standard for this?
			    def notFound = new Text(type: 'NA', text: 'NA', fontfamily: 'arial' , fontsize: '10' , fontcolor: 'red', fontweight: 'normal', fontstyle: 'normal')
				render notFound as JSON
			}
		}
		else {
			def allText = Text.list()
			render allText as JSON
		}
	}
}

