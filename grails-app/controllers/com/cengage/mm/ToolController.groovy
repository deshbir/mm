package com.cengage.mm

import grails.converters.JSON

class ToolController {
	
	/*
	GET	show
	PUT	update
	POST	save
	DELETE	delete
	*/
	PropertyLocalizerService propertyLocalizerService
	
	def show = {
			
		if(params.id) {
			
			def tool = Tool.get(params.id)
			
			if(tool) {
				render tool as JSON
				return
			} else {
				// What is Backbone standard for this?
				render "Not found."
				return
			}
		}
		else {
			def allTool = Tool.list()
			def returnList = propertyLocalizerService.parseCollection(allTool,['name'],",") 
			render returnList as JSON
			//def o = JSON.parse ("[{'id':'tab1', 'name':'Photos' },{'id':'tab2','name':'Videos'},{'id':'tab3','name':'Audios'}]")
			//render o as JSON
			
		}
	}
}
