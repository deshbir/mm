package com.cengage.mm

class PropertyLocalizerService {
	def grailsApplication
	
	def parseCollection(def collection, def properties, def delimiter) {
		def returnList = []
		collection.each { model ->
			returnList.add(parseModel(model,properties,delimiter))
		}
		return returnList
	}
	def parseCollection(def collection, def properties) {
		def returnList = []
		collection.each { model ->
			returnList.add(parseModel(model,properties))
		}
		return returnList
	}	
	def parseModel(def model, def properties) {
		def g = grailsApplication.mainContext.getBean('org.codehaus.groovy.grails.plugins.web.taglib.ApplicationTagLib')
		def returnArray = [:]
		model.properties.each{prop, val ->
			if(properties.contains(prop) && val!=null){
				def reurnProp = g.message(code: val.trim())
				returnArray[prop] = reurnProp
			} else{
				returnArray[prop] = val
			}
		}
		return returnArray
	
	}
	def parseModel(def model, def properties, def delimiter) {
		def g = grailsApplication.mainContext.getBean('org.codehaus.groovy.grails.plugins.web.taglib.ApplicationTagLib')
		def returnArray = [:]
		model.properties.each{prop, val ->
			def reurnProp = ""
			if(properties.contains(prop) && val!=null){
				def tempVal
				def messageArr = val.split(delimiter)
				for(int i=0;i<messageArr.length;i++){
					if(i > 0){
						reurnProp += " & "
						reurnProp += g.message(code: messageArr[i].trim())
						continue
					}
					reurnProp += g.message(code: messageArr[i].trim())
				}
				returnArray[prop] = reurnProp
			} else{
				returnArray[prop] = val
			}
		}
		return returnArray
	}
}
