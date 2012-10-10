package com.cengage.mm

import grails.converters.JSON

class EditorController {

	/*
	 GET	show
	 PUT	update
	 POST	save
	 DELETE	delete
	 */
	//static allowedMethods = [show: "GET"]
    def show = {
		if(params.id) {		
			render "Not found."
			return
		}
		else {
			def o = JSON.parse ("[{'id':'tab1', 'name':'Photos' },{'id':'tab2','name':'Videos'},{'id':'tab3','name':'Audios'}]")
			//render o as JSON
			//def o = JSON.parse ("")
			render o as JSON
		}
	}
}
