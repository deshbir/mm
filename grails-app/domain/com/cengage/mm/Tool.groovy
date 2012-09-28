package com.cengage.mm

import grails.converters.JSON

class Tool {

	String id
	String name
	
    static constraints = {
    }
	
	def static JSON initialData() {
		def o = JSON.parse ("[{'id':'tab1', 'name':'Photos' },{'id':'tab2','name':'Videos'},{'id':'tab3','name':'Audios'}]")
		return o as JSON
	}
}