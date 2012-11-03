package com.cengage.mm

import grails.converters.JSON
import net.sf.json.groovy.JsonSlurper

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
			def returnList = []
			allShapes.each { shape ->
				def returnArray = [:]
				shape.properties.each{prop, val ->
					if(prop == "raphaelAttributes"|| prop == "shapeConfig" && val!=null){
						def slurper = new JsonSlurper()
						def jsonRaphaelAttributes = slurper.parseText(val)
						returnArray[prop] = jsonRaphaelAttributes
					} else{
						returnArray[prop] = val
					}
				}
				returnArray["id"] = shape.id
				returnList.add(returnArray)
			}
			render returnList as JSON
		}
	}
}

