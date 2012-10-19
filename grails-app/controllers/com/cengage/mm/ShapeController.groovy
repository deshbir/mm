package com.cengage.mm

import grails.converters.JSON
import com.cengage.mm.Shape

class ShapeController {

	/*
	GET	show
	PUT	update
	POST	save
	DELETE	delete
	*/
	
	def show = {
		
		if(params.id) {
			
			def shape = Shape.get(params.id)
			
			if(shape) {
				render shape as JSON
			} else {
				// What is Backbone standard for this?
			    def notFound = new Shape(type: 'NA', strokewidth: 'NA', fill: 'arial' , fillopacity: '10')
				render notFound as JSON
			}
		}
		else {
			def allShapes = Shape.list()
			render allShapes as JSON
		}
	}
}

