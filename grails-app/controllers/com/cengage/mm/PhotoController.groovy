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
		
		if(params.category) {
			
			def allPhoto = Photo.findAllByCategory(params.category)
			
			if(allPhoto) {
				render allPhoto as JSON
			} else {
				// What is Backbone standard for this?
			    def notFound = new Photo(category: 'NA', dir: 'images/', fullfilename: 'notfound.png' , thumbfilename: 'notfound.png' , copyright: 'compro')
				render notFound as JSON
			}
		}
		else {
			//assuming this category is defualt
			String default_category = "african_wildlife"
			def allPhoto = Photo.findAllByCategory(default_category)
			render allPhoto as JSON
		}
	}
}

