package com.cengage.mm

import com.compro.cgrails.CgrailsConstants
import com.compro.cgrails.CgrailsUtils
class MainController {
	
	def index() {
		magazine();
	}	
	
	def magazine() {
		render (view:"magazine_home",model:[:])
	}
	
	def template() {
		render (view:"/"+ params.path,model:[:])
	}
}
