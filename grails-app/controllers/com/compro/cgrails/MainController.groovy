package com.compro.cgrails

import com.compro.cgrails.CgrailsConstants
import com.compro.cgrails.CgrailsUtils
class MainController {
	def index() {
		if (CgrailsUtils.getWorkflow() == CgrailsConstants.WORKFLOW_TRADITIONAL) {
			redirect (uri:"/" + CgrailsUtils.getSkin() + "/"
					+ CgrailsUtils.getWorkflow() + "/main/menu1/")
			return
		} else {
			render (view:"/singlepage", model:[:])
		}
	}	
	
	def menu1() {
		render (view:"page1",model:[:])
	}
	
	def menu2() {
		render (view:"page2",model:[:])
	}
	def template() {
		render (view:"/"+ params.path,model:[:])
	}
}
