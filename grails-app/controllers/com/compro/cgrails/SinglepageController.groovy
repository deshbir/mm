package com.compro.cgrails

import com.compro.cgrails.CgrailsConstants
import com.compro.cgrails.CgrailsUtils

class SinglepageController {
	
	def index() {
		render (view:"magazine_login",model:[:])
	}

	def home() {
		render (view:"magazine_home",model:[:])
	}
}
