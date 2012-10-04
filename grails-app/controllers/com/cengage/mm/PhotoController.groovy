package com.cengage.mm

import grails.converters.JSON
import com.cengage.mm.Photo

class PhotoController {

	/*
	GET	show
	PUT	update
	POST	save
	DELETE	delete
	*/
	
	def show = {
			
		if(params.id) {
			
			def photo = Photo.get(params.id)
			
			if(tool) {
				render photo as JSON
				return
			} else {
				// What is Backbone standard for this?
				render "Not found."
				return
			}
		}
		else {
			def allPhoto = Photo.list()
			render allPhoto as JSON
		}
	}
}

