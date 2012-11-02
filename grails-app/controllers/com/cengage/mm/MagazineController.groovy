package com.cengage.mm

import grails.converters.JSON

import org.hibernate.HibernateException

class MagazineController {

	/*
	GET	show
	PUT	update
	POST	save
	DELETE	delete
	*/
		
	def update = {
		
	
		if(params.id) {
			def magazine = Magazine.get(params.id)
			if(magazine) {
				magazine.properties = params['magazine']
				try {
					magazine.save()
					render magazine as JSON
					return
				} catch(HibernateException e){
					render magazine.errors
					return
				}
			} else {
				render "Magazine not found."
				return
			}
		}
	}
}

